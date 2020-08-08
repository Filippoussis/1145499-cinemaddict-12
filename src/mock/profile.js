import {UserFilmsCount} from "../const.js";
import {getRandomInteger} from "../utils.js";

const getRankUser = (wathedFilmNumber) => {
  let rank = ``;
  switch (true) {
    case wathedFilmNumber > 0 && wathedFilmNumber <= 10:
      rank = `novice`;
      break;
    case wathedFilmNumber > 10 && wathedFilmNumber <= 20:
      rank = `fan`;
      break;
    case wathedFilmNumber > 20:
      rank = `movie buff`;
      break;
  }
  return rank;
};

export const generateProfileUser = () => {
  return {
    rank: getRankUser(getRandomInteger(UserFilmsCount.MIN, UserFilmsCount.MAX)),
  };
};
