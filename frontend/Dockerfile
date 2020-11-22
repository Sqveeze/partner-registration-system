FROM node:14-alpine AS builder
WORKDIR /usr/partner-app/frontend
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn
RUN yarn global add react-scripts@4.0.0
COPY . .

FROM node:14-alpine
WORKDIR /usr/partner-app/frontend
COPY --from=builder /usr/partner-app/frontend ./
CMD ["yarn", "start"]