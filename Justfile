NOTES_ROOT := 'src/content/docs'

[default]
default:
    @just --list

check:
    rumdl check "{{ NOTES_ROOT }}" --no-cache

spell-check:
    typos "{{ NOTES_ROOT }}"

punctuation-check:
    autocorrect "{{ NOTES_ROOT }}" --lint

ocd-check:
    ./scripts/check-callouts.sh "{{ NOTES_ROOT }}"
    ./scripts/check-links.sh "{{ NOTES_ROOT }}"
    ./scripts/check-spaces.sh "{{ NOTES_ROOT }}"

lint-sh:
    shellcheck scripts/*.sh

fmt-sh:
    fd -e sh -x \
        shfmt --indent 2 --space-redirects --binary-next-line --write
