var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT;

class Block{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "blue";
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    move(vel){
        this.x -= vel;
    }
    validBlock(playerRect){
        if (this.x > -20){
            if (playerRect[0] < this.x + this.w &&
                playerRect[0] + playerRect[2] > this.x &&
                playerRect[1] < this.y + this.h &&
                playerRect[3] + playerRect[1] > this.y) {
                return "gameover";
            }
            else{
                return true;
            }
        }
        else{
            return false;
        }
    }
}
blocks = [new Block(500, HEIGHT - 50, 30, 50)]

class Player{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
        this.jump = false;
        this.jumpCount = 0;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}
player = new Player(0, 0, 50, 50);

window.addEventListener("touchstart", function(ev){

    if (player.jump == false){
        player.jump = true;
    }
})

blockVel = 3;
gameover = false;
function main(){
    if (!gameover){
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        if (player.y + player.h < HEIGHT - 20){
            player.y += 5;
        }
        if (player.jump){
            if (player.jumpCount < 10){
                player.y -= 20;
                player.jumpCount += 1;
            }
            else if (player.y + player.h >= HEIGHT - 20){
                player.jump = false;
                player.jumpCount = 0;
            }
        }
        player.draw();
        for (var i = 0; i < blocks.length; i++){
            blocks[i].draw();
            blocks[i].move(blockVel);
            if (!blocks[i].validBlock([player.x, player.y, player.w, player.h])){
                blocks.pop(blocks[i]);
                blocks.push(new Block(WIDTH + 60, HEIGHT - 50, 30, 50));
                if (blockVel < 20){
                    blockVel += 1;
                }
            }
            if (blocks[i].validBlock([player.x, player.y, player.w, player.h]) == "gameover"){
                console.log("G A M E  O V E R");
                gameover = true;
                document.getElementById("h1").style.visibility = "visible";
                document.getElementById("canvas").style.visibility = "hidden";
            }
        }
    }
    window.requestAnimationFrame(main);    
}
main();