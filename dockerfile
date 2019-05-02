# The builder from node image
FROM node:alpine as builder

RUN apk update && apk add --no-cache make git

# Build
WORKDIR /ss-app
RUN npm i -g "@angular/cli@>=7.3.8 <=7.3.8"
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ss-app/dist/apps/web/web-portal /usr/share/nginx/html
COPY /ng-skysmack/nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
