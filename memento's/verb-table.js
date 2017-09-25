var modes = ['preterite', 'perfect', 'both', 'off']
var map = ['.pastTense', '.presentPerfect', 'both', 'off']
var modeFlag = 3;

$(document).ready(function () {
  $('#topNav').html(topNavbarInnerHTML);
  $('#rfrc').addClass('active');
  refreshTable();
})

var refreshTable = function () {
  $('tbody').empty();
  for (let verb in verbs) {
    let tr = $('<tr/>').addClass('animated').appendTo($('tbody'));
    let inf = $('<td/>').addClass('infinitive unchecked').text(verbs[verb]["infinitive"]).appendTo(tr);
    let past = $('<td/>').addClass('pastTense animated').attr('spellcheck', 'false').text(verbs[verb]["pastTense"]).appendTo(tr);
    let perfect = $('<td/>').addClass('presentPerfect animated').attr('spellcheck', 'false').text(verbs[verb]["presentPerfect"]).appendTo(tr);
  }
  $('tr').last('').attr('id','bottom')
}

$('#searchBtn').click(function () {
  var selection = window.getSelection().toString()
  if (selection.length == 0) {
    $('#mdl').modal();
    $('#mdl').find('.modal-body p').text('Please select a word first');
  } else {
    let url = 'https://en.pons.com/translate?q=' + selection + '&l=deen&in=de&lf=de';
    window.open(url, '_blank')
  }
})

$('#quizBtn').click(function () {
  modeFlag = (modeFlag + 1) % 4
  modeFlag == 0 && $('#counterBtn').slideToggle();
  $this = $(this)
  $this.find('span').text(modes[modeFlag])
  modeFlag == 3 && $('#counterBtn').slideToggle();
  setMode();
})

var setMode = function () {
  modeFlag == 2 || refreshTable()
  updateNum();
  modeFlag == 2 && $(map[0]).each(function (el) {
    $(this).text(' ').addClass('editable')
  })
  modeFlag < 2 && clearAndFill()
}

var clearAndFill = function () {
  $(map[modeFlag]).each(function (el) {
    $(this).text('').toggleClass('editable')
  })
  $(map[!modeFlag]).each(function (el) {
    let verb = getVerb($(this))
    let conjugation = ''
    conjugation = modeFlag == 0 ? perfect(verb) : preterite(verb)
    $(this).text(conjugation)
  })
}


$('table').on('keyup', 'td.pastTense', function (event) {
  switch (event.keyCode) {
    case 13: //enter
      let $this = $(this)
      if (check($this)) {
        correctAnimate($this)
        modeFlag==2 ? $this.siblings('.presentPerfect').focus() : $this.parent().next().find('.pastTense').focus()
      }
      break;
    case 27: $this.blur(); break;
    default: break;
  }
})

$('table').on('keyup', 'td.presentPerfect', function (event) {
  switch (event.keyCode) {
    case 13: //enter
      let $this = $(this)
      if (check($this)) {
        correctAnimate($this)
        $this.siblings('.infinitive').removeClass('unchecked').parent().fadeOut(500, function () {
          updateNum()
          $this.parent().next().find('.pastTense').focus()
        })
      }
      break;
    case 27: $this.blur(); break;
    default: break;
  }
})


var check = function ($this) {
  let input = $this.text()
  let verb = getVerb($this)
  let answer = $this.hasClass('pastTense') ? preterite(verb) : perfect(verb)
  if (input == answer) return 1
  else return 0
}

var correctAnimate = function (obj) {
  jQuery(obj).animate({
    color: '#46B29D',
    backgroundColor: jQuery.Color('rgba(70,178,157,0.1)')
  }, 300)
}

var preterite = function (verb) {
  return verbs[verb]["pastTense"]
}
var perfect = function (verb) {
  return verbs[verb]["presentPerfect"]
}
var getVerb = function (obj) {
  return obj.siblings('.infinitive').text()
}
var updateNum = function () {
  $('#counter').text($('.unchecked').length);
}

$('#jumpTopBtn').click(function () {
  $('thead').addClass('bounce');
  var t = setTimeout(function () {
    $('thead').removeClass('bounce');
  }, 1000);
})
$('#jumpBottomBtn').click(function () {
  $('#bottom').addClass('bounce');
  var t = setTimeout(function () {
    $('#bottom').removeClass('bounce');
  }, 1000);
})