FROM node:14.17.0-alpine3.13

RUN mkdir -p /opt/app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG GRPC_PORT=6900
ENV GRPC_PORT $GRPC_PORT
EXPOSE $GRPC_PORT

RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe

WORKDIR /opt
COPY package.json package-lock.json ./
RUN npm install --only=prod && npm cache clean --force

WORKDIR /opt/app
COPY ./app/ /opt/app

CMD [ "npm", "start"]