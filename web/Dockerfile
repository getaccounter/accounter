FROM node:14.11.0
RUN mkdir /code
WORKDIR /code
COPY package*.json ./
RUN npm ci
COPY . /code/
EXPOSE 3000
CMD [ "npm", "start" ]