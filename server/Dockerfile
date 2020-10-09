FROM python:3.9.0 as development
ENV PYTHONUNBUFFERED True
ENV PORT=8000
RUN mkdir /code
WORKDIR /code
COPY /requirements /code/requirements
RUN pip install -r requirements/base.txt 
RUN pip install -r requirements/development.txt
COPY . /code/
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD python manage.py runserver 0.0.0.0:$PORT

FROM python:3.9.0 as production
ENV PYTHONUNBUFFERED True
ENV PORT=8000
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
RUN pip install -r requirements/base.txt 
RUN pip install daphne
WORKDIR /code
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD daphne -b 0.0.0.0 -p $PORT accounter.asgi:application
