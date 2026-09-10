#!/bin/sh

path=$1

# shellcheck disable=SC2016
fd -e md -e mdx --search-path "$path" \
  -x git log --max-count=1 --format='%cs {}' -- {} \
  | sort
