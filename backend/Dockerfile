FROM node:14-alpine AS builder
WORKDIR /usr/partner-app/backend
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn
COPY . .

FROM node:14-alpine
WORKDIR /usr/partner-app/backend
COPY --from=builder /usr/partner-app/backend ./
CMD ["yarn", "start:dev"]