FROM node:alpine as builder
ADD . .
RUN npm i && npm run build
FROM node:alpine
COPY --from=builder index.js package.json /opt/
WORKDIR /opt
RUN npm i --production
CMD node .
