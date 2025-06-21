var pageTitle = $('article.main-page-content h1').first().text()
var isGuidePage = !!pageTitle.match(/^Web.*(manifest|reference)$/i)

dashDoc.addEntry({
  name: pageTitle,
  type: isGuidePage ? 'Guide' : 'Property',
})

$('article.main-page-content h2').each(function () {
  var entryName = $(this).text()
  var entryHash = $(this).attr('id')

  if (!entryHash) {
    entryHash = entryName.replace(/\W/g, '')
    $(this).attr('id', entryHash)
  }

  dashDoc.addEntry({
    name: entryName,
    type: 'Section',
    hash: entryHash,
  })
})

$('[aria-labelledby="values"] dt').each(function () {
  var entryName = $(this).find('code').text()
  var entryHash = $(this).attr('id')

  if (!entryHash) {
    entryHash = entryName.replace(/\W/g, '')
    $(this).attr('id', entryHash)
  }

  dashDoc.addEntry({
    name: entryName,
    type: entryName === pageTitle ? 'Property' : 'Value',
    hash: entryHash,
  })
})

$('lazy-compat-table').replaceWith(
  '<p>Unavailable in Dash. Press <kbd>⌘</kbd><kbd>⇧</kbd><kbd>B</kbd> to open the page in your browser.</p>'
)
