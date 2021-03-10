#!/usr/bin/env node   
// 위에는 "셔뱅" 이라 부르고 리눅스나 맥 같은 유닉스 기반 운영체제에서는 /usr/bin/env에 등록된 node 명령어로 이 파일을 실행하라는 뜻
//console.log('Hello CLI', process.argv);  // argv[0] = node의 경로, argv[1] = cli 경로, argv[>1] = 입력받은것
// CLI 예제 

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, // 콘솔에서 입력
    output:process.stdout, // 콘솔에서 출력
});

console.clear();
const answerCallback = (answer) => {
    if (answer === 'y') {
        console.log('감사');
        rl.close();
    } else if (answer === 'n'){
        console.log('죄송');
        rl.close();
    } else{
        console.log('y나 n만 입력하세요.');
        rl.question('예제가 재미있습니다? (y/n)', answerCallback);
    }
};

rl.question('예제가 재미있습니다? (y/n)', answerCallback);