#!/bin/sh

fd -e md --search-path docs -X rg "[^\s|]  [^\s#|]"

exit 0
