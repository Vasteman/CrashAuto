const CALL_REQUEST_URL = 'http://localhost:3000/client';
const CALC_URL = 'http://localhost:3000/calculator';

let $sendButton = $('.control input[type=submit]');
$sendButton.on('click', function (evt) {
    evt.preventDefault();

    let phone = $priceCalculator.find('#phone')[0].value;
    let marketPrice = $priceCalculator.find('#market-price')[0].value;

    let data = {};
    data.phone = phone;
    data.marketPrice = marketPrice;

    data.equipment = {}
    $allCheckBox.each(function () {
        data.equipment[this.id.toString()] = this.checked;
    })

    data.totalPrice = $price[0].textContent;

    let jsonData = JSON.stringify(data);
    postJson(CALC_URL, jsonData);
})

let $callRequestBtn = $('input[type=submit].btn-call-request');
$callRequestBtn.on('click', function (evt) {
    evt.preventDefault();

    let name = $('.request-call-form').find('#name')[0].value;
    let phone = $('.request-call-form').find('#phone')[0].value;

    let user = JSON.stringify({
        name: name,
        phone: phone,
        date: new Date()
    });
    postJson(CALL_REQUEST_URL, user);

    //#region oldRequest
    /*
        const Http = new XMLHttpRequest();
        Http.open("POST", URL);
        Http.send(user);
        console.log("Отправлено " + user);
        Http.onreadystatechange = (e) => {
            console.log(Http.responseText)
    }*/
    //#endregion
});

function postJson(url, jsonCode) {
    return fetch(url, {
        method: "POST",
        body: jsonCode,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
}