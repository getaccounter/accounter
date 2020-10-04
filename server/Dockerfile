FROM python:3.8.6
ENV PYTHONUNBUFFERED=1
ENV PORT=3000
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
CMD python manage.py runserver 0.0.0.0:$PORT