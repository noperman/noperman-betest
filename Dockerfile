FROM node:16.13.1

WORKDIR /ms-noperman-betest

COPY package.json .
RUN npm install

COPY . ./

ENV PORT 3000
EXPOSE $PORT

CMD ["npm","run","start"]