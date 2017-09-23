$(document).ready(function(){
  for(let verb in verbs){
    let tr = $('<tr/>').appendTo($('tbody'));   
    let inf = $('<td/>').addClass('infinitive').attr('id','w-'+verbs[verb]["infinitive"]).text(verbs[verb]["infinitive"]).appendTo(tr); 
    let past = $('<td/>').addClass('pastTense').text(verbs[verb]["pastTense"]).appendTo(tr);
    let perfect = $('<td/>').addClass('presentPerfect').text(verbs[verb]["presentPerfect"]).appendTo(tr);  
  }
})


$('#searchBtn').click(function(){
  var selection = window.getSelection().toString()
  window.location = 'https://en.pons.com/translate?q='+selection+'&l=deen&in=de&lf=de'
})

$('#quizBtn').click(function(){
  $('.pastTense').each(function(el){
    $(this).text('').addClass('editable');
  })
})

$('#jumpTopBtn').click(function(){
  $('thead').addClass('bounce'); 
  var t =setTimeout(function() {
    $('thead').removeClass('bounce'); 
  }, 1000);  
})
$('#jumpBottomBtn').click(function(){
  $('#bottom').addClass('bounce'); 
  var t =setTimeout(function() {
    $('#bottom').removeClass('bounce'); 
  }, 1000);  
})