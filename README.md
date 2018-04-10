# 자바스크립트로 홈페이지 만들기

## 참고
- [생활코딩 - 서버 JavaScript(nodejs)](https://opentutorials.org/course/2136)
- [nodejs](https://nodejs.org)
- [npm](https://www.npmjs.com/)
- [Express](https://expressjs.com)
- [pug](https://pugjs.org)

## 진행과정

### nodejs 설치
```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Express로 뼈대 만들기([참고](http://expressjs.com/en/starter/generator.html))
```bash
$ npm install express --g
$ npm install express-generator --g
$ express --view=pug myapp
$ cd myapp
$ npm install
```
### MySQL 데이터베이스 연동
```bash
sudo apt-get install mysql-server-5.6 mysql-client-5.6
npm install node-mysql -g
npm install mysql -g
npm insatll --save express-session
npm insatll --save express-mysql-session
```
### 라이브러리들
```bash
npm install supervisor -g
npm install --save multer
npm install --save cookie-parser
npm install uglify-js -g
npm install underscore --save
```

### 암호화
```bash
npm install --save pbkdf2-password
```