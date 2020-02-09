FROM alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Install npm and eventually node (as a dependency of npm), and then
# install npm dependencies marked in package.json
RUN apk add --no-cache npm && npm ci --production

# Copy all content from current directory to WORKDIR except those marked to be
# ignored in .dockerignore
COPY . .

# The EXPOSE instruction does not actually publish the port. It functions as a 
# type of documentation between the person who builds the image and the person 
# who runs the container, about which ports are intended to be published. 
EXPOSE 8000

CMD npm start