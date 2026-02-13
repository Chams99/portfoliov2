FROM node:20-slim

# Install system dependencies for Next.js and sharp
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build Next.js application
RUN pnpm run build

# Expose port
EXPOSE 3000

# Start command
CMD ["pnpm", "start"]
