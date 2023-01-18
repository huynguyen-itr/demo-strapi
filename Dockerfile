FROM node:16.18.1-alpine
# Installing libvips-dev for sharp Compatibility
WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]