// Progressive Web App Manifest
// https://developer.mozilla.org/en-US/docs/Web/Manifest
//
// @URL:      https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest
// @Download: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/*
// @Ignore:   *.txt

import { DocsetProcessor } from '@/DocsetProcessor'

const pageTitle = $('article.main-page-content h1').first().text()
const isGuidePage = !!pageTitle.match(/^Web.*(manifest|reference)$/i)

new DocsetProcessor({
  visible: 'article.main-page-content, .article-actions-container',
  navigation: 'aside.sidebar',

  pageType: {
    entries: $('article.main-page-content h1').first(),
    type: isGuidePage ? 'Guide' : 'Property',
  },

  entryTypes: [
    {
      entries: $('article.main-page-content h2'),
      type: 'Section',
    },
    {
      entries: $('[aria-labelledby="values"] dt'),
      name: ($el) => $el.find('code').text(),
      get type() {
        return ($el: JQuery<HTMLElement>) => (this.name($el) === pageTitle ? 'Property' : 'Value')
      },
    },
  ],

  remove: [
    $('button.sidebar-button, .article-actions-container .article-actions'),
    $('article.main-page-content h1 > span'),
  ],

  styles: () => `
    .main-wrapper {
      grid-template-areas: 'main' !important;
      grid-template-columns: minmax(0, 80ch) !important;
      padding-left: 2rem !important;
    }
  `,
}).process()

$('lazy-compat-table').replaceWith(
  `<p>
     Unavailable in Dash.
     Press <kbd>⌘</kbd><kbd>⇧</kbd><kbd>B</kbd> to open the page in your browser.
  </p>`,
)
