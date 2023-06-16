let start = document.querySelector(".button_begin"); // Создаем переменную start, которая возвращает клик на которую запсукает игру(.button_begin)
let trashBox = document.querySelector(".trash_picture"); // Создаем переменную, которая возвращет box с мусором
let counters = document.querySelector(".counter"); // Создаем переменную, которая отвечает за счетчики ответов
let trashPicture = document.querySelector(".trash_picture"); // Создаем переменную, которая отвечает за картинку мусора
let trash; // Создаем переменную trash и не присваиваем ей никакого значения
let cub = document.querySelector(".cub-svg");
let again = document.querySelector(".again");
let headline = document.querySelector(".caption");

// создаем массив объектов из картинок

trashListRefresh = [
  { type: "household", url: "image/garbage/apple.png" },
  { type: "dangerous", url: "image/garbage/battery.png" },
  { type: "recyclables", url: "image/garbage/glass.png" },
  { type: "recyclables", url: "image/garbage/paper.png" },
  { type: "mixed", url: "image/garbage/boots.png" },
  { type: "mixed", url: "image/garbage/cottonBuds.png" },
  { type: "mixed", url: "image/garbage/glue.png" },
  { type: "recyclables", url: "image/garbage/milkCarton.png" },
  { type: "recyclables", url: "image/garbage/tin.png" },
  { type: "mixed", url: "image/garbage/tube.png" },
  { type: "mixed", url: "image/garbage/patch.png" },
];

let trashList;
// let rand = Math.floor(Math.random() * trashList.length);
// console.log(rand, 'рандомный элемент из массива')

let elemImg = document.createElement("img"); // Создаем переменную elemImg, формата img
console.log(elemImg, "созданый элемент");
elemImg.classList.add("active");

// создаем функцию startGame
function startGame() {
  console.log("Игра началась");
  upPoint.innerHTML = 0; //Обнуление счетчиков
  downPoint.innerHTML = 0;
  console.log("Обнулились счетчики");
  headline.innerHTML = "Выбери правильный бак<br />для сортировки мусора"; //Поменялся заголовок
  elemImg.classList.add("active");
  start.classList.remove("active");
  if (trash != undefined) {
    // Если trash не underfined, т.е.если он существует в DOM
    trash.classList.add("active"); // Почему classList здесь не подсвечен? также в функции setTimeOut
  }
  trashBox.classList.add("active");
  trashPicture.classList.remove("end");
  cub.classList.remove("active");
  counters.classList.remove("end");
  again.classList.remove("active");

  trashList = trashListRefresh.slice(0); //Склонировали массив

  let rand = Math.floor(Math.random() * trashList.length);
  //создаем переменную rand, в которой рандомно будут меняться картинки мусора [округляем значение (математический рандом умножаем на длину списка)]
  // "src","/images/"+rubArr[localGame.rand].url
  elemImg.setAttribute("src", trashList[rand].url);
  // В переменную elemImg (формата img с классом core) мы добавляем аттрибуты src и рандомную картинку из trashList с ключом url.
  elemImg.setAttribute("data-type", trashList[rand].type); // Туда же добавляем аттрибут data-type и рандомный ключ type из trashList. [Мы выбираем рандомный объект и передаем его значение]
  console.log(elemImg, "полученный элемент"); // Выводим полученный элемент
  // picture.innerHTML = "<img class='core' src='image/garbage/apple.png' alt='apple_core;'>"

  trashPicture.appendChild(elemImg); //Переменную elemImg встраиваем в DOM (делаем дочкой picture(в которой лежит картинка мусора))

  trashList.splice(rand, 1); // удаляем 1 элемент, который был выбран.
  trash = document.querySelector(".trash_picture img"); // В переменную trash помещаем картинку мусора
  start.classList.add("active"); // переменной start (.button_begin) навешиваем класс "active"
  counters.classList.add("active");
  // console.log(elemImg, "элемент до time");

  setTimeout(() => {
    // Используем метод setTimeout, позволяющий запускать функцию через заданный интервал времени
    trash.classList.add("active"); // переменной trash (где лежит картинка мусора) добавляем класс "active"
    trashBox.classList.add("active");
    // console.log(elemImg, "элемент после time");
  }, 100);
}
console.log("Картинка появилась с задержкой"); //Не отобржается в консоли

let upPoint = document.querySelector(".win-js"); // Создаем переменную - число правильных ответов
let downPoint = document.querySelector(".lose-js"); // Создаем переменную - число неправильных ответов
let key; // Создаем переменную key
let i = 0; // Создаем переменную i и присваиваем ей значение 0
let k = 0; // Создаем переменную k и присваиваем ей значение 0

