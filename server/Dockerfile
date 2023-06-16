FROM node

WORKDIR /app

COPY package*.json .

RUN npm install ci

RUN mkdir /host

COPY . .

CMD ["node", "api.js"]
