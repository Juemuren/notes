#!/bin/bash

LINKS="\[[^]]+\]\([^)]+\)"
CHARS="[^\s\p{P}\p{S}]"
PATTERN="$CHARS$LINKS|$LINKS$CHARS"

fd -e md --search-path docs -X rg "$PATTERN"

exit 0

# auto-correct
# fd -e md --search-path docs \
#   -x sd "($CHARS)($LINKS)" "\$1 \$2" "{}" \;\
#   -x sd "($LINKS)($CHARS)" "\$1 \$2" "{}"
