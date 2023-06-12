FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 2222
CMD service postgresql start && npm run server