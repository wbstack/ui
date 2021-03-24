const path = require('path')
module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    chainWebpack: config => {
        config.resolve.alias
            .set('~', path.resolve(__dirname, 'src'))
    }
}
