// path of template files
exports.path = './template'

// mili version >= 1.0.0
exports.engines = ">=1.0.0<2.0.0"


exports.rules = [
  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handlers: ['mustache']
  },
  {
    path: 'README.md.mustache',
    handlers: [
      'mustache',
      // core => core.extractHtmlCustomArea('custom')
    ],
  },
]
