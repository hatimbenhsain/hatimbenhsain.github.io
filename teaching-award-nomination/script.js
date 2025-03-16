walkSpeed=5;
timer=0;

img_index=0;

spritesIdle=["alexanderKing1.png"]
spritesDown=["alexanderKing2.png","alexanderKing1.png","alexanderKing3.png","alexanderKing1.png"]
spritesUp=["alexanderKing5.png","alexanderKing4.png","alexanderKing6.png","alexanderKing4.png"]
spritesLeft=["alexanderKing7.png","alexanderKing8.png","alexanderKing7.png","alexanderKing8.png"]
spritesRight=["alexanderKing9.png","alexanderKing10.png","alexanderKing9.png","alexanderKing10.png"]

imageSpeed=8

sprite=document.getElementById("avatar")

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

    if(moving)
    sprite.src="images/"+sprites[parseInt((timer*imageSpeed)%sprites.length)]
    else sprite.src="images/"+sprites[1]

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