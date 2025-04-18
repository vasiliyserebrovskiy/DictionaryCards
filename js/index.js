// Загружаем данные из файла
fetch("./data/cards.txt")
  .then((response) => response.text())
  .then((data) => {
    const lines = data.trim().split("\n");

    // Парсим строки в объекты: { german: "...", russian: "..." }
    const words = lines.map((line, index) => {
      const [de, ru] = line.replace(/"/g, "").split(",");
      return {
        id: index, // сохраняем индекс для сравнения
        german: de.trim(),
        russian: ru.trim(),
      };
    });

    // Копируем и перемешиваем
    const germanWords = shuffleArray([...words]);
    const russianWords = shuffleArray([...words]);

    // Создаём карточки
    createCards(germanWords, "question-cards", "german");
    createCards(russianWords, "answer-cards", "russian");

    // Запускаем логику сравнения
    initMatching();
  });

// Функция генерации карточек
function createCards(wordList, containerClass, lang) {
  const container = document.querySelector(`.${containerClass}`);
  wordList.forEach((word) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = word.id;
    card.textContent = lang === "german" ? word.german : word.russian;
    container.appendChild(card);
  });
}

// Логика сравнения карточек
function initMatching() {
  const cards = document.querySelectorAll(".card");
  let selectedCards = [];

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("matched") || selectedCards.includes(card))
        return;

      card.classList.add("selected");
      selectedCards.push(card);

      if (selectedCards.length === 2) {
        const [first, second] = selectedCards;

        if (first.dataset.value === second.dataset.value) {
          first.classList.add("matched");
          second.classList.add("matched");
        } else {
          first.classList.add("wrong");
          second.classList.add("wrong");
          setTimeout(() => {
            first.classList.remove("wrong", "selected");
            second.classList.remove("wrong", "selected");
          }, 1000);
        }

        setTimeout(() => {
          selectedCards = [];
        }, 1000);
      }
    });
  });
}

// Функция перемешивания
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
