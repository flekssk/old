FROM node:17-alpine
WORKDIR /app
COPY . .

RUN apk add git
RUN npm install

RUN yarn install
RUN yarn dev
RUN yarn build

