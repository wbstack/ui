const path = require('path')
module.exports = {
    devServer: {
        client: {
            // Derive the HMR WebSocket protocol, host and port from the browser, so that it works
            // from both `localhost` and the Docker Compose `ui` host (e.g. selenium e2e tests).
            webSocketURL: 'auto://0.0.0.0:0/ws'
        },
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_API_URL,
                changeOrigin: true,
                pathRewrite: {'^/api' : ''}
            }
        }
    },
    lintOnSave: false,
    runtimeCompiler: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('~', path.resolve(__dirname, 'src'))

        if (process.env.VUE_APP_BUILD_FOR_DOCKER_IMAGE === '1') {
            // externalize (= do not bundle) any import of the config. Instead, read it from
            // window.config which gets set by loading a separate config.js in index.html which
            // contains values that can be set by the container at runtime.
            config.externals({
                '~/config': 'config'
            })
        }
    }
}
