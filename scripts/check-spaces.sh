#!/bin/sh

path=$1

fd -e md --search-path "$path" -X \
  rg "[^\s|]  [^\s#|]"

exit 0
