/*
                                  ********** I M P O R T A N T ************

Please choose Tabs(colums) in the Editor Layout of the settings and pull the preview bar all the way to the left.

Sorry i didnt have much time to make the game more balanced and make the code more optimal.

*/

const canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d"),
      volume = document.querySelector("#volume"),
      levelButton = document.querySelector("#levelChangerButton"),
      upgradeMenuButton = document.querySelector("#upgradeMenuButton"),
      upgrade1Button = document.querySelector("#upgrade1Button"),
      upgrade2Button = document.querySelector("#upgrade2Button"),
      upgrade3Button = document.querySelector("#upgrade3Button"),
      instructionsMenuButton = document.querySelector("#instructionsMenuButton"),
      instruction1Button = document.querySelector("#instruction1Button"),
      instruction2Button = document.querySelector("#instruction2Button"),
      instruction3Button = document.querySelector("#instruction3Button"),
      scoreBoard = document.querySelector("#scorePoints"),
      bestScorePoints = document.querySelector("#bestScorePoints"),
      upgradePoints = document.querySelector("#upgradePoints"),
      healthBar = document.querySelector("#hp"),
      song = document.querySelector("#song");

upgrade1Button.hidden = true;
upgrade2Button.hidden = true;
upgrade3Button.hidden = true;
instruction1Button.hidden = true;
instruction2Button.hidden = true;
instruction3Button.hidden = true;

const backgroundImg = document.createElement("img"),
      heroImg = document.createElement("img"),
      enemy1Img = document.createElement("img"),
      enemy2Img = document.createElement("img"),
      enemy3Img = document.createElement("img"),
      enemy1BulletImg = document.createElement("img"),
      enemy2BulletImg = document.createElement("img"),
      heroBulletsImg = document.createElement("img"),
      shieldImg = document.createElement("img"),
      hpBoxImg = document.createElement("img"),
      hitSound = document.createElement("audio"),
      upgradeSound = document.createElement("audio"),
      heroHitSound = document.createElement("audio"),
      bulletSound = document.createElement("audio");

backgroundImg.src = "https://st2.depositphotos.com/4967103/9877/v/950/depositphotos_98778706-stock-illustration-seamless-pattern-cosmic-objects-set.jpg";
heroImg.src = "data:image/jpeg;base64,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";
enemy1Img.src = "https://image.flaticon.com/icons/png/64/3306/3306574.png";
enemy2Img.src = "https://image.flaticon.com/icons/png/64/1970/1970302.png";
enemy3Img.src = "https://image.flaticon.com/icons/png/64/190/190276.png";
enemy1BulletImg.src = "https://image.flaticon.com/icons/png/64/523/523762.png";
enemy2BulletImg.src = "https://image.flaticon.com/icons/png/64/3325/3325078.png"
heroBulletsImg.src = "https://cdn-icons-png.flaticon.com/512/224/224681.png";
shieldImg.src = "https://image.flaticon.com/icons/png/64/594/594846.png";
hpBoxImg.src = "https://image.flaticon.com/icons/png/64/1673/1673624.png";
hitSound.src = "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav";
bulletSound.src = "http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg";
upgradeSound.src = "http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3";
heroHitSound.src = "https://rpg.hamsterrepublic.com/wiki-images/d/d7/Oddbounce.ogg";


let data = {
             hero: {
              level: 1,
              x: canvas.width/2,
              y: canvas.height - 50,
              width: 50,
              height: 50,
              xDelta: 0,
              bullets: [],
              hp : document.getElementById("hp"),
              shield: {
               hp: 0
              },
             },
             
             enemy1 : {
              alive : 0,
              dead : 0,
              enemy : [],
              bullets: []
             },
     
             enemy2 : {
              alive : 0,
              dead : 0,
              enemy : [],
              bullets: []
             },
             
             enemy3 : {
              alive : 0,
              dead : 0,
              enemy : [],
              bullets: []
             },
             
             level : 1,
             score : 0,
             upgradePoints: 0,
             bullets1: [],
             hpBox: [],
             intervals: [],
             
             background1: {
              x: 0,
              y: 0,
              width: canvas.width,
              height: canvas.height,
              yDelta: 1
             },
             
             background2: {
              x: 0,
              y: -canvas.height,
              width: canvas.width,
              height: canvas.height,
              yDelta: 1
             }
};


