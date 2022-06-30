FROM node:16.15-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

RUN npm install --force --silent
# RUN npm install react-scripts@3.4.1 -g --force --silent
# RUN npm install pm2 -g --force
COPY . ./
RUN npm run build

# CMD ["npm", "start"]

# production environment
# FROM nginx:1.13.9-alpine
# COPY --from=builder /app/build /usr/share/nginx/html
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]