walkSpeed=5;
timer=0;

img_index=0;

spritesIdle=["bottom1"]
spritesDown=["bottom2","bottom1","bottom3","bottom1"]
spritesUp=["top2","top1","top3","top1"]
spritesLeft=["left1","left2","left1","left2"]
spritesRight=["right1","right2","right1","right2"]

imageSpeed=8

spriteImages=document.getElementsByClassName("avatar")
sprite=spriteImages[0]

islands=document.querySelectorAll(".island, .subisland");
direction="down"

function setup(){
    world=document.getElementById("world");
}

function draw(){
    var moving=false 

    if(keyIsDown(LEFT_ARROW)){
        world.style.left=(parseFloat(getComputedStyle(world).getPropertyValue("left"))+walkSpeed).toString()+"px";
        moving=true
        direction="left"
    }
    if(keyIsDown(DOWN_ARROW)){
        world.style.top=(parseFloat(getComputedStyle(world).getPropertyValue("top"))-walkSpeed).toString()+"px";
        moving=true
        direction="down"
    }
    if(keyIsDown(RIGHT_ARROW)){
        world.style.left=(parseFloat(getComputedStyle(world).getPropertyValue("left"))-walkSpeed).toString()+"px";
        moving=true
        direction="right"
    }
    if(keyIsDown(UP_ARROW)){
        world.style.top=(parseFloat(getComputedStyle(world).getPropertyValue("top"))+walkSpeed).toString()+"px";
        moving=true
        direction="up"
    }   

    if(!moving) timer=0

    timer+=deltaTime/1000

    sprites=spritesDown
    switch(direction){
        case "left":
            sprites=spritesLeft
            break;
        case "down":
            sprites=spritesDown
            break;  
        case "up":
            sprites=spritesUp
            break;  
        case "right":
            sprites=spritesRight
            break;  
    }

    for(var i=0;i<spriteImages.length;i++){
        spriteImages[i].style.visibility="hidden"
    }

    if(moving){
        //sprite.src="images/"+sprites[parseInt((timer*imageSpeed)%sprites.length)]
        document.getElementById(sprites[parseInt((timer*imageSpeed)%sprites.length)]).style.visibility="visible"
    }
    else{
        //sprite.src="images/"+sprites[1]
        document.getElementById(sprites[1]).style.visibility="visible"
    } 

    var rect=sprite.getBoundingClientRect()
    var avatarx=rect.left+(rect.right-rect.left)/2;
    var avatary=rect.bottom;

    for(var i=0;i<islands.length;i++){
        var rect = islands[i].getBoundingClientRect()
        var x=rect.left;
        var y=rect.top;
        var w=rect.right-rect.left;
        var h=rect.bottom-rect.top;

        if(avatarx<x || avatarx>x+w || avatary<y || avatary>y+h){
            islands[i].classList.remove("bordered");
        }else{
            islands[i].classList.add("bordered");
        }
    }

}