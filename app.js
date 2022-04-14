const sketchContainer = document.querySelector(".sketch-container");

const generateSketch = () => {
  // 16 x 16
  for (let i = 0; i < 16 ** 2; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    sketchContainer.appendChild(box);
  }
};

generateSketch();

[...sketchContainer.children].forEach((box) => {
  box.addEventListener("mouseover", (e) => {
    e.target.style.cssText = "background-color: black;";
  });
});
