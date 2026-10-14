#!/usr/bin/env bash
# Genera dist/: la demo lista para publicar en cualquier hosting estático
# (web pública como index.html + Portal + Mi Auto). Sin dependencias.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
rm -rf "$DIST"; mkdir -p "$DIST"

# Web pública → index.html (y una copia con el nombre antiguo para no romper enlaces)
cp "$ROOT/gallo-autos-demo.html" "$DIST/index.html"
cp "$ROOT/gallo-autos-demo.html" "$DIST/gallo-autos-demo.html"

# Portal (intranet) y Mi Auto, sin archivos de sistema
rsync -a --exclude '.DS_Store' "$ROOT/intranet" "$DIST/"
rsync -a --exclude '.DS_Store' "$ROOT/miauto" "$DIST/"

# Los enlaces "Volver a la web" apuntan a la raíz del sitio
grep -rl 'gallo-autos-demo.html' "$DIST/intranet" "$DIST/miauto" | while read -r f; do
  sed -i.bak 's#\.\./gallo-autos-demo\.html#../index.html#g' "$f" && rm -f "$f.bak"
done

# Ícono por defecto del sitio (los navegadores piden /favicon.ico)
cp "$ROOT/miauto/img/icon-192.png" "$DIST/favicon.ico"

echo "Listo: $DIST"
find "$DIST" -type f | sed "s#$DIST/##" | sort
du -sh "$DIST"
