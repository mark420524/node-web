var aes=require('./util/aes');
var data="{'imei':'中国==','mac':'MTI6MzQ6MTI6MjM6NDI6MTI=','version':'MS4w'}";
var encrypt=aes.encrypt(data);
console.log('plain text is: '+data);
console.log('encrypt text is: '+encrypt);
var decrypt=aes.decrypt(encrypt);
console.log('解密后: '+decrypt);