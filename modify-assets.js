const fs = require('fs')
const path = require('path')

const outputDir = './out'

function modifyAssetPrefix(file, isSubfolder) {
  const filePath = path.join(outputDir, file)

  const html = fs.readFileSync(filePath, 'utf-8')

  const modifiedHtml = html.replace(/crossorigin(?:="")?/g, '')

  let modifiedScriptTags = modifiedHtml
  if (isSubfolder) {
    modifiedScriptTags = modifiedHtml.replace(/\/_next\//g, '../_next/')
  } else {
    modifiedScriptTags = modifiedHtml.replace(/\/_next\//g, './_next/')
  }

  fs.writeFileSync(filePath, modifiedScriptTags, 'utf-8')
}

fs.readdirSync(outputDir, { withFileTypes: true }).forEach(dirent => {
  if (dirent.isDirectory()) {
    const isSubfolder = dirent.name !== outputDir
    fs.readdirSync(path.join(outputDir, dirent.name))
      .filter(file => file.endsWith('.html'))
      .forEach(file =>
        modifyAssetPrefix(path.join(dirent.name, file), isSubfolder)
      )
  } else if (dirent.isFile() && dirent.name.endsWith('.html')) {
    modifyAssetPrefix(dirent.name, false)
  }
})
