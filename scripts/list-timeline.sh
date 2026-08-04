#!/bin/sh

# shellcheck disable=SC2016
fd -e md --search-path docs -x sh -c '
  printf "%s %s\n" "$(git log -1 --format=%cs -- {})" {}
' |
sort
