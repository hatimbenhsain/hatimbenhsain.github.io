// var h1=document.getElementsByTagName("h1")[0];
// h1=h1.innerHTML;
// var newh="";

// for(var i=0;i<h1.length;i++){			//code to convert the HATIM BENHSAIN text into small <t> divisions
// 	var c=h1.charAt(i)
// 	if(c!="<" && c!="b" && c!="r" && c!=">" && c!=" "){
// 		newh=newh+"<t>"+c+"</t>"
// 	}else{
// 		newh=newh+c;
// 	}
// }

// document.getElementsByTagName("h1")[0].innerHTML=newh;
// console.log(newh);

var images=document.getElementsByTagName("img");

for(var i=0;i<images.length;i++){		//making images not draggable for firefox and safari (this is handled in css for other browsers)
	images[i].draggable=false;
}

var links=document.getElementsByTagName("a");

for(var i=0;i<links.length;i++){		//same as above
	links[i].draggable=false;
}

bgImage=document.getElementById("bgImage");

function changeBg(d){					//changing the background hue periodically
	console.log("change bg");
	bgImage.style.filter="hue-rotate("+d+"deg)";
	setTimeout(changeBg,200,d+1);
}

changeBg(313);

var ts=document.getElementsByTagName("t");

for(var i=0;i<ts.length;i++){			//event listeners for the letters in the background, adding/removing a class when clicked 
	ts[i].addEventListener("click",function(e){
		if(e.which==1){
			if(!e.target.classList.contains("tClicked")) e.target.classList.add("tClicked");
			else e.target.classList.remove("tClicked");
			console.log(e.target.classList[0]);
		}
	})
}

abtButton=document.getElementById("abtButton");

trashIcon=document.getElementById("trashIcon");
var trash=[];

var interacted=false;

var mouseDownCoords=[0,0];
var timeSinceMouseDown=0;

gallerySources=["janitoBot.jpg","kidloki.jpg","skeleguy.gif","amelMart.jpg","changeDwellingColors.jpg","creechur.gif",
"gopPainting.gif","gopSketch.png"];

var clickableStuff=Array.from(document.getElementsByClassName("desktopIcon"));
var desktopIcons=[];

function mobileMode(){		//is the device on mobile?
	return(window.matchMedia("(max-device-width: 640px) and (orientation: portrait)").matches ||
		window.matchMedia("(max-device-height: 640px) and (orientation: landscape)").matches);
}

clickableStuff.forEach(function(e){
	desktopIcons.push(e);
});

var desktopIconInfo=[];

var compStyle;

