############################
# 1. BASE DEPS (cached)
############################
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# Install OS dependencies
RUN apk add --no-cache libc6-compat openssl

# Copy dependency files only (for Docker layer caching)
COPY package*.json ./

############################
# 2. BUILD DEPS (dev deps needed)
############################
FROM base AS deps
WORKDIR /usr/src/app

# Install all dependencies including devDependencies
RUN npm ci

############################
# 3. BUILD STAGE (compile TS → JS)
############################
FROM deps AS build
WORKDIR /usr/src/app

# Copy full project source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS (uses tsc instead of nest CLI for reliability)
RUN npx tsc -p tsconfig.build.json

############################
# 4. PRODUCTION INSTALL (no dev deps)
############################
FROM base AS prod-deps
WORKDIR /usr/src/app

# Install ONLY production dependencies
RUN npm ci --omit=dev

############################
# 5. RUNTIME IMAGE
############################
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Ensure a clean runtime environment
RUN apk add --no-cache openssl

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy production deps
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules

# Copy compiled dist files
COPY --from=build /usr/src/app/dist ./dist

# Copy Prisma schema (sometimes needed for migrations or runtime errors)
COPY prisma ./prisma

# Expose port
EXPOSE 3000

# Change user for security
USER appuser

# Startup command
CMD ["node", "dist/src/main.js"]
