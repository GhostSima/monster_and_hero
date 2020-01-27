var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload =function () {
    bgReady = true;
};
bgImage.src = "images/background.png";
var heroReady = false;
var heroImage = new Image();
heroImage.onload =function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload =function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";
var hero = {
speed: 256
};
var monster = {
	speed: 176
};
var monstersCaught = 0;
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.code] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.code];
}, false);
 function reset() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    reset1();
};

function checkX(pos) {
	if(pos.x>447)
	{
		pos.x=447;
	}
	if(pos.y>415)
	{
		pos.y=415;
	}
	if(pos.x<35)
	{
		pos.x=35;
	}
	if(pos.y<35)
	{
		pos.y=35;
	}
}

 function reset1() {

    // 将新的怪物随机放置到界面上
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
	checkX(monster);
};
function update (modifier) {
    if ("KeyW" in keysDown) { // 用户按的是↑
        hero.y -= hero.speed * modifier;
    }	
    if ("KeyS" in keysDown) { // 用户按的是↓
        hero.y += hero.speed * modifier;
    }
    if ("KeyA" in keysDown) { // 用户按的是←
        hero.x -= hero.speed * modifier;
    }
    if ("KeyD" in keysDown) { // 用户按的是→
        hero.x += hero.speed * modifier;
    }
	if ("ArrowUp" in keysDown) { 
        monster.y -= monster.speed * modifier;
    }	
    if ("ArrowDown" in keysDown) {        
        monster.y += monster.speed * modifier;
    }
    if ("ArrowLeft" in keysDown) {                                             
        monster.x -= monster.speed * modifier;
    }
    if ("ArrowRight" in keysDown) {                                                                                                                                             
        monster.x += monster.speed * modifier;
    }
	checkX(monster);
	checkX(hero);
    if (
        hero.x <= (monster.x +20)
        && monster.x <= (hero.x +20)
        && hero.y <= (monster.y+20 )
        && monster.y <= (hero.y +20)
    ){
        ++monstersCaught;
        reset1();
	}
};
function render() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
};
function main () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var then = Date.now();
reset();
main();
