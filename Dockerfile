# Dockerfile  
FROM node:14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD npm run start:dev

# Dockerfile for reducing capacity docker image
# FROM node:10 as builder
# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . .
# RUN npm run build
# RUN npm prune --production
# FROM node:10-alpine
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist /app/
# EXPOSE 3000
# CMD npm run start:dev
