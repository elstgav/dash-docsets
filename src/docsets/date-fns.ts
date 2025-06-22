// date-fns
// https://date-fns.org
//
// @URL:      https://date-fns.org/docs/Getting-Started
// @Download: https://date-fns.org/v*/docs/*
// @Ignore:   */docs/Change-Log, */docs/Contributing, */docs/Security, */docs/CDN, */docs/webpack, */docs/License

// ----------------------------- WORK IN PROGRESS ------------------------------
// NOTE: This docset is a work in progress and currently does not work.
//
// date-fns has proven to be quite stubborn to parse; likely due to the use of a
// custom JS library to render the docs.
// -----------------------------------------------------------------------------

import { DocsetProcessor } from '@/DocsetProcessor'

const mainContent = '[class^="styles_docContainer"] > [class^="styles_wrapper"]'
const $category = $(`[class^="styles_categoriesList"] a[href="${location.pathname}"]`)
  .closest('li')
  .find('h3')
  .first()

const isConstantsPage = location.pathname.includes('docs/constants')

new DocsetProcessor({
  visible: mainContent,
  navigation: '[class^="styles_categoriesList"]',

  pageType: {
    entries: $(`${mainContent} h1 > span`).first(),
    type: () => {
      if ($category.text().trim() === 'General') return 'Guide'
      if (isConstantsPage) return 'Guide'

      return 'Method'
    },
  },

  entryTypes: [
    {
      entries: $category,
      name: isConstantsPage ? 'Constants' : undefined,
      type: 'Category',
    },
    {
      entries: $(`${mainContent} h2`).not('#issue, #description'),
      name: ($el) => {
        $el.find('a[class^="styles_docHeaderLink"]').remove()
        return DocsetProcessor.getEntryName($el)
      },
      type: isConstantsPage ? 'Constant' : 'Section',
    },
    // {
    //   entries: $('#parameters + ul li > code:first-of-type'),
    //   type: 'Parameter',
    // },
  ],

  remove: [$('script')],
  removeAllHiddenContent: true,
}).process()
