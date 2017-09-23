var qInput = $('#queryInput');
var word = $('#word');
var gInput = $('.gender');
var mColor = 'tomato';
var nColor = 'steelblue';
var fColor = 'limegreen';
var eList = $('#entryList');

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  gInput.eq(0).focus();
  defaultColor = word.css('color') 
})


$('.btn').hover(function(){
  $(this).tooltip('show')
})

$('#listBtn').click(function(){
  $('#appCon').toggleClass('col-12').toggleClass('col-9');
  $('#mistakeList').toggle();
})


$('#searchBtn').click(function(){
  eList.empty();
  qInput.val('');
  inputSlide(qInput);
})
qInput.keyup(function(){
  var result = getEntry(qInput.val());
  if(result.length>0){
    eList.empty();
    if(result.length>5) result = result.slice(0,5);
    result.forEach(function(el){
      $('<li/>').text(el).appendTo(eList);
    })
  }else qInput.addClass('redBorder');
})

eList.on('mousedown','li',function(){
  loadWord($(this).text());
  eList.toggle();
})
eList.on('mouseenter','li',function(){
  switch(vocabulary[$(this).text()]){
    case 'der': $(this).addClass('mBg'); break;
    case 'das': $(this).addClass('nBg'); break;
    case 'die': $(this).addClass('fBg'); break;
    default: break;
  }
})
eList.on('mouseleave','li',function(){
  switch(vocabulary[$(this).text()]){
    case 'der': $(this).removeClass('mBg'); break;
    case 'das': $(this).removeClass('nBg'); break;
    case 'die': $(this).removeClass('fBg'); break;
    default: break;
  }
})

gInput.keyup(function(event){
  if (event.keyCode >= 65 && event.keyCode <= 90){
    var letter = String.fromCharCode(event.keyCode).toLowerCase();
    $(this).text(letter);
    //input[$(this).index()] = letter;
    if ($(this).index() === 2) {
        check();
    }else $(this).next().focus();
  } else switch(event.keyCode){
    case 38:  //left arrow37 up arrow38 right arrow	39 down arrow	40
    case 37:
      $(this).prev().focus();  
      break;
    case 39:
    case 40:
      $(this).next().focus();
      break;
    case 13: //enter
    case 8:  //backspace
    case 32: //space
      clearInput($(this));
      break;
    case 27: $(this).blur(); break;
    case 49: fillInput('der'); break;
    case 50: fillInput('das'); break;
    case 51: fillInput('die'); break;
    case 112: break;
    default: break;
    }
})

var fillInput = function(str){
  for(var i=0;i<str.length;i++){
      gInput.eq(i).text(str.charAt(i));
  }
  var time = setTimeout(check(),200);
}

var inputSlide = function(el){
  el.animate({
    width:'toggle'
  },300,function(){
    el.focus();
  });
}

function check(){
  var str = gInput.eq(0).text() + gInput.eq(1).text() + gInput.eq(2).text();
  if(str == vocabulary[word.text()]){
    switch(str){
        case 'der':
        colorize(mColor);
        break;
        case 'das':
        colorize(nColor);
        break;
        case 'die':
        colorize(fColor);
        break;
    }
  }else{
    $('#hint-wrong').fadeIn("slow",function(){
      $('#hint-wrong').delay(400).fadeOut();
        gInput.eq(1).focus();
    })
    // mistakes.add(word.text());
  }
}

var loadWord = function() {
    clearInput(gInput);
    if(arguments.length == 0){
      $('#word').css('color', defaultColor).text(randomPropertyName(vocabulary)).fadeIn();
    } else $('#word').css('color', defaultColor).text(arguments[0]).fadeIn();
    gInput.eq(0).focus();
}

function clearInput(item){
  item.text('\u00a0\u00a0');
}

function colorize(color){
  word.css('color',color).delay(300).fadeOut(function(){
      loadWord();
  })
}
function getEntry(query){
  var arr = new Array();
  var exp = new RegExp(query,'gim');
  for(var i in vocabulary){
    if(exp.test(i)) arr.push(i)
  }
  return arr;
}

