let $popup = $('.modal');
let $openPopupButton = $('.button-open');
let $closePopupButton = $('.button-close');
window.addEventListener('click', outsideClick);
function outsideClick(e) {
    if (e.target == $popup[0]) {
        $popup.removeClass('modal--show');
    }
}

$openPopupButton.on('click', function (evt) {
    evt.preventDefault();
    $popup.addClass('modal--show');
});

$closePopupButton.on('click', function () {
    $popup.removeClass('modal--show');
});

$(document).on('keydown', function (evt) {
    if (evt.keyCode === 27) {
        $popup.removeClass('modal--show');
    }
});

//if ($popup.hasClass('modal--show')) {
$('.modal.modal--show::after').on('click', function () {
    console.log('закрыл')
    $popup.removeClass('modal--show');
});
//}
function openAnswer(number) {
    let $faq = $('.faq-' + number);
    let $answer = $faq.find('.answer');
    let $btn = $faq.find('.btn');
    if ($answer.hasClass('hide')) {
        $answer.removeClass('hide');
        $btn.removeClass('plus');
        $btn.addClass('minus');
    } else {
        $answer.addClass('hide');
        $btn.removeClass('minus');
        $btn.addClass('plus');
    }
}

let $blogs = $('.blogs');
$blogs[0].scrollTo(333, 0);
let $blogList = $blogs.find(".blog");
let $leftBlog = $($blogList[0]);
let $mainBlog = $($blogList[1]);
let $rightBlog = $($blogList[2]);
$leftBlog.on('mouseover', function () {
    $blogs[0].scrollTo(0, 0);
})
$mainBlog.on('mouseover', function () {
    $blogs[0].scrollTo(333, 0);
})
$rightBlog.on('mouseover', function () {
    $blogs[0].scrollTo(640, 0);
})

/*
console.log("Клиент: " + user.name);
console.log("Телефон: " + user.phone);
console.log("Дата запроса: " +
    user.date.toLocaleDateString() + ' '
    + user.date.toLocaleTimeString());
*/