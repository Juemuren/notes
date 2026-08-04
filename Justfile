[default]
default:
    @just --list

check:
    autocorrect docs --lint
    rumdl check docs

spell-check:
    typos docs
    cspell lint docs

ocd-check:
    ./scripts/check-alerts.sh
    ./scripts/check-emphasis.sh
    ./scripts/check-links.sh
    ./scripts/check-spaces.sh

lint-sh:
    shellcheck scripts/*.sh

fmt-sh:
    fd -e sh -x \
        shfmt --indent 4 --space-redirects --binary-next-line --write

count sort="":
    ./scripts/count-words.sh {{ sort }}

timeline:
    ./scripts/list-timeline.sh
