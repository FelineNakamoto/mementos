var fs = require('fs');
var vocabulary = {};
fs.readFile('words.txt',function(err,data){
    if(err) throw err;  
    var array = data.toString().split('\n');
    for (var i=0; i<array.length; i++){
        var a = array[i].split(" ");
        addWord(a[0],a[1]);
    }
    var str = JSON.stringify(vocabulary);
    fs.writeFile('json.txt',str,function(err){
        if(err) throw err;
    })
})

function addWord(gender, word){
    vocabulary[word] = gender;
}