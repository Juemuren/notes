#!/bin/bash

set -e

path=$1

LETTERS="[A-Za-z]+"
ALERTS="(tip|note|warning)"
RULES=(
  "\[!$LETTERS\][-+]+"
  "\[!$LETTERS\]\s*$"
  "\[!(?!$ALERTS\])$LETTERS\]"
)

for pattern in "${RULES[@]}"; do
  if rg -P "$pattern" "$path"; then
    echo "[ERROR] $pattern"
    exit 1
  fi
done

exit 0
