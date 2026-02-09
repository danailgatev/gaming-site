let n = 3;
let state = [];
let emptyIndex;
let solution = [];

function startGame() {
n = parseInt(document.getElementById("frogCount").value);
if (n > 5) {
n = 5;
}
if (n < 1) {
n = 1;
}
state = [];
for (let i = 0; i < n; i++) state.push(">");
state.push("_");
for (let i = 0; i < n; i++) state.push("<");
emptyIndex = n;
render();
}

function render() {
const board = document.getElementById("frog-leap-board");
board.innerHTML = "";
state.forEach((s, i) => {
const lily = document.createElement("div");
lily.className = "lily";
if (s !== "_") {
const frog = document.createElement("img");
frog.className = "frog";
frog.src = "frog.png";

if (s === ">") {
frog.classList.add("frog-left");
} else if (s === "<") {
frog.classList.add("frog-right");
}

frog.onclick = () => moveFrog(i);
lily.appendChild(frog);
}
board.appendChild(lily);
}
)
;
}

function moveFrog(i) {
const diff = i - emptyIndex;
if (state[i] === ">" && (diff === -1 || diff === -2)) {
swap(i, emptyIndex);
render();
checkWin();
} else if (state[i] === "<" && (diff === 1 || diff === 2)) {
swap(i, emptyIndex);
render();
checkWin();
}
}

function swap(i, j) {
[state[i], state[j]] = [state[j], state[i]];
emptyIndex = i;
}

function resetGame() {
startGame();
}

function checkWin() {
const target = "<".repeat(n) + "_" + ">".repeat(n);
if (state.join("") === target) {
alert("Congratulations! You won!");
}
}

function dfs(current, visited, path) {
if (visited.has(current)) return false;
visited.add(current);
if (current === "<".repeat(n) + "_" + ">".repeat(n)) return true;
const pos = current.indexOf("_");
let arr = current.split("");

function tryMove(a, b) {
[arr[a], arr[b]] = [arr[b], arr[a]];
const next = arr.join("");
if (dfs(next, visited, path)) {
path.push(next);
return true;
}
[arr[a], arr[b]] = [arr[b], arr[a]];
return false;
}

if (pos > 0 && arr[pos - 1] === ">") if (tryMove(pos, pos - 1)) return true;
if (pos > 1 && arr[pos - 2] === ">") if (tryMove(pos, pos - 2)) return true;
if (pos < arr.length - 1 && arr[pos + 1] === "<") if (tryMove(pos, pos + 1)) return true;
if (pos < arr.length - 2 && arr[pos + 2] === "<") if (tryMove(pos, pos + 2)) return true;
return false;
}

function showSolution() {
const start = ">".repeat(n) + "_" + "<".repeat(n);
const visited = new Set();
const path = [];
dfs(start, visited, path);
path.reverse();
solution = path;
playSolution(0);
}

function playSolution(i) {
if (i >= solution.length) return;
state = solution[i].split("");
emptyIndex = state.indexOf("_");
render();
setTimeout(() => playSolution(i + 1), 600);
}

document.addEventListener("DOMContentLoaded", () => {
document.getElementById("startGameBtn").addEventListener("click", startGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);
document.getElementById("solutionBtn").addEventListener("click", showSolution);
startGame();
});