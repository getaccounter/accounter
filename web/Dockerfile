FROM node:12.18.4
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . /code/
EXPOSE 3000
CMD [ "npm", "start" ]