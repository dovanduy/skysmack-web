# The builder from node image
FROM node:12-alpine as builder

RUN apk update && apk add --no-cache make git

# Build
WORKDIR /ss-app
RUN npm i -g "@angular/cli@>=8.3.19 <=8.3.19"
RUN npm i -g "gulp-cli@>=2.2.0 <=2.2.0"
RUN npm i -g "nps@>=5.9.5 <=5.9.5"
COPY package*.json ./
RUN npm i
COPY . .
RUN nps commercial.build

FROM fholzer/nginx-brotli AS base
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ss-app/dist/apps/web/web-commercial /usr/share/nginx/html
COPY /nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
