function toggleDropdown() {
const dropdown = document.getElementById("myDropdown");
const button = document.getElementById("menuBtn");

dropdown.classList.toggle("show");
button.classList.toggle("active");
}

window.addEventListener(

"click",
function(event) {
const dropdown = document.getElementById("myDropdown");
const button = document.getElementById("menuBtn");

if (dropdown.contains(event.target) || button.contains(event.target)) {
return;
}

if (dropdown.classList.contains("show")) {
dropdown.classList.remove("show");
button.classList.remove("active");
}
}
)
;
