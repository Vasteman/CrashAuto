let $priceCalculator = $('.price-calculator');

let $allCheckBox = $priceCalculator.find('.variants .form-group input');
let $labelForCheckedOptionsAmount = $priceCalculator.find('.card-for-choose .chosen-amount .amount');
let $listOfMenuBtn = $priceCalculator.find('.radio-menu input');
let $pageChangers = $priceCalculator.find('.arrow');
let $prevPage = $($pageChangers[0]);
let $nextPage = $($pageChangers[1]);
let $price = $priceCalculator.find('.price .sum');
let $resetParamsBtn = $priceCalculator.find('.reset-params');
let $listOfSections = $priceCalculator.find('.card-for-choose ul li');
let $pageNumber = $priceCalculator.find('.page-lister .page-number');

let currentSection = 1;
let amountOfCheckedOptions = 0;

$listOfMenuBtn.on('click', function () {
    changeVisibleSection(this.value);
})

$allCheckBox.on('click', function () {
    if (this.checked) {
        amountOfCheckedOptions++;
    } else {
        amountOfCheckedOptions--;
    }
    $labelForCheckedOptionsAmount.html(amountOfCheckedOptions);
    $price.html(getPrice());
})

$resetParamsBtn.on('click', function () {
    $allCheckBox.each(function () {
        this.checked = false;
    })
    amountOfCheckedOptions = 0;
    $labelForCheckedOptionsAmount.html(amountOfCheckedOptions);
    $price.html(getPrice());
})

$pageChangers.on('click', function () {
    if ($(this).hasClass('disabled')) { return; }
    if ($(this).hasClass('left-arrow')) {
        changeVisibleSection(+currentSection - 1);
    }
    if ($(this).hasClass('right-arrow')) {
        changeVisibleSection(+currentSection + 1);
    }
})

/**
 * Переключить раздел калькулятора на newSection
 * 
 * @param {number} newSection  номер раздела, на который необходимо переключиться
 */
function changeVisibleSection(newSection) {
    currentSection = newSection;

    $pageChangers.removeClass('disabled');
    if (newSection == 1) {
        $prevPage.addClass('disabled');
    } else if (newSection == 6) {
        $nextPage.addClass('disabled');
    }

    $listOfMenuBtn[newSection - 1].checked = true;

    //Переключили основное содержимое
    $listOfSections.each(function () {
        this.hidden = true;
    })
    $listOfSections[newSection - 1].hidden = false;

    //показали номер текущей секции
    $pageNumber.html("0" + newSection);
}

function getPrice() {
    let sum = 0;
    $allCheckBox.each(function () {
        if (this.checked) {
            sum += +this.value;
        }
    })
    return sum;
}