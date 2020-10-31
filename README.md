# wbstack-ui

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

**Possible issues**
Node Sass could not find a binding for your current environment: Linux 64-bit with Node.js 8.x

wbstack-ui requires node-sass.

If your OS does not match the OS of the Docker container then you will not have the node-sass bindings to match the Docker OS.

In order to get these bindings run "npm rebuild node-sass" in the ui container. Which in the docker-compose land you can do "docker-compose exec ui-dev bash" and then run it.
