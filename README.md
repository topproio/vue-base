# generator-toppro-vue-base [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generator vue-base scaffold

## Installation

First, install [Yeoman](http://yeoman.io) and generator-toppro-vue-base using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo

git clone https://github.com/topproio/vue-base.git

npm link  //将拉下来得仓库代码链接到本地的全局环境，类似于npm install -g **

基础代码已包含'vue-router','axios'

```

Then generate your new project:

```bash
1. 执行 'yo toppro-vue-vase'
2. 根据提示定义工程名
3. 选择 UI 库 'elementUI' 或 'iview'
4. 选择vue 数据管理方式 'vuex' 或 'bus'
5. 选择 js 管理工具 'lodash' 或 'underscore'

按照提示步骤完成后，执行'git init' 然后 'npm install'
(！！！'git init'操作一定要在'npm install'步骤之前，这个和husky 获取git 钩子有关，如果没按照这个顺序，删掉node-modules包，重新安装)


```
注意事项,用户要全局安装以下命令

```bash
//git commit 规范化工具，配合'husky'一起使用,'husky'前面已配置
1. 'npm install -g @commitlint/cli @commitlint/config-conventional'
2. 安装完毕后，每次提交代码会自动检查提交格式 exp：'git commit -m "feat: 新功能"';类型关键字和msg 之间要有空格。
提交类型:
feat: adds a new feature to your application or library
fix: represents a bug fix for your application
docs: document change
style: changes that do not affect the meaning of the code
refactor: a code change that neither fixes a bug or adds a feature
perf: a code change that imporves performance
test: adding missing tests

```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

 © [Tina]()


[npm-image]: https://badge.fury.io/js/generator-toppro-vue-base.svg
[npm-url]: https://npmjs.org/package/generator-toppro-vue-base
[travis-image]: https://travis-ci.org/Tina0035/generator-toppro-vue-base.svg?branch=master
[travis-url]: https://travis-ci.org/Tina0035/generator-toppro-vue-base
[daviddm-image]: https://david-dm.org/Tina0035/generator-toppro-vue-base.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Tina0035/generator-toppro-vue-base
