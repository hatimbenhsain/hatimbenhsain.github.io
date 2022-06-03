abtButton=document.getElementById("abtButton");

trashIcon=document.getElementById("trashIcon");
var trash=[];

var interacted=false;

gallerySources=["amelMart.jpg","changeDwellingColors.jpg","creechur.gif","gopPainting.gif","gopSketch.png","janitoBot.jpg",
"kidloki.jpg","skeleguy.gif"];

var clickableStuff=Array.from(document.getElementsByClassName("desktopIcon"));
var desktopIcons=[];

function mobileMode(){
	return(window.matchMedia("(max-device-width: 640px) and (orientation: portrait)").matches ||
		window.matchMedia("(max-device-height: 640px) and (orientation: landscape)").matches);
}

clickableStuff.forEach(function(e){
	desktopIcons.push(e);
});

var desktopIconInfo=[];

for(var i=0;i<desktopIcons.length;i++){
	compStyle=window.getComputedStyle(desktopIcons[i]);
	var info={id:desktopIcons[i].id,initLeft:compStyle.getPropertyValue('left'),initTop:compStyle.getPropertyValue('top'),
		initRight:compStyle.getPropertyValue('right'),initBottom:compStyle.getPropertyValue('bottom')};
	desktopIconInfo.push(info);
}

var aboutWindow=document.getElementById("aboutWindow");
const aboutInfo={window:aboutWindow,initLeft:aboutWindow.style.left,initTop:aboutWindow.style.top};

var comicsWindow=document.getElementById("comicsWindow");
const comicsInfo={window:comicsWindow,initLeft:comicsWindow.style.left,initTop:comicsWindow.style.top};


var gamesWindow=document.getElementById("gamesWindow");
const gamesInfo={window:gamesWindow,initLeft:gamesWindow.style.left,initTop:gamesWindow.style.top};

var musicWindow=document.getElementById("musicWindow");
const musicInfo={window:musicWindow,initLeft:musicWindow.style.left,initTop:musicWindow.style.top};

var galleryWindow=document.getElementById("galleryWindow");
const galleryInfo={window:galleryWindow,initLeft:galleryWindow.style.left,initTop:galleryWindow.style.top};

var infos=[aboutInfo,comicsInfo,gamesInfo,musicInfo,galleryInfo];
for(var i=0;i<infos.length;i++){
	infos[i].initRight=infos[i].window.style.right;
	infos[i].initBottom=infos[i].window.style.bottom;
}

const cursorNormal = document.getElementById('cursorNormal');
const cursorHover = document.getElementById('cursorHover');
const cursorClick = document.getElementById('cursorClick');

var mouseClicked=false;
var mouseHovering=false;
var mouseout=false;
var crossClicked=-1;
var mouseMoved=false;

cursorNormal.style.visibility="visible";
cursorHover.style.visibility="hidden";
cursorClick.style.visibility="hidden";

var draggedElement=-1;
var disX=0;
var disY=0;

console.log(window.screen.height);

const moveCursor = (e)=> {
	mouseMoved=true;

	const mouseY = e.clientY;
	const mouseX = e.clientX-64;
   
	cursorNormal.style.top=mouseY+"px";
	cursorNormal.style.left=mouseX+"px";
	cursorHover.style.top=mouseY+"px";
	cursorHover.style.left=mouseX+"px";
	cursorClick.style.top=mouseY+"px";
	cursorClick.style.left=mouseX+"px";

	//log.innerHTML=log.innerHTML+"<br>moving";
	if(draggedElement!=-1 && mouseClicked){
		if(crossClicked==-1){
			if(draggedElement.classList.contains("desktopIcon") || draggedElement.classList.contains("window")){
				draggedElement.style.left=mouseX+disX+"px";
				draggedElement.style.top=mouseY+disY+"px";
				draggedElement.style.bottom="auto";
				draggedElement.style.right="auto";
			}

			if(draggedElement.classList.contains("desktopIcon")){
				if(collide(trashIcon.getElementsByClassName("iconImg")[0],draggedElement) && draggedElement.id!="trashIcon"){
					trashIcon.getElementsByClassName("iconImg")[0].classList.add("trashOver");
				}else{
					trashIcon.getElementsByClassName("iconImg")[0].classList.remove("trashOver");
				}
			}
			//console.log("moving");
			//log.innerHTML=log.innerHTML+"<br>moving "+draggedElement.className;
			var children=draggedElement.children;
			for(var i=0;i<children.length;i++){
				if(children[i].tagName.toLowerCase()=="a"){
					children[i].classList.remove("dragstart");
		        	children[i].className=children[i].className + " dragstart";
		        	log.innerHTML=log.innerHTML+"<br>removing a tag ";
	        	}
			}
		}else{
			draggedElement=-1;
		}
	}

	if(mouseout){
		cursorNormal.style.visibility="visible";
		cursorHover.style.visibility="hidden";
		cursorClick.style.visibility="hidden";
		mouseout=false;
	}

}

