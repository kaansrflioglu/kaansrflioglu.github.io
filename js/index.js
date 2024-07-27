$(window).on('load', function () {
  gsap.to('#loader', 1, { y: "-100%" });
  gsap.to('#loader', 1, { opacity: 0 });
  gsap.to('#loader', 0, { display: "none", delay: 1 });
  gsap.to('#header', 0, { display: "block", delay: 1 })
  gsap.to('#navigation-content', 0, { display: "none" });
  gsap.to('#navigation-content', 0, { display: "flex", delay: 1 });
});

$(function () {
  $('.color-panel').on("click", function (e) {
      e.preventDefault();
      $('.color-changer').toggleClass('color-changer-active');
  });

  $('.colors a').on("click", function (e) {
      e.preventDefault();
      var attr = $(this).attr("title");
      $('head').append('<link rel="stylesheet" href="css/' + attr + '.css">');
  });

  $('.menubar').on('click', function () {
      gsap.to('#navigation-content', .6, { y: 0 });
  });

  $('.navigation-close').on('click', function () {
      gsap.to('#navigation-content', .6, { y: "-100%" });
  });

  $('#about-link').on('click', function () {
      navigateToSection('#about');
  });

  $('#contact-link').on('click', function () {
      navigateToSection('#contact');
  });

  $('#certificate-link').on('click', function () {
      navigateToSection('#certificate');
  });

  $('#project-link').on('click', function () {
      navigateToSection('#project');
  });

  $('#home-link').on('click', function () {
      navigateToSection('#header');
  });

  function navigateToSection(sectionId) {
      gsap.to('#navigation-content', 0, { display: "none", delay: .7 });
      gsap.to('#navigation-content', 0, { y: '-100%', delay: .7 });
      gsap.to('#header', 0, { display: "none" });
      gsap.to('#about', 0, { display: "none" });
      gsap.to('#certificate', 0, { display: "none" });
      gsap.to('#contact', 0, { display: "none" });
      gsap.to('#project', 0, { display: "none" });
      gsap.to('#breaker', 0, { display: "block" });
      gsap.to('#breaker-two', 0, { display: "block", delay: .1 });
      gsap.to('#breaker', 0, { display: "none", delay: 2 });
      gsap.to('#breaker-two', 0, { display: "none", delay: 2 });
      gsap.to(sectionId, 0, { display: "block", delay: .7 });
      gsap.to('#navigation-content', 0, { display: 'flex', delay: 2 });
  }

  var TxtRotate = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 100;
      }

      setTimeout(function () {
          that.tick();
      }, delta);
  };

  window.onload = function () {
      var elements = document.getElementsByClassName('txt-rotate');
      for (var i = 0; i < elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
              new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666 ; }";
      document.body.appendChild(css);
  };
});

(function() {
  emailjs.init("-gMGTTLfYi9HXtibk"); 
})();

document.getElementById('submit').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const body = document.getElementById('body').value;

  const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: body
  };

  emailjs.send('service_85z5c8j', 'template_iyct3bm', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('E-posta başarıyla gönderildi!');
          document.getElementById('myForm').reset();
      }, function(error) {
          console.log('FAILED...', error);
          alert('E-posta gönderilirken bir hata oluştu.');
      });
});