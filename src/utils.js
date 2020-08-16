/**
 * генерирует случайное целое число из диапазона от min до max (включительно)
 * @param {number} min - наименьшее число из диапазона
 * @param {number} max - наибольшее число из диапазона
 * @return {number} случайное целое число из диапазона
 */
export const getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max - min + 1));

/**
 * генерирует случайное число с плавающей точкой из диапазона от min до max (включительно)
 * @param {number} min - наименьшее число из диапазона
 * @param {number} max - наибольшее число из диапазона
 * @param {number} n - количество знаков после точки
 * @return {string} случайное число с плавающей точкой из диапазона в строковом представлении
 */
export const getRandomFloat = (min = 0, max = 1, n = 1) => (min + Math.random() * (max - min)).toFixed(n);

/**
 * возвращает функцию, которая уменьшает массив на единицу,
 * путем удаления случайного элемента, и его же возвращает
 * @param {Array} arr - массив данных
 * @return {string} элемент массива
 */
export const getReducingList = (arr) => {
  const arrCopy = arr.slice();
  return () => {
    const randomIndex = getRandomInteger(0, arrCopy.length - 1);
    const uniqueElement = arrCopy.splice(randomIndex, 1);

    return uniqueElement;
  };
};

/**
 * возвращает случайный элемент массива
 * @param {Array} arr - массив данных
 * @return {string} случайный элемент массива
 */
export const getRandomElementFromList = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

/**
 * возвращает массив случайной длины
 * @param {Array} arr - массив данных
 * @param {number} min - минимально возможное количество элементов в новом массиве
 * @param {number} max - максимально возможное количество элементов в новом массиве
 * @return {Array} массив случайной длины
 */
export const getListRandomLength = (arr, min, max) => {
  const listCopy = arr.slice();

  return listCopy.splice(getRandomInteger(0, listCopy.length - 1), getRandomInteger(min, max));
};

/**
 * отрисовывает шаблон на странице
 * @param {HTMLElement} container - HTML-элемент на странице
 * @param {string} template - HTML-строка, которая будет вставлена именно «как HTML»
 * @param {string} place - специальное слово, указывающее, куда по отношению к container производить вставку
 */
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
