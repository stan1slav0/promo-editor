// --- S3 UPLOADER MODULE ---
const PROXY_URL = "https://small-fire-960e.pingo-mw2.workers.dev/"

/**
 * Выполняет загрузку обработанных изображений на S3 сервер через прокси.
 * @param {Array} imgs - Массив элементов <img> из редактора.
 * @param {string} categoryText - Название категории в нижнем регистре.
 * @param {string} folderName - Сырое имя папки (например, SBJC123).
 * @param {HTMLElement} activeCategoryBtn - Активная кнопка категории.
 * @param {HTMLElement} logEl - Элемент для вывода логов.
 */
export async function uploadImagesToS3(imgs, categoryText, folderName, activeCategoryBtn, logEl) {
  const letters = folderName.replace(/[^a-zA-Z]/g, '').toLowerCase()
  const digits = folderName.replace(/[^0-9]/g, '')

  if (!letters || !digits) {
    logEl.textContent = '❌ S3 Error: Invalid folder format (Requires letters and numbers, e.g., SBJC123)\n'
    return
  }

  // Показываем только первый статус на старте
  logEl.textContent = `🚀 S3 Auto-Upload Mode: sending ${imgs.length} image(s)...`

  let index = 1
  let uploadedCount = 0
  let existsCount = 0

  for (const img of imgs) {
    const src = img.getAttribute('src')
    if (!src) continue

    // Стираем старый текст и пишем текущий этап обработки
    logEl.textContent = `[${index}/${imgs.length}] Processing image...`

    // Безопасное получение Blob (функция берется из глобальной области видимости main.js)
    if (typeof window.getBlobFromSrc !== 'function') {
      logEl.textContent = `❌ Error: 'getBlobFromSrc' function is missing in main.js`
      break
    }

    const blob = await window.getBlobFromSrc(src)
    if (!blob) {
      logEl.textContent = `❌ [${index}/${imgs.length}] Failed to download source image`
      index++
      await new Promise(r => setTimeout(r, 1000))
      continue
    }

    // Сжатие до 600px (функция берется из глобальной области видимости main.js)
    if (typeof window.toJpeg600 !== 'function') {
      logEl.textContent = `❌ Error: 'toJpeg600' function is missing`
      break
    }
    const { outBlob } = await window.toJpeg600(blob, '#ffffff')

    // Вшиваем метаданные (функция берется из глобальной области видимости main.js)
    if (typeof window.injectMetadata !== 'function') {
      logEl.textContent = `❌ Error: 'injectMetadata' function is missing`
      break
    }
    const blobWithMeta = await window.injectMetadata(outBlob, categoryText)

    const fileName = `img-${index}.jpg`

    // Перезаписываем лог на отправку
    logEl.textContent = `[${index}/${imgs.length}] Uploading ${fileName}...`

    // Построение пути S3
    let apiPath = ''
    let parentParam = 'global'
    const currentCat = categoryText.toLowerCase()

    if (currentCat === 'alpha') {
      parentParam = 'alpha'
      const formattedName = `${letters}/lift-${digits}`
      apiPath = `promo/${formattedName}/${fileName}`
    } else if (currentCat === 'organic') {
      parentParam = 'organic'
      const formattedName = `${letters}/creative-${digits}`
      apiPath = `creatives/${formattedName}/${fileName}`
    } else {
      parentParam = 'global'
      const formattedName = `${letters}/lift-${digits}`
      const originCategoryName = activeCategoryBtn
        ? activeCategoryBtn.textContent.trim().toLowerCase()
        : 'finance'
      apiPath = `Promo/${originCategoryName}/${formattedName}/${fileName}`
    }

    const originalApiUrl = `https://public.epcnetwork.dev/upload?parent=${parentParam}&path=${apiPath}`
    const apiUrl = `${PROXY_URL}?url=${encodeURIComponent(originalApiUrl)}`

    try {
      const licenseKey = localStorage.getItem('license_key') || 'none'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
          'Authorization': `License ${licenseKey}`
        },
        body: blobWithMeta
      })

      const responseText = await response.text()

      if (!response.ok) {
        if (response.status === 409 || responseText.includes('already exists')) {
          logEl.textContent = `⚠️ [${index}/${imgs.length}] ${fileName} already exists on server.`
          existsCount++
        } else {
          throw new Error(`Server error: ${response.status}`)
        }
      } else {
        logEl.textContent = `✅ [${index}/${imgs.length}] Successfully uploaded: ${fileName}`
        uploadedCount++
      }

    } catch (err) {
      logEl.textContent = `❌ [${index}/${imgs.length}] Upload failed for ${fileName}: ${err.message}`
    }

    index++

    // Пауза перед обработкой следующего файла
    await new Promise(r => setTimeout(r, 600))
  }

  // Завершающий этап: выводим строго ОДИН итоговый статус
  if (uploadedCount > 0 && existsCount === 0) {
    logEl.textContent = `✅ Successfully uploaded: ${uploadedCount} image(s)!`
  } else if (uploadedCount === 0 && existsCount > 0) {
    logEl.textContent = `⚠️ Already exists on server.`
  } else if (uploadedCount > 0 && existsCount > 0) {
    logEl.textContent = `✅ Uploaded: ${uploadedCount} | ⚠️ Already exists: ${existsCount}`
  } else {
    logEl.textContent = `❌ S3 Upload failed.`
  }
}