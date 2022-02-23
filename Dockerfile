FROM node:latest

#Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /app
COPY package.json .

RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]

# FROM node:latest
# ENV NODE_ENV=production
# WORKDIR /app
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 3001
# RUN chown -R node /usr/src/app
# USER node
# CMD ["npm", "start"]
