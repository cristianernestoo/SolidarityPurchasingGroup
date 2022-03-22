FROM node:14.18

LABEL version="1.0"

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/
COPY ./client/package-lock.json ./client/
COPY ./server/package-lock.json ./server/

WORKDIR /app/client

RUN npm install && \
    npm rebuild bcrypt --build-from-source

WORKDIR /app/server

RUN npm install 

WORKDIR /app

COPY . .

EXPOSE 3000

WORKDIR /app/server

CMD ["./run.sh"]

