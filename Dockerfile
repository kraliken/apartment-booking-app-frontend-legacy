# FROM node:14-alpine
# WORKDIR /app
# COPY ./package.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]

FROM node:16 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
# COPY ./build /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf