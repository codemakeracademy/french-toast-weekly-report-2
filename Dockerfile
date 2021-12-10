FROM node:16-alpine3.12 as build
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]