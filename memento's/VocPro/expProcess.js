
//do gethis when JSON is fetched
var roms = new Array();
expJSON[0].hits.forEach(function(el){roms.push(el.roms)})
var headers = new Array();
//A rom contains a headword and linguistic data related to this headword. 
//The headword is usually the word you would lookup in a printed dictionary. 

//for concise explaination only the first entry is displayed


// var cExpList = $('#cExpList')
// var dExpList = $('#dExpList')
// headers.forEach(function(header){
//   $('<li/>').html(header).appendTo(cExpList);
// })

// cExpList.on('click','li',function(){
//   dExpList.empty();
//   roms[0][0].arabs[$(this).index()].translations.forEach(function(translation) {
//     var li = $('<li/>').appendTo(dExpList);
//     $('<p/>').html(translation.source).appendTo(li);
//     $('<p/>').html(translation.target).appendTo(li);
//   });
// })

function getFullHeadWord() {
  return roms[0][0].headword_full;
}

function getHeaders(){
  roms.forEach(function(rom){
    var arabs = rom[0].arabs;
      arabs.forEach(function(arab){
        if(arab.header.toString().length>0){
          headers.push(arab.header);
        }
      })
  })
}