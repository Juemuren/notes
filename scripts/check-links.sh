#!/bin/bash

path=$1

LINKS="\[[^]]+\]\([^)]+\)"
CHARS="[^\s\p{P}\p{S}]"
PATTERN="$CHARS$LINKS|$LINKS$CHARS"

fd -e md --search-path "$path" -X \
  rg "$PATTERN"

exit 0
