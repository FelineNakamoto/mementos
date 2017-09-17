var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

var xhr = new XMLHttpRequest();


xhr.open("GET","https://api.pons.com/v1/dictionary?q=Haus&l=deen&in=de&fm=0&ref=false&language=en",false);
xhr.setRequestHeader("X-Secret","dbf40f9801bab9f2dfc54c85fb130f793426d0e2643573d8ee7ecde6300ce308");
xhr.send();

console.log(xhr.status);
console.log(xhr.responseText);
fs.writeFile('exp.txt',xhr.responseText,function(err){
    if(err) throw err;
})