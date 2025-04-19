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

