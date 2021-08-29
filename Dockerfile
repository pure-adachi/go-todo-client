FROM node:14.17.3-alpine

RUN apk update && apk upgrade && apk --no-cache add --update alpine-sdk python

WORKDIR /myapp/frontend
