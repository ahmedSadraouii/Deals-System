FROM node:18-alpine as builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:18-alpine as runner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
RUN yarn --link-duplicates --production=true
EXPOSE 4420
ENTRYPOINT ["yarn", "start"]