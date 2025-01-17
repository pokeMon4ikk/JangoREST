from python:3.8.6

RUN apt-get update && apt-get install -y postgresql postgresql-contrib libpq-dev python3-dev

RUN pip3 install --upgrade pip
COPY ./library/ ./

RUN pip3 install -r requirements.txt
COPY wait-for-postgres.sh .

RUN chmod +x wait-for-postgres.sh

RUN pip3 install gunicorn