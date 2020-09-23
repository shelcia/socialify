const glob = require('glob-all')
const paths = require('react-scripts/config/paths')

const { override, addPostcssPlugins } = require('customize-cra')

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    paths.appHtml,
    ...glob.sync(`${paths.appSrc}/**/*.js`, { nodir: true }),
    ...glob.sync(`${paths.appNodeModules}/antd/es/button/**/*.css`, {
      nodir: true
    })
  ],
  extractors: [
    {
      extractor: content => content.match(/([a-zA-Z-]+)(?= {)/g) || [],
      extensions: ['css']
    }
  ]
})

module.exports = override(
  addPostcssPlugins([
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ])
)