window.addEventListener('mousemove', moveCursor)



window.addEventListener('mousedown',function(){
	mouseMoved=false;
	interacted=true;
	if(!mobileMode() && interacted){
		clickSnd1.currentTime=0;
		clickSnd1.play();
	}
	if(mouseHovering){
		cursorNormal.style.visibility="hidden";
		cursorHover.style.visibility="hidden";
		cursorClick.style.visibility="visible";
	}
	mouseClicked=true;
})

window.addEventListener('mouseup',function(){
	if(!mobileMode() && interacted){
		clickSnd2.currentTime=0;
		clickSnd2.play();
	}
	trashIcon.getElementsByClassName("iconImg")[0].classList.remove("trashOver");
	var clicked=document.getElementsByClassName("clicked");
	for(var i=0;i<clicked.length;i++){
		clicked[i].classList.remove("clicked");
	}

	var k = document.querySelectorAll(".dragstart")
    for(var i=0; i < k.length;i++){
        k[0].classList.remove("dragstart")
    }

	if(mouseHovering){
		cursorNormal.style.visibility="hidden";
		cursorHover.style.visibility="visible";
		cursorClick.style.visibility="hidden";
	}else{
		cursorNormal.style.visibility="visible";
		cursorHover.style.visibility="hidden";
		cursorClick.style.visibility="hidden";
	}
	mouseClicked=false;
	draggedElement=-1;

	
})

document.addEventListener("mouseleave",function(){
	cursorNormal.style.visibility="hidden";
	cursorHover.style.visibility="hidden";
	cursorClick.style.visibility="hidden";
	mouseout=true;
})

var tagSection=document.getElementsByClassName("tagSection");
var checkboxes=Array.from(tagSection[0].getElementsByClassName("input-checkbox"));
var labels=Array.from(tagSection[0].getElementsByClassName("checkbox"));
console.log(checkboxes);

for(var k=0;k<checkboxes.length;k++){
	checkboxes[k].addEventListener("change",checkboxClicked);
}

function checkboxClicked(e){
	var checkbox=e.target;
	var tags=[];
	for(var i=0;i<checkboxes.length;i++){
		if(checkboxes[i].checked){
			tags.push(checkboxes[i].parentElement.getElementsByTagName("span")[0].innerHTML.replace(/\s/g, ''))
		}
	}
	var w=e.target.parentElement;
	while(!w.classList.contains("windowContent") && w.parentElement!=null){
		w=w.parentElement;
	}
	var fileBrowser=w.getElementsByClassName("fileBrowser")[0];
	var games=Array.from(fileBrowser.getElementsByClassName("folderIcon"));
	for(var i=0;i<games.length;i++){
		var containsTags=true;
		var gameTags=games[i].classList;
		for(var n=0;n<tags.length;n++){
			if(!gameTags.contains(tags[n])){
				containsTags=false;
				break;
			}
		}
		if(containsTags){
			games[i].style.display="initial";
		}else{
			games[i].style.display="none";
		}
	}
}

function clearTags(e){
	console.log("clear tags");
	var w=e.target.parentElement;
	while(!w.classList.contains("windowContent") && w.parentElement!=null){
		w=w.parentElement;
	}
	var fileBrowser=w.getElementsByClassName("fileBrowser")[0];
	var games=Array.from(fileBrowser.getElementsByClassName("folderIcon"));
	for(var i=0;i<checkboxes.length;i++){
		checkboxes[i].checked=false;
	}
	for(var i=0;i<games.length;i++){
		games[i].style.display="initial";
	}
}

