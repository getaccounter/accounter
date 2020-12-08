FROM cypress/included:6.1.0

COPY package*.json ./
RUN npm ci

COPY docker-entrypoint.sh /
COPY wait-for-it.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["cypress", "run"]