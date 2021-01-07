FROM nginx:1.19.2-alpine
RUN apk update && apk add bash

COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /
COPY wait-for-it.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]