import AbstractView from "./abstract.js";

/**
 * создает шаблон профайла пользователя
 * @param {object} profile - объект с данными пользователя
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
const createUserProfileTemplate = (profile) => {

  const {rank} = profile;

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserProfile extends AbstractView {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  _getTemplate() {
    return createUserProfileTemplate(this._profile);
  }
}
