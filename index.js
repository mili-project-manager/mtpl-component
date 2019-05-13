// path of template files
exports.path = './template'

exports.engines = ">=2.0.0 <3.0.0"


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
      core => core.extractArea('description', '<!-- description -->'),
      'mustache',
    ],
  },
  {
    path: 'rollup.config.js',
    upgrade: 'exist',
  },
]
