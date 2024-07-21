# WidaTech PoS Webapp

## How to use locally (docker)

1. Make sure you have docker installed on your machine
- [Docker for Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker for Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker for Linux](https://docs.docker.com/desktop/install/linux-install/)
2. Clone the repository
```bash
git clone https://github.com/Briiad/widatech-pos.git
```
3. Copy the `.env.example` file to `.env`
```bash
cp .env.example .env
cp ./server/.env.example ./server/.env
```
4. Run the docker-compose command
```bash
docker-compose up
``` 
5. Open your browser and navigate to `http://localhost:8000`

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
