$(function() {

  'use strict';

  var

  $window  = $(window),
  $head = $('head'),

  fixedClass = '.fixed{position:fixed;top:0;z-index:10;}',
  $style = $('<style />', {id:'sticky', html: fixedClass}),

  parent   = $('[data-sticky-parent]'),
  target   = $('[data-sticky-target]'),

  targetWidth, targetHeight;


  $window.on('scroll load', function() {

    if (parent.length && target.length) {

      var
      scrollTop = $(this).scrollTop(),

      parentHeight = parent.height(),
      parentOffset = parent.offset().top;

      if (!targetWidth && !targetHeight) {
        targetWidth = target.innerWidth();
        targetHeight = target.innerHeight();
      }

      if (scrollTop > parentOffset && scrollTop < (parentOffset + parentHeight)) {
      target.css({
        width: targetWidth,
        maxHeight: targetHeight
      }).addClass('fixed');
      
      if (!$head.find('#sticky').length) {
        $head.append($style);
      }
    } else {
      target.css({
        width: 'auto',
        maxHeight: 'none'
      }).removeClass('fixed');
      $('#sticky').remove();
    }

  } else if (!parent.length) {
    console.error('Sticky parent not defined.');
  } else if (!target.length) {
    console.error('Sticky target not defined.');
  }

  });

});
