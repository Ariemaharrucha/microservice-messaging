FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm@latest
RUN pnpm install

COPY . .

EXPOSE 8010

CMD ["pnpm", "dev"]