# wbstack UI

The code for the https://wikibase.cloud/ website (previously wbstack.com).

## Development

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

This app uses https://cli.vuejs.org.

### Docker Environment

#### Setting up .env file

Copy one of the many `.env` files to `.env` and adjust the values to your needs.

Each `.env` file provides some sensible defaults for the environment it is named after.

#### Installing dependencies

```
docker compose run ui npm install
```

#### Starting the server

```
docker compose up -d
```

#### Running scripts

```
docker compose run ui npm run <command>
```

### Bare-metal Environment

#### Installing dependencies

```
npm install
```

#### Starting the server

```
npm run serve
```

#### Building for production

```
npm run build
```

### Mocked API

This ui uses Mock Service Worker (https://mswjs.io/) to mock the backend api for test purposes.

To run dev server with mocked api, set env variable `API_MOCK` to a value that evaluates to `true`.

This can either be done at runtime using npm, or in `.env` for docker-compose.

```
VUE_APP_API_MOCK=1 npm run serve
```

Currently, logging in using any email and password will behave as if the same user is always logging in.
Created wikis by that user will live in local storage (`msw-myWikis` key)

Backend api mocks live in `/src/backend/mocks/default_handlers.js`.

**Note**
Firefox blocks service workers as long as we use `localhost` for local development. The only solution is to use
chrom(ium) for now.