function draw() {
 context.drawImage(backgroundImg, data.background1.x, data.background1.y, data.background1.width, data.background1.height);
 context.drawImage(backgroundImg, data.background2.x, data.background2.y, data.background2.width, data.background2.height);
  
 if(data.hero.shield.hp > 0){
  context.drawImage(shieldImg, data.hero.shield.x, data.hero.shield.y, data.hero.shield.width, data.hero.shield.height);
 }
  
 context.drawImage(heroImg, data.hero.x, data.hero.y, data.hero.width, data.hero.height);
 
 data.hpBox.forEach(function(hpBox){
  context.drawImage(hpBoxImg, hpBox.x, hpBox.y, hpBox.width, hpBox.height);
 });
  
 data.enemy1.enemy.forEach(function(enemy) {
  context.drawImage(enemy1Img, enemy.x, enemy.y, enemy.width, enemy.height);
 });
    
 data.enemy2.enemy.forEach(function(enemy) {
  context.drawImage(enemy2Img, enemy.x, enemy.y, enemy.width, enemy.height);
  context.fillStyle = "green";
  context.fillRect(enemy.x, enemy.y + enemy.height, enemy.hp, 5);
 });
  
 data.enemy3.enemy.forEach(function(enemy) {
  context.drawImage(enemy3Img, enemy.x, enemy.y, enemy.width, enemy.height);
  context.fillStyle = "green";
  context.fillRect(enemy.x, enemy.y + enemy.height, enemy.hp, 5);
 });
 
 data.hero.bullets.forEach(function(bullet) {
  context.drawImage(heroBulletsImg, bullet.x, bullet.y, bullet.width, bullet.height);
 });
 
 data.enemy1.bullets.forEach(function(bullet) {
  context.drawImage(enemy1BulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
 });
 
 data.enemy2.bullets.forEach(function(bullet) {
  context.drawImage(enemy2BulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
 });
 
 data.enemy3.bullets.forEach(function(bullet) {
  context.drawImage(enemy3BulletImg, bullet.x, bullet.y, bullet.width, bullet.height);
 });
}


function update() {
             /*             Some Pre Game & Game Over Actions                 */
 data.background1.y += data.background1.yDelta;
 data.background2.y += data.background2.yDelta;
 if(data.background1.y >= canvas.height){
  data.background1.y = -canvas.height;
 }
 
 if(data.background2.y >= canvas.height){
  data.background2.y = -canvas.height;
 }
 
 if(data.hero.shield.hp > 0){
  data.hero.shield.x = data.hero.x - 5;
  data.hero.shield.y = data.hero.y - 5;
  data.hero.shield.width = data.hero.width + 10;
  data.hero.shield.height = data.hero.height + 10;
 }
 
 scoreBoard.innerHTML = data.score;
 upgradePoints.innerHTML = data.upgradePoints;
 
 if (healthBar.value === 0){
  
  if(data.score > +bestScorePoints.innerHTML){
   bestScorePoints.innerHTML = "" + data.score;
  }
  
  alert("Game Over");
  data.score = 0;
  data.upgradePoints = 0;
  data.level = 1;
  healthBar.value = 100;
  levelButton.innerHTML = "Proceed to level 1";
  levelButton.hidden = false;
  upgradeMenuButton.hidden = false;
  instructionsMenuButton.hidden = false;
  data.enemy1.enemy = [];
  data.enemy2.enemy = [];
  data.enemy3.enemy = [];
  data.enemy1.bullets = [];
  data.enemy2.bullets = [];
  data.enemy3.bullets = [];
  data.hpBox = [];
  data.intervals.forEach(clearInterval)
 }
 
 levelChanger(1, 5, 0, 0);
 levelChanger(2, 10, 2, 0);
 levelChanger(3, 15, 3, 1);
 levelChanger(4, 20, 4, 2);
 levelChanger(5, 25, 5, 3);
 levelChanger(6, 30, 6, 4);
 levelChanger(7, 35, 7, 5);
 levelChanger(8, 40, 8, 6);
 levelChanger(9, 45, 9, 7);

                /*                         Hero                     */
 data.hero.x += data.hero.xDelta;
  
 if (data.hero.x >= canvas.width - data.hero.width) {
  data.hero.x = canvas.width - data.hero.width;
 }
    
 if (data.hero.x <= 0) {
  data.hero.x = 0;
 }
                 /*           Bullet Interractions Section          */
data.hero.bullets.forEach(function(bullet) {
    
 bullet.y += bullet.yDelta;
 bullet.x += bullet.xDelta;
 heroBulletCollisions(bullet, data.enemy1.enemy, 60);
 heroBulletCollisions(bullet, data.enemy2.enemy, 27);
 heroBulletCollisions(bullet, data.enemy3.enemy, 10);
});

enemyBulletCollision(data.enemy1.bullets);
enemyBulletCollision(data.enemy2.bullets);
   
   
               /*            Unit Interractions Section            */
  
data.enemy1.enemy.forEach(function(enemy) {
 
 enemy.y += enemy.yDelta;
 enemy.x += enemy.xDelta;
 
    
  if(enemy.x >= canvas.width - enemy.width || enemy.x <= 0){
   enemy.xDelta *= -1;
  }
    
  if(enemy.y > 0 && enemy.y < canvas.height - enemy.height){
   enemy.inCanvas = true;
  }
    
  if (enemy.y >= canvas.height - enemy.height - data.hero.height || enemy.y <= 0 && enemy.inCanvas === true){
   enemy.yDelta *= -1;
  }
});
  
data.enemy2.enemy.forEach(function(enemy) {
 
 enemy.x += enemy.xDelta;
     
  if(enemy.x > 0 && enemy.x < canvas.width - enemy.width){
   enemy.inCanvas = true;
  }
    
  else if(enemy.x >= canvas.width - enemy.width || enemy.x <= 0 && enemy.inCanvas === true){
   enemy.xDelta *= -1;
  }
});
  
data.enemy3.enemy.forEach(function(enemy) {
 
 enemy.x += enemy.xDelta;
  
  if(enemy.x > 0 && enemy.x < canvas.width - enemy.width){
   enemy.inCanvas = true;
  }
    
  else if(enemy.x >= canvas.width - enemy.width || enemy.x <= 0 && enemy.inCanvas === true){
   enemy.xDelta *= -1;
  }
});
  
data.hpBox.forEach(function(hpBox){
 
 hpBox.y += hpBox.yDelta;
  
  if(hpBox.y >= canvas.height - hpBox.height){
   hpBox.y = canvas.height - hpBox.height;
  }
});
   
                /*            Filtering Section                      */
data.enemy1.enemy = data.enemy1.enemy.filter(function (enemy){
  if (enemy.hp <= 0){
   data.enemy1.dead += 1;
   data.score += 100;
   data.upgradePoints += 10;
   return false;
  }
  else if(enemy.y >= canvas.height){
   data.enemy1.dead += 1;
   return false;
  }
  return true;
});
  
data.enemy2.enemy = data.enemy2.enemy.filter(function (enemy){
   if (enemy.hp <= 0){
    data.enemy2.dead += 1;
    data.score += 200;
    data.upgradePoints += 20;
    return false;
   }
   
  return true;
  });
  
data.enemy3.enemy = data.enemy3.enemy.filter(function (enemy){
   if (enemy.hp <= 0){
    data.hpBox.unshift({
     x: enemy.x + enemy.width/2,
     y: enemy.y + enemy.height,
     width: 50,
     height: 50,
     yDelta: 4
    });
    
    data.enemy3.dead += 1;
    data.score += 500;
    data.upgradePoints += 40;
    return false;
   }
  
  else if(enemy.x >= canvas.width){
    data.enemy3.dead += 1;
    return false;
   }
  return true;
  });
  
data.hpBox = data.hpBox.filter(function(hpBox){
   if(collide(hpBox, data.hero)){
    healthBar.value += 25;
    return false;
   }
  return true; 
  });
         
data.hero.bullets = data.hero.bullets.filter(function(bullet) {
 
 if (bullet.y <= 0 || bullet.deleteMe === true) {
  return false;
 }
 return true;
});

data.enemy1.bullets = data.enemy1.bullets.filter(function(bullet) {
    if (bullet.y >= canvas.height + bullet.height || bullet.deleteMe === true) {
     return false;
    }
   return true;
   });
   
data.enemy2.bullets = data.enemy2.bullets.filter(function(bullet) {
    if (bullet.y >= canvas.height + bullet.height || bullet.deleteMe === true) {
     return false;
    }
   return true;
   });
}

function loop() {
 requestAnimationFrame(loop);
 update();
 draw();
}
loop();

                 /*           Buttons             */
levelButton.addEventListener("click", function(evt){
 levelStarted(1, 5, 0, 0, 0.4);
 levelStarted(2, 10, 2, 0, 0.4);
 levelStarted(3, 15, 3, 1, 0.6);
 levelStarted(4, 20, 4, 2, 0.6);
 levelStarted(5, 25, 5, 3, 0.8);
 levelStarted(6, 30, 6, 4, 0.8);
 levelStarted(7, 35, 7, 5, 0.8);
 levelStarted(8, 40, 8, 6, 1);
 levelStarted(9, 45, 9, 7, 1);
 });

upgradeMenuButton.addEventListener("click", function(){
 
 upgradeMenuButtonClick();
 
});

instructionsMenuButton.addEventListener("click", function(){
 
 instructionsMenuButtonClick();
 
});

upgrade1Button.addEventListener("click", function(){
 if(data.hero.level === 1){
  if(data.upgradePoints >= 200){
   upgradeSound.volume = volume.valueAsNumber / 100;
   upgradeSound.currentTime = 0;
   upgradeSound.play();
   data.upgradePoints -= 200;
   data.hero.level = 2;
   upgrade1Button.innerHTML = "400 Points"
   heroImg.src = "https://image.flaticon.com/icons/png/64/1308/1308750.png";
  }
  else{
   alert("You need " + (200 - data.upgradePoints) + " More Points")
  }
 }
 
 else if(data.hero.level === 2){
  if(data.upgradePoints >= 400){
   upgradeSound.volume = volume.valueAsNumber / 100;
   upgradeSound.currentTime = 0;
   upgradeSound.play();
   data.upgradePoints -= 400;
   data.hero.level = 3;
   heroImg.src = "https://image.flaticon.com/icons/png/64/1985/1985789.png";
   upgrade1Button.hidden = true;
  }
  else{
   alert("You need " + (400 - data.upgradePoints) + " More Points")
  }
 }
});

upgrade2Button.addEventListener("click", function(){
 
 if(data.upgradePoints >= 100){
  upgradeSound.volume = volume.valueAsNumber / 100;
  upgradeSound.currentTime = 0;
  upgradeSound.play();
  data.upgradePoints -= 100;
  data.hero.shield.hp = 100;
  upgrade2Button.hidden = true;
 }
 
 else{alert("You need " + (100 - data.upgradePoints) + " More Points")}
});

upgrade3Button.addEventListener("click", function(){
 if(data.upgradePoints >= 50){
  upgradeSound.volume = volume.valueAsNumber / 100;
  upgradeSound.currentTime = 0;
  upgradeSound.play();
  data.upgradePoints -= 50;
  healthBar.value += 100;
  upgrade3Button.hidden = true;
 }
 
 else{alert("You need " + (50 - data.upgradePoints) + " More Points")}
});

                  /*           Hero Controls     */
document.addEventListener("keydown", function(evt) {
 if (evt.code === "ArrowRight") {
  data.hero.xDelta = 5;
 } 
 else if (evt.code === "ArrowLeft") {
  data.hero.xDelta = -5;
 } 
 
});

document.addEventListener("keyup", function(evt) {
 if (evt.code === "ArrowRight" || evt.code === "ArrowLeft") {
  data.hero.xDelta = 0;
 }
 
 else if (evt.code === "Space") {
  bulletSound.volume = volume.valueAsNumber / 100;
  bulletSound.currentTime = 0;
  bulletSound.play();

 
 
  data.hero.bullets.unshift({
      x: data.hero.x + data.hero.width/2 - 10,
      y: data.hero.y,
      width: 20,
      height: 20,
      yDelta: -5,
      xDelta: 0
  });
 
 
 if(data.hero.level >= 2){
 
  data.hero.bullets.unshift({
      x: data.hero.x + data.hero.width/2 - 15,
      y: data.hero.y + 15,
      width: 20,
      height: 20,
      yDelta: -5,
      xDelta: -1
  }, {
      x: data.hero.x + data.hero.width/2 - 5,
      y: data.hero.y + 15,
      width: 20,
      height: 20,
      yDelta: -5,
      xDelta: 1
     }
   );
  }
  
  if(data.hero.level >= 3){
 
  data.hero.bullets.unshift({
      x: data.hero.x + data.hero.width/2 - 20,
      y: data.hero.y + 20,
      width: 20,
      height: 20,
      yDelta: -5,
      xDelta: -2
 }, {
      x: data.hero.x + data.hero.width/2,
      y: data.hero.y + 20,
      width: 20,
      height: 20,
      yDelta: -5,
      xDelta: 2
 }
   );
  }
 }
});

               /*          Functions            */
function createEnemies1 (level, num, speed) {
 if(data.enemy1.alive < num && level === data.level){
  data.enemy1.alive += 1;
  data.enemy1.enemy.unshift({
   
    x: Math.round(Math.random() * (canvas.width - 65 - 0) + 0),
    y: -65,
    width: 40,
    height: 40,
    yDelta: speed,
    xDelta : Math.random() * (3 - (-3)) + (-3),
    hp : 60
   });
   
  
  data.enemy1.enemy.forEach(function(enemy){
   let interval = setInterval(function(){
    if(enemy.hp > 0){
     data.enemy1.bullets.unshift({
      x: enemy.x + enemy.width / 2,
      y: enemy.y + enemy.height,
      width: 20,
      height: 20,
      yDelta: 3
     });
    }
   }, 4000);
   
   data.intervals.unshift(interval)
  });
 } 
}

function createEnemies2 (level, num, speed) {
 if(data.enemy2.alive < num && level === data.level){
  data.enemy2.alive += 1;
  data.enemy2.enemy.unshift(
   {
    x: -65,
    y: Math.round(Math.random() * (70 - 0) + 0),
    width: 80,
    height: 65,
    xDelta: speed,
    hp : 80
   });
   
   data.enemy2.enemy.forEach(function(enemy){
   let interval = setInterval(function(){
    if(enemy.hp > 0){
     data.enemy2.bullets.unshift({
      x: enemy.x + enemy.width / 2,
      y: enemy.y + enemy.height,
      width: 40,
      height: 40,
      yDelta: 3
     });
    }
   }, 2500);
   
   data.intervals.unshift(interval)
  });
 }
}

function createEnemies3 (level, num) {
 if(data.enemy3.alive < num && level === data.level){
  data.enemy3.alive += 1;
  data.enemy3.enemy.unshift(
    {
     x: -65,
     y: 0,
     width: 100,
     height: 65,
     xDelta: 1,
     hp: 100
    });
 } 
}

function collide(rect1, rect2){
 const x = Math.max(rect1.x, rect2.x),
 num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
 y = Math.max(rect1.y, rect2.y),
 num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
 return (num1 >= x && num2 >= y);
}

function enemyBulletCollision (bulletsArray){
 bulletsArray.forEach(function(bullet1){
  
  bullet1.y += bullet1.yDelta;
     
   if (collide(bullet1, data.hero)) {
    heroHitSound.volume = volume.valueAsNumber / 100;
    heroHitSound.currentTime = 0;
    heroHitSound.play();
    bullet1.deleteMe = true;
     if(data.hero.shield.hp > 0){
      data.hero.shield.hp -= 10;
     }
     else{
      healthBar.value -= 10;
     }
    }
     
 bulletsArray.forEach(function(bullet2){
  if(collide(bullet1, bullet2)){
   bullet2.deletMe = true;
  }
 });
});
   
   bulletsArray = bulletsArray.filter(function(bullet) {
    if (bullet.y >= canvas.height + bullet.height || bullet.deleteMe === true) {
     return false;
    }
   return true;
   });
 }
 
function heroBulletCollisions (bullet, enemyArray, hp){
 enemyArray.forEach(function(enemy) {
      
  if (collide(bullet, enemy)) {
   hitSound.volume = volume.valueAsNumber / 100;
   hitSound.currentTime = 0;
   hitSound.play();
   bullet.deleteMe = true;
   enemy.hp -= hp;
  }
 });
}

function levelStarted (level, enemies1Number, enemies2Number, enemies3Number, speed){

 if(levelButton.innerHTML === "Proceed to level " + level){
  data.enemy1.alive = 0;
  data.enemy2.alive = 0;
  data.enemy3.alive = 0;
  data.enemy1.dead = 0;
  data.enemy2.dead = 0;
  data.enemy3.dead = 0;
  levelButton.hidden = true;
  upgradeMenuButton.hidden = true;
  instructionsMenuButton.hidden = true;
  let interval1 = setInterval(createEnemies1, 1000, level, enemies1Number, speed);
  let interval2 = setInterval(createEnemies2, 3000, level, enemies2Number, speed);
  let interval3 = setInterval(createEnemies3, 4500, level, enemies3Number, speed);
  data.intervals.unshift(interval1, interval2, interval3)
 }
}

function levelChanger(levelNumber, deadEnemy1Number, deadEnemy2Number, deadEnemy3Number){
  
 if(data.level === levelNumber && data.enemy1.dead === deadEnemy1Number && data.enemy2.dead === deadEnemy2Number && data.enemy3.dead === deadEnemy3Number){
  data.level += 1;
  levelButton.hidden = false;
  upgradeMenuButton.hidden = false;
  instructionsMenuButton.hidden = false;
  levelButton.innerHTML = "Proceed to level " + data.level;
  data.intervals.forEach(clearInterval);
  data.intervals = [];
  data.enemy1.bullets = [];
  data.enemy2.bullets = [];
  data.enemy3.bullets = [];
 }
}

function upgradeMenuButtonClick(){

 if(upgradeMenuButton.innerHTML === "Upgrade Menu"){
  upgradeMenuButton.innerHTML = "Back to Main Menu"
  levelButton.hidden = true;
  instructionsMenuButton.hidden = true;
  upgrade1Button.hidden = false;
  if(data.hero.shield.hp <= 0){
   upgrade2Button.hidden = false;
  }
  if(data.hero.level < 3){
   upgrade3Button.hidden = false;
  } 
 }
 
 else if(upgradeMenuButton.innerHTML === "Back to Main Menu"){
  upgradeMenuButton.innerHTML = "Upgrade Menu"
  levelButton.hidden = false;
  instructionsMenuButton.hidden = false;
  upgrade1Button.hidden = true;
  upgrade2Button.hidden = true;
  upgrade3Button.hidden = true;
 }
}

function instructionsMenuButtonClick(){

 if(instructionsMenuButton.innerHTML === "Instructions Menu"){
  instructionsMenuButton.innerHTML = "Back to Main Menu"
  levelButton.hidden = true;
  upgradeMenuButton.hidden = true;
  instruction1Button.hidden = false;
  instruction2Button.hidden = false;
  instruction3Button.hidden = false;
 }
 
 else if(instructionsMenuButton.innerHTML === "Back to Main Menu"){
  instructionsMenuButton.innerHTML = "Instructions Menu"
  levelButton.hidden = false;
  upgradeMenuButton.hidden = false;
  instruction1Button.hidden = true;
  instruction2Button.hidden = true;
  instruction3Button.hidden = true;
 }
}

