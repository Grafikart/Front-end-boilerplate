FROM node:9-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN touch /.yarnrc \
    && chmod 777 /.yarnrc \
    && mkdir -p -m 777 /.cache/yarn
USER node
RUN mkdir ~/.npm-global \
    && mkdir ~/app
WORKDIR /home/node/app