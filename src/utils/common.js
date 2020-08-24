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
