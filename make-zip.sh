#!/usr/bin/env bash
set -euo pipefail
mkdir -p artifacts
zip_path="artifacts/NovaSurf.zip"
rm -f "$zip_path"
zip -r "$zip_path" . \
  -x ".git/*" \
  -x "node_modules/*" \
  -x "dist/*" \
  -x "artifacts/*"
echo "Created $zip_path"
