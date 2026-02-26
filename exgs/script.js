slideImages=[]
slides=[]

slideNumber=5
currentSlide=0

soundCues=[["underwaterAmbiance",1],["drone_deepBass",3]]

soundNames=["underwaterAmbiance","drone_deepBass"]

soundFadeTime=10000

for(var i=0;i<slideNumber;i++){
    slideImages[i]="images/"+(i+1)+".png"
}

function createSlides(){
    for(var i=0;i<slideImages.length;i++){
        slides[i]=document.createElement("img");
        slides[i].src=slideImages[i];
        slides[i].classList.add("slide")
        document.body.appendChild(slides[i]);
    }
}

function startSlides(){
    resetSlides();
    slides[currentSlide].id="currentSlide"
}

function resetSlides(){
    for(var i=0;i<slides.length;i++){
        slides[i].id="";
    }
}

function advanceSlide(i){
    currentSlide+=i
    resetSlides()
    currentSlide=(currentSlide+slides.length)%slides.length
    slides[currentSlide].id="currentSlide"

    for(var k=0;k<soundCues.length;k++){
        if(soundCues[k][1]==currentSlide){
            resetAudio(soundCues[k][0])
            fadeAudio(soundCues[k][0],1,soundFadeTime)
        }
    }
}

function resetAudio(soundToKeep){
    for(var i=0;i<soundNames.length;i++){
        if(soundNames[i]!=soundToKeep) fadeAudio(soundNames[i],0,soundFadeTime)
    }
}

function fadeAudio(name,targetVolume,time){
    $("#"+name).animate({volume:targetVolume},time)
}

createSlides()
startSlides()



addEventListener("keydown",function (e) {
  switch (e.keyCode) {
        case 37:
            str = 'Left Key pressed!';
            advanceSlide(-1);
            break;
        case 38:
            str = 'Up Key pressed!';
            advanceSlide(-1);
            break;
        case 39:
            str = 'Right Key pressed!';
            advanceSlide(1);
            break;
        case 40:
            str = 'Down Key pressed!';
            advanceSlide(1);
            break;
    }
});

addEventListener("mousedown",function (e) {
    if(!firstInteraction){
        setupSound();
        firstInteraction=true;
    }
    switch (e.button) {
        case 0:
            str = "Left button clicked.";
            advanceSlide(1);
        break;
        case 1:
            str = "Middle button clicked.";
        break;
        case 2:
            str = "Right button clicked.";
            advanceSlide(-1);
        break;
        default:
            str = `Unknown button code: ${e.button}`;
    }
});



firstInteraction=false;

var underwaterAmbiance

function setupSound(){
    // underwaterAmbiance = new Howl({
    //     src: ['sounds/underwaterAmbiance.ogg'],
    //     loop: true,
    //     volume: 1,
    //     autoplay:false,
    //     });
    for(var i=0;i<soundNames.length;i++){
        var snd=$("#"+soundNames[i]);
        snd[0].volume=0;
        snd[0].play();
    }
}