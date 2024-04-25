FROM node:latest

COPY package.json  /home/fravebot/web-dev/frontend/package.json

WORKDIR /home/fravebot/web-dev/frontend

RUN npm install

ADD . /home/fravebot/web-dev/frontend

EXPOSE 3000

CMD ["npm", "start"]
