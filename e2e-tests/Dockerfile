FROM cypress/included:5.5.0

COPY package*.json ./
RUN npm ci

COPY docker-entrypoint.sh /
COPY wait-for-it.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["cypress", "run"]