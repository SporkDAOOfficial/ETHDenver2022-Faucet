# Start from node 14
FROM node:14-alpine as builder

# Install build dependencies
RUN apk --update add git

# Create a workspace
RUN mkdir -p /workspace
WORKDIR /workspace

# Pull build dependencies first as they don't change frequently
COPY package.json .
COPY yarn.lock .
RUN yarn

# Copy the rest of the code over and build
COPY . .
RUN yarn build

# Caddy provides a small static file-server starting at just 20MB
FROM caddy

# Copy the build assets over
COPY --from=builder /workspace/build /srv

# Run the file server
WORKDIR /srv
USER 65534
CMD ["caddy", "file-server", "--listen", ":3000"]