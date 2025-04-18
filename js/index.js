const cards = document.querySelectorAll(".card");

// Показываем значения сразу
cards.forEach((card) => {
  card.textContent = card.dataset.value;
});

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
          first.classList.remove("wrong");
          second.classList.remove("wrong");
        }, 1000);
      }

      // Снимаем выделение с выбранных карточек
      selectedCards.forEach((c) => c.classList.remove("selected"));
      selectedCards = [];
    }
  });
});
