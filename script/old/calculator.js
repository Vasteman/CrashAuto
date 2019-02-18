let priceCalculator = document.querySelector('.price-calculator');
let allCheckBox = priceCalculator.querySelectorAll('.variants .form-group input');
let output = priceCalculator.querySelector('.card-for-choose .chosen-amount .amount');
let calculatorMenuBtns = priceCalculator.querySelectorAll('.radio-menu input');
let calculatorMenuLabel = priceCalculator.querySelectorAll('.radio-menu label');
let pageChangers = priceCalculator.querySelectorAll('.arrow');
let prevPage = pageChangers[0];
let nextPage = pageChangers[1];
let price = priceCalculator.querySelector('.price .sum');
let resetParamsBtn = priceCalculator.querySelector('.reset-params');
let listOfCalculatorSections = priceCalculator.querySelectorAll('.card-for-choose ul li');
let pageNumber = priceCalculator.querySelector('.page-lister .page-number');

let calculatorMenuSection = 1;
let checkedNumber = 0;

// Click-events для кнопок смены раздела
for (let i = 0; i < calculatorMenuBtns.length; i++) {
  calculatorMenuBtns[i].addEventListener('click', function () {
    changeCalculatorSection(this.value);
  });
}

// calculatorMenuBtns = calculatorMenuBtns.map(x => x.addEventListener('click', function () {
//   changeCalculatorSection(this.value);
// }))

// Click-events для чекбоксов
for (let i = 0; i < allCheckBox.length; i++) {
  allCheckBox[i].addEventListener('click', function () {
    if (this.checked) {
      checkedNumber++;
    } else {
      checkedNumber--;
    }
    output.textContent = checkedNumber;
    price.textContent = getPrice();
  });
}

// Click-event для кнопки "Сбросить параметры"
resetParamsBtn.addEventListener('click', function () {
  for (let i = 0; i < allCheckBox.length; i++) {
    allCheckBox[i].checked = false;
  }
  checkedNumber = 0;
  output.textContent = checkedNumber;
  price.textContent = getPrice();
});

// Click-events для кнопок "вправо"-"влево"
prevPage.addEventListener('click', function () {
  if (this.classList.contains('disabled')) { return; }
  changeCalculatorSection(+calculatorMenuSection - 1);
});
nextPage.addEventListener('click', function () {
  if (this.classList.contains('disabled')) { return; }
  changeCalculatorSection(+calculatorMenuSection + 1);
});

//Изменение отображаемого раздела
function changeCalculatorSection(sectionNumber) {
  //изменили номер текущей секции
  calculatorMenuSection = sectionNumber;
  //включили(выключили) кнопки переключения секции, если необходимо
  prevPage.classList.remove('disabled');
  nextPage.classList.remove('disabled');
  if (sectionNumber == 1) {
    prevPage.classList.add('disabled');
  } else if (sectionNumber == 6) {
    nextPage.classList.add('disabled');
  }

  //переключили главное меню в текущую секцию
  calculatorMenuBtns[sectionNumber - 1].checked = true;

  //Переключили основное содержимое
  for (let i = 0; i < 6; i++) {
    if (i == sectionNumber - 1) {
      listOfCalculatorSections[i].hidden = false;
      continue;
    }
    listOfCalculatorSections[i].hidden = true;
  }

  //показали номер текущей секции
  pageNumber.textContent = "0" + sectionNumber;
}

function getPrice() {
  let sum = 0;
  for (checkBox of allCheckBox) {
    if (checkBox.checked) {
      sum += +checkBox.value;
    }
  }
  return sum;
}

console.log('calculator.js загружен');