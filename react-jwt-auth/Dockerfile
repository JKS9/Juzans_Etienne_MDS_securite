# Use a lighter version of Node as a parent image
FROM node:12

RUN mkdir -p /react-jwt-auth/

# Set the working directory to /api
WORKDIR /react-jwt-auth

# copy package.json into the container at /api
COPY ./react-jwt-auth/package*.json /frontend/

# install dependencies
RUN yarn install

# Copy the current directory contents into the container at /api
COPY ./react-jwt-auth /react-jwt-auth/

# Make port 80 available to the world outside this container
EXPOSE 8081

# Run the app when the container launches
CMD ["yarn", "start"]