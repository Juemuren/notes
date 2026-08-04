#!/bin/sh

case "$1" in
  "line")
    key=1;;
  "word")
    key=2;;
  "char")
    key=3;;
esac

if [ -z "$key" ]; then
  fd -e md --search-path docs -X wc
else
  fd -e md --search-path docs -X wc |
  sort -k "$key"
fi
