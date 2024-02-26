ARG DIRECTUS_VERSION=latest


# Install dependencies
FROM node:20.11-alpine AS builder

RUN npm i -g pnpm

WORKDIR /build
COPY pnpm-lock.yaml .

RUN pnpm fetch

ADD . ./
RUN pnpm -r -F @bde-cesi-nancy/web -F directus-extension-bde-cesi-nancy-bundle -F directus-extension-bde-cesi-nancy-migrations install --offline --frozen-lockfile --ignore-scripts

RUN pnpm -r -F @bde-cesi-nancy/web -F directus-extension-bde-cesi-nancy-bundle -F directus-extension-bde-cesi-nancy-migrations run build


# Build web app
FROM node:20.11-alpine AS web

WORKDIR /app

COPY web/package.prod.json package.json
RUN npm install && npm cache clean --force

COPY --from=builder /build/web/build build

CMD ["/bin/sh", "-c", "node build"]


# Build directus with custom extensions
FROM directus/directus:${DIRECTUS_VERSION} AS directus

WORKDIR /directus
COPY --from=builder /build/directus/extensions/dist /directus/extensions/directus-extension-bde-cesi-nancy-bundle/dist
COPY --from=builder /build/directus/extensions/package.json /directus/extensions/directus-extension-bde-cesi-nancy-bundle/package.json
COPY --from=builder /build/directus/migrations/dist /directus/extensions/migrations

CMD ["/bin/sh", "-c", "npx directus schema apply -y ./schema/schema.yaml && npx directus bootstrap && npx directus start"]
