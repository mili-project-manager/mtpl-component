// path of template files
exports.path = './template'

// mili version >= 1.0.0
exports.engines = ">=1.0.0<2.0.0"


exports.rules = [
  {
    path: 'src',
    upgrade: 'keep',
  },
  {
    path: 'test',
    upgrade: 'keep',
  },
  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handlers: ['mustache']
  },
  {
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('content', '<!-- custom -->'),
      'mustache',
    ],
  },
]
