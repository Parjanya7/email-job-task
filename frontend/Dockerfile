FROM node:18.0.0-alpine
WORKDIR /frontend-service
COPY package.json ./
RUN npm install
COPY . ./
CMD ["npm", "start"]