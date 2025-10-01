FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

RUN mkdir -p public/uploads

COPY backend ./

EXPOSE 3000

# Start the backend server
CMD ["npm", "run", "dev"]


# Build image with:
#docker build -t careerly-backend-image -f backend/Dockerfile .