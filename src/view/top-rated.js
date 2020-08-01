/**
 * создает шаблон блока со списком наиболее популярных фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
export const createRatedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};
