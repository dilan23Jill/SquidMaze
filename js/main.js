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
var infoSound = new Audio("./audio/audio3.mp3");

function showCredits() {
  infoSound.play();
  Swal.fire({
    title: "INSTRUCTIONS!",
    text: "ESCAPE THE FRONTMAN THROUGH LABYRINTH, BUT BE CAREFUL YOU DON'T HAVE A LOT OF TIME! GOOD LUCK",
    confirmButtonColor: "#fa4366",
    imageWidth: 515,
    imageHeight: 300,
    imageAlt: "SG_SWEETALERT",
  });
}
function showInfo() {
  infoSound.play();
  Swal.fire({
    title: "CREDITS!",
    text: "MADE BY DILAN MUŽIČ",
    confirmButtonColor: "#fa4366",
    imageWidth: 515,
    imageHeight: 300,
    imageAlt: "SG_SWEETALERT",
  });
}
var audioPlay = document.getElementById("playBtn");
var audioStop = document.getElementById("playBtn2");
var hidPlay = document.querySelector(".playAudio");
var showPlay = document.querySelector(".playAudio2");
var song1 = document.getElementById("sound");
audioPlay.style.visibility = "hidden";
hidPlay.style.visibility = "hidden";

function playSound() {
  audioPlay.style.visibility = "hidden";
  hidPlay.style.visibility = "hidden";
  audioStop.style.visibility = "visible";
  showPlay.style.visibility = "visible";
  song1.pause();
}

function stopSound() {
  audioStop.style.visibility = "hidden";
  showPlay.style.visibility = "hidden";
  audioPlay.style.visibility = "visible";
  hidPlay.style.visibility = "visible";
  song1.play();
}
