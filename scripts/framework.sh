#!/bin/bash
TEMPORARY_DIR=$1

### FUNCTIONS
function paint () {
    # Colors https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
    tput setaf $2 && printf '%s' "$1" && tput sgr0
}

function yellow () {
    paint $1 221
}

function green () {
    paint $1 112
}

function red () {
    paint $1 161
}

function mark () {
    paint $1 159
}

GOOD=$(green )
WARN=$(yellow )
FAIL=$(red )

#TEMPORARY

function create_temporary_dir () {
    mkdir -p $TEMPORARY_DIR >/dev/null
    echo "$GOOD $(yellow 󱂀) Create temporary directory $(mark $TEMPORARY_DIR)."
}

function clear_temporary_dir () {
    rm -rf $TEMPORARY_DIR >/dev/null
    echo "$GOOD $(yellow 󱂀) Clear temporary directory $(mark $TEMPORARY_DIR)."
}

# PREPARE
[[ -d $TEMPORARY_DIR ]] && clear_temporary_dir

create_temporary_dir

