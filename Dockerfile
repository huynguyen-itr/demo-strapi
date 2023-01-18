FROM node:16.18.1-alpine
# Installing libvips-dev for sharp Compatibility
WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

CMD [ "npm", "run", "develop" ]