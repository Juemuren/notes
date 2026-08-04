#!/bin/bash

MARKS="(?:strong|em|code|del)"
TAGS="<$MARKS>.*?</$MARKS>"
CHARS="[^\s\p{P}\p{S}]"
PATTERN="$CHARS$TAGS|$TAGS$CHARS"

fd -e md --search-path docs -x sh -c "
  if pandoc '{}' -t html --mathjax | rg --color=always '$PATTERN'; then
    echo '[ERROR] {}'
  fi
"

# auto-correct 会重新排版，谨慎使用
# fd -e md --search-path docs -x sh -c "
#   pandoc '{}' -t html --mathjax |
#   sd '($CHARS)($TAGS)' '\$1 \$2' |
#   sd '($TAGS)($CHARS)' '\$1 \$2' |
#   pandoc -f html -t markdown -o '{.}.tmp'
#   mv '{.}.tmp' '{}'
# "
