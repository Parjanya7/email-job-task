FROM node:18.0.0-alpine
WORKDIR /api-gateway
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]