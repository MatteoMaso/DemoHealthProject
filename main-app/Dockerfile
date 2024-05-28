FROM node:lts-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start"]