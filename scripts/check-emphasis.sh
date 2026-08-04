#!/bin/bash

path=$1

MARKS="(?:strong|em|code|del)"
TAGS="<$MARKS>.*?</$MARKS>"
CHARS="[^\s\p{P}\p{S}]"
PATTERN="$CHARS$TAGS|$TAGS$CHARS"

fd -e html --search-path "$path" -X \
  rg "$PATTERN"

exit 0
