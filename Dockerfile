FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo@2.0.9
COPY . .
# breaks the yarn.lock :(
# RUN turbo prune customerweb --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --update libc6-compat openjdk11 && \
    rm -rf /var/cache/apk/*
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/packages/api-auth/package.json ./packages/api-auth/package.json
COPY --from=builder /app/packages/api-content/package.json ./packages/api-content/package.json
COPY --from=builder /app/packages/api-deals/package.json ./packages/api-deals/package.json
COPY --from=builder /app/packages/api-user/package.json ./packages/api-user/package.json
COPY --from=builder /app/packages/eslint-config-custom/package.json ./packages/eslint-config-custom/package.json
COPY --from=builder /app/packages/tailwind-config/package.json ./packages/tailwind-config/package.json
COPY --from=builder /app/packages/tsconfig/package.json ./packages/tsconfig/package.json
COPY --from=builder /app/apps/customerweb/package.json ./apps/customerweb/package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/.yarnrc.yml ./.yarnrc.yml
COPY --from=builder /app/.yarn ./.yarn
# RUN ls -la && cat package.json && exit 1
RUN yarn install --immutable
RUN yarn why @react-aria/utils

# Build the project
COPY --from=builder /app/ .
ENV NEXT_TELEMETRY_DISABLED 1
ENV TURBO_TELEMETRY_DISABLED 1
# build the actual app
COPY --from=builder /app/.openapi-generator-cli/ ./.openapi-generator-cli
RUN ls -la ./.openapi-generator-cli

ARG NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME
ARG NEXT_PUBLIC_ADOBE_SCRIPT
ENV NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME=$NEXT_PUBLIC_IMAGE_REMOTE_HOSTNAME
ENV NEXT_PUBLIC_ADOBE_SCRIPT=$NEXT_PUBLIC_ADOBE_SCRIPT
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
