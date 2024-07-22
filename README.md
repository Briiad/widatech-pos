# WidaTech PoS Webapp

## How deploy locally (docker)

1. Make sure you have docker installed on your machine
- [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker for Linux](https://docs.docker.com/desktop/install/linux-install/)
2. Clone the repository
```bash
git clone https://github.com/Briiad/widatech-pos.git
```
3. Copy the `.env.production` file to `.env`
```bash
cp .env.production .env
cp ./server/.env.production ./server/.env
```
4. Run the docker-compose command
```bash
docker-compose up
``` 
5. Open your browser and navigate to `http://localhost:8000`

## How to run development
1. Clone the repository
```bash
git clone https://github.com/Briiad/widatech-pos.git
```
2. Copy the `.env.development` file to `.env`
```bash
cp .env.development .env
cp ./server/.env.development ./server/.env
```
3. Install the dependencies
```bash
npm install
# For the server
cd server
npm install
```
4. Run docker container for the database
```bash
docker compose -f compose.dev.yml up
```
5. Run the development server
```bash
npm run dev
# For the server
cd server
npm start
```

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
