export interface Config {
  /** The main content that should remain visible. */
  visible: string

  /** Navigation elements needed for scraping links. */
  navigation: string

  pageType: EntryTypeConfig & { hash?: never }
  entryTypes: EntryTypeConfig[]

  styles?: (selectors: DocsetProcessor['elementSelectors']) => string | void

  /** Elements that should be removed. */
  remove?: JQuery<HTMLElement>[]
  removeAllHiddenContent?: boolean
}

export interface EntryTypeConfig {
  type:
    | dashDoc.AddEntryOptions['type']
    | (($el: JQuery<HTMLElement>) => dashDoc.AddEntryOptions['type'])
  entries: JQuery<HTMLElement>
  name?: string | (($el: JQuery<HTMLElement>) => string)
  hash?: string | (($el: JQuery<HTMLElement>) => string | undefined)
}

export class DocsetProcessor {
  #settings: Required<Config>

  constructor(config: Config) {
    this.#settings = {
      ...config,
      remove: config.remove ?? [],
      styles: config.styles ?? (() => {}),
      removeAllHiddenContent: config.removeAllHiddenContent ?? false,
    }

    if (this.#settings.removeAllHiddenContent) {
      this.#settings.remove.unshift($(this.elementSelectors.not.preserved))
    }
  }

  get elementSelectors() {
    const config = this.#settings
    return {
      mainContent: config.visible.split(',')[0],
      navigation: config.navigation,
      preserved: {
        elements: `:is(${[config.visible, config.navigation].join(',')})`,
        get children() {
          return `${this.elements} *`
        },
        get parents() {
          return `:has(${this.elements})`
        },
      },
      visible: {
        elements: `:is(${config.visible})`,
        get children() {
          return `${this.elements} *`
        },
        get parents() {
          return `:has(${this.elements})`
        },
      },
      get not() {
        return {
          preserved: `body *:not(${this.preserved.elements}):not(${this.preserved.children}):not(${this.preserved.parents})`,
          visible: `body *:not(${this.visible.elements}):not(${this.visible.children}):not(${this.visible.parents})`,
        }
      },
    }
  }

  process() {
    this.catalogEntries()
    this.removeElements()
    this.addStyles()
  }

  catalogEntries() {
    const entryTypes = [this.#settings.pageType, ...this.#settings.entryTypes]

    entryTypes.forEach(
      ({
        entries,
        type,
        name = DocsetProcessor.getEntryName,
        hash = DocsetProcessor.getEntryHash,
      }) => {
        entries.each((_index, entry) => {
          const $entry = $(entry)

          dashDoc.addEntry({
            name: typeof name === 'string' ? name : name($entry),
            type: typeof type === 'string' ? type : type($entry),
            hash: typeof hash === 'string' ? hash : hash($entry),
          })
        })
      },
    )
  }

  static getEntryName($el: JQuery<HTMLElement>) {
    return $el.text().trim()
  }

  static getEntryHash($el: JQuery<HTMLElement>) {
    const hash = $el.attr('id') ?? DocsetProcessor.getEntryName($el).replace(/\W/g, '-')
    $el.attr('id', hash)
    return hash
  }

  removeElements() {
    this.#settings.remove.forEach(($el) => $el.remove())
  }

  addStyles() {
    const { visible, mainContent, not } = this.elementSelectors

    $('body').append(
      $(`
      <style>
        ${mainContent} {
          padding: 1lh !important;
          max-width: unset !important;
          min-height: unset !important;
        }
        ${visible.parents} {
          display: contents !important;
          overflow: unset !important;
        }
        ${not.visible} {
          all: unset !important;
          display: none !important;
        }
        ${this.#settings.styles(this.elementSelectors)}
      </style>
      `),
    )
  }
}
