FROM node:18.0.0-alpine
WORKDIR /email-service
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]