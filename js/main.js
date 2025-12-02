//main js code
const blueColors = ['#0000FF', 'rgb\\(0,\\s*0,\\s*255\\)',
  '#CFE2F3', 'rgb\\(207,\\s*226,\\s*243\\)',
  '#9FC5E8', 'rgb\\(159,\\s*197,\\s*232\\)',
  '#6FA8DC', 'rgb\\(111,\\s*168,\\s*220\\)',
  '#3D85C6', 'rgb\\(61,\\s*133,\\s*198\\)',
  '#0B5394', 'rgb\\(11,\\s*83,\\s*148\\)',
  '#073763', 'rgb\\(7,\\s*55,\\s*99\\)',
  '#4A86E8', 'rgb\\(74,\\s*134,\\s*232\\)',
  '#C9DAF8', 'rgb\\(201,\\s*218,\\s*248\\)',
  '#A4C2F4', 'rgb\\(164,\\s*194,\\s*244\\)',
  '#6D9EEB', 'rgb\\(109,\\s*158,\\s*235\\)',
  '#1155CC', 'rgb\\(17,\\s*85,\\s*204\\)',
  '#1C4587', 'rgb\\(28,\\s*69,\\s*135\\)',
  '#3C78D8', 'rgb\\(60,\\s*120,\\s*216\\)',
  '#467886', 'rgb\\(70,\\s*120,\\s*134\\)',
  '#0033CC', 'rgb\\(0,\\s*51,\\s*204\\)',
  '#0066B3', 'rgb\\(0,\\s*102,\\s*179\\)']

function italicLinks(htmlContent) {
  htmlContent = htmlContent.replace(/<a[^>]*>/gi, '').replace(/<\/a>/gi, '')
  blueColors.forEach((color, index) => {
    const regex = new RegExp(`<span[^>]*style="[^"]*color:\\s*${color}[^"]*;[^"]*font-style:\\s*italic[^"]*"[^>]*>(.*?)<\\/span>`, 'gi')
    htmlContent = htmlContent.replace(regex,
      '<a href="urlhere" style="font-family:\'Roboto\', Arial, Helvetica, sans-serif;text-decoration: underline;font-weight: 700; color: #0000EE;"><em>$1</em></a>'
    )
  })

  return htmlContent
}

function linksStyles(htmlContent) {
  blueColors.forEach((color, index) => {
    const reg = new RegExp(`<span[^>]*style="[^"]*color:\\s*(${color})[^"]*"[^>]*>(.*?)<\\/span>`, 'gi')
    htmlContent = htmlContent.replace(reg,
      '<a href="urlhere" style="font-family:\'Roboto\', Arial, Helvetica, sans-serif;text-decoration: underline;font-weight: 700; color: #0000EE;">$2</a>'
    )
  })

  return htmlContent
}



function replaceAllEmojisAndSymbolsExcludingHTML(htmlContent) {
  const rx = /(?:\p{Extended_Pictographic}|(?![<>=&%"'#;:_-])[\p{S}\p{No}])(?:\uFE0F)?/gu

  return htmlContent.replace(rx, match => {
    return Array.from(match)
      .map(ch => `&#${ch.codePointAt(0)};`)
      .join('')
  })
}

function processStyles(htmlContent) {
  htmlContent = htmlContent.replace(/<b[^>]*>/gi, '').replace(/<\/b>/gi, '')
  // i and b and u
  htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*;[^"]*font-style:\s*italic[^"]*;[^"]*text-decoration-line:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi,
    '<em style="text-decoration: underline;font-weight: bold;">$1</em>')

  // i and u
  htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-style:\s*italic[^"]*;[^"]*text-decoration-line:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi,
    '<em style="text-decoration: underline;">$1</em>')

  // i and b
  htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*;[^"]*font-style:\s*italic[^"]*"[^>]*>(.*?)<\/span>/gi,
    '<b style="font-style: italic;">$1</b>')

  // b and u
  htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*;[^"]*text-decoration-line:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi,
    '<b style="text-decoration: underline;">$1</b>')

  // u
  htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*text-decoration-line:\s*underline[^"]*"[^>]*>(.*?)<\/span>/gi,
    '<u>$1</u>')

  // b
  htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-weight:\s*700[^"]*"[^>]*>(.*?)<\/span>/gi, '<b>$1</b>')

  // i
  htmlContent = htmlContent.replace(/<span[^>]*style="[^"]*font-style:\s*italic[^"]*"[^>]*>(.*?)<\/span>/gi, '<em>$1</em>')


  //delete tags
  htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/a>/g, ' ')
  htmlContent = htmlContent.replace(/<div[^>]*>/gi, '').replace(/<\/div>/gi, '')
  htmlContent = htmlContent.replace(/<span[^>]*>/gi, '').replace(/<\/span>/gi, '')
  htmlContent = htmlContent.replace(/<b>\s*<\/b>/g, '')

  //delete table tags update
  htmlContent = htmlContent.replace(/<table[^>]*>/gi, '').replace(/<\/table>/gi, '')
  htmlContent = htmlContent.replace(/<tbody[^>]*>/gi, '').replace(/<\/tbody>/gi, '')
  htmlContent = htmlContent.replace(/<tr[^>]*>/gi, '').replace(/<\/tr>/gi, '')
  htmlContent = htmlContent.replace(/<td[^>]*>/gi, '').replace(/<\/td>/gi, '')
  htmlContent = htmlContent.replace(/<col[^>]*>/gi, '').replace(/<\/col>/gi, '')
  htmlContent = htmlContent.replace(/<colgroup[^>]*>/gi, '').replace(/<\/colgroup>/gi, '')

  return htmlContent
}

