'use strict';

var TAGS_NUMBER = 8; // колличество меток
var ENTER_KEYCODE = 13; // Unicode клавише ENTER
var ESC_KEYCODE = 27;
var MIN_COORDINATE = 130; // минимальная координата
var MAX_COORDINATE = 630; // максимальная координата
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]; // виды удобств
var prices = [1000, 1500, 500, 3200, 1100, 5000, 4500, 3200];
var MIN_ROOMS = 2; // минимальное количество комнат
var MAX_ROOMS = 7; // максимальное количество комнат
var popup = document.querySelector('#card').content.querySelector('.popup'); // карточка
var popupClone = popup.cloneNode(true); // клонирует карточку
var popupCloneTitle = popupClone.querySelector('.popup__title'); // заголовок в карточке
var popupCloneTextAddress = popupClone.querySelector('.popup__text--address'); // адрес
var popupCloneTextPrice = popupClone.querySelector('.popup__text--price'); // цена
var popupCloneType = popupClone.querySelector('.popup__type'); // тип в карточке
var popupCloneTextCapacity = popupClone.querySelector('.popup__text--capacity'); // комнаты
var popupCloneTextTime = popupClone.querySelector('.popup__text--time'); // время заезда и выезда
var popupCloneFeaturesContainer = popupClone.querySelector('.popup__features'); // список типов
var type = document.querySelector('#type');
var popupCloneDescription = popupClone.querySelector('.popup__description'); // описание
var popupClonePhoto = popupClone.querySelector('.popup__photo'); // фото в карточке
var popupCloneAvatar = popupClone.querySelector('.popup__avatar'); // аватар
var tags = []; // даные меток
var adForm = document.querySelector('.ad-form'); // форма.
var propertyTypes = [
  'flat',
  'bungalo',
  'house',
  'palace'
];
var mapPinMain = document.querySelector('.map__pin--main'); // кнопка
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('.map__pin');
var map = document.querySelector('.map');
var headers = [
  'Квартира в центре Москвы',
  'Квартира на улице Севастопольской',
  'Квартира на улице Бабушкиной',
  'Дом на улице Севастопольской',
  'Дом на улице Гаврирова ',
  'Квартира на улице Яблоновской',
  'Квартира на улице Рашпилевской',
  'Квартира на улице Белозёрной'
];
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var address = document.querySelector('#address');
var adFormSubmit = document.querySelector('.ad-form__submit');
var fragment = document.createDocumentFragment();
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var timein = document.querySelector('#timein');
var description = [
  'Есть телевизор, газовая плита, стиральная машина.',
  'Есть диван, мебельная стенка, микроволновая печь.',
  'Есть телевизор, кровать, шкаф для одежды',
  'Есть кухонный гарнитур, холодильник, электрическая плита.',
  'Есть кровать, тумба, микроволновая печь.',
  'Есть стиральная машина, телевизор',
  'Есть диван, шкаф для одежды',
  'Есть холодильник, микроволновая печь'
];
var timeArrivals = [12, 13, 14];
var timeout = document.querySelector('#timeout');
var mapFilter = document.querySelector('.map__filter');
var tagNumber;
var price = document.querySelector('#price');

function getRandomInRange(min, max) { // генератор рандомных чисел
  return Math.floor(Math.random() * (max - min + 1)) + min; // переводит в нужный деапозон рандомное число
}

function makeMark(tagOptions) {
  var label = mapPin.cloneNode(true);
  label.dataset.index = i + 1;
  label.setAttribute('style', 'left:' + tagOptions.location.x + 'px; top:' + tagOptions.location.y + 'px;');
  label.querySelector('img').src = tagOptions.author.avatar; // в картинку записаваем адрес аватара
  label.querySelector('img').dataset.index = i + 1;
  fragment.appendChild(label); // вставляем метку в
}
function generateRandomFeatures() {
  var actualFeatures = [];
  for (var i = 0; i < features.length; i++) {
    if (getRandomInRange(0, 1)) {
      actualFeatures[actualFeatures.length] = features[i];
    }
  }
  return actualFeatures;
}
function activatePage(property) { // функция выдает состояние сайта.
  for (i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = property; // разрешает или запрещает изменять форму.
  }
  if (!property) { // если нужно активировать сайт то
    address.disabled = true;
    adForm.classList.remove('ad-form--disabled'); // разрешает изменять форму
    map.classList.remove('map--faded'); // убирает круг вокруг метки и текст
    map.insertBefore(fragment, mapFiltersContainer); // вставляет метки
    mapPins.appendChild(popupClone); // вставляет карточку
  }
}

address.value = Number.parseInt(mapPinMain.style.left + mapPinMain.style.width / 2, 10) + ' ' + Number.parseInt(mapPinMain.style.top + mapPinMain.style.height, 10);
popupCloneFeaturesContainer.innerHTML = null; // отключить
popupClone.style.display = 'none';
mapPins.appendChild(popupClone); // вставляет клон
var popupClose = document.querySelector('.popup__close');
for (var i = 0; i < TAGS_NUMBER; i++) { // записывает свойста меткам
  var randomLocationX = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату х
  var randomLocationY = getRandomInRange(MIN_COORDINATE, MAX_COORDINATE); // создает рандомную координату у
  var checkTime = timeArrivals[getRandomInRange(0, 2)];
  tags[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png' // адрес аватара
    },
    offer: {
      title: headers[i], // заголовок
      address: randomLocationX + ', ' + randomLocationY, // адрес
      price: prices[i], // цена
      type: propertyTypes[getRandomInRange(0, 3)], // тип
      rooms: getRandomInRange(MIN_ROOMS, MAX_ROOMS), // количество комнат
      guests: getRandomInRange(1, 5), // количество гостей которых можно разместить
      checkin: checkTime, // время заезда
      checkout: checkTime, // время выезда
      features: generateRandomFeatures(), // удобство
      description: description[getRandomInRange(0, 7)], // описание
      photos: 'img/avatars/user0' + (i + 1) + '.png', // адрес фотографии
    },
    location: {
      x: randomLocationX, // координата х
      y: randomLocationY //  координата у
    }
  };
  makeMark(tags[i]); // создаем метки
}
activatePage(true);

function onMapPinMainPressEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) { // если нажал на enter
    activatePage(false); // активировать сайт
  }
}

type.addEventListener('change', function (evt) {
  switch (evt.target.value) {
    case 'any':
      price.min = 0;
      break;
    case 'palace':
      price.min = 10000;
      break;
    case 'flat':
      price.min = 1000;
      break;
    case 'house':
      price.min = 5000;
      break;
    case 'bungalo':
      price.min = 0;
      break;
  }
});

timein.addEventListener('change', function (evt) {
  timeout.value = evt.target.value;
});

timeout.addEventListener('change', function (evt) {
  timein.value = evt.target.value;
});
document.addEventListener('keydown', onDocumentPressEnter);

function onDocumentPressEnter(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    popupClone.style.display = 'block';
  }
}
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    popupClone.style.display = 'none';
  }
});
mapPinMain.addEventListener('keydown', onMapPinMainPressEnter); // если нажимаю enter
popupClose.addEventListener('keydown', function (evt) {
  document.removeEventListener('keydown', onDocumentPressEnter);
  if (evt.keyCode === ENTER_KEYCODE) {
    popupClone.style.display = 'none';
  }
});
capacity.addEventListener('change', function () {
  dataValidation();
});
roomNumber.addEventListener('change', function () {
  dataValidation();
});
function dataValidation() {
  if (+capacity.value > +roomNumber.value && +roomNumber.value !== '100') {
    capacity.setCustomValidity('Количество гостей должно быть меньше или равно количеству комнат.');
  } else if (roomNumber.value !== '100') {
    capacity.setCustomValidity('');
  } else if (capacity.value !== '0') {
    capacity.setCustomValidity('Не для гостей.');
  } else {
    capacity.setCustomValidity('');
  }
}
adFormSubmit.addEventListener('mousedown', function () {
  dataValidation();
});
function openCardAnnouncement() {
  activatePage(false);
  popupClone.style.display = 'block';
  popupCloneFeaturesContainer.innerHTML = null;
  popupCloneTitle.innerHTML = tags[tagNumber - 1].offer.title; // Заголовок в карточке
  popupCloneTextAddress.textContent = tags[tagNumber - 1].offer.address; // адрес в карточке
  popupCloneTextPrice.textContent = tags[tagNumber - 1].offer.price + '₽/ночь'; // цена в карточке
  switch (tags[tagNumber - 1].offer.type[i]) { // тип жилья
    case 'flat': // если жилью квартира то
      popupCloneType.textContent = 'Квартира'; // выводим в метку слово <квартира>
      break;
    case 'bungalo': // если жильё Бунгало то
      popupCloneType.textContent = 'Бунгало'; // выводим в метку слово <Бунгало>
      break;
    case 'house': // если жилью дом то
      popupCloneType.textContent = 'Дом'; // выводим слово <Дом>
      break;
    case 'palace':
      popupCloneType.textContent = 'Дворец'; // Выводим слово <дворец>
      break;
  }
  popupCloneTextCapacity.textContent = tags[tagNumber - 1].offer.rooms + ' комнаты для ' + tags[tagNumber - 1].offer.guests + ' гостей';
  popupCloneTextTime.textContent = 'Заезд после ' + tags[tagNumber - 1].offer.checkin + ' выезд до ' + tags[tagNumber - 1].offer.checkout; // врема заезда и выезда
  for (var j = 0; j < tags[0].offer.features.length; j++) {
    for (i = 0; i < features.length; i++) {
      if (tags[tagNumber - 1].offer.features[j] === features[i]) {
        popupCloneFeaturesContainer.insertAdjacentHTML('beforeEnd', '<li class="popup__feature popup__feature--' + features[i] + '"></li>');
      }
    }
  }
  popupCloneDescription.textContent = tags[tagNumber - 1].offer.description; // Написать описание
  popupClonePhoto.src = tags[tagNumber - 1].author.avatar; // фото на карте
  popupCloneAvatar.src = tags[tagNumber - 1].author.avatar; // аватарка на карте
}

map.addEventListener('keydown', function (evt) {
  tagNumber = evt.target.dataset.index;
  if (evt.keyCode === ENTER_KEYCODE && (evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && tagNumber > 0) {
    openCardAnnouncement();
  }
});

map.addEventListener('mousedown', function (evt) {
  tagNumber = evt.target.dataset.index;
  if ((evt.target.classList.contains('map__pin--main') || evt.target.classList.contains('map__picture') || evt.target.classList.contains('map__svg')) && tagNumber > 0) {
    openCardAnnouncement();
  }
});
mapPinMain.addEventListener('mousedown', function () {
  activatePage(false);
});

mapFilter.addEventListener('change', function onMapFilterChange(evt) {
  switch (evt.target.value) {
    case 'any':
      price.min = 0;
      break;
    case 'palace':
      price.min = 10000;
      break;
    case 'flat':
      price.min = 1000;
      break;
    case 'house':
      price.min = 5000;
      break;
    case 'bungalo':
      price.min = 0;
      break;
  }
});
