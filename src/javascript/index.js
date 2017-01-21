$(function() {
  var $nextBtn = $('.next.btn'), 
      $prevBtn = $('.prev.btn'),
      $section = $('section'), 
      $body = $('body');

  var length = $section.length - 1;
  var pages = {
    current: 0,
    next: 1,
    prev: -1
  };

  $body.stop().animate({scrollTop: 0});
  $body.on('mousewheel', scrollMove)
  $nextBtn.on('click', scrollNext)
  $prevBtn.on('click', scrollPrev)

  function updatePages(num) {
    _.each(pages, function(v, k, obj) {
      obj[k] = v + num
    });
  }

  function scrollMove(e) {
    if (pages.prev > -1 && e.originalEvent.deltaY < 0) {
      scrollPrev();
    } else if (pages.next <= length && e.originalEvent.deltaY > 0) {
      scrollNext();
    }
    e.preventDefault();
    e.stopPropagation();
  }

  function scrollNext() {  
    if (pages.next > length) return;
    $body.stop().animate({
      scrollTop: $section.eq(pages.next).offset().top
    }, 1000, function() {
      updatePages(1);
      if (pages.current > 0) { 
        $prevBtn.show(); 
      }
      if (pages.current === length) {
        $nextBtn.text("NEXT");
      }
    })
  }

  function scrollPrev() {
    $body.stop().animate({
      scrollTop: $section.eq(pages.prev).offset().top
    }, 1000, function() {
      updatePages(-1);
      if (pages.current <= 0) { 
        return $prevBtn.hide();
      }
    })
  }
})
