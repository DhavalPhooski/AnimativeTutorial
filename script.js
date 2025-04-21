/* ----Cursor------------------------------------------------------------------------------------------------------------------------------------ */
let coords = {x:0, y:0};
const circles = document.querySelectorAll(".circle");

const colorCircles = [
  "#FF0000", // Red
  "#FF7F00", // Orange
  "#FFFF00", // Yellow
  "#7FFF00", // Chartreuse
  "#00FF00", // Lime
  "#00FF7F", // Spring Green
  "#00FFFF", // Cyan
  "#007FFF", // Azure
  "#0000FF", // Blue
  "#4B0082", // Indigo
  "#8B00FF", // Violet
  "#FF00FF", // Magenta
  "#FF1493", // Deep Pink
  "#FF4500", // Orange Red
  "#FFD700"  // Gold
];


circles.forEach(function(circle, index){
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colorCircles[index% colorCircles.length];
});

window.addEventListener("mousemove",function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;

  
});

function animateCircles(){
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle,index){
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length ;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index+1] || circles[0];
    x+= (nextCircle.x - x )*0.3;
    y+=(nextCircle.y - y)*0.3;
  })


  requestAnimationFrame(animateCircles);
}
animateCircles();

/* ---------------------------------------------------------------------------------------------------------------------------------------- */

const logo = document.querySelectorAll("#logo path");

for(let i = 0;i<logo.length;i++){
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const wrapper = document.getElementById("tiles");
const tileAnimeParent = document.querySelector(".tileAnimeParent");

let columns = Math.floor(tileAnimeParent.clientWidth / 50);
let rows = Math.floor(tileAnimeParent.clientHeight / 50);

const colors = [
    
    
    "rgb(255, 255, 255)",
    
    "rgb(214, 23, 23)",
    "rgb(215, 255, 83)",
    "rgb(83, 109, 255)",
    "rgb(255, 146, 146)",
    "rgb(33,33,33)",

    
    
];
let toggled = false;
const handleOnClick = index => {
    toggled = !toggled;

    anime({
        targets: ".tile",
        opacity:toggled?0:1,
        delay:anime.stagger(50,{
            grid:[columns,rows],
            from:index
        })
    });
};



const createTile = (index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.onclick = e => handleOnClick(index);
    return tile;
};


const createTiles = (quantity) => {
    Array.from(Array(quantity)).forEach((_, index) => {
        wrapper.appendChild(createTile(index));
    });
};

const createGrid = () => {
    wrapper.innerHTML = "";

    columns = Math.floor(tileAnimeParent.clientWidth / 50);
    rows = Math.floor(tileAnimeParent.clientHeight / 50);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);

    createTiles(columns * rows);
};

createGrid();
window.onresize = () => createGrid();
/* ---------------------------------------------------------------------------------------------------------------------------------------- */
const button = document.getElementById("animateBtn");

button.addEventListener("click", () => {
  anime({
    targets: ".red",
    scale: 2,
    top: -320,
    left: 0,
    easing: "easeInOutQuad",
    duration: 1000
  });
  anime({
    targets: ".green",
    scale: 2,
    top: -110,
    left: 0,
    easing: "easeInOutQuad",
    duration: 1000
  });
  anime({
    targets: ".blue",
    scale: 2,
    top: 100,
    left: 0,
    easing: "easeInOutQuad",
    duration: 1000
  });
  anime({
    targets: ".yellow",
    scale: 2,
    top: 310,
    left: 0,
    easing: "easeInOutQuad",
    duration: 1000
  });
});

// --------------------------------Mini Erupted Circle------------------------------------------------


  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const particles = [];

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = Math.random() * 5 + 2; // radius: 2-7px
      this.color = "#FF6138";
      this.endX = x + anime.random(-100, 100);
      this.endY = y + anime.random(-100, 100);
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function animateParticles(x, y) {
    const burst = [];
    for (let i = 0; i < 20; i++) {
      const p = new Particle(x, y);
      burst.push(p);
      particles.push(p);
    }

    anime({
      targets: burst,
      x: p => p.endX,
      y: p => p.endY,
      r: 0,
      easing: "easeOutExpo",
      duration: 1000,
      update: () => drawAll()
    });
  }

  function drawAll() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => p.draw());
  }

  canvas.addEventListener("click", e => {
    animateParticles(e.clientX, e.clientY);
  });

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

// ---------------Ripple style cursor-----------------------------------------------------------
const rippleCanvas = document.getElementById("rippleCanvas");
const rippleCtx = rippleCanvas.getContext("2d");

let rippleWidth = window.innerWidth;
let rippleHeight = window.innerHeight;
rippleCanvas.width = rippleWidth;
rippleCanvas.height = rippleHeight;

let rippleBgColor = "#1e1e1e";
const rippleColors = ["#FF6138", "#2980B9", "#FFBE53", "#282741"];
let rippleColorIndex = 0;

window.addEventListener("resize", () => {
  rippleWidth = window.innerWidth;
  rippleHeight = window.innerHeight;
  rippleCanvas.width = rippleWidth;
  rippleCanvas.height = rippleHeight;
});

// Store many ripples if needed
let rippleCircles = [];

// Circle class
class RippleCircle {
  constructor(x, y, color, maxRadius, onComplete) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.color = color;
    this.maxRadius = maxRadius;
    this.onComplete = onComplete;
    this.done = false;
  }

  update() {
    this.r += 40;
    if (this.r >= this.maxRadius && !this.done) {
      this.onComplete();
      this.done = true;
    }
  }

  draw() {
    rippleCtx.fillStyle = this.color;
    rippleCtx.beginPath();
    rippleCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    rippleCtx.fill();
  }

  isFinished() {
    return this.r > this.maxRadius + 50;
  }
}

function drawRippleBackground() {
  rippleCtx.fillStyle = rippleBgColor;
  rippleCtx.fillRect(0, 0, rippleWidth, rippleHeight);
}

function rippleAnimateLoop() {
  drawRippleBackground();

  // Update and draw all circles
  rippleCircles.forEach((circle) => {
    circle.update();
    circle.draw();
  });

  // Remove finished circles
  rippleCircles = rippleCircles.filter(circle => !circle.isFinished());

  requestAnimationFrame(rippleAnimateLoop);
}

// 🔥 Allow ripple every time you click
rippleCanvas.addEventListener("click", (e) => {
  const nextColor = rippleColors[(++rippleColorIndex) % rippleColors.length];
  const maxR = Math.sqrt(rippleWidth ** 2 + rippleHeight ** 2);

  const newCircle = new RippleCircle(
    e.clientX,
    e.clientY,
    nextColor,
    maxR,
    () => {
      rippleBgColor = nextColor;
    }
  );

  rippleCircles.push(newCircle);
});

rippleAnimateLoop();
