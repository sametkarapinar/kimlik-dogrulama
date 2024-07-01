# TC Kimlik Doğrulama

Bu paket, tckimlik.nvi.gov.tr API'sini kullanarak Türkiye Cumhuriyeti kimlik numarasıyla ilişkilendirilmiş kişi bilgilerini doğrulamanıza olanak tanır. 

 ![NPM Version](https://img.shields.io/npm/v/kimlik-dogrulama)  ![NPM License](https://img.shields.io/npm/l/kimlik-dogrulama)  ![NPM Downloads](https://img.shields.io/npm/dw/kimlik-dogrulama?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fkimlik-dogrulama) 


## Kurulum 

kimlik-dogrulama modülünü npm kullanarak yükleyin

```bash 
# yarn: 
    $ yarn add kimlik-dogrulama

# npm:
    $ npm i kimlik-dogrulama
```
    
## Kullanım/Örnekler

```javascript
const validation = require('kimlik-dogrulama');
const data = {
    tcno: 'TCNO',
    name: 'ISIM',
    surname: 'SOYISIM',
    birthyear: 2000
};

validation.validate(data).then((result) => {
    console.log(result);
});
```

  
## Lisans

[MIT](https://choosealicense.com/licenses/mit/)

  