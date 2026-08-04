SOURCE := 'src/content/docs'
TARGET := 'dist'

[default]
default:
    @just --list

lint:
    rumdl check "{{ SOURCE }}" --no-cache

format:
    dprint fmt

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
    shellcheck scripts/*.sh

fmt-sh:
    fd -e sh -x \
        shfmt --indent 2 --space-redirects --binary-next-line --write
