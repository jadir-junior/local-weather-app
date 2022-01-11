FROM duluca/minimal-node-build-end:lts-alpine as builder

ENV BUILDER_SRC_DIR=/usr/src

# setup source code directory and copy source code
WORKDIR $BUILDER_SRC_DIR
COPY . .

# install dependencies and build

RUN npm ci

RUN npm run style
RUN npm run lint

RUN npm run build