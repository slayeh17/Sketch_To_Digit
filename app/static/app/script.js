document.addEventListener("DOMContentLoaded", () => {
  const gridInput = document.getElementById("grid-input");

  for (let i = 1; i <= 64; i++) {
    const cell = document.createElement("div");
    cell.style.cssText = "border: 1px solid white; width: 50px; height: 50px;"
    gridInput.appendChild(cell);
  }
});
