#!/usr/bin/env node
const { program } = require('commander');
const { version } = require('./package.json');

program
    .version(version, '-v, --version') // version을 알려줘야 사람들이 깨지는지 아닌지 판단가능.
    .name('cli');

program
    .command('template <type>') // cli template html
    .usage('<type> --filename [filename] --path [path]')
    .description('탬플릿을 생성합니다.')
    .alias('tmpl')