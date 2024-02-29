FROM node:18-alpine
WORKDIR /app
COPY . .

RUN apk add git
RUN npm install

RUN yarn install
RUN yarn build

