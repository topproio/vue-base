# generator-toppro-vue-base

[![npm](https://img.shields.io/badge/license-MIT-yellowgreen.svg)]()
[![npm](https://img.shields.io/badge/node-%3E%3D8-blue.svg)]()
[![npm](https://img.shields.io/badge/npm-5.6.0-orange.svg)]()
[![npm](https://img.shields.io/badge/yeoman-2.0.5-brightgreen.svg)]()

> Vue scaffolding based on Yeoman.

## Installation

```bash
npm install -g yo
```

And then:

```bash
git clone git@github.com:topproio/vue-base.git
```

Add the template of the repo to Yeoman's list through `npm link`.

```
cd vue-base
npm link
```

Then generate your new vue project in new folder:

```
yo
```

### Commitlint

Please install globally:

```
// to do

feat: adds a new feature to your application or library
fix: represents a bug fix for your application
docs: document change
style: changes that do not affect the meaning of the code
refactor: a code change that neither fixes a bug or adds a feature
perf: a code change that imporves performance
test: adding missing tests
```

### Special remind

Please run `git init` before `npm install`. Because `Husky` later needs to get `git hooks`.

## Configuration

### UI framework

1. [elementUI](http://element-cn.eleme.io/#/zh-CN/component/installation)
2. [iView](https://www.iviewui.com/docs/guide/install)

### Data store

1. [Vuex](https://vuex.vuejs.org/zh/guide/)
2. Vue Bus

### Utils

1. [Lodash](https://lodash.com/docs/4.17.10)
2. [Underscore](https://underscorejs.org/)
