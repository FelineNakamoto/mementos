var randomPropertyName = function(obj){
    var keys= Object.keys(obj);
    return keys[Math.round(keys.length*Math.random())];
}

// var fillWord = function(word){
//     $('#word').text(word);
// }



// $(document).ready(function(){
//     var vocabulary = JSON.parse(txt);
//     var rndm = randomPropertyName(vocabulary);
//     fillWord(rndm);
//     var gender = vocabulary[rndm];
// })