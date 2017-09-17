var fs = require('fs');
var txt = "";
fs.readFile('voc.txt',function(err,data){
    if(err) throw err;
    txt = data.toString().replace(/\n/g,'');
    console.log(txt);
    var mscReg = /^(?:der\s)(?:[A-Z][\wäüöß]+)/gm;
    var ntlReg = /^(?:das\s)(?:[A-Z][\wäüöß]+)/gm;
    var fmlReg = /^(?:die\s)(?:[A-Z][\wäüöß]+)/gm;

    var arr = new Array();
    while ((arr = mscReg.exec(txt)) !== null) {
        console.log(arr[0]);
        arr[0] = arr[0] +'\n\r';
        fs.appendFile('words.txt',arr[0],function(err){
            if(err) throw err;
        })
      }

    while ((arr = ntlReg.exec(txt)) !== null) {
        console.log(arr[0]);
        arr[0] = arr[0] +'\n\r';
        fs.appendFile('words.txt',arr[0],function(err){
            if(err) throw err;
        })
      }

    while ((arr = fmlReg.exec(txt)) !== null) {
        console.log(arr[0]);
        arr[0] = arr[0] +'\n';
        fs.appendFile('words.txt',arr[0],function(err){
            if(err) throw err;
        })
      }

});
