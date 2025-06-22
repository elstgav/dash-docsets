# Dash Docsets

Custom Dash docset scripts for various JavaScript libraries and tools.

- [Dash](https://kapeli.com/dash) is a documentation browser for macOS.
  - [Docset Generation](https://kapeli.com/docsets)
  - [Supported Entry Types](https://kapeli.com/docsets#supportedentrytypes)

# Installation

1. Open `Dash Settings` > `Downloads` > `Docset Generator` > `Create a new docset`
2. Select `Download website` as the source
3. Website download settings:  
   _(copied from the docset’s `docset-name.js` file comment)_

   | Field                   | Value       |
   | :---------------------- | :---------- |
   | Website URL             | `@URL`      |
   | Download pages matching | `@Download` |
   | Ignore pages matching   | `@Ignore`   |

4. Enter Docset name and keyword
5. Choose `Custom index` and paste from `docset-name.js`
6. Paste custom CSS (if applicable) from `docset-name.css`
7. Save and click `Generate`

### Updating

You can periodically update by right-clicking the docset in Dash and selecting “Update Docset”.
