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
const addProp = (name, value) => ({
  genFile: async (file, resource) => {
    file.addition[name] = typeof value === 'function' ? value(resource) : value
  },
})

exports.rules = [
  {
    path: '@(.czrc|.commitlintrc.yml)',
    handler: ignoreWhenNoStanderVersion,
  },
  {
    path: '@(.lintstagedrc.yml|.eslintrc.yml|.editorconfig)',
    handler: ignoreWhenNoLint,
  },
  {
    path: '.eslintignore',
    upgrade: 'merge',
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
    path: 'tests/tsconfig.json',
    upgrade: 'cover',
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
    path: 'build/tsconfig.cmd.json',
    handlers: [
      core => core.rename('tsconfig.lib.json'),
      core => core.ignoreWhen(({ answers }) => answers.module !== 'commonjs'),
    ],
  },
  {
    path: 'build/tsconfig.umd.json',
    handlers: [
      core => core.rename('tsconfig.lib.json'),
      core => core.ignoreWhen(({ answers }) => answers.module !== 'umd'),
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

  {
    path: 'backers.md.mustache',
    handlers: [
      core => core.extractArea('goldSponsors', '<!-- gold-sponsors -->'),
      core => core.extractArea('bronzeSponsors', '<!-- bronze-sponsors -->'),
      core => core.extractArea('generousBackers', '<!-- generous-backers -->'),
      core => core.extractArea('backers', '<!-- backers -->'),
      'mustache',
    ],
  },
  {
    path: 'tsconfig.json.mustache',
    handlers: [
      addProp(
        'resolveJsonModule',
        ({ answers }) => answers.module === 'commonjs'
      ),
      'mustache',
    ],
  },
]

exports.questions = [
  { type: 'confirm', name: 'ci', message: '启用CI' },
  { type: 'confirm', name: 'standardVersion', message: '启用规范化commit工具' },
  { type: 'confirm', name: 'lint', message: '启用lint工具' },
  { type: 'confirm', name: 'lock', message: '启用依赖锁定' },
  {
    type: 'list',
    name: 'module',
    message: '指定生成哪个模块系统代码',
    choices: ['commonjs', 'umd'],
  },
]
