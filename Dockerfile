FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune customerweb --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --update libc6-compat openjdk11 && \
    rm -rf /var/cache/apk/*
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
ENV NEXT_TELEMETRY_DISABLED 1
ENV TURBO_TELEMETRY_DISABLED 1
# build the actual app
COPY --from=builder /app/.openapi-generator-cli/ ./.openapi-generator-cli
RUN ls -la ./.openapi-generator-cli
RUN yarn dlx turbo run build --filter=customerweb...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
ENV NEXT_TELEMETRY_DISABLED 1
ENV TURBO_TELEMETRY_DISABLED 1

COPY --from=installer /app/apps/customerweb/next.config.mjs .
COPY --from=installer /app/apps/customerweb/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/customerweb/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/customerweb/.next/static ./apps/customerweb/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/customerweb/public ./apps/customerweb/public

CMD node apps/customerweb/server.js
