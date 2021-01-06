FROM node:15.5.1-alpine as development
RUN apk update && apk add bash
ENV PORT=3000
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . /code/
# Temporary, until heroicons library is stable and transpiled
RUN cp -R node_modules/heroicons/react/ src/components/icons
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD [ "npm", "start" ]