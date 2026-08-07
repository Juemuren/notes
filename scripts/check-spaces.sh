#!/bin/sh

path=$1

BEFORE_SPACE="|"
AFTER_SPACE="#|"

fd -e md -e mdx --search-path "$path" \
  -X rg "[^\s$BEFORE_SPACE]  [^\s$AFTER_SPACE]"

exit 0
