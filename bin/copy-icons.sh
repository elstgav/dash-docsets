#!/bin/bash

# Copy icons from ./icons to Dash docset locations
# Usage: ./bin/copy-icons.sh

ICONS_DIR="./icons"
DASH_DIR="$HOME/Library/Application Support/Dash/Docset Generator"

if [ ! -d "$ICONS_DIR" ]; then
  echo "Error: Icons directory $ICONS_DIR not found"
  exit 1
fi

if [ ! -d "$DASH_DIR" ]; then
  echo "Error: Dash docset directory $DASH_DIR not found"
  exit 1
fi

echo "Copying icons from $ICONS_DIR to Dash docsets…"

for icon_dir in "$ICONS_DIR"/*; do
  if [ -d "$icon_dir" ]; then
    docset_name=$(basename "$icon_dir")
    icon_file="$icon_dir/icon.tiff"

    if [ -f "$icon_file" ]; then
      # Find matching docset directory (case-insensitive)
      docset_path=$(find "$DASH_DIR" -type d -iname "*$docset_name*.docset" | head -1)

      if [ -n "$docset_path" ]; then
        target_icon="$docset_path/icon.tiff"
        echo "Copying $icon_file -> $target_icon"
        cp "$icon_file" "$target_icon"
      else
        echo "Warning: No matching docset found for $docset_name"
      fi
    else
      echo "Warning: No icon.tiff found in $icon_dir"
    fi
  fi
done

echo "Icon copying complete!"
