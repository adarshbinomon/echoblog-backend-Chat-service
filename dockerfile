FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD ["nodemon", "src/index.ts", "--exec", "ts-node"]
