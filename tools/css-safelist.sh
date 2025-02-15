#!/usr/bin/env bash

grep -o '\.chroma \.\w\+' "$1" | sed 's/\.chroma \.//' | sed "s/^/'/" | sed "s/$/'/" | tr '\n' ', ' | sed 's/, $/,  /' | awk '{print "[" $0 "]"}'