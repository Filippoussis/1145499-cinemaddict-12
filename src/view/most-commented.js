/**
 * создает шаблон блока со списком наиболее коммментируемых фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
export const createCommentedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};
