// date-fns
// https://date-fns.org
//
// @URL:      https://date-fns.org/docs/Getting-Started
// @Download: https://date-fns.org/v*/docs/*
// @Ignore:   */docs/Change-Log, */docs/Contributing, */docs/Security, */docs/CDN, */docs/webpack, */docs/License

var mainContent = '[class^="styles_docContainer"] > [class^="styles_wrapper"]'
var $category = $(`[class^="styles_categoriesList"] a[href="${location.pathname}"]`).closest('li').find('h3').first()
var isContantsPage = location.pathname.includes('docs/constants')

var /** @type {dashDoc.CONFIG} */ CONFIG = {
  visible: mainContent,
  navigation: '[class^="styles_categoriesList"]',

  entryTypes: [
    {
      type: () => {
        if ($category.text().trim() === 'General') return 'Guide'
        if (isContantsPage) return 'Guide'

        return 'Method'
      },
      entries: $(`${mainContent} h1 > span`).first(),
    },
    {
      type: 'Category',
      entries: $category,
      name: ($el) => isContantsPage ? 'Constants' : getEntryName($el),
    },
    {
      type: () => isContantsPage ? 'Constant' : 'Section',
      entries: $(`${mainContent} h2`).not('#issue,#description'),
      name: ($el) => {
        $el.find('a[class^="styles_docHeaderLink"]').remove()
        return getEntryName($el)
      },
    },
    // {
    //   type: 'Parameter',
    //   entries: $('#parameters + ul li > code:first-of-type'),
    // },
  ],
}

function getEntryName($el, nameStrOrFn) {
  return typeof nameStrOrFn === 'function' ? nameStrOrFn($el) : $el.text().trim()
}

function getEntryType($el, typeStrOrFn) {
  return typeof typeStrOrFn === 'function' ? typeStrOrFn($el) : typeStrOrFn
}

function getEntryHash($el, hashStrOrFn, isMainEntry) {
  if (typeof hashStrOrFn === 'function') return hashStrOrFn($el)
  if (typeof hashStrOrFn === 'string') return hashStrOrFn
  if (isMainEntry) return undefined

  var hash = $el.attr('id')

  if (!hash) {
    hash = getEntryName($el, hashStrOrFn).replace(/\W/g, '')
    $el.attr('id', hash)
  }

  return hash
}

CONFIG.entryTypes.forEach(({ type, entries, name, hash }, index) => {
  var isMainEntry = index === 0

  entries.each(function () {
    var $entry = $(this)

    dashDoc.addEntry({
      name: getEntryName($entry, name),
      type: getEntryType($entry, type),
      hash: getEntryHash($entry, hash, isMainEntry),
    })
  })
})

var preserved = `:is(${CONFIG.visible}, ${CONFIG.navigation})`
var preservedChildren = `${preserved} *`
var preservedParents = `:has(${preserved})`

var visible = `:is(${CONFIG.visible})`
var visibleChildren = `${visible} *`
var visibleParents = `:has(${visible})`

CONFIG.remove ??= []
CONFIG.remove.unshift($(`body *:not(${preserved}):not(${preservedChildren}):not(${preservedParents})`))
CONFIG.remove.forEach($el => $el.remove())

$('body').append($(`
  <style>
    body *:not(${visible}):not(${visibleChildren}):not(${visibleParents}) {
      all: unset !important;
      display: none !important;
    }
    ${visibleParents} {
      display: contents !important;
      overflow: unset !important;
    }
    ${CONFIG.visible.split(',')[0]} {
      padding: 1lh !important;
      max-width: unset !important;
      min-height: unset !important;
    }
  </style>
`))
