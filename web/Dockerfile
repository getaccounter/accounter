FROM node:14.13.0-alpine as development
ENV PORT=3000
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . /code/
CMD [ "npm", "start" ]

FROM node:14.13.0-alpine as builder
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
RUN npm run build

FROM node:14.13.0-alpine as production
ENV PORT=3000
RUN mkdir /build
COPY --from=builder /code/build /build
CMD npx serve@11.3.2 -n -p $PORT build
