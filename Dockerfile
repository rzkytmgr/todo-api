FROM node:14.20.0-alpine3.16
WORKDIR /app
COPY . /app
RUN npm install
CMD [ "npm", "start" ]
EXPOSE 3030
