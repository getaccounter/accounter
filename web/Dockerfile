FROM node:14.12.0 as development
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . /code/
EXPOSE 3000
CMD [ "npm", "start" ]

FROM node:14.12.0 as builder
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
RUN npm run build

FROM node:14.12.0 as production
RUN mkdir /build
COPY --from=builder /code/build /build
EXPOSE 3000
CMD npx serve@11.3.2 -n -p 3000 build
