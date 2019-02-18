const CALC_URL = 'http://localhost:3000/calculator';

let $sendButton = $('.control input[type=submit]');
$sendButton.on('click', function (evt) {
    evt.preventDefault();

    let phone = $priceCalculator.find('#phone')[0].value;
    let marketPrice = $priceCalculator.find('#market-price')[0].value;

    let data = {}
    data.phone = phone;
    data.marketPrice = marketPrice;

    $allCheckBox.each(function () {
        data[this.id.toString()] = this.checked;
    })

    data.totalPrice = $price[0].textContent;

    let jsonData = JSON.stringify(data);
    postJson(CALC_URL, jsonData)
})
