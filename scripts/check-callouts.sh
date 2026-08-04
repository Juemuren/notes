#!/bin/bash

set -e

path=$1

LETTERS="[A-Za-z]+"
CALLOUTS="(tip|note|caution)"
RULES=(
  "\[!$LETTERS\][-+]+"
  "\[!$LETTERS\]\s*$"
  "\[!(?!$CALLOUTS\])$LETTERS\]"
)

for pattern in "${RULES[@]}"; do
  if rg -P "$pattern" "$path"; then
    echo "[ERROR] $pattern"
    exit 1
  fi
done

exit 0
