#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

grep -o '\.chroma \.\w\+' "$1" | \
    sed 's/\.chroma \.//' | \
    sed "s/^/'/" | \
    sed "s/$/'/" | \
    tr '\n' ', ' | \
    sed 's/, $/,  /' | \
    awk '{print "[" $0 "]"}'
