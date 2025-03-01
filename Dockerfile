###############################################################################
# Hugo Website Build                                                          #
###############################################################################
FROM docker.io/hugomods/hugo:node-non-root-0.143.0 AS builder

# avoid running as root
USER hugo
WORKDIR /usr/share/hugo

# set build environment to production
ENV NODE_ENV=production
ENV HUGO_ENVIRONMENT=production

# copy and install npm packages
COPY --chown=hugo:hugo package.json ./package.json
COPY --chown=hugo:hugo package-lock.json ./package-lock.json
RUN npm ci --omit=dev

# copy postcss configuration
COPY --chown=hugo:hugo ./postcss.config.js ./postcss.config.js

# copy hugo configuration
COPY --chown=hugo:hugo ./config ./config

# copy source files, ordered from most to least often changed to take
# advantage of Docker's built-in caching.
COPY --chown=hugo:hugo ./static ./static
COPY --chown=hugo:hugo ./assets ./assets
COPY --chown=hugo:hugo ./layouts ./layouts
# COPY    --chown=hugo:hugo   ./data      ./data    # currently unused
# COPY    --chown=hugo:hugo   ./i18n      ./i18n    # currently unused
COPY --chown=hugo:hugo ./content ./content

# build website
RUN npm run gen

###############################################################################
# Nginx Website Hosting                                                       #
###############################################################################
FROM docker.io/nginx:1.27.3-alpine-slim

# install curl for running healthchecks
RUN apk update && apk add --no-cache curl && rm -rf /var/cache/apk/*

# copy nginx configuration
COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/nginx.conf

# copy website build content
COPY --chown=nginx:nginx --from=builder /usr/share/hugo/public /usr/share/nginx/html

# start nginx in background
CMD ["nginx", "-g", "daemon off;"]
