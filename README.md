# Tour Badges

A Cloudflare Workers-based API for managing tour enrollments and automated badge issuance.

## 📋 Table of Contents
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Deployment](#deployment)

## 🛠️ Environment Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Cloudflare account with Workers and D1 enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tour-badges
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create a cloudflare D1 instance**
   ```bash
   npx wrangler@latest d1 create db
   ```

4. **Run migrations**
   ```bash
   npx wrangler d1 migrations apply db --local
   npx wrangler d1 migrations apply db --remote
   ```


3. **Configure environment**
   ```bash
   cp wrangler.jsonc.example wrangler.jsonc
   # Edit wrangler.jsonc with your configurations and d1 credentials

   cp .dev.vars.development.example .dev.vars.development
   # Add the Badgr username and password
   ```


## 🔧 Development

### Local Development
```bash
# Start local development server
npx wrangler dev
```

## 🚢 Deployment

### Deploy to Different Environments

```bash
# Deploy to development
npx wrangler deploy --env development

# Deploy to production
npx wrangler deploy
```