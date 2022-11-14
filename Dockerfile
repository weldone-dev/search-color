FROM node:16-alpine as builder


WORKDIR /app
COPY . .
RUN npm install -g npm@9.1.1 && npm i && npm run build


FROM docker.io/library/nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
