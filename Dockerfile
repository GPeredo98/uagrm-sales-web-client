FROM node:16-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:1.17.1-alpine
COPY --from=build /usr/src/app/dist/uagrm-sales-web-client /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80