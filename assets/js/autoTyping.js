var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { color:#ffffff;font-weight:500; font-family: sans-serif; }";
    document.body.appendChild(css);
  };


// Wrap every letter in a span
var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
    .add({
      targets: '.ml7 .letter',
      translateY: ["1.1em", 0],
      translateX: ["0.55em", 0],
      translateZ: 0,
      rotateZ: [180, 0],
      duration: 750,
      easing: "easeOutExpo",
      delay: (el, i) => 50 * i
    }).add({
  targets: '.ml7',
  opacity: 0,
  duration: 1000,
  easing: "easeOutExpo",
  delay: 1000
});


//
// // Wrap every letter in a span
// var textWrapper = document.querySelector('.ml11 .letters');
// textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");
//
// anime.timeline({loop: true})
//     .add({
//         targets: '.ml11 .line',
//         scaleY: [0,1],
//         opacity: [0.5,1],
//         easing: "easeOutExpo",
//         duration: 700
//     })
//     .add({
//         targets: '.ml11 .line',
//         translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
//         easing: "easeOutExpo",
//         duration: 700,
//         delay: 100
//     }).add({
//     targets: '.ml11 .letter',
//     opacity: [0,1],
//     easing: "easeOutExpo",
//     duration: 600,
//     offset: '-=775',
//     delay: (el, i) => 34 * (i+1)
// }).add({
//     targets: '.ml11',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
// });