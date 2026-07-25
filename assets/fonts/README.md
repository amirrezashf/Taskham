# Fonts

This public repository intentionally does not include the local Dana,
IRANSans, or Peyda font packages that may exist in a developer's working copy.

The IRANSans and Peyda license files in the original workspace identify those
fonts as proprietary and do not contain a valid redistribution license code.
To keep the public repository safe to clone and redistribute, all local font
files are ignored by Git.

The app works with its CSS fallback font stack. If you have the appropriate
license for a font, add it locally under `assets/fonts/` and provide the
corresponding `@font-face` rules in your own deployment. Do not commit or
redistribute proprietary font files without permission from their licensors.
