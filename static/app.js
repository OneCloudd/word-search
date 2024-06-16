document.addEventListener("DOMContentLoaded", () => {
  const inputContainer = document.getElementById("inputContainer");
  for (let i = 0; i < 30; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `wordInput${i}`;
    inputContainer.appendChild(input);
  }
});

function generateWordSearch() {
  window.location.pathname = "/play.html";
  const words = [];
  for (let i = 0; i < 30; i++) {
    const word = document.getElementById(`wordInput${i}`).value.trim();
    if (word) {
      words.push(word);
    }
  }

  const grid = generateGrid(words);
  localStorage.setItem("wordSearchGrid", JSON.stringify(grid));
  localStorage.setItem("wordSearchWords", JSON.stringify(words));
}

function generateGrid(words) {
  const size = 10;
  let grid = Array.from({ length: size }, () => Array(size).fill(""));
  words.forEach((word) => placeWordInGrid(word.trim(), grid));
  fillEmptyCells(grid);
  return grid;
}

function placeWordInGrid(word, grid) {
  const directions = [
    { x: 1, y: 0 }, // 가로
    { x: 0, y: 1 }, // 세로
    { x: 1, y: 1 }, // 대각선
  ];

  const size = grid.length;
  let placed = false;

  while (!placed) {
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const startX = Math.floor(Math.random() * size);
    const startY = Math.floor(Math.random() * size);

    if (canPlaceWord(word, grid, startX, startY, direction)) {
      placeWord(word, grid, startX, startY, direction);
      placed = true;
    }
  }
}

function canPlaceWord(word, grid, startX, startY, direction) {
  const size = grid.length;
  for (let i = 0; i < word.length; i++) {
    const x = startX + i * direction.x;
    const y = startY + i * direction.y;

    if (
      x < 0 ||
      x >= size ||
      y < 0 ||
      y >= size ||
      (grid[y][x] !== "" && grid[y][x] !== word[i])
    ) {
      return false;
    }
  }
  return true;
}

function placeWord(word, grid, startX, startY, direction) {
  for (let i = 0; i < word.length; i++) {
    const x = startX + i * direction.x;
    const y = startY + i * direction.y;
    grid[y][x] = word[i];
  }
}

function fillEmptyCells(grid) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (!grid[row][col]) {
        grid[row][col] = letters.charAt(
          Math.floor(Math.random() * letters.length)
        );
      }
    }
  }
}
