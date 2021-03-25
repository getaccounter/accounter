FROM node:15.12.0-alpine as development
ENV PORT=3000
RUN apk add --no-cache bash

RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . /code/
COPY shared-graphql /code/shared-graphql
# Temporary, until heroicons library is stable and transpiled
RUN cp -R node_modules/heroicons/react/ src/components/icons
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD [ "npm", "start" ]

FROM node:15.12.0-alpine as builder
ENV REACT_APP_VERSION="VERSION_DO_REPLACE_ME_BEFORE_DEPLOY"
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
RUN npm run build

FROM node:15.12.0-alpine as production
ENV PORT=3000
RUN apk add --no-cache bash
RUN mkdir /build
COPY --from=builder /code/build /build
COPY docker-entrypoint.sh /
COPY wait-for-it.sh /
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD npx serve@11.3.2 -n -p $PORT -s build
