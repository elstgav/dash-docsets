// es-toolkit
// https://es-toolkit.dev
//
// @URL:      https://es-toolkit.dev/intro.html
// @Download: https://es-toolkit.dev/reference/*
// @Ignore:   */compat/* (unless you’re using `es-toolkit/compat`)

var /** @type {dashDoc.CONFIG} */ CONFIG = {
  visible: '.VPDoc > .container > .content',
  navigation: 'aside.VPSidebar',

  entryTypes: [
    {
      type: () => {
        if (location.pathname.includes('/error/')) return 'Error'

        return 'Method'
      },
      entries: $('main h1').first(),
    },
    {
      type: 'Category',
      entries: $('.VPSidebar .level-1.has-active .item h3').first(),
    },
    {
      type: 'Section',
      entries: $('main h2'),
    },
    // {
    //   type: 'Parameter',
    //   entries: $('#parameters + ul li > code:first-of-type'),
    // },
  ],

  remove: [
    $('nav.prev-next'),
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
      display: none !important;
    }
    ${visibleParents} {
      display: contents !important;
    }
    ${CONFIG.visible.split(',')[0]} {
      padding: 1lh !important;
    }
  </style>
`))
