#Using python
FROM python:3.9-slim
# add new user
RUN adduser --system --no-create-home thesisfinder
# copy files
WORKDIR /thesisfinder
COPY . .
RUN mkdir /thesisfinder/database
# install pip packages
RUN python3 -m pip install -r requirements.txt
# set workdir
WORKDIR src

# pass api version
ARG version
ENV API_VERSION $version
ENV PYTHONUNBUFFERED True
ENV REBASE False

RUN chown -R thesisfinder /thesisfinder
USER thesisfinder
CMD ["gunicorn", "--enable-stdio-inheritance", "--bind",  "0.0.0.0:3000", "app:app"]