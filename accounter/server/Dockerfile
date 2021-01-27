FROM python:3.9.1 as development
ENV PYTHONUNBUFFERED True
ENV PORT=8000
ENV DEBUG=True

RUN mkdir /code
WORKDIR /code
COPY /requirements /code/requirements
RUN pip install -r requirements/development.txt
COPY . /code/
ENTRYPOINT ["./docker-entrypoint.development.sh"]
CMD python manage.py runserver 0.0.0.0:$PORT

FROM python:3.9.1 as production
ENV PYTHONUNBUFFERED True
ENV PORT=8000
ENV DEBUG=False
RUN mkdir /code
WORKDIR /code
COPY --from=development /code/requirements /code/requirements
RUN pip install -r requirements/production.txt
RUN pip install daphne
COPY --from=development /code /code
WORKDIR /code
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD daphne -b 0.0.0.0 -p $PORT config.asgi:application
