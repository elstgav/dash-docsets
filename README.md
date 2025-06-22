# Dash Docsets

Custom Dash docset scripts for various JavaScript libraries and tools.

- [Dash](https://kapeli.com/dash) is a documentation browser for macOS.
  - [Docset Generation](https://kapeli.com/docsets)
  - [Supported Entry Types](https://kapeli.com/docsets#supportedentrytypes)

## Development Setup

To setup the project, install dependencies:

```sh
pnpm install
```

### Building Docset Scripts

Build standalone JavaScript files for each docset:

```sh
pnpm build
```

This generates standalone files in the `build/` directory that can be copied and pasted directly into Dash’s custom index field.

### Development Commands

- `pnpm build` - Build all docset scripts as standalone files
- `pnpm check` - Run all checks (code, format, types)
- `pnpm fix` - Auto-fix formatting and linting issues
- `pnpm copy-icons` - Copy icons from `./icons` to Dash docsets

## Using Docsets in Dash

Once the docsets are built, you can use them in Dash by following the instructions below:

### Installation

1. Open `Dash Settings` > `Downloads` > `Docset Generator` > `Create a new docset`
2. Select `Download website` as the source
3. Website download settings:  
   _(copied from the docset's TypeScript file comments)_

   | Field                   | Value       |
   | :---------------------- | :---------- |
   | Website URL             | `@URL`      |
   | Download pages matching | `@Download` |
   | Ignore pages matching   | `@Ignore`   |

4. Enter Docset name and keyword
5. Choose `Custom index` and paste the contents from the corresponding file in `build/`
6. Save and click `Generate`

### Custom Icons

Dash will automatically use a site’s favicon as the docset icon. To override this, you can:

1. Place custom icons in the `icons/` directory with the structure:

   ```
   icons/
     docset-name/
       icon.tiff
   ```

2. Then run:

   ```sh
   pnpm copy-icons
   ```

This will automatically copy icons to the appropriate Dash docset directories.

### Updating Docsets

You can periodically update by right-clicking the docset in Dash and selecting “Update Docset”.
