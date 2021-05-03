FROM mcr.microsoft.com/playwright:v1.9.2

RUN mkdir /code
WORKDIR /code

COPY package*.json ./
RUN npm ci

COPY docker-entrypoint.sh /
COPY wait-for-it.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "t"]
