FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
RUN npx prisma generate

RUN npm install

COPY . .

EXPOSE 6000
CMD [ "npm", "start"]
