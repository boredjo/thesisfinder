#Using python
FROM python:3.9-slim
# Using Layered approach for the installation of requirements
COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
#Copy files to your container
COPY ./database ./database
COPY ./src ./src
COPY ./assets ./assets
COPY ./documentation/build ./documentation/build 
#Running your APP and doing some PORT Forwarding
WORKDIR /src

ENV PYTHONUNBUFFERED True
CMD ["gunicorn", "--enable-stdio-inheritance", "--bind",  "0.0.0.0:3000", "app:app"]