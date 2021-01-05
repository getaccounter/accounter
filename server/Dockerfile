FROM python:3.9.1 as development
ENV PYTHONUNBUFFERED True
ENV PORT=8000
ENV DEBUG=True
# installing node for pyright - not ideal, pero bueno
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs
# should probably be moved to a package.json so dependabot can update it
RUN npm install -g pyright@1.1.85

RUN mkdir /code
WORKDIR /code
COPY /requirements /code/requirements
RUN pip install -r requirements/development.txt
COPY . /code/

ENV HTTP_PROXY=mockserver:1080
ENV HTTPS_PROXY=mockserver:1080
ENV USE_MOCK_PROXY=True

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD python manage.py runserver 0.0.0.0:$PORT