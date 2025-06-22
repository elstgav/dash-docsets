import type { JQueryStatic } from 'jquery'

declare global {
  const $: JQueryStatic

  namespace dashDoc {
    interface AddEntryOptions {
      name: string
      hash?: string

      /** https://kapeli.com/docsets#supportedentrytypes */
      type:
        | 'Annotation'
        | 'Attribute'
        | 'Binding'
        | 'Builtin'
        | 'Callback'
        | 'Category'
        | 'Class'
        | 'Command'
        | 'Component'
        | 'Constant'
        | 'Constructor'
        | 'Define'
        | 'Delegate'
        | 'Diagram'
        | 'Directive'
        | 'Element'
        | 'Entry'
        | 'Enum'
        | 'Environment'
        | 'Error'
        | 'Event'
        | 'Exception'
        | 'Extension'
        | 'Field'
        | 'File'
        | 'Filter'
        | 'Framework'
        | 'Function'
        | 'Global'
        | 'Guide'
        | 'Hook'
        | 'Instance'
        | 'Instruction'
        | 'Interface'
        | 'Keyword'
        | 'Library'
        | 'Literal'
        | 'Macro'
        | 'Method'
        | 'Mixin'
        | 'Modifier'
        | 'Module'
        | 'Namespace'
        | 'Notation'
        | 'Object'
        | 'Operator'
        | 'Option'
        | 'Package'
        | 'Parameter'
        | 'Plugin'
        | 'Procedure'
        | 'Property'
        | 'Protocol'
        | 'Provider'
        | 'Provisioner'
        | 'Query'
        | 'Record'
        | 'Resource'
        | 'Sample'
        | 'Section'
        | 'Service'
        | 'Setting'
        | 'Shortcut'
        | 'Statement'
        | 'Struct'
        | 'Style'
        | 'Subroutine'
        | 'Tag'
        | 'Test'
        | 'Trait'
        | 'Type'
        | 'Union'
        | 'Value'
        | 'Variable'
        | 'Word'
    }

    function addEntry(options: AddEntryOptions): void
  }

  namespace DocsetProcessing {
    interface Config {
      /** The main content that should remain visible. */
      visible: string

      /** Navigation elements needed for scraping links. */
      navigation: string

      pageType: Omit<EntryTypeConfig, 'hash'>
      entryTypes: EntryTypeConfig[]

      /** Elements that should be removed. */
      remove?: JQuery<HTMLElement>[]
    }

    interface EntryTypeConfig {
      type:
        | dashDoc.AddEntryOptions['type']
        | (($el: JQuery<HTMLElement>) => dashDoc.AddEntryOptions['type'])
      entries: JQuery<HTMLElement> | (() => JQuery<HTMLElement>)
      name?: string | (($el: JQuery<HTMLElement>) => string)
      hash?: string | (($el: JQuery<HTMLElement>) => string | undefined)
    }
  }
}
