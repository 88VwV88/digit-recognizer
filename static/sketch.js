let side;
var points;
const N = 28;

function setup() {
  createCanvas(400, 400);
  side = floor(width / N);

  points = new Array(N);
  for (let i = 0; i < N; ++i) points[i] = new Array(N).fill(0);
}

function draw() {
  for (let i = 0; i < N; ++i) {
    for (let j = 0; j < N; ++j) {
      fill(points[i][j] ? 0 : 255);
      square(i * side, j * side, side);
    }
  }
}

function mouseDragged() {
  let x = mouseX / side;
  let y = mouseY / side;

  for (let i = -1; i < 1; ++i)
    for (let j = -1; j < 1; ++j) {
      let posx = round(x + i);
      let posy = round(y + j);
      if (0 <= posx && posx <= width && 0 <= posy && posy <= height)
        points[posx][posy] = 1;
    }
}

function resetHandler() {
  for (let i = 0; i < N; ++i) points[i].fill(0);
}
document.getElementById("reset").addEventListener("click", () => {
  resetHandler();
});

async function submitHandler() {
  const { digit } = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pixels: points,
    }),
  }).then((data) => data.json());

  document.getElementById("digit").innerText = `digit recongnised as: ${digit}`;
}
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  submitHandler();
});
