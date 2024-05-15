# Next.js + TS + Tailwind template

My personal Next.js + TS + Tailwind template

## Tech stack

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

## Development

Node.js (see version in: [.nvmrc](./.nvmrc)) is required.

```bash
# install dependencies
npm ci

# start development server
npm start

# lint code
npm run lint

# fix lint errors
npm run lint:fix
```

Open [http://localhost:36969](http://localhost:36969) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Setting up VSCode

List of recommended extensions is stored in [.vscode/extensions.json](./.vscode/extensions.json).
VSCode will prompt you to install them when you open the project for the first time.

Settings are stored in [.vscode/settings.json](./.vscode/settings.json). This will enable automatic formatting on save and automatic linting.

## GitHub Actions

This project has code linting workflow set up: [.github/workflows/lint.yml](./.github/workflows/lint.yml).

## Building

```bash
npm run build
```

After building, the `build` directory contains all static files that can be served by any static hosting. To test the production build run:

```bash
npm run serve
```
