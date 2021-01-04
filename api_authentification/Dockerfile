# Use a lighter version of Node as a parent image
FROM node:12

RUN mkdir -p /api_authentification/

# Set the working directory to /api
WORKDIR /api_authentification

# copy package.json into the container at /api
COPY ./api_authentification/package*.json /api_authentification/

# install dependencies
RUN yarn install

# Copy the current directory contents into the container at /api
COPY ./api_authentification /api_authentification/

# Make port 80 available to the world outside this container
EXPOSE 8080

# Run the app when the container launches
CMD ["yarn", "start"]