import {getRandomInteger} from "../utils.js";

const UserFilmsCount = {
  MIN: 0,
  MAX: 50,
};

const NoviceRank = {
  MIN: 1,
  MAX: 10,
};

const FanRank = {
  MIN: 11,
  MAX: 20,
};

const MovieBuffRank = {
  MIN: 21,
  MAX: 1000,
};

const getRankUser = (wathedFilmNumber) => {
  let rank = ``;
  switch (true) {
    case wathedFilmNumber >= NoviceRank.MIN && wathedFilmNumber <= NoviceRank.MAX:
      rank = `novice`;
      break;
    case wathedFilmNumber >= FanRank.MIN && wathedFilmNumber <= FanRank.MAX:
      rank = `fan`;
      break;
    case wathedFilmNumber >= MovieBuffRank.MIN:
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
