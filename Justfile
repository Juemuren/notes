SOURCE := 'src/content/docs'
TARGET := 'dist'

[default]
default:
    @just --list

lint:
    rumdl check "{{ SOURCE }}" --no-cache

format:
    dprint fmt

check: spell-check punctuation-check ocd-check

spell-check:
    typos "{{ SOURCE }}"

punctuation-check:
    autocorrect "{{ SOURCE }}" --lint

ocd-check:
    ./scripts/check-callouts.sh "{{ SOURCE }}"
    ./scripts/check-links.sh "{{ SOURCE }}"
    ./scripts/check-spaces.sh "{{ SOURCE }}"
    ./scripts/check-emphasis.sh "{{ TARGET }}"

lint-sh:
    fd -e sh \
        -x shellcheck

fmt-sh:
    fd -e sh \
        -x shfmt --indent 2 --space-redirects --binary-next-line --write

count-words sort="":
    ./scripts/count-words.sh "{{ SOURCE }}" {{ sort }}

list-timeline:
    ./scripts/list-timeline.sh "{{ SOURCE }}"
