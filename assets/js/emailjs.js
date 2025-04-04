window.onload = function() {
  emailjs.init("-gMGTTLfYi9HXtibk");
};

document.getElementById('sendMessage').addEventListener('click', function () {
  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (!fullname || !email || !subject || !message) {
      showToast('warningToast');
      return;
  }

  if (!validateEmail(email)) {
      showToast('emailToast');
      return;
  }
  
  const templateParams = {
      from_name: fullname,
      from_email: email,
      subject: subject,
      message: message
  };

  const progressBar = document.getElementById('progressBar');
  progressBar.classList.remove('d-none');
  progressBar.children[0].style.width = "0%";
  
  let progress = 0;
  const progressInterval = setInterval(() => {
      if (progress < 100) {
          progress += 20;
          progressBar.children[0].style.width = progress + "%";
      } else {
          clearInterval(progressInterval);
      }
  }, 500);
  
  emailjs.send('service_85z5c8j', 'template_iyct3bm', templateParams)
      .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
          clearInterval(progressInterval);
          progressBar.children[0].style.width = "100%";
          setTimeout(() => progressBar.classList.add('d-none'), 1000);

          showToast('successToast');
          document.getElementById('contactForm').reset();
      }, function (error) {
          console.log('FAILED...', error);
          clearInterval(progressInterval);
          progressBar.classList.add('d-none');
          showToast('errorToast');
      });
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

function showToast(toastId) {
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
