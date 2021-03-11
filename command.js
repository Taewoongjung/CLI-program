#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { version } = require('./package.json');

const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Template</title>
const exist = (dir) => { // 폴더 존제 여부 확인 함수
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const mkdirp = (dir) => { // 경로 생성 함수
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};
    </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;
`;

const exist = (dir) => { // 폴더 존제 여부 확인 함수
    try {
        fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (e) {
        return false;
    }
};

const mkdirp = (dir) => { // 경로 생성 함수
    const dirname = path
        .relative('.', path.normalize(dir))
        .split(path.sep)
        .filter(p => !!p);
    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
        if (!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder);
        }
    });
};

const makeTemplate = (type, name, directory) => { // 템플릿 생성 함수
    mkdirp(directory);
    if (type === 'html') {
      const pathToFile = path.join(directory, `${name}.html`);
      if (exist(pathToFile)) {
        console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
      } else {
        fs.writeFileSync(pathToFile, htmlTemplate);
        console.log(chalk.green(pathToFile, '생성 완료'));
      }
    } else if (type === 'express-router') {
      const pathToFile = path.join(directory, `${name}.js`);
      if (exist(pathToFile)) {
        console.error(chalk.bold.red('이미 해당 파일이 존재합니다'));
      } else {
        fs.writeFileSync(pathToFile, routerTemplate);
        console.log(chalk.green(pathToFile, '생성 완료'));
      }
    } else {
      console.error('html 또는 express-router 둘 중 하나를 입력하세요.');
    }
  };

program
    .version(version, '-v, --version') // version을 알려줘야 사람들이 깨지는지 아닌지 판단가능.   cli -v 버젼나옴
    .name('cli'); // cli -h   도움말

program
    .command('template <type>') // cli template html
    .usage('<type> --filename [filename] --path [path]')
    .description('탬플릿을 생성합니다.')
    .alias('tmpl') // cli tmpl express-router       * tmpl = template의 별명
    .option('-f, -filename [filename', '파일명을 입력하세요', 'index')
    .option('-d, --directory [path]', '생성 경로를 입력하세요.', '.')
    .action((type, option) => {
        console.log(type, options.filename, options.directory);
        makeTemplate(type, options.filename, options.directory);
    });

program // cli tmpp
    .command('*', { noHelp: true })
    .action(() => {
        console.log('해당 명령어를 찾을 수 없습니다.');
        program.help(); // cli -h   오타를 냈을 시 설명서를 띄어주는것
    });

program.action((cmd, args) => {  // cli 만 쳤을 때 실행되는 부분

});

program.parse(process.argv);