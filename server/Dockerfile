FROM python:3.9.0 as development
ENV PYTHONUNBUFFERED True
ENV PORT=8000
RUN mkdir /code
WORKDIR /code
COPY /requirements /code/requirements
# installed as a user, as it is easier to copy to the next build stage
RUN pip install -r requirements/development.txt
RUN pip install --user -r requirements/base.txt 
COPY . /code/
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD python manage.py runserver 0.0.0.0:$PORT

FROM python:3.9.0 as production
ENV PYTHONUNBUFFERED True
ENV PORT=8000
COPY --from=development /root/.local /root/.local
RUN python -m pip install daphne
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
# temp install
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD daphne -b 0.0.0.0 -p $PORT accounter.asgi:application
