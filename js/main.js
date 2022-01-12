var freezeShape1 = document.getElementById("easy");
var freezeShape2 = document.getElementById("medium");
var freezeShape3 = document.getElementById("hard");

freezeShape1.addEventListener("click", function () {
  freezeShape2.classList.remove("freeze");
  freezeShape3.classList.remove("freeze");
  this.classList.toggle("freeze");
});

freezeShape2.addEventListener("click", function () {
  freezeShape1.classList.remove("freeze");
  freezeShape3.classList.remove("freeze");
  this.classList.toggle("freeze");
});

freezeShape3.addEventListener("click", function () {
  freezeShape2.classList.remove("freeze");
  freezeShape1.classList.remove("freeze");
  this.classList.toggle("freeze");
});