var clearButtons=Array.from(document.getElementsByClassName("clearButton"));
for(var i=0;i<clearButtons.length;i++){
	clearButtons[i].addEventListener("click",clearTags);
}



var windows=Array.from(document.getElementsByClassName("windowBanner"));

clickableStuff=clickableStuff.concat(windows);

var folderIcons=Array.from(document.getElementsByClassName("folderIcon"));
clickableStuff=clickableStuff.concat(folderIcons);

clickableStuff=clickableStuff.concat(labels);

clickableStuff=clickableStuff.concat(clearButtons);

var buttonImgs=Array.from(document.getElementsByClassName("buttonImg"));
clickableStuff=clickableStuff.concat(buttonImgs);
clickableStuff.push(document.getElementById("seekSlider"));


for(var i=0;i<windows.length;i++){
	windows[i]=windows[i].parentElement;
	windows[i].addEventListener("click",function(e){
		var w=e.target;
		while(!w.classList.contains("window") && w.parentElement!=null){
			w=w.parentElement;
		}
		putOnTop(w,windows,100);
	})
}

var log=document.getElementById("log");

var crosses=Array.from(document.getElementsByClassName("crossImg"));

for(var i=0;i<crosses.length;i++){
	crosses[i].addEventListener("mousedown",function(e){
		crossClicked=e.target;
	});

	crosses[i].addEventListener("mouseup",function(e){
		console.log(e);
		if(crossClicked==e.target){
			console.log("cross clicked");
			var w=crossClicked;
			while(!w.classList.contains("window") || w.classList.contains("windowBanner")){
				w=w.parentElement;
			}
			//w.style.visibility="hidden";
			w.classList.remove("windowOpened");
			w.classList.add("windowClosed");
			setTimeout(replaceWindow,300,w);
			if(w.id=="musicWindow"){
				stopMusic();
			}
		}
		crossClicked=-1;
	});
}

function replaceWindow(w){
	for(var i=0;i<infos.length;i++){
		if(infos[i].window==w){
			w.style.transition="0s";
			w.style.top=infos[i].initTop;
			w.style.left=infos[i].initLeft;
			w.style.bottom=infos[i].initBottom;
			w.style.right=infos[i].initRight;
			w.style.transition="0.1s";
			break;
		}
	}
}

var clickSnd=document.getElementById("clickSound");
var clickSnd1=document.getElementById("clickSound1");
var clickSnd2=document.getElementById("clickSound2");

var hoverSnd=document.getElementById("hoverSound");


