console.log('script.js загружен');

let popup1 = document.querySelector('.modal');
let popup2 = document.querySelector('.contacts .modal');
let openPopupButton1 = document.querySelector('.button-open');
let openPopupButton2 = document.querySelector('.contacts .button-open');
let closePopupButton1 = popup1.querySelectorAll('.button-close');
let closePopupButton2 = popup2.querySelectorAll('.button-close');

openPopupButton1.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup1.classList.add('modal--show');
});
openPopupButton2.addEventListener('click', function (evt) {
  evt.preventDefault();
  popup2.classList.add('modal--show');
});

for (let i = 0; i < closePopupButton1.length; i++) {
  closePopupButton1[i].addEventListener('click', function () {
    popup1.classList.remove('modal--show');
  });
}

for (let i = 0; i < closePopupButton2.length; i++) {
  closePopupButton2[i].addEventListener('click', function () {
    popup2.classList.remove('modal--show');
  });
}

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    popup1.classList.remove('modal--show');
    popup2.classList.remove('modal--show');
  }
});

function openAnswer(number) {
  let faq = document.querySelector('.faq-' + number);
  let answer = faq.querySelector('.answer');
  let btn = faq.querySelector('.btn');

  if (answer.classList.contains('hide')) {
    answer.classList.remove('hide');
    btn.classList.replace('plus', 'minus');
  } else {
    answer.classList.add('hide');
    btn.classList.replace('minus', 'plus');
  }
};

//Проскролить блоги
let blogs = document.querySelector('.blogs');
let blogList = blogs.querySelectorAll(".blog");
blogs.scrollBy(0.5 * (640 - 54), 0);