//end main js code


//html js code

function wrapSmallCenterTextHtml(htmlContent) {
  return htmlContent.replace(/<h6[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h6>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000; padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                    ${content}
                  </span>
                </td>
            </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapSmallTextHtml(htmlContent) {
  return htmlContent.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
            <tr>
                <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000; padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </span>
                </td>
            </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapCenterHeadlineHtml(htmlContent) {
  return htmlContent.replace(/<h1[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h1>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:22px;font-style:normal;font-weight:bold;line-height:1.5;text-align:center;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <strong style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:22px;font-style:normal;font-weight:bold;line-height:1.5;text-align:center;color:#000000;">
                       ${content}
                  </strong>
                </td>
              </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}


function wrapCenterQuoteHtml(htmlContent) {
  return htmlContent.replace(/<h4[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h4>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000; padding-left: 20px;padding-right: 20px;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                    ${content}
                  </span>
                </td>
            </tr> 
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapQuoteHtml(htmlContent) {
  return htmlContent.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
            <tr>
                <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000; padding-left: 20px;padding-right: 20px;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </span>
                </td>
            </tr>            
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapHeadlineHtml(htmlContent) {
  return htmlContent.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
            <tr>
                <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:22px;font-style:normal;font-weight:bold;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <strong style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:22px;font-style:normal;font-weight:bold;line-height:1.5;text-align:left;color:#000000;">
                       ${content}
                  </strong>
                </td>
              </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapCenterTextHtml(htmlContent) {
  return htmlContent.replace(/<p[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/p>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
            <tr>
                <td align="center" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                    <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                        ${content}
                    </span>
                </td>
            </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}


function wrapButtonHtml(htmlContent) {
  return htmlContent.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
             <tr>
                <td align="center" style="padding-top: 14px; padding-bottom: 14px;">
                 
                  <table cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                           <td height="51" align="center" style="border-radius: 10px;font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;line-height:1.5;text-align:center;font-weight: bold; color: #FFFFFF; padding: 3px 5px; background-color: #28b628;" bgcolor="#28b628">
                               <a href="urlhere" target="_blank" style="font-weight: bold;text-decoration:none;color:#ffffff;padding: 9px 15px;display: block;font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;line-height:1.5;text-align:center;background-color: #28b628;border-radius: 10px;">
                                    ${content}           
                               </a>
                          </td>
                       </tr>
                  </table>
                </td>
              </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}


//right-side-img
function wrapRightSideImg(htmlContent) {
  return htmlContent.replace(/i-r-s([\s\S]*?)i-r-s-e/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
              <tr>
                <td align="left" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-bottom: 14px; padding-top: 14px;">
                  <a align="right" href="urlhere" target="_blank" style="display: inline-block; float: right; width: 50%; max-width: 50%; margin-left: 18px; margin-bottom: 12px;">
                    <img alt="click" height="224"
                         align="right"
                         src="https://storage.5th-elementagency.com/"
                         style="border:0;display:inline-block;outline:none;text-decoration:none;height:auto;max-height: 224px;max-width: 100%; width: 100%;font-size:13px;object-fit: contain;"
                         width="250"/>
                  </a>
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </span>
                </td>
              </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

//right-side-img


//left-side-img
function wrapLeftSideImg(htmlContent) {
  return htmlContent.replace(/i-l-s([\s\S]*?)i-l-s-e/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
              <tr>
                <td align="left" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-bottom: 14px; padding-top: 14px;">
                  <a align="left" href="urlhere" target="_blank" style="display: inline-block; float: left; width: 50%; max-width: 50%; margin-right: 18px; margin-bottom: 12px;">
                    <img alt="click" height="224"
                         align="left"
                         src="https://storage.5th-elementagency.com/"
                         style="border:0;display:inline-block;outline:none;text-decoration:none;height:auto;max-height: 224px;max-width: 100%; width: 100%;font-size:13px;object-fit: contain;"
                         width="250"/>
                  </a>
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${content}
                  </span>
                </td>
              </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

//left-side-img


//signature-img
function wrapSignatureImg(htmlContent) {
  return htmlContent.replace(/sign-i([\s\S]*?)sign-i-e/gi, function (match, content) {
    return `
                    </span>
                </td>
            </tr>
              <tr>
                <td class="img-bg-block" align="left" style="padding-top: 14px; padding-bottom: 14px;">
                  <img alt="Signature" height="auto"
                       src="https://storage.5th-elementagency.com/"
                       style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:200px;max-width: 100%;font-size:13px;"
                       width="200"/>
                </td>
              </tr>
            <tr>
               <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                  <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

//signature-img-end


//one br start
function addOneBr(htmlContent) {
  return htmlContent.replace(/ю/gi, function (match, content) {
    return `
                    <br>
        `
  })
}
function replaceTripleBrWithSingle(htmlContent) {
  const BR = `<br>\n`
  htmlContent = htmlContent.replace(
    /<\w+[^>]*>\s*<\w+[^>]*>\s*<br\s*\/?>\s*<\/\w+>\s*<\/\w+>/gi,
    BR
  )


  htmlContent = htmlContent.replace(
    /<\w+[^>]*>\s*<br\s*\/?>\s*<\/\w+>/gi,
    BR
  )

  htmlContent = htmlContent.replace(
    /\s*<br\s*\/?>\s*<\/(\w+)>/gi,
    '</$1><br>'
  )


  htmlContent = htmlContent.replace(/(?:<br\s*\/?>\s*){3,}/gi, BR)

  return htmlContent
}

//one br end



//end html js code


//mjml js code

function wrapSmallCenterTextMjml(htmlContent) {
  return htmlContent.replace(/<h6[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h6>/gi, function (match, content) {
    return `
                    </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                            ${content}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapSmallTextMjml(htmlContent) {
  return htmlContent.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, function (match, content) {
    return `
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:12px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                            ${content}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapCenterHeadlineMjml(htmlContent) {
  return htmlContent.replace(/<h1[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h1>/gi, function (match, content) {
    return `
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:22px;font-style:normal;font-weight:bold;line-height:1.5;text-align:center;color:#000000;">
                            ${content}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapHeadlineMjml(htmlContent) {
  return htmlContent.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, function (match, content) {
    return `
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:22px;font-style:normal;font-weight:bold;line-height:1.5;text-align:left;color:#000000;">
                            ${content}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapCenterQuoteMjml(htmlContent) {
  return htmlContent.replace(/<h4[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/h4>/gi, function (match, content) {
    return `
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 45px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                            ${content}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapQuoteMjml(htmlContent) {
  return htmlContent.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, function (match, content) {
    return `
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 45px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                            ${content}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

function wrapCenterTextMjml(htmlContent) {
  return htmlContent.replace(/<p[^>]*style="[^"]*text-align:\s*center[^"]*"[^>]*>([\s\S]*?)<\/p>/gi, function (match, content) {
    return `
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:center;color:#000000;">
                            ${content}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}


function wrapButtonMjml(htmlContent) {
  return htmlContent.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, function (match, content) {
    return `
                       </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px; word-break:break-word;">
                        <table cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                              <td height="51" align="center" style="border-radius: 10px;font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;line-height:1.5;text-align:center;font-weight: bold; color: #FFFFFF; padding: 3px 5px; background-color: #28b628;" bgcolor="#28b628">
                                  <a href="urlhere" target="_blank" style="font-weight: bold;text-decoration:none;color:#ffffff;padding: 9px 15px;display: block;font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;line-height:1.5;text-align:center;background-color: #28b628;border-radius: 10px;">
                                       ${content}           
                                  </a>
                             </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}


//mjml-right-side-img
function wrapRightSideImgMjml(htmlContent) {
  return htmlContent.replace(/i-r-s([\s\S]*?)i-r-s-e/gi, function (match, content) {
    return `
                       </div>
                      </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table class="content-inner-table" border="0" cellspacing="0" role="presentation"
                                   cellpadding="0" width="100%" style="width: 100%;">
                                <tr>
                                    <td align="left" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-bottom: 14px; padding-top: 14px;">
                                        <a align="right" href="urlhere" target="_blank" style="display: inline-block; float: right; width: 50%; max-width: 50%; margin-left: 18px; margin-bottom: 12px;">
                                            <img alt="click" height="224"
                                                 align="right"
                                                 src="https://storage.5th-elementagency.com/"
                                                 style="border:0;display:inline-block;outline:none;text-decoration:none;height:auto;max-height: 224px;max-width: 100%; width: 100%;font-size:13px;object-fit: contain;"
                                                 width="250"/>
                                        </a>
                                        <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                                        ${content}
                                      </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}


//mjml-right-side-img-end


//mjml-left-side-img
function wrapLeftSideImgMjml(htmlContent) {
  return htmlContent.replace(/i-l-s([\s\S]*?)i-l-s-e/gi, function (match, content) {
    return `
                       </div>
                      </td>
                    </tr>
                    <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table class="content-inner-table" border="0" cellspacing="0" role="presentation"
                                   cellpadding="0" width="100%" style="width: 100%;">
                                      <tr>
                                        <td align="left" style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-bottom: 14px; padding-top: 14px;">
                                          <a align="left" href="urlhere" target="_blank" style="display: inline-block; float: left; width: 50%; max-width: 50%; margin-right: 18px; margin-bottom: 12px;">
                                            <img alt="click" height="224"
                                                 align="left"
                                                 src="https://storage.5th-elementagency.com/"
                                                 style="border:0;display:inline-block;outline:none;text-decoration:none;height:auto;max-height: 224px;max-width: 100%; width: 100%;font-size:13px;object-fit: contain;"
                                                 width="250"/>
                                          </a>
                                          <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                                            ${content}
                                          </span>
                                        </td>
                                      </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}


//mjml-signature-img
function wrapSignatureImgMjml(htmlContent) {
  return htmlContent.replace(/sign-i([\s\S]*?)sign-i-e/gi, function (match, content) {
    return `
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:180px;">
                                <img alt="Signature" src="https://storage.5th-elementagency.com/" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180" height="auto" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td> 
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
        `
  })
}

//mjml-signature-img-end


//end mjml js code

//main js code
function addBrAfterClosingP(htmlContent) {
  // Delete extra <br>
  htmlContent = htmlContent.replace(/<br\s*\/?>/gi, '')

  // Add <br><br>
  htmlContent = htmlContent.replace(/<\/p>(?!\s*<\/li>)/gi, '</p>\n<br><br>\n')

  // add <br> (ol, ul).
  htmlContent = htmlContent.replace(/<br><br>(\s*<(ol|ul)[^>]*>)/gi, '<br>\n$1')

  // Delete extra <p>
  htmlContent = htmlContent.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '')

  return htmlContent
}

function removeStylesFromLists(htmlContent) {
  htmlContent = htmlContent.replace(/<ol[^>]*style="[^"]*"[^>]*>/gi, '<ol>\n')
  htmlContent = htmlContent.replace(/<ul[^>]*style="[^"]*"[^>]*>/gi, '<ul>\n')
  htmlContent = htmlContent.replace(/<li[^>]*style="[^"]*"[^>]*>/gi, '<li>')
  htmlContent = htmlContent.replace(/<\/li*>/gi, '<\/li>\n')
  return htmlContent
}

//end main js code

//html js code
function wrapTextInSpan(htmlContent) {
  htmlContent = htmlContent.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, function (match, src) {
    return `            </span>
                       </td>
                   </tr>
                   <tr>
                       <td class="img-bg-block" align="center" style="padding-top: 14px; padding-bottom: 14px;">
                           <a href="urlhere" target="_blank">
                               <img alt="click" height="auto"
                                    src="https://storage.5th-elementagency.com/"
                                    style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;max-width: 560px;font-size:13px;"
                                    width="560"/>
                           </a>
                       </td>
                    </tr>
                    <tr>
                       <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                            <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">`
  })

  htmlContent = `<tr>
                      <td style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;padding-top: 14px; padding-bottom: 14px;">
                                <span style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                                    ${htmlContent}
                                </span>
                      </td>
                    </tr>`

  return htmlContent
}

// end html js code

//main js code
function cleanEmptyHtmlTags(htmlContent) {
  htmlContent = htmlContent.replace(/&nbsp;/g, ' ')
  // <brbrbrbr>
  htmlContent = htmlContent.replace(/<b>\s*<\/b>/g, '')
  htmlContent = htmlContent.replace(/<li>\s*<\/li>/g, '')
  htmlContent = htmlContent.replace(/<br>\s*<br>\s*<br>\s*<br>/g, '<br><br>')
  htmlContent = htmlContent.replace(/<br>\s*<br>\s*<br>/g, '<br><br>')
  htmlContent = htmlContent.replace(/(<span[^>]*>)\s*<br><br>/gi, '$1')
  htmlContent = htmlContent.replace(/<\/a>\s*<a[^>]*>/g, ' ')
  htmlContent = htmlContent.replace(/<pre>/g, '')
  htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/a>/g, ' ')
  htmlContent = htmlContent.replace(/<b[^>]*>\s*<\/b>/g, ' ')
  htmlContent = htmlContent.replace(/<u>\s*<\/u>/g, ' ')
  htmlContent = htmlContent.replace(/<em[^>]*>\s*<\/em>/g, ' ')
  htmlContent = htmlContent.replace(/<\/em>\s*<em[^>]*>/g, ' ')
  htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/a>/g, ' ')
  htmlContent = htmlContent.replace(/<br><br>\s*<\/span>/g, '<\/span>')
  htmlContent = htmlContent.replace(/(<span[^>]*>)\s*<\/a>/gi, '$1')
  htmlContent = htmlContent.replace(/(<span[^>]*>)\s*<\/b>/gi, '$1')
  htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/span>/g, '<\/span>')
  htmlContent = htmlContent.replace(/<b[^>]*>\s*<\/span>/g, '<\/span>')
  htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<\/a>/gi, '$1')
  htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<\/b>/gi, '$1')
  htmlContent = htmlContent.replace(/<a[^>]*>\s*<\/div>/g, '<\/div>')
  htmlContent = htmlContent.replace(/<b[^>]*>\s*<\/div>/g, '<\/div>')

  htmlContent = htmlContent.replace(/<h1[^>]*>/gi, '').replace(/<\/h1>/gi, '')
  htmlContent = htmlContent.replace(/<h2[^>]*>/gi, '').replace(/<\/h2>/gi, '')
  htmlContent = htmlContent.replace(/<h3[^>]*>/gi, '').replace(/<\/h3>/gi, '')
  htmlContent = htmlContent.replace(/<h4[^>]*>/gi, '').replace(/<\/h4>/gi, '')
  htmlContent = htmlContent.replace(/<h5[^>]*>/gi, '').replace(/<\/h5>/gi, '')
  htmlContent = htmlContent.replace(/<h6[^>]*>/gi, '').replace(/<\/h6>/gi, '')
  htmlContent = htmlContent.replace(/<br><br>\s*<br><br>/g, '<br><br>')
  htmlContent = htmlContent.replace(/<br><br>\s*<\/div>/g, '<\/div>')
  htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<br><br>/gi, '$1')
  htmlContent = htmlContent.replace(/(<span[^>]*>)\s*<br><br>/gi, '$1')
  htmlContent = htmlContent.replace(/<br><br>\s*<\/span>/g, '<\/span>')
  htmlContent = htmlContent.replace(/(<div[^>]*>)\s*<br><br>/gi, '$1')
  htmlContent = htmlContent.replace(/<br><br>\s*<\/div>/g, '<\/div>')
  htmlContent = htmlContent.replace(/<br>\s*<\/div>/g, '<\/div>')
  htmlContent = htmlContent.replace(/<br>\s*<\/span>/g, '<\/span>')

  htmlContent = htmlContent.replace(/<span[^>]*>\s*<\/span>/g, '')
  htmlContent = htmlContent.replace(/<div[^>]*>\s*<\/div>/g, '')
  htmlContent = htmlContent.replace(/<td[^>]*>\s*<\/td>/g, '')
  htmlContent = htmlContent.replace(/<tr[^>]*>\s*<\/tr>/g, '')
  return htmlContent
}

//end main js code

//html js code
function wrapContentInFullTableStructure(htmlContent) {
  const fullTableStructure = `
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 100%;">
        <tr>
            <td align="center" valign="top">
                <table class="primary-table-limit content-table" bgcolor="#FFFFFF" border="0" cellspacing="0"
                       cellpadding="0" role="presentation" width="100%" style="max-width: 600px;">
                    <tr>
                        <td class="content-vertical-space" align="center" style="padding-left: 20px; padding-right: 20px;">
                            <table class="content-inner-table" border="0" cellspacing="0" role="presentation"
                                   cellpadding="0" width="100%" style="width: 100%;">
                                <tr>
                                    <td height="16" width="100%" style="max-width: 100%" class="md-horizontal-space"></td>
                                </tr>
                                ${htmlContent}
                                <tr>
                                    <td height="16" width="100%" style="max-width: 100%" class="md-horizontal-space"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>`
  return fullTableStructure
}

function exportHTML() {
  let editorContent = document.getElementById('editor').innerHTML
  editorContent = italicLinks(editorContent)
  editorContent = linksStyles(editorContent)
  editorContent = replaceAllEmojisAndSymbolsExcludingHTML(editorContent)
  editorContent = processStyles(editorContent)
  editorContent = wrapCenterTextHtml(editorContent)
  editorContent = wrapSmallCenterTextHtml(editorContent)
  editorContent = wrapSmallTextHtml(editorContent)
  editorContent = wrapCenterHeadlineHtml(editorContent)
  editorContent = wrapHeadlineHtml(editorContent)
  editorContent = wrapButtonHtml(editorContent)
  editorContent = wrapCenterQuoteHtml(editorContent)
  editorContent = wrapQuoteHtml(editorContent)
  editorContent = addBrAfterClosingP(editorContent)
  editorContent = removeStylesFromLists(editorContent)
  editorContent = wrapTextInSpan(editorContent)
  editorContent = wrapRightSideImg(editorContent)
  editorContent = wrapLeftSideImg(editorContent)
  editorContent = wrapSignatureImg(editorContent)
  editorContent = cleanEmptyHtmlTags(editorContent)
  editorContent = wrapContentInFullTableStructure(editorContent)
  editorContent = addOneBr(editorContent)
  editorContent = replaceTripleBrWithSingle(editorContent)
  document.getElementById('output').value = editorContent
}

function downloadFile(content) {
  const fileName = document.getElementById('fileName').value.replace(/\s+/g, '').toUpperCase()

  const needsApproval = document.getElementById('approveNeeded').checked
  const approvalText = needsApproval ? '(Approve needed)' : ''

  const htmlContent = `
        ${content}
       `
  const file = new Blob([htmlContent], { type: 'text/html' })

  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)

  a.download = `${fileName}_html${approvalText}.html`
  a.click()
  URL.revokeObjectURL(a.href)
}





document.getElementById("downloadBtn").addEventListener("click", function () {
  const editableText = document.getElementById("output").value
  downloadFile(editableText)
})
//end html js code

//mjml

function wrapTextInMjmlTags(htmlContent) {
  htmlContent = htmlContent.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, function (match, src) {
    return `       </div>
                      </td>
                    </tr>
                   <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:550px;">
                                <a href="urlhere" target="_blank">
                                  <img alt="click" src="https://storage.5th-elementagency.com/" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="550" height="auto" />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                `
  })

  htmlContent = `
            <tr>
              <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                <div style="font-family:'Roboto', Arial, Helvetica, sans-serif;font-size:18px;font-style:normal;font-weight:normal;line-height:1.5;text-align:left;color:#000000;">
                    ${htmlContent}
                </div>
              </td>
            </tr>
        `

  return htmlContent
}

function wrapContentInFullMjmlTableStructure(htmlContent) {
  const fullMjmlTableStructure = `
    <div style="background-color:#FFFFFF;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:600px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                    ${htmlContent}
                                </tbody>
                            </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>`
  return fullMjmlTableStructure
}

function exportMJML() {
  let editorContent = document.getElementById('editor').innerHTML
  editorContent = italicLinks(editorContent)
  editorContent = linksStyles(editorContent)
  editorContent = replaceAllEmojisAndSymbolsExcludingHTML(editorContent)
  editorContent = processStyles(editorContent)
  editorContent = wrapCenterTextMjml(editorContent)
  editorContent = wrapSmallCenterTextMjml(editorContent)
  editorContent = wrapSmallTextMjml(editorContent)
  editorContent = wrapCenterHeadlineMjml(editorContent)
  editorContent = wrapHeadlineMjml(editorContent)
  editorContent = wrapCenterQuoteMjml(editorContent)
  editorContent = wrapQuoteMjml(editorContent)
  editorContent = wrapButtonMjml(editorContent)
  editorContent = addBrAfterClosingP(editorContent)
  editorContent = removeStylesFromLists(editorContent)
  editorContent = wrapTextInMjmlTags(editorContent)
  editorContent = wrapLeftSideImgMjml(editorContent)
  editorContent = wrapRightSideImgMjml(editorContent)
  editorContent = wrapSignatureImgMjml(editorContent)
  editorContent = cleanEmptyHtmlTags(editorContent)
  editorContent = wrapContentInFullMjmlTableStructure(editorContent)
  editorContent = addOneBr(editorContent)
  editorContent = replaceTripleBrWithSingle(editorContent)
  document.getElementById('mjmlOutput').value = editorContent
}

function downloadMjmlFile(content) {

  const mjmlFileName = document
    .getElementById('fileName')
    .value
    .replace(/\s+/g, '')
    .toUpperCase()


  const needsApproval = document.getElementById('approveNeeded').checked
  const approvalText = needsApproval ? '(Approve needed)' : ''


  const htmlContent = `${content}`
  const file = new Blob([htmlContent], { type: 'text/html' })


  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)

  a.download = `${mjmlFileName}_mjml${approvalText}.html`
  a.click()


  URL.revokeObjectURL(a.href)
}



document.getElementById("mjmlDownloadBtn").addEventListener("click", function () {
  const editableText = document.getElementById("mjmlOutput").value
  downloadMjmlFile(editableText)
})

// end mjml code

// select all on click
document.querySelectorAll('.input-name').forEach(input => {
  input.addEventListener('click', function (event) {
    if (event.detail === 1) { // Only on single click
      this.select()
    }
  })
})

// html file number increment
function changeNumber(amount) {
  let input = document.getElementById("fileName")
  let match = input.value.match(/(\D*)(\d+)/) // Match text and number separately

  if (match) {
    let textPart = match[1] // Non-numeric part (e.g., "SBJC ")
    let numberPart = parseInt(match[2]) || 0 // Numeric part (e.g., 123)
    numberPart += amount // Increment or decrement the number
    input.value = textPart + numberPart // Update input value
  }
}

// mjml file number increment
function changeMjmlNumber(amount) {
  let input = document.getElementById("mjmlFileName")
  let match = input.value.match(/(\D*)(\d+)/) // Match text and number separately

  if (match) {
    let textPart = match[1] // Non-numeric part (e.g., "SBJC ")
    let numberPart = parseInt(match[2]) || 0 // Numeric part (e.g., 123)
    numberPart += amount // Increment or decrement the number
    input.value = textPart + numberPart // Update input value
  }
}

//copy function
function copyTextHtml() {
  const copyText = document.getElementById("output")
  const button = document.getElementById("copyHtmlButton")


  copyText.select()
  copyText.setSelectionRange(0, 99999)


  navigator.clipboard.writeText(copyText.value).then(() => {
    button.innerText = "Copied!"

    setTimeout(() => {
      button.innerText = "Copy MJML"
    }, 2000)
  }).catch((err) => {
    alert("Copy error")
  })
}


function copyTextMjml() {
  const copyText = document.getElementById("mjmlOutput")
  const button = document.getElementById("copyMjmlButton")


  copyText.select()
  copyText.setSelectionRange(0, 99999)


  navigator.clipboard.writeText(copyText.value).then(() => {
    button.innerText = "Copied!"

    setTimeout(() => {
      button.innerText = "Copy MJML"
    }, 2000)
  }).catch((err) => {
    alert("Copy error")
  })
}
