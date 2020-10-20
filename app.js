let arr = [];
let count;
let index = 0;
let prev;

class Cell{
    constructor(x,y, ind){
        this.x = x;
        this.y = y;
        this.height = 14;
        this.width = 14;
        this.alive = false;
        this.col = color(50);
        this.rad = 7;
        this.ind = ind;
        this.upper;
        this.lower;
        this.right;
        this.left;
        this.leftup;
        this.leftdown;
        this.rightup;
        this.rightdown;
    }

    setUpper(upper){
        this.upper = upper;
    }

    setLower(lower){
        this.lower = lower;
    }

    setRight(right, up, down){
        this.right = right;
        this.rightup = up;
        this.rightdown = down;
    }

    setLeft(left, up, down){
        this.left = left;
        this.leftup = up;
        this.leftdown = down;
    }

    clicked(){
        var d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.rad) {
            if(this.alive){
                this.die()
                console.log(this.ind);
            }else{
                this.born()
            }
        }
    }

    born(){
        this.alive = true;
        this.col = color(251,5,251);
        this.height = 20;
        this.width = 20;
        this.rad = 10;
    }

    die(){
        this.height = 14;
        this.width = 14; 
        this.col = color(50);
        this.alive = false;
        this.rad = 7;
    }

    bg(){
        fill(this.col);
    }

    mapout(){
        ellipse(this.x, this.y, this.height, this.width);
    }

    rules(){
        var neighbors = 0;
        if (this.upper.alive == true){
            neighbors+=1;
        }
        if (this.lower.alive == true){
            neighbors+=1;
        }
        if (this.left.alive == true){
            neighbors+=1;
        }
        if (this.right.alive == true){
            neighbors+=1;
        }
        if (this.rightup.alive == true){
            neighbors+=1;
        }
        if (this.leftup.alive == true){
            neighbors+=1;
        }
        if (this.rightdown.alive == true){
            neighbors+=1;
        }
        if (this.leftdown.alive == true){
            neighbors+=1;
        }

        if (neighbors == 3){
            this.born()
        }
        if (neighbors <= 1){
            this.die()
        } 
        if (neighbors > 4){
            this.die();
            this.lower.die();
        }
    }
}

function setup() {
    createCanvas(screen.width /1.25, screen.height /1.25);
    for (let x = 0; x < screen.width /1.3; x += 15){
        for (let y = 0; y < screen.height /1.3; y += 15){
            arr[index] = new Cell(x+10, y+10, index);
            index += 1;
        }
    }

    

    for(let i = 0; i < index; i++){
        if(arr[i].ind > 0){
            arr[i].setUpper(arr[i-1]);
        }else{
            arr[i].setUpper(arr[5543]);
        }

        if (arr[i].ind <= 5542){
            arr[i].setLower(arr[i+1]);
        }else{
            arr[i].setLower(arr[0]);
        }

        if (arr[i].x != 10){
            if(arr[i].ind != 56){
                arr[i].setLeft(arr[i-56],arr[i-55],arr[i-57]);
            }else{
                arr[i].setLeft(arr[i-56],arr[arr.length-1],arr[1]);
            }
        }else{
            if(arr[i].ind == 55){
                arr[i].setLeft(arr[arr.length-1],arr[0],arr[arr.length-2]);
            }else{
                arr[i].setLeft(arr[i+5488],arr[i+5487],arr[i+5489]);
            }
        }

        if (arr[i].x != 1480){
            if(arr[i].ind == 5487){
                arr[i].setRight(arr[i+56],arr[i+55],arr[0]);
            } else{
                arr[i].setRight(arr[i+56],arr[i+55],arr[i+57]);
            }
        }else{
            if(arr[i].ind == 5488){
                arr[i].setRight(arr[0],arr[5543],arr[1]);
            } else{
                arr[i].setRight(arr[i-5488],arr[i-5487],arr[i-5489]);
            }
        }
    }

  }

function mousePressed(){
    loop();
    for(let i = 0; i < index; i++){
        arr[i].clicked()
        arr[i].bg()
        arr[i].mapout()
   }
}
  
function draw() {
   background(0);
   for(let i = 0; i < index; i++){
        arr[i].bg()
        arr[i].mapout()
   }
    
}

function mouseReleased() {
    noLoop();
  }



//begin
const begin = document.querySelector(".start");
const pause = document.querySelector(".stop");
const clear = document.querySelector(".clear");
var flip = 0;

clear.addEventListener("click", wipe);

function wipe(){
    end();
    for(var i = 0; i < arr.length-1; i ++){
        arr[i].die();
        arr[i].bg();
        arr[i].mapout();
    }
};

pause.addEventListener('click', end);
function end() {
    flip = 0;
    clearInterval(intervalId);
}


begin.addEventListener('click', live);
function live() {
    intervalId = setInterval(function() {
        for(var i = arr.length-1; i > 0; i --){
            loop();
            arr[i].rules();
            arr[i].bg();
            arr[i].mapout();
        }
      }, 500);
};


