$(function() {
  // // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyBBj6nL4bI6HRCRUUxWiVnnE1RxTvvZSWQ",
  //   authDomain: "firstfirebase-7edfd.firebaseapp.com",
  //   databaseURL: "https://firstfirebase-7edfd.firebaseio.com",
  //   storageBucket: "firstfirebase-7edfd.appspot.com",
  //   messagingSenderId: "184350321647"
  // };
  // firebase.initializeApp(config);

  // var database = firebase.database();
  // var auth = firebase.auth();
  
  // auth.signInAnonymously().catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   alert(errorCode, errorMessage);
  //   // ...
  // });

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
  $body.on({
    'mousewheel': wheelMove,
    'keydown': keyMove,
  });
  $nextBtn.on('click', scrollNext);
  $prevBtn.on('click', scrollPrev);

  function updatePages(num) {
    _.each(pages, function(v, k, obj) {
      obj[k] = v + num
    });
  }

  function wheelMove(e) {
    if (pages.prev > -1 && e.originalEvent.deltaY < 0) {
      scrollPrev();
    } else if (pages.next <= length && e.originalEvent.deltaY > 0) {
      scrollNext();
    }
    e.preventDefault();
    e.stopPropagation();
  }

  function keyMove(e) {
    if (e.which == 40 || e.which == 32) {
      scrollNext();
    }
    if (e.which == 38) {
      scrollPrev();
    }
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
        // $('.btn.next').hide();
        $('.btn.next').html("<a href='blog.html'>확인하기</a>")
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
      if (pages.current !== length) {
        $('.btn.next').show();
      }
    })
  }
})