FROM arm64v8/node:14.18.1-alpine
# Installing libvips-dev for sharp Compatibility
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "develop" ]