for(var i=0;i<clickableStuff.length;i++){
	clickableStuff[i].addEventListener('mouseenter',function(e){
		var elem=e.target;

		while(!elem.classList.contains("folderIcon") && !elem.classList.contains("desktopIcon")
		 && elem.parentElement!=null){
			elem=elem.parentElement;
		}

		if(interacted && (elem.classList.contains("desktopIcon") || elem.classList.contains("folderIcon"))){
			if(!muted && (hoverSnd.currentTime > hoverSnd.duration/4 || hoverSnd.paused)){
				hoverSnd.currentTime=0;
				hoverSnd.play();
				hoverSnd.volume=0.3;
			}
		}
	});

	clickableStuff[i].addEventListener('mouseleave',function(){
		if(!mouseClicked){
			cursorNormal.style.visibility="visible";
			cursorHover.style.visibility="hidden";
			cursorClick.style.visibility="hidden";
		}
		mouseHovering=false;
	});

	clickableStuff[i].addEventListener('mousemove',function(){
		if(!mouseClicked){
			cursorNormal.style.visibility="hidden";
			cursorHover.style.visibility="visible";
			cursorClick.style.visibility="hidden";
		}
		mouseHovering=true;
		mouseout=false;
	});

	clickableStuff[i].addEventListener('mousedown',function(e){
		draggedElement=e.target.parentElement;
		

		while(!draggedElement.classList.contains("buttonImg") &&
			!draggedElement.classList.contains("windowContent") &&
			!draggedElement.classList.contains("clearButton") &&
			!draggedElement.classList.contains("checkbox") && !draggedElement.classList.contains("folderIcon") && 
			!draggedElement.classList.contains("desktopIcon") && 
			!draggedElement.classList.contains("window") && draggedElement.parentElement!=null){
			draggedElement=draggedElement.parentElement;
		}

		if(draggedElement.classList.contains("desktopIcon")){
			putOnTop(draggedElement,desktopIcons,0);
			draggedElement.getElementsByClassName("iconImg")[0].classList.add("clicked");
		}
		else if(draggedElement.classList.contains("window")){
		 putOnTop(draggedElement,windows,100);
		 draggedElement.classList.add("clicked");
		 draggedElement.classList.remove("windowOpened");
		}else if(draggedElement.classList.contains("folderIcon")){
			draggedElement.getElementsByClassName("iconImg")[0].classList.add("clicked");
		}
		const mouseY = e.clientY;
		const mouseX = e.clientX-64;
		disX=draggedElement.offsetLeft-mouseX;
		disY=draggedElement.offsetTop-mouseY;

		//console.log(draggedElement);
	})

	clickableStuff[i].addEventListener('mouseup',function(e){
		var elem=e.target;
		if(!elem.classList.contains("checkbox") && !elem.classList.contains("clearButton") &&
			!draggedElement.classList.contains("buttonImg") &&
			!draggedElement.classList.id!="seekSlider"){
			//console.log(elem);
			while(!elem.classList.contains("desktopIcon") && !elem.classList.contains("window") && elem.parentElement!=null){
				elem=elem.parentElement;
			}
			if(!mouseMoved && elem==draggedElement){
				console.log(draggedElement.getElementsByClassName("iconImg")[0]);
				if(elem.classList.contains("desktopIcon")){
					var win=null;
					var info=null;
					switch(elem.id){
						case "aboutIcon":
							info=aboutInfo;
							break;
						case "comicsIcon":
							info=comicsInfo;
							break;
						case "gamesIcon":
							info=gamesInfo;
							break;
						case "musicIcon":
							info=musicInfo;
							loadMusicInfo();
							break;
						case "galleryIcon":
							info=galleryInfo;
							break;
					}
					if(info!=null){
						win=info.window;
						win.style.visibility="visible";
						console.log(mobileMode());
						if(!mobileMode()){
							win.style.top=info.initTop;
							win.style.left=info.initLeft;
							win.style.bottom=info.initBottom;
							win.style.right=info.initRight;
						}
						win.classList.add("windowOpened");
						win.classList.remove("windowClosed");
						putOnTop(win,windows,100);
					}
					if(elem.id=="trashIcon"){
						takeTrashOut();
					}
				}
			}else if(elem==draggedElement && elem.classList.contains("desktopIcon")){
				if(collide(trashIcon.getElementsByClassName("iconImg")[0],elem) && elem.id!="trashIcon"){
					putInTrash(elem);
				}
			}
		}
	})
}

function putOnTop(div, divs,minZ){
	//console.log("put on top");
	var ind=divs.indexOf(div);
	divs.splice(ind,1);
	divs.push(div);
	for(var i=0;i<divs.length;i++){
		divs[i].style.zIndex=(i+1+minZ).toString();
		//console.log(divs[i]+" "+i);
	}
}

var currentImg=0;

var galleryNextButton=document.getElementById("galleryNextButton");
var galleryPrevButton=document.getElementById("galleryPrevButton");
var galleryImg=document.getElementById("galleryImage");

galleryNextButton.addEventListener("click",function(){
	currentImg++;
	currentImg=((currentImg%gallerySources.length)+gallerySources.length)%gallerySources.length;
	galleryImg.src="imgs/gallery/"+gallerySources[currentImg];
})

galleryPrevButton.addEventListener("click",function(){
	currentImg--;
	currentImg=((currentImg%gallerySources.length)+gallerySources.length)%gallerySources.length;
	galleryImg.src="imgs/gallery/"+gallerySources[currentImg];
})

var songs=Array.from(document.getElementsByClassName("song"));
var currentSong=0;
const seekSlider = document.getElementById('seekSlider');

const currentTimeContainer = document.getElementById('currentTime');

var musicPlaying=false;
var playButton=document.getElementById("playButton");
var muteButton=document.getElementById("muteButton");
var nextButton=document.getElementById("nextButton");
var prevButton=document.getElementById("prevButton");
var muted=false;

