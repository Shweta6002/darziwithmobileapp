FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
RUN npm install --omit=dev
COPY . ./
EXPOSE 3000
CMD ["npm", "start"]
