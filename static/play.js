document.addEventListener("DOMContentLoaded", () => {
  const grid = JSON.parse(localStorage.getItem("wordSearchGrid"));
  const words = JSON.parse(localStorage.getItem("wordSearchWords"));

  if (grid && words) {
    displayGrid(grid);
    displayWordList(words);
  } else {
    console.error("No word search data found in localStorage.");
  }
});

function displayGrid(grid) {
  const gridContainer = document.getElementById("wordSearchGrid");
  gridContainer.innerHTML = "";
  grid.forEach((row) => {
    row.forEach((cell) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add("grid-cell");
      cellElement.textContent = cell;
      gridContainer.appendChild(cellElement);
    });
  });
}

function displayWordList(words) {
  const wordListContainer = document.getElementById("wordList");
  wordListContainer.innerHTML = "Words to find: " + words.join(", ");
}
