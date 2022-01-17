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

function showCredits(){
  Swal.fire({
    title: "INSTRUCTIONS!",
    text: "THE GOAL IS TO ESCAPE THE FRONTMAN THROUGH LABIRINT, BUT BE CAREFUL YOU DO NOT HAVE A LOT OF TIME! GOOD LUCK",
    confirmButtonColor: "#fa4366",
    imageWidth: 515,
    imageHeight: 300,
    imageAlt: "SG_SWEETALERT",
  });
}
function showInfo(){
  Swal.fire({
    title: "CREDITS!",
    text:"MADE BY DILAN MUŽIČ",
    confirmButtonColor: "#fa4366",
    imageWidth: 515,
    imageHeight: 300,
    imageAlt: "SG_SWEETALERT",
  });
}