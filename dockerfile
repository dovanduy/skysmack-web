# The builder from node image
FROM node:alpine as builder

RUN apk update && apk add --no-cache make git

# Build
WORKDIR /ss-app
RUN npm i -g @angular/cli@7.3.8 lerna@3.13.1
COPY . .
RUN cd ng-skysmack && npm i && npm run ss:lerna && npm run build:prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ss-app/ng-skysmack/dist/web-portal /usr/share/nginx/html
COPY /ng-skysmack/nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]