#!/bin/sh

path=$1
sort=$2

if [ -z "$sort" ]; then
  fd -e md -e mdx --search-path "$path" \
    -X wc
else
  fd -e md -e mdx --search-path "$path" \
    -X wc "--$sort" \
    | sort
fi
