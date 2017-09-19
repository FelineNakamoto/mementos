$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('.btn').hover(function(){
  $(this).tooltip('show')
})

$('#listBtn').click(function(){
  $('#appCon').toggleClass('col-12').toggleClass('col-9');
  $('#mistakeList').toggle();
})