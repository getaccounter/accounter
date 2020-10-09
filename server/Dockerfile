FROM python:3.9.0 as development
ENV PYTHONUNBUFFERED=1
ENV PORT=8000
RUN mkdir /code
WORKDIR /code
COPY /requirements /code/requirements
RUN pip install -r requirements/development.txt
RUN pip install -r requirements/base.txt 
COPY . /code/
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD python manage.py runserver 0.0.0.0:$PORT