function loadMusicInfo(){
	musicWindow.getElementsByClassName("bannerText")[0].innerHTML=songs[currentSong].id;
	setSliderMax();
	songs[currentSong].addEventListener('progress', displayBufferedAmount);
	songs[currentSong].addEventListener('timeupdate', () => {
		seekSlider.value = Math.floor(songs[currentSong].currentTime);
		currentTimeContainer.textContent = calculateTime(seekSlider.value);
	});
	songs[currentSong].addEventListener("ended", nextSong);
	document.getElementById("albumCover").src=songs[currentSong].getElementsByClassName("albumCover")[0].src;
}

playButton.addEventListener("click",function(e){
	console.log(e.target);
	var img=e.target;
	if(img.tagName!="IMG"){
		img=img.getElementsByTagName("IMG")[0];
	}
	if(!musicPlaying){
		playMusic();		
	}else{
		pauseMusic();
	}
});

nextButton.addEventListener("click",nextSong);

function nextSong(){
	var playing=musicPlaying;
	stopMusic();
	currentSong++;
	currentSong=currentSong%songs.length;
	loadMusicInfo();
	if(playing){
		playMusic();
	}
}

function prevSong(){
	var playing=musicPlaying;
	stopMusic();
	currentSong--;
	currentSong=((currentSong%songs.length)+songs.length)%songs.length;
	loadMusicInfo();
	if(playing){
		playMusic();
	}
}

prevButton.addEventListener("click",function(e){
	if(songs[currentSong].currentTime>1){
		songs[currentSong].currentTime=0;
	}else{
		prevSong();
	}
});

function playMusic(){
	document.getElementById("playButton").getElementsByTagName("IMG")[0].src="imgs/pauseButton.png";
	musicPlaying=true;
	songs[currentSong].play();
}

function pauseMusic(){
	document.getElementById("playButton").getElementsByTagName("IMG")[0].src="imgs/playButton.png";
	musicPlaying=false;
	songs[currentSong].pause();
}

function stopMusic(){
	pauseMusic();
	songs[currentSong].currentTime=0;
}

muteButton.addEventListener("click",function(e){
	console.log(e.target);
	var img=e.target;
	if(img.tagName!="IMG"){
		img=img.getElementsByTagName("IMG")[0];
	}
	muted=!muted;
	songs[currentSong].muted=muted;
	if(muted){
		img.style.opacity="10%";
	}else{
		img.style.opacity="100%";
	}
});


function displayBufferedAmount(){
    const bufferedAmount = Math.floor(songs[currentSong].buffered.end(songs[currentSong].buffered.length - 1));
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount/seekSlider.max) * 100}%`);
}

function setSliderMax(){
	seekSlider.max=Math.floor(songs[currentSong].duration);
}

function calculateTime(secs){
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

seekSlider.addEventListener('input', () => {
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  songs[currentSong].currentTime = seekSlider.value;
});

function collide(el1, el2){
	var rect1 = el1.getBoundingClientRect();
	var rect2 = el2.getBoundingClientRect();

	return !(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right);
}

function putInTrash(elem){
	trash.push(elem);
	elem.style.display="none";
	console.log("put in trash");
}

function takeTrashOut(){
	console.log("take trash out");
	for(var i=0;i<trash.length;i++){
		trash[i].style.display="block";
		putOnTop(trash[i],desktopIcons,0);;
		moveBack(trash[i])
	}
	trash=[];
}

function moveBack(elem){
	compStyle=window.getComputedStyle(trashIcon);
	for(var i=0;i<desktopIconInfo.length;i++){
		if(elem.id==desktopIconInfo[i].id){
			elem.style.left=compStyle.getPropertyValue("left");
			elem.style.top=compStyle.getPropertyValue("top");
			elem.style.transition="0.3s";
			//elem.style.transitionTimingFunction = 'ease-out';
			setTimeout(moveTo, 10,elem,desktopIconInfo[i].initLeft,desktopIconInfo[i].initTop);
			setTimeout(removeTransition, 310,elem);
			break;
		}
	}
}

function moveTo(elem,left,top){
	elem.style.left=left;
	elem.style.top=top;
}

function removeTransition(elem){
	elem.style.transition="0.1s";
}