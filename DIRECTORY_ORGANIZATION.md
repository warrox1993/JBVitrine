# 📁 Directory Organization

This document explains the organization of the Next.js project root directory after cleanup.

## Structure Overview

```
nextjs/
├── docs/              # All documentation files (40+ markdown files)
├── tools/             # Development and testing tools
├── config/            # Additional configuration (tokens, etc.)
├── scripts/           # Build and deployment scripts
├── src/               # Application source code
├── public/            # Static assets
├── db/                # Database related files
├── tests/             # Test files
├── README.md          # Project README (kept at root)
└── [config files]     # Essential config files (see below)
```

## Essential Configuration Files (Root Level)

These files **must** remain at the root level because Next.js and various tools expect them there:

- `next.config.ts` - Next.js configuration
- `next-sitemap.config.js` - Sitemap generation
- `tsconfig.json` - TypeScript configuration
- `package.json` - npm dependencies and scripts
- `eslint.config.mjs` - ESLint configuration
- `playwright.config.js` - Playwright testing configuration
- `postcss.config.mjs` - PostCSS configuration
- `.browserslistrc` - Browser support targets
- `.env.*` - Environment variables
- `.gitignore` - Git ignore rules
- `vercel.json` - Vercel deployment config

## Documentation Directory (`docs/`)

Contains all markdown documentation files:

- **Architecture**: `CLEAN_ARCHITECTURE_GUIDE.md`
- **SEO**: `SEO_IMPLEMENTATION_PLAN.md`, `IMPLEMENTATION_SEO_2025_COMPLETE.md`
- **Security**: `SECURITY.md`, `SECURITY_IMPROVEMENTS.md`, `API_KEYS_SECURITY_REPORT.md`
- **Audits**: Various audit reports (timeline, mobile, Google Maps, etc.)
- **Features**: Lead scoring, breadcrumbs, recommendations, contact page, etc.
- **Setup**: `UPSTASH_SETUP.md`, `GOOGLE_BUSINESS_SETUP.md`, `VERCEL_ENV_UPDATE_GUIDE.md`
- **Sessions**: Various session recap and completion reports

## Tools Directory (`tools/`)

Contains development and testing utilities:

- `audit-api-keys.js` - Script to audit API key usage
- `test-backdrop.html` - HTML test file for backdrop testing

## Config Directory (`config/`)

Contains additional configuration files:

- `tokens/css-tokens.json` - CSS design tokens
- `codex.config.yml` - Codex configuration (if moved)

## Benefits of This Organization

1. **Cleaner Root**: Reduced clutter in the root directory
2. **Better Navigation**: Documentation is centralized in `docs/`
3. **Logical Grouping**: Related files are organized together
4. **Maintained Compatibility**: Essential config files remain at root for tool compatibility
5. **Easier Maintenance**: Clearer project structure for developers

## Notes

- The `MD/` directory contains additional markdown files (keeping for backwards compatibility)
- Configuration files that tools expect at the root cannot be moved
- Some files like `package.json.bak` and `nul` may need cleanup in the future
