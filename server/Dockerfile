FROM python:3.8.6 as development
ENV PYTHONUNBUFFERED=1
ENV PORT=8000
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install --user -r requirements.txt
COPY . /code/
CMD python manage.py runserver 0.0.0.0:$PORT

FROM python:3.8.6 as production
ENV PORT=3000
COPY --from=development /root/.local /root/.local
RUN python -m pip install daphne
RUN mkdir /code
WORKDIR /code
COPY --from=development /code /code
CMD daphne -b 0.0.0.0 -p $PORT accounter.asgi:application
