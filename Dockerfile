# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the Next.js project into the container
COPY . .

# Install dependencies
RUN npm install

# Set environment variables
ENV PORT=8080
ENV NEXT_PUBLIC_GHOST_KEY="ee1d93afca5d67f35e961d66e5"
ENV NEXT_PUBLIC_GHOST_BLOG_URL="https://blog.staria.network"
ENV NEXT_PUBLIC_GHOST_RESOURCES_URL="https://resources.staria.network"
ENV NEXT_PUBLIC_STRAPI_URL="https://cms.staria.network/api"
ENV NEXT_PUBLIC_API_URL="https://staria-backend-api-staging-zpodt7ltna-oa.a.run.app/v1"
ENV NEXT_PUBLIC_FRONTEND_URL="https://staria-frontend-staging-929365036060.europe-west6.run.app"
ENV NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="14d1672c7681537a3128f0ec172ce87an"
ENV NEXT_PUBLIC_ALCHEMY_API_KEY="Imo09owWJo1i8qezalLZqj4DdthzKD7I"
ENV AUTH_SECRET="Xxq01eh4BAYjKU5uIPNNutNVscpgz99P4RjV+gTB1F8="
ENV AUTH_URL="https://staria-frontend-staging-929365036060.europe-west6.run.app"
ENV AUTH_TRUST_HOST="https://staria-frontend-staging-929365036060.europe-west6.run.app/api/auth/session"

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 8080

# Command to run Next.js application
CMD ["npm", "start"]