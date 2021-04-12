FROM node:15.14.0-alpine as development
ENV NODE_ENV=development

WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "npm", "start" ]

FROM node:15.14.0-alpine as builder
ENV NODE_ENV=production
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
RUN npm run build

FROM node:15.14.0-alpine as production
ENV NODE_ENV=production
RUN mkdir /build
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /code/build /build
CMD node build/index.js