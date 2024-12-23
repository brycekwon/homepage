FROM hugomods/hugo:reg-base-0.139.4 AS builder

WORKDIR /src

COPY archetypes/ archetypes/
COPY assets/ assets/
COPY content/ content/
COPY layouts/ layouts/
COPY static/ static/
COPY hugo.yml hugo.yml

RUN hugo

FROM nginx:1.27-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/public /usr/share/nginx/html

ENV PORT=1313

EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
