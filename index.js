exports.path = './template'
exports.engines = '>=3.2.0 <4.0.0'

const ignoreWhenNoStanderVersion = core =>
  core.ignoreWhen(resource => !resource.answers.standardVersion)
const ignoreWhenNoLint = core =>
  core.ignoreWhen(resource => !resource.answers.lint)
const removeWhenEmpty = {
  genFile: async file => {
    file.renderable = !!file.content.replace(/^\s*/, '').length
  },
}

exports.rules = [
  {
    path: '@(.czrc|.commitlintrc.yml)',
    handler: ignoreWhenNoStanderVersion,
  },
  {
    path: '@(.lintstagedrc.yml|.eslintrc.yml|.eslintignore|.editorconfig)',
    handler: ignoreWhenNoLint,
  },
  {
    path: '.huskyrc.yml.mustache',
    handler: 'mustache',
  },

  {
    path: 'src',
    upgrade: 'keep',
  },
  {
    path: 'tests',
    upgrade: 'keep',
  },

  {
    path: 'package.json.mustache',
    upgrade: 'merge',
    handler: 'mustache',
  },

  {
    path: 'README.md.mustache',
    handlers: [
      core => core.extractArea('title', '<!-- title -->'),
      core => core.extractArea('description', '<!-- description -->'),
      core => core.extractArea('usage', '<!-- usage -->'),
      core => core.extractArea('addition', '<!-- addition -->'),
      'mustache',
    ],
  },
  {
    path: 'rollup.node.js',
    handlers: [
      core => core.rename('rollup.config.js'),
      core => core.ignoreWhen(({ answers }) => answers.packaage !== 'NodeJS'),
    ],
  },
  {
    path: 'rollup.browser.js',
    handlers: [
      core => core.rename('rollup.config.js'),
      core => core.ignoreWhen(({ answers }) => answers.node !== 'Browser'),
    ],
  },
  {
    path: '.travis.yml',
    handler: core => core.ignoreWhen(resource => !resource.answers.ci),
  },
  {
    path: '.@(git|npm)ignore.mustache',
    upgrade: 'merge',
    handler: 'mustache',
  },

  {
    path: '.npmrc.mustache',
    upgrade: 'merge',
    handlers: ['mustache', removeWhenEmpty],
  },
]

exports.questions = [
  { type: 'confirm', name: 'ci', message: '启用CI' },
  { type: 'confirm', name: 'standardVersion', message: '启用规范化commit工具' },
  { type: 'confirm', name: 'lint', message: '启用lint工具' },
  { type: 'confirm', name: 'lock', message: '启用依赖锁定' },
  {
    type: 'list',
    name: 'package',
    message: '模块的运行环境',
    choices: ['NodeJS', 'Browser'],
  },
]
