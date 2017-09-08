module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  "env": {
    "browser": true,
    "es6": true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    //自增选项配置，屏蔽多余内容
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
    'semi': 0, // 末尾分号
    'padded-blocks': 0, //空白行
    'no-alert': 1,
    'spaced-comment': 0,
    'no-labels': 0,
    'no-extend-native': 0
  }
};
