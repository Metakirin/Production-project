FROM node:17.4.0
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "run", "start"]
EXPOSE 3000