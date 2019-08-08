# The builder from node image
FROM node:alpine as builder

RUN apk update && apk add --no-cache make git

# Build
WORKDIR /ss-app
RUN npm i -g "@angular/cli@>=8.1.3 <=8.1.3"
RUN npm i -g "gulp-cli@>=2.2.0 <=2.2.0"
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ss-app/dist/apps/web/web-portal /usr/share/nginx/html
COPY /nginx.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
