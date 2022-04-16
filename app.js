const sketchContainer = document.querySelector(".sketch-container");
const resetBtn = document.querySelector("#reset");
let brightness = 1;
let mousedown = false;

document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);

const randomRGB = () => {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    const randomNum = Math.random() * 255;
    rgb.push(randomNum);
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

const colorizeElement = (e) => {
  if (e.type === "mouseover" && !mousedown) return;
  e.target.style.cssText = `background-color: ${randomRGB()}; filter: brightness(${brightness});`;
  brightness >= 0.1 + Number.EPSILON ? (brightness -= 0.1) : (brightness = 0);
};

const assignListeners = () => {
  [...sketchContainer.children].forEach((box) => {
    box.addEventListener("mouseover", colorizeElement, { once: true });
    box.addEventListener("mousedown", colorizeElement, { once: true });
  });
};

const removeListeners = () => {
  [...sketchContainer.children].forEach((box) => {
    box.removeEventListener("mouseover", colorizeElement, { once: true });
    box.removeEventListener("mousedown", colorizeElement, { once: true });
  });
};

const generateSketch = (dim) => {
  brightness = 1;

  sketchContainer.style.cssText = `
        grid-template-columns: repeat(${dim}, 1fr);
        grid-template-rows: repeat(${dim}, 1fr);
    `;

  for (let i = 0; i < dim ** 2; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    sketchContainer.appendChild(box);
  }

  assignListeners();
};

const resetSketch = () => {
  removeListeners();
  sketchContainer.innerHTML = "";
};

resetBtn.addEventListener("click", () => {
  let gridCols = null;

  gridCols = prompt("Enter grid dims (max: 128)", 16);

  while (typeof gridCols !== "number" && gridCols < 2 && gridCols > 100) {
    gridCols = prompt("Enter grid dims (max: 100)", 16);
  }

  resetSketch();
  generateSketch(gridCols);
});

generateSketch(16);
