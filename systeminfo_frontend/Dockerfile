FROM node:18 as build-stage
WORKDIR /app

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ENV NEXT_PUBLIC_BACKENDLOCALHOST http://localhost:3010

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
# RUN npm install react-scripts -g

FROM node:18 as production-stage

WORKDIR /app

# copy app files
COPY --from=build-stage /app /app

EXPOSE 3000
CMD ["npm", "run","start"]