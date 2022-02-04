FROM duluca/minimal-node-build-env:lts-alpine as builder

ENV BUILDER_SRC_DIR=/usr/src

# setup source code directory and copy source code
WORKDIR $BUILDER_SRC_DIR
COPY . .

# setup disabled husky
# https://github.com/typicode/husky/issues/991
RUN npm set-script prepare ''

# install dependencies and build
RUN npm ci

RUN npm run style
RUN npm run lint

RUN npm run build

FROM duluca/minimal-node-chromium:lts-alpine as tester

ENV BUILDER_SRC_DIR=/usr/src
ENV TESTER_SRC_DIR=/usr/src

WORKDIR $TESTER_SRC_DIR
COPY --from=builder $BUILDER_SRC_DIR .

WORKDIR $TESTER_SRC_DIR

RUN npm run test

FROM duluca/minimal-nginx-web-server:1-alpine as webserver

ENV BUILDER_SRC_DIR=/usr/src

COPY --from=builder $BUILDER_SRC_DIR/dist/local-weather-app /var/www
CMD 'nginx'