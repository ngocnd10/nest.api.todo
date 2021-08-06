FROM node:14 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:14

WORKDIR /app
COPY --from=builder /app ./

CMD ["npm", "run", "start:prod"]
