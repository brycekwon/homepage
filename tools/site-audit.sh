#!/usr/bin/env bash

set -uo pipefail

HUGO_MINIFY_TDEWOLFF_HTML_KEEPCOMMENTS=true
HUGO_ENABLEMISSINGTRANSLATIONPLACEHOLDERS=true

if hugo --gc --cleanDestinationDir; then
    grep -inorE "<\!-- raw HTML omitted -->|ZgotmplZ|\[i18n\]|\(\)|(<nil>)|hahahugo" public/**/*.html > hugo_audit.log; RET=$?
    if [ "$RET" == "1" ]; then
        echo "=> audit passed"
        exit 0
    fi

    echo "=> audit failed"
    exit 1
else
    echo "=> site failed to build"
    exit 1
fi