const path = require('path')
module.exports = {
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
