import {NAME} from "../const.js";
import {POSTER} from "../const.js";
import {DESCRIPTION} from "../const.js";
import {NumberSentencesOfDescription} from "../const.js";
import {Rating} from "../const.js";
import {Year} from "../const.js";
import {GENRE} from "../const.js";
import {Comments} from "../const.js";
import {NumberGenres} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {getRandomElementFromList} from "../utils/common.js";
import {getListRandomLength} from "../utils/common.js";
import {getRandomFloat} from "../utils/common.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateFilmsCard = () => {

  return {
    id: generateId(),
    name: getRandomElementFromList(NAME),
    poster: getRandomElementFromList(POSTER),
    description: getListRandomLength(DESCRIPTION, NumberSentencesOfDescription.MIN, NumberSentencesOfDescription.MAX).join(`, `),
    rating: getRandomFloat(Rating.MIN, Rating.MAX),
    year: getRandomInteger(Year.MIN, Year.MAX),
    genre: getListRandomLength(GENRE, NumberGenres.MIN, NumberGenres.MAX).join(`, `),
    comments: getRandomInteger(Comments.MIN, Comments.MAX),
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorit: Boolean(getRandomInteger()),
  };
};
