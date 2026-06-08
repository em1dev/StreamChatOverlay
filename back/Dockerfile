FROM ghcr.io/pnpm/pnpm:11 as base
RUN pnpm runtime set node 24 -g

FROM base AS prod

RUN apt-get update
RUN apt install -y python3 build-essential

COPY pnpm-lock.yaml pnpm-workspace.yaml /app/
WORKDIR /app
RUN pnpm fetch --prod

COPY . /app
RUN pnpm run build

FROM base
WORKDIR /app
COPY --from=prod /app/node_modules /app/node_modules
COPY --from=prod /app/dist /app/dist
COPY package.json pnpm-workspace.yaml /app/

CMD ["pnpm", "start"]
