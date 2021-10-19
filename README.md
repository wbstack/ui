# wbstack UI

The code for the https://www.wbstack.com/ website.

## Development

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

This app uses https://cli.vuejs.org.

### Configuration

`cp public/config.example.js public/config.js` and modify its contents accordingly.

### Install dependencies

`npm install`

### Run (with npm)

You can choose to run the ui via npm.

```sh
# run dev server
npm run serve

# build for production
npm run build
```

### Run (with docker-compose)

You can also choose to run the ui in docker.

```sh
docker-compose up -d
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
