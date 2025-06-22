// es-toolkit
// https://es-toolkit.dev
//
// @URL:      https://es-toolkit.dev/intro.html
// @Download: https://es-toolkit.dev/reference/*
// @Ignore:   */compat/* (unless you’re using `es-toolkit/compat`)

import { DocsetProcessor } from '@/DocsetProcessor'

new DocsetProcessor({
  visible: '.VPDoc > .container > .content, aside.VPSidebar',
  navigation: 'aside.VPSidebar',

  pageType: {
    entries: $('main h1').first(),
    type: () => {
      if (location.pathname.includes('/error/')) return 'Error'

      return 'Method'
    },
  },

  entryTypes: [
    {
      entries: $('.VPSidebar .level-1.has-active .item h3').first(),
      type: 'Category',
    },
    {
      entries: $('main h2'),
      type: 'Section',
    },
    // {
    //   entries: $('#parameters + ul li > code:first-of-type'),
    //   type: 'Parameter',
    // },
  ],

  remove: [
    $('nav.prev-next'),
    $('#VPSidebarNav .group:has(.item h2:contains(Guide))'),
    $('#VPSidebarNav .item:has(h2:contains(Reference))'),
    $('#VPSidebarNav .VPSidebarItem.level-2:has(> .item a[href*="/compat/"])'),
  ],
  removeAllHiddenContent: true,
}).process()
