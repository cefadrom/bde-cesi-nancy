ARG DIRECTUS_VERSION=latest


# Install dependencies
FROM node:16.16-alpine AS builder

RUN wget -O - https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /build
COPY pnpm-lock.yaml .

RUN pnpm fetch

ADD . ./
RUN pnpm install -r --offline

RUN pnpm --filter web --filter directus -r build


# Build web app
FROM node:16.16-alpine AS web

WORKDIR /app
COPY --from=builder /build/web/build build
COPY --from=builder /build/web/package.json .

CMD ["/bin/sh", "-c", "node build"]


# Build directus with custom extensions
FROM directus/directus:${DIRECTUS_VERSION} AS directus

WORKDIR /directus
COPY --from=builder /build/directus/extensions /directus/extensions

CMD ["/bin/sh", "-c", "npx directus bootstrap && npx directus start"]
