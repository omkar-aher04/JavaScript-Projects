const colors = ["red", "green", "blue", "yellow", "purple", "orange", "pink"];
let index = 0;

// Select the "Change Color" button and the circle div
const colorBtn = document.querySelector(".color");
const circle = document.querySelector(".circle");

// Add click event listener
colorBtn.addEventListener("click", function () {
  circle.style.backgroundColor = colors[index];
  index = (index + 1) % colors.length;
});

