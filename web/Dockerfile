FROM node:15.3.0-alpine as development
RUN apk update && apk add bash
ENV PORT=3000
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . /code/
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD [ "npm", "start" ]

FROM node:15.3.0-alpine as builder
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
RUN npm run build

FROM node:15.3.0-alpine as production
RUN apk update && apk add bash
ENV PORT=3000
RUN mkdir /build
COPY --from=builder /code/build /build
COPY docker-entrypoint.sh /
COPY wait-for-it.sh /
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD npx serve@11.3.2 -n -p $PORT build
