/**
 * создает шаблон блока с основным списком фильмов
 * @return {string} возвращает HTML-строку в ввиде кода HTML
 */
export const createSectionFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};
