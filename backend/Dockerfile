FROM node:20

WORKDIR /usr/src/app
ENV NODE_ENV=development

COPY package*.json tsconfig*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

# Nest CLI global
RUN npm install -g @nestjs/cli

# Copiamos el resto del código
COPY . .

RUN npx prisma generate

# Compilamos
RUN npm run build

CMD ["npm", "run", "start:dev"]
