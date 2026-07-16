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
    logEl.innerHTML = '❌ S3 Error: Invalid folder format (Requires letters and numbers, e.g., SBJC123)<br>'
    return
  }

  const totalCount = imgs.length
  const totalWord = totalCount === 1 ? 'image' : 'images'

  // Сбрасываем старый лог и пишем стартовый статус
  logEl.innerHTML = `🚀 S3 Auto-Upload Mode: sending ${totalCount} ${totalWord}...`

  let index = 1
  let uploadedCount = 0
  let existsCount = 0
  let generatedBrowserUrl = ''

  for (const img of imgs) {
    const src = img.getAttribute('src')
    if (!src) continue

    // Информативный статус обработки (чистый текст)
    logEl.innerHTML = `⚙️ Processing image ${index} of ${totalCount}...`

    // Безопасное получение Blob
    if (typeof window.getBlobFromSrc !== 'function') {
      logEl.innerHTML = `❌ Error: 'getBlobFromSrc' function is missing in main.js`
      break
    }

    const blob = await window.getBlobFromSrc(src)
    if (!blob) {
      logEl.innerHTML = `❌ Failed to download source image ${index}`
      index++
      await new Promise(r => setTimeout(r, 1000))
      continue
    }

    // Сжатие до 600px
    if (typeof window.toJpeg600 !== 'function') {
      logEl.innerHTML = `❌ Error: 'toJpeg600' function is missing`
      break
    }
    const { outBlob } = await window.toJpeg600(blob, '#ffffff')

    // Вшиваем метаданные
    if (typeof window.injectMetadata !== 'function') {
      logEl.innerHTML = `❌ Error: 'injectMetadata' function is missing`
      break
    }
    const blobWithMeta = await window.injectMetadata(outBlob, categoryText)

    const fileName = `img-${index}.jpg`

    // Информативный статус отправки (чистый текст)
    logEl.innerHTML = `📤 Uploading image ${index} of ${totalCount}...`

    // --- ПОСТРОЕНИЕ ПУТИ S3 И ССЫЛОК ---
    let apiPath = ''
    let parentParam = 'global'
    const currentCat = categoryText.toLowerCase()

    if (currentCat === 'alpha') {
      parentParam = 'alpha'
      const formattedName = `${letters}/lift-${digits}`
      apiPath = `promo/${formattedName}/${fileName}`
      generatedBrowserUrl = `https://storage.epcnetwork.dev/browser/alphaone/promo/${letters}/lift-${digits}/`
    } else if (currentCat === 'organic') {
      parentParam = 'organic'
      const formattedName = `${letters}/creative-${digits}`
      apiPath = `creatives/${formattedName}/${fileName}`
      generatedBrowserUrl = `https://storage.epcnetwork.dev/browser/organic/creatives/${letters}/creative-${digits}/`
    } else {
      parentParam = 'global'
      const formattedName = `${letters}/lift-${digits}`
      const originCategoryName = activeCategoryBtn
        ? activeCategoryBtn.textContent.trim().toLowerCase()
        : 'finance'
      apiPath = `Promo/${originCategoryName}/${formattedName}/${fileName}`
      generatedBrowserUrl = `https://storage.epcnetwork.dev/browser/files/Promo/${encodeURIComponent(originCategoryName)}/${letters}/lift-${digits}/`
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
          existsCount++
        } else {
          throw new Error(`Server error: ${response.status}`)
        }
      } else {
        uploadedCount++
      }

    } catch (err) {
      logEl.innerHTML = `❌ Image ${index} upload failed: ${err.message}`
      await new Promise(r => setTimeout(r, 1500)) // задержка только при ошибке, чтобы её успели увидеть
    }

    index++
    // Небольшая техническая пауза между запросами (0.2 секунды вместо 0.8), так как нам больше не нужно ждать чтения текста на экране
    await new Promise(r => setTimeout(r, 200))
  }

  // Окончания для финального статуса
  const upWord = uploadedCount === 1 ? 'image' : 'images'
  const exWord = existsCount === 1 ? 'image' : 'images'

  // --- ЗАВЕРШАЮЩИЙ ЭТАП: ЗДЕСЬ ССЫЛКА РЕАЛЬНО НУЖНА ---
  if (uploadedCount > 0 && existsCount === 0) {
    logEl.innerHTML = `✅ Successfully uploaded ${uploadedCount} ${upWord}! <a href="${generatedBrowserUrl}" target="_blank"  class="output_button_folder">📂 Open S3 Folder</a>`
  } else if (uploadedCount === 0 && existsCount > 0) {
    logEl.innerHTML = `⚠️ All ${existsCount} ${exWord} already exist on server. <a href="${generatedBrowserUrl}" target="_blank"  class="output_button_folder">📂 Open S3 Folder</a>`
  } else if (uploadedCount > 0 && existsCount > 0) {
    logEl.innerHTML = `✅ Uploaded: ${uploadedCount} ${upWord} | ⚠️ Already exists: ${existsCount} ${exWord} <a href="${generatedBrowserUrl}" target="_blank"  class="output_button_folder">📂 Open S3 Folder</a>`
  } else {
    logEl.innerHTML = `❌ S3 Upload failed.`
  }
}