for(var i=0;i<desktopIcons.length;i++){		//data structure containing intial info for every icons such as their position
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
for(var i=0;i<infos.length;i++){		//info about windows including initial position and which icons they're linked to
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


const moveCursor = (e)=> {			//what happens when cursor is moved
	const mouseY = e.clientY;
	const mouseX = e.clientX-64;
   
	if(!mouseMoved){
		var distance=((mouseX-mouseDownCoords[0])**2+(mouseY-mouseDownCoords[1])**2)**0.5;
		if(distance>3){
			mouseMoved=true;
		}
	}

	cursorNormal.style.top=mouseY+"px";		//moving fake cursor
	cursorNormal.style.left=mouseX+"px";
	cursorHover.style.top=mouseY+"px";
	cursorHover.style.left=mouseX+"px";
	cursorClick.style.top=mouseY+"px";
	cursorClick.style.left=mouseX+"px";

	//log.innerHTML=log.innerHTML+"<br>moving";
	if(draggedElement!=-1 && mouseClicked){
		if(crossClicked==-1){
			if((mouseX+disX>0 && mouseY+disY>0 && mouseX+disX<screen.width*0.95 && mouseY+disY<screen.height*0.85)
				&& (draggedElement.classList.contains("desktopIcon") || draggedElement.classList.contains("window"))){
				draggedElement.style.left=mouseX+disX+"px";			//we move the dragged element with the mouse
				draggedElement.style.top=mouseY+disY+"px";
				draggedElement.style.bottom="auto";
				draggedElement.style.right="auto";
				// var rect = draggedElement.getBoundingClientRect();		// attempt to replace changing inset with translate, may work on it more latter
				// var x=mouseX-rect.left-disX;
				// var y=mouseY-rect.top-disY;
				// draggedElement.style.transform="translate("+x+"px,"+y+"px)";
			}

			if(draggedElement.classList.contains("desktopIcon")){		//animating trash icon if an item is hovering on top
				if(collide(trashIcon.getElementsByClassName("iconImg")[0],draggedElement) && draggedElement.id!="trashIcon"){
					trashIcon.getElementsByClassName("iconImg")[0].classList.add("trashOver");
				}else{
					trashIcon.getElementsByClassName("iconImg")[0].classList.remove("trashOver");
				}
			}

			var children=draggedElement.children;
			if(mouseMoved){
				for(var i=0;i<children.length;i++){
					if(children[i].tagName.toLowerCase()=="a"){		//cancelling links if the mouse is moved while clicking it
						children[i].classList.remove("dragstart");
			        	children[i].className=children[i].className + " dragstart";
			        	log.innerHTML=log.innerHTML+"<br>removing a tag ";
		        	}
				}
			}
		}else{
			draggedElement=-1;
		}
	}

	if(mouseout){		//going back to normal cursor style
		cursorNormal.style.visibility="visible";
		cursorHover.style.visibility="hidden";
		cursorClick.style.visibility="hidden";
		mouseout=false;
	}

}

window.addEventListener('mousemove', moveCursor)



window.addEventListener('mousedown',function(e){		//what happens when clicking mouse button
	mouseMoved=false;
	interacted=true;

	mouseDownCoords[0]=e.clientX-64;
	mouseDownCoords[1]=e.clientY;

	if(!mobileMode() && interacted){					//click sound only on desktop
		clickSnd1.currentTime=0;
		clickSnd1.play();
	}
	if(mouseHovering){									//changing cursor appearance
		cursorNormal.style.visibility="hidden";
		cursorHover.style.visibility="hidden";
		cursorClick.style.visibility="visible";
	}
	mouseClicked=true;
})

window.addEventListener('mouseup',function(){			//what happens when mouse click up
	if(!mobileMode() && interacted){					//end click sound
		clickSnd2.currentTime=0;
		clickSnd2.play();
	}
	trashIcon.getElementsByClassName("iconImg")[0].classList.remove("trashOver");		//resetting trash animation
	var clicked=document.getElementsByClassName("clicked");
	for(var i=0;i<clicked.length;i++){				//removing clicked class from all objects
		clicked[i].classList.remove("clicked");
	}

	var k = document.querySelectorAll(".dragstart")	//removing dragged class from all objects
    for(var i=0; i < k.length;i++){
        k[0].classList.remove("dragstart")
    }

	if(mouseHovering){								//changing cursor img depending on if hovering on an object or not
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

document.addEventListener("mouseleave",function(){		//removing cursor image if the mouse is outside the page
	cursorNormal.style.visibility="hidden";
	cursorHover.style.visibility="hidden";
	cursorClick.style.visibility="hidden";
	mouseout=true;
})

var tagSection=document.getElementsByClassName("tagSection");
var checkboxes=Array.from(tagSection[0].getElementsByClassName("input-checkbox"));
var labels=Array.from(tagSection[0].getElementsByClassName("checkbox"));

for(var k=0;k<checkboxes.length;k++){
	checkboxes[k].addEventListener("change",checkboxClicked);
}

var games=Array.from(document.getElementById("gamesWindow").getElementsByClassName("folderIcon"));

for(var i=0;i<games.length;i++){
	games[i].addEventListener("mouseenter",function(e){			//highlighting the corresponding tags when a game is hovered
		var tags=Array.from(e.target.classList);
		tags.shift();
		for(var n=0;n<tags.length;n++){
			for(var k=0;k<checkboxes.length;k++){
				var span=checkboxes[k].parentElement.getElementsByTagName("span")[0]
				var tag=span.innerHTML.replace(/\s/g,'');
				if(!checkboxes[k].checked && tag==tags[n]){
					span.classList.add("hover");
				}
			}
		}
	});

	games[i].addEventListener("mouseleave",function(e){
		for(var k=0;k<checkboxes.length;k++){
			var span=checkboxes[k].parentElement.getElementsByTagName("span")[0]
			span.classList.remove("hover");
		}
	});
}

function checkboxClicked(e){			//when a checkbox is clicked, the list of games currently appearing is refreshed
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
	for(var i=0;i<games.length;i++){
		var containsTags=true;
		var gameTags=games[i].classList;
		for(var n=0;n<tags.length;n++){
			if(!gameTags.contains(tags[n])){
				containsTags=false;
				break;
			}
		}
		if(containsTags){						//a game is displayed only if the corresponding tags apply to it
			games[i].style.display="initial";
		}else{
			games[i].style.display="none";
		}
	}
}

function clearTags(e){							//reset games window when clicking clear button
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
	windows[i].addEventListener("click",function(e){				//put window on top of other windows when clicked
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

	crosses[i].addEventListener("mouseup",function(e){			//close window when cross is clicked (if there was no drag)
		if(crossClicked==e.target && e.which==1){
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

function replaceWindow(w){			//replace window to initial position when clicking corresponding icon
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
	clickableStuff[i].addEventListener('mouseenter',clickableMouseEnter);

	clickableStuff[i].addEventListener('mouseleave',clickableMouseLeave);

	clickableStuff[i].addEventListener('mousemove',clickableMouseMove);

	clickableStuff[i].addEventListener('mousedown',clickableMouseDown);

	clickableStuff[i].addEventListener('mouseup',clickableMouseUp);
}

function clickableMouseEnter(e){			//playing sound when certain objects are hovered
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
}

function clickableMouseLeave(e){		//handling cursor animation
	if(!mouseClicked){
		cursorNormal.style.visibility="visible";
		cursorHover.style.visibility="hidden";
		cursorClick.style.visibility="hidden";
	}
	mouseHovering=false;
}

function clickableMouseMove(e){
	if(!mouseClicked){
		cursorNormal.style.visibility="hidden";
		cursorHover.style.visibility="visible";
		cursorClick.style.visibility="hidden";
	}
	mouseHovering=true;
	mouseout=false;
}

function clickableMouseDown(e){			//function called when a clickable object is mouse down
	if(e.which==1){
		draggedElement=e.target.parentElement;
		

		while(!draggedElement.classList.contains("buttonImg") &&
			!draggedElement.classList.contains("windowContent") &&
			!draggedElement.classList.contains("clearButton") &&
			!draggedElement.classList.contains("checkbox") && !draggedElement.classList.contains("folderIcon") && 
			!draggedElement.classList.contains("desktopIcon") && 
			!draggedElement.classList.contains("window") && draggedElement.parentElement!=null){
			draggedElement=draggedElement.parentElement;			//going back to the parent element in case this is an image or text etc
		}

		if(draggedElement.classList.contains("desktopIcon")){		//put icon on top of other icons
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
		disX=draggedElement.offsetLeft-mouseX;			//storing the distance between the mouse and the center of the element for drag displacement
		disY=draggedElement.offsetTop-mouseY;
	}
}

function clickableMouseUp(e){			//function called when a clickable object is mouse up
	var elem=e.target;
	if(e.which==1 && !elem.classList.contains("checkbox") && !elem.classList.contains("clearButton") &&
		!draggedElement.classList.contains("buttonImg") &&
		!draggedElement.classList.id!="seekSlider"){
		//console.log(elem);
		while(!elem.classList.contains("desktopIcon") && !elem.classList.contains("window") && elem.parentElement!=null){
			elem=elem.parentElement;
		}
		if(!mouseMoved && elem==draggedElement){
			if(elem.classList.contains("desktopIcon")){
				var win=null;
				var info=null;
				switch(elem.id){			//choose window depending on icon
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
					win=info.window;				//open window
					win.style.visibility="visible";
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
			if(collide(trashIcon.getElementsByClassName("iconImg")[0],elem) && elem.id!="trashIcon"){		//put icon  in trash if hovering trash icon
				putInTrash(elem);
			}
		}
	}
}

function putOnTop(div, divs,minZ){				//puts div on top of divs with minZ as the minimum z the divs can reach
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

galleryNextButton.addEventListener("click",function(){			//handler for gallery buttons
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

function loadMusicInfo(){				//loads the music info when the music window is opened or the next/prev button is clicked
	musicWindow.getElementsByClassName("bannerText")[0].innerHTML=songs[currentSong].id;
	setSliderMax();
	songs[currentSong].addEventListener('progress', displayBufferedAmount);
	songs[currentSong].addEventListener('timeupdate', () => {		//reset slider
		seekSlider.value = Math.floor(songs[currentSong].currentTime);
		currentTimeContainer.textContent = calculateTime(seekSlider.value);
	});
	songs[currentSong].addEventListener("ended", nextSong);
	document.getElementById("albumCover").src=songs[currentSong].getElementsByClassName("albumCover")[0].src;
}

playButton.addEventListener("click",function(e){		//music play button handler
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

function nextSong(){			//go to next song
	var playing=musicPlaying;
	stopMusic();
	currentSong++;
	currentSong=currentSong%songs.length;
	loadMusicInfo();
	if(playing){
		playMusic();
	}
}

function prevSong(){		//go to prev song
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
	if(songs[currentSong].currentTime>1){			//go to beginning of song if clicked prev while in the middle of a song
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

muteButton.addEventListener("click",function(e){			//mute button handler
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


function displayBufferedAmount(){			//show buffered amount on music slider
    const bufferedAmount = Math.floor(songs[currentSong].buffered.end(songs[currentSong].buffered.length - 1));
    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount/seekSlider.max) * 100}%`);
}

function setSliderMax(){					//set music slider max according to song duration
	seekSlider.max=Math.floor(songs[currentSong].duration);
}

function calculateTime(secs){				//calculate time to show on music player to 00:00 format
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

seekSlider.addEventListener('input', () => {			//music slider handler
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  songs[currentSong].currentTime = seekSlider.value;
});

function collide(el1, el2){						//checks if two elements are overlapping
	var rect1 = el1.getBoundingClientRect();
	var rect2 = el2.getBoundingClientRect();

	return !(rect1.top > rect2.bottom || rect1.right < rect2.left || rect1.bottom < rect2.top || rect1.left > rect2.right);
}

function putInTrash(elem){						//puts icons in the trash
	if(!elem.classList.contains("garbage")){
		trash.push(elem);			//if the icon is already garbage, it is not stored
		elem.style.display="none";
	}else{
		var ind=desktopIcons.indexOf(elem);
		desktopIcons.splice(ind,1);
		elem.remove();
	}
	
}

var garbage=document.getElementsByClassName("garbage")[0];
var garbageImgs=["garbage1.png","garbage2.png","garbage3.png"]

function takeTrashOut(){		//clicking trash icon handler
	if(trash.length==0){		//if trash is empty, a garbage icon is created and put at a random place.
		var clone=garbage.cloneNode(true);
		document.getElementsByClassName("windowIcons")[0].appendChild(clone);
		clone.style.display="initial";
		var x=Math.random()*screen.width*0.9;
		var y=screen.height*0.1+Math.random()*screen.height*0.6;
		compStyle=window.getComputedStyle(trashIcon);
		clone.style.left=compStyle.getPropertyValue("left");
		clone.style.top=compStyle.getPropertyValue("top");
		clone.getElementsByTagName("img")[0].src="imgs/"+garbageImgs[Math.floor(Math.random()*3)];
		clone.addEventListener('mouseenter',clickableMouseEnter);
		clone.addEventListener('mouseleave',clickableMouseLeave);
		clone.addEventListener('mousemove',clickableMouseMove);
		clone.addEventListener('mousedown',clickableMouseDown);
		clone.addEventListener('mouseup',clickableMouseUp);
		clone.style.transition="0.3s";
		setTimeout(moveTo,10,clone,x+"px",y+"px");
		setTimeout(removeTransition, 310,clone);
		desktopIcons.push(clone);
	}
	else{							
		for(var i=0;i<trash.length;i++){
			trash[i].style.display="block";
			putOnTop(trash[i],desktopIcons,0);;
			moveBack(trash[i])
		}
	}
	trash=[];
}

function moveBack(elem){		//moving icons back to original position after being taken out of trash
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
	console.log(elem);
	elem.style.left=left;
	elem.style.top=top;
	console.log(elem);
}

function removeTransition(elem){		//removing transition from icon after moving it back
	elem.style.transition="none";
}
