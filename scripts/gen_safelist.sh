#!/usr/bin/env bash

input_file="$1"

grep -o '\.chroma \.\w\+' "$input_file" | sed 's/\.chroma \.//' | sed "s/^/'/" | sed "s/$/'/" | tr '\n' ', ' | sed 's/, $/,  /' | awk '{print "[" $0 "]"}'