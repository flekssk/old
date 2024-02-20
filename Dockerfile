FROM node:17-alpine
WORKDIR /app
COPY . .

RUN apk add git
RUN npm install

EXPOSE 5173

CMD npm run dev -- --host 