function clickBug(type) {
  key = trash.getAttribute("data-type");
  if (type === key && trashList.length > 0) {
    i++;
    upPoint.innerHTML = i;
    responseYes();
    console.log("цвет поменялся на зеленый?");
    console.log("игрок кликнул на правильный бак");
  }

  if (type != key && trashList.length > 0) {
    k++;
    responseNo();
    downPoint.innerHTML = k;
    console.log("цвет поменялся на розовый?");
    console.log("игрок кликнул на неправильный бак");
  }

  console.log("+балл");
  if (trashList.length === 0) {
    gameOver();
    console.log("игра закончилась");
  }
  gameLoop();
  // console.log("игра продолжается");
}

function gameLoop() {
  if (trashList.length >= 1) {
    let rand = Math.floor(Math.random() * trashList.length);
    elemImg.setAttribute("src", trashList[rand].url); // В переменную elemImg (формата img с классом core) мы добавляем аттрибуты src и рандомную картинку из trashList с ключом url. Зачем мы добавляем src картинки, если ее нет в HTML
    elemImg.setAttribute("data-type", trashList[rand].type); // Туда же добавляем аттрибут data-type и рандомный ключ type из trashList
    console.log(elemImg, "полученный элемент"); // Выводим полученный элемент
    trashPicture.appendChild(elemImg);
    trashList.splice(rand, 1);

    // console.log(
    //   trashList,
    //   "текущий состав массива",
    //   trashList.length,
    //   "пока все хорошо"
    // );
  }
}

function gameOver() {
  headline.innerHTML =
    "Отлично!<br/>Количество набранных очков: " +
    i +
    " из " +
    trashListRefresh.length +
    "!";

  elemImg.classList.remove("active");
  start.classList.add("active");
  trash.classList.remove("active");
  trashBox.classList.remove("active");
  trashPicture.classList.add("end");
  cub.classList.add("active");
  counters.classList.add("end");
  again.classList.add("active");
}

function responseYes() {
  trashPicture.classList.add("backgroundYes");
  trashPicture.classList.remove("backgroundNo");
}

function responseNo() {
  trashPicture.classList.add("backgroundNo");
  trashPicture.classList.remove("backgroundYes");
}

// changes();

//Cоздаем одну функцию, которая будет отвечать за навешивание/снятие классов

// function changes() {
//   start.classList.add("active");
//   trashPicture.classList.toggle("end");
//   cub.classList.toggle("active");
//   counters.classList.add("end");
//   again.classList.toggle("active");
// }

// break.function clickBug(type);

// startGame(); // обновляет цикл (бесконечная игра)
// console.log(
//   trashList,
//   "текущий состав массива",
//   trashList.length,
//   "должен быть 0 - и я молодец"
// );

//Cоздаем функцию конца игры

// Создаем функцию клика по баку. Подаем в нее агрумент (type) - данные, которые нужны для работы функции

// function clickBug(type) {
//   console.log("запустилась")
//   key = trash.getAttribute("data-type"); // Переменной key присваиваем значение = тип мусора, который вернет нам переменная trash [(где лежит картинка мусора) класс emergence]
//   if (type === key) {
//     // Если тип мусора из трашлиста равен дата-тайп из бака в html
//     i++; // Прибавляем один балл
//     upPoint.innerHTML = i; // Число правильных ответов заменяем на i
//     console.log(i, "ура победа");
//   } else {
//     // Если нет, то прибавялем один к числу неправильных ответов.
//     k++;
//     downPoint.innerHTML = k;
//     console.log(k, "ой черт");
//   }
//   // gameLoop()
//   // Начинаем заново
// }

//Начинаем заново

// let headline = document.querySelector(".caption--game");
// let headlineResult = document.querySelector(".caption--result");
// function gameLoop() {
// if (trashList.length >= 1) {

// }
//   еlse (trashList.length = 0) {
//     headline.classList.add("game_over");
//     headlineResult.classList.add("game_over");

//   }
// }

// let yellow = document.querySelector("#yellow"); // Создаем переменную, содержащую желтый бак

// function openBox() {
//   document.querySelector(".caption").classList.toggle("zumba");
// }
// yellow.classList.toggle("zumba");
// setTimeout(() => {
//   yellow.classList.toggle("zumba");
// }, 400);

// let yellow = document.querySelector("#yellow"); // Создаем переменную и, используя метод, (возвращающий первый элемент, соответсвующий селектору) кладем в нее элемент.
// console.log(yellow, "наш бак"); // Смотрим, что находится в этом элементе.

// let yellow = document.getElementById("yellow"); // Создаем переменную и, используя метод, (возвращающий первый элемент, соответсвующий селектору) кладем в нее элемент.
// console.log(yellow, "наш бак"); // Смотрим, что находится в этом элементе.

// function changeСolor() {
//   document.querySelector(".dumpster-text--green").classList.toggle("down"); //По клику на "смешанные" меняется цвет шрифта
// }
// Вызов разными способами
// // По id
// let one = document.getElementById("blue");
// console.log(one); //Получилось

// // По классу

// let two = document.getElementsByClassName("containers");
// console.log(two); //Получилось

// // По тегу

// let three = document.getElementsByTagName("img");
// console.log(three); //Получилось

// // По селектору

// let four = document.querySelectorAll(".wasteboxs img");
// console.log(four, "не поняла");

// let five = document.querySelector(".game_over");
// console.log(five); //Получилось.

// document.querySelector(".caption").classList.toggle("zumba");

// document.querySelector(".dumpster-text--green").classList.toggle("down");
// document.querySelector(".dumpster-text--green").classList.toggle("down");

// document.getElementsByTagName;
// document.getElementByClassName;

/*var caption = document.querySelector(".caption");
console.log(caption, "заголовок");

let cistern = document.querySelectorAll(".dumpster");
console.log(cistern, "все баки по одному");

let all = document.querySelector("body");
console.log(all, "выбрать все");

let cisterns = document.querySelector(".containers");
console.log(cisterns, "все баки разом");

// all.innerHTML = "замена";

// caption.innerHTML = "тут был заголовок";

caption.innerHTML =
  '<p class="dumpster-text dumpster-text--yellow">Вторсырье</p>'; 

// yellow.innerHTML =
//   '<p class="dumpster-text dumpster-text--green">Смешанные</p>'; // Обозначаем переменную, которую хотим изменить и присваиваем ей значение того объекта, на который хотим ее заменить.

//   Свойство classList содержит позволяет добавлять и удалять классы элемента

yellow.classList.add("active");
yellow.classList.remove("dumpster");
yellow.classList.toggle("a1a");*/

// var yellow = document.querySelector("#yellow")
// console.log(yellow, "наш баг")

// let dumpster = document.querySelectorAll('.dumpster')
// console.log(dumpster, "наши баки")

// function openBox (){
//     document.querySelector(".caption").classList.toggle("active")
//     yellow.classList.toggle("active")
//     setTimeout(()=>{
//         yellow.classList.toggle("active")
//     }, 1000)
// }
// function openBox (name){
//     document.querySelector(name).classList.toggle("active")
//     dumpster.classList.toggle(".active") - не будет работать, так как он не знает куда идти
//     yellow.classList.toggle("active")
//     setTimeout(()=>{
//         yellow.classList.toggle("active")
//     }, 1000)
//     dumpster.forEach( (i) => {
//         i.classList.toggle("active")
//     })
//     for (let i = 0; i < 200; i++) {
//         console.log(i)
//         document.querySelector(".button").style.transform = "translateX(" + i + "px)"
//     }
// }

// dumpster.classList.toggle(".active")

// 1. попробовать забирать элементы в переменые с помощью разных фукций забора
// 2. попробовать насоздавать стилей с анимацией, которые будут активироваться на ".active"
// 3. попробовать повесить фукцию на Element HTML
// 4. заставить несколько элементов с 1 классом, что то делать
// 5. кастомные измениня стиля для елемента

// yellow.style = "display:none"    относиться к 5 пункту
// document.querySelector(".button").style.transform = "translateX(" + i + "px)"

// let trashList = [       массив хранит в себе любой перечень данных
//   '',
//   1,
//   1.432,
//   {name: 'Олеся'}
// ]

// let test = {       объект хранит в себе данные КЛЮЧ: ЗНАЧЕНИЕ
//   name: 'Олеся',
//   car: 'BMW',
//   password: "80000"
// }
// console.log(trashList,"наш масив")
// console.log(test,"наш объект")

/*Задания 

 1 Подумать, как оптимизировать функцию gameOver с пом.функции changes
 2* Оптимизировать код игры (Что можно сделать, чтобы сократить количество кода)
 3** Добавить вайба (анимации, интерактивности). Напр., плавность появления элементов.
 Создать для этого отдельную функцию gameAnim

 */
