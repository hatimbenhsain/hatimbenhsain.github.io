fileNames=[];
howls=[];								//all sounds to be loaded and used
syllables=[];

percussionOn=true;			//is the percussion sound activated
metronomeOn=true;				//is the metronome sound activated
voiceOn=false;					//is the voice sound activated

cursorPosition=0;				//position of the cursor in the text

potentialSyllableNames=["bheem","cha","dheem","dhi","dhin","dhom","num","ta","tha","tham"]; //every possible syllable

eqSyllables=[{			//syllables with equivalents (e.g: dhi sounds the same as ka)
	name:"dhi",
	equivalencies:["ka","ki"]
},{
	name:"cha",
	equivalencies:["lam"]
}]

kala=80;						//tempo
gati=4;							//akshara per beat
tSignature=2;				//time signature
tModifier=1;				//tempo modifier used to keep track of text alignment
playTModifier=1;		//tempo modifier used for playing sound at the right time

overflowMode=false;	//is the text overflowing?
playing=false;			//are we currently playing sound?

timeOuts=[];				//timeouts to be set when playing sound
timeOutParams=[];		//parameters for the timeouts

hands=["pixelHand004.png","pixelHand001.png","pixelHand002.png","pixelHand003.png","pixelHand004.png",
"pixelHand005.png","pixelHand004.png","pixelHand005.png"]
handStep=0;					//what step is the hand on
handImg=document.getElementById("handImg");
aboutButton=document.getElementById("aboutButton");
aboutButton.addEventListener("click",function(){	//opening the about section
	document.getElementById("aboutPage").classList.toggle("aboutPageActive");
})

importButton=document.getElementById("importButton");
importInput=document.getElementById("importInput");
importInput.addEventListener("change",ImportText);
exportButton=document.getElementById("exportButton");
exportButton.addEventListener("click",ExportText);

bellSound=new Howl({			//the three metronome sounds
	src:"sounds/bell.wav",
	preload:false
});
bellClickSound=new Howl({
	src:"sounds/bellClick.wav",
	preload:false
});
clickSound=new Howl({
	src:"sounds/click.wav",
	preload:false
});

howls.push(bellSound);
howls.push(bellClickSound);
howls.push(clickSound);

let mediaDest, audioChunks, mediaRecorder;		//variables for recording our composition
const workerOptions = {
	OggOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OggOpusEncoder.wasm',
	WebMOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WebMOpusEncoder.wasm',
	WavOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WavOpusEncoder.wasm'
};

downloadButton=document.getElementById("downloadButton");		

getAttempts=0;		//attempts to retrieve sound files
getDone=0;				

soundsLoaded=0;		//sound files retrieved

sCounter=0;				//counter for the number of syllables at the current line/cursor position

keyboardRows=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["z","x","c","v","b","n","m"]]
wiredKeys=[["a","dheem"],["s","tham"],["d","dhom"],["f","tha"],["h","num"],["j","ta"],["k","ka"],["l","dhin"],[";","cha"],["'","lam"],
["b","bheem"],["n","ki"],["m","dhi"]];			//keys and what they're connected to
syllablesFound=[];
rowY=[];

document.getElementById("metronomeImg").addEventListener("click",function(){
	metronomeOn=!metronomeOn;
	if(metronomeOn){
		this.style.opacity=1;
	}else{
		this.style.opacity=0.5;
	}
});

document.getElementById("drumImg").addEventListener("click",function(){
	percussionOn=!percussionOn;
	if(percussionOn){
		this.style.opacity=1;
	}else{
		this.style.opacity=0.5;
	}
});

document.getElementById("voiceImg").addEventListener("click",function(){
	voiceOn=!voiceOn;
	if(voiceOn){
		this.style.opacity=1;
	}else{
		this.style.opacity=0.5;
	}
});

changed=true;


$(document).ready(function () {
	for(var i=0;i<potentialSyllableNames.length;i++){
		AddFileName(potentialSyllableNames[i],1);
	}
	window.MediaRecorder = OpusMediaRecorder;
})

function AddFileName(sn,n){
	getAttempts++;
	$.ajax({
		url:"./sounds/"+sn+String(n)+".mp3",
		success:function(){
			var s=this.url.substring(9,this.url.length-4);
			fileNames.push(s);
			console.log(s);
			AddFileName(s.substr(0,s.length-1),parseInt(s.substr(s.length-1,1))+1);
			GetSyllables();
			CheckGets();
		},
		error:function(){	
			CheckGets();
		}
	});
}

function CheckGets(){
	getDone++;
	if(getDone>=getAttempts){
		for(var i=0;i<wiredKeys.length;i++){
			if(syllablesFound.includes(wiredKeys[i][1])){
				AddButton(wiredKeys[i][1],true);
			}
		}
		AddButton("[",false);
		AddButton("]",false);
		AddButton("{",false);
		AddButton("}",false);
		AddButton("_",false);
		AddButton("back",false);
		AddButton("clear",false);
		AddButton("paste",false);
		AddButton("<-",false);
		AddButton("->",false);
		document.addEventListener("keydown",function(e){
			var key=e.key;
			if(document.activeElement!=tempoInput && document.activeElement!=gatiInput && !e.ctrlKey && !e.metaKey){
				if(key=="ArrowLeft"){
					ButtonPressed("<-");
				}else if(key=="ArrowRight"){
					ButtonPressed("->");
				}else if(key=="Backspace"){
					ButtonPressed("back");
				}else if(key=="_" || key=="}" || key=="{" || key=="[" || key=="]"){
					ButtonPressed(key);
				}else{
					console.log("pressed "+key);
					for(var i=0;i<wiredKeys.length;i++){
						if(key==wiredKeys[i][0]){
							console.log("detected "+key);
							ButtonPressed(wiredKeys[i][1]);
							break;
						}
					}
				}
			}
		})
		for(var i=0;i<howls.length;i++){
			howls[i].once("load",function(){
				CheckLoads();	
			});
			howls[i].load();
		}
		AddTitles();
	}
}

function AddTitles(){
	document.getElementById("[Button").setAttribute("title","Double time");
	document.getElementById("]Button").setAttribute("title","Double time");
	document.getElementById("{Button").setAttribute("title","Half time");
	document.getElementById("}Button").setAttribute("title","Half time");
	document.getElementById("_Button").setAttribute("title","Rest");
	document.getElementById("backButton").setAttribute("title","Delete the last addition");
	for(var i=0;i<wiredKeys.length;i++){
		document.getElementById(wiredKeys[i][1]+"Button").setAttribute("title",wiredKeys[i][0].toUpperCase());
	}
}

function CheckLoads(){		//checks if all the sounds have been loaded
	console.log("check loads");
	soundsLoaded++;
	if(soundsLoaded>=howls.length){
		document.getElementById("load screen").style.visibility="hidden";
		document.getElementById("loaded").style.visibility="visible";
		changeTempo(kala);
		changeGati(gati);
		textBox.focus();
		// code borrowed from https://stackoverflow.com/questions/60177249/how-to-pipe-howler-mastergain-output-to-mediarecorder
		mediaDest=Howler.ctx.createMediaStreamDestination();
		Howler.masterGain.connect(mediaDest);
		audioChunks = []
		let options = { mimeType: 'audio/wav' };
		mediaRecorder = new MediaRecorder(mediaDest.stream, options, workerOptions)
		mediaRecorder.onstart = (event) => {
			audioChunks = [];
			console.log('Started recording Howl output...'); }
		mediaRecorder.ondataavailable = (e) => { if (e.data.size) audioChunks.push(e.data) }
		mediaRecorder.onstop = (event) => {
  		console.log('Completed Recording', audioChunks);
  		var buffer = new Blob(audioChunks,{type:"audio/wav"});
  		var url=URL.createObjectURL(buffer);
      downloadButton.href=url;
      downloadButton.download="konnakolDemo.wav";
		}
		// end of borrowed code
	}
}

function GetFileNames(d){
	//console.log(d.length);
	for(var i=0;i<d.length-5;i++){
		if(d.substr(i,7)=="title=\""){
			i+=7;
			var l=0;
			while(d.substr(i+l,4)!=".mp3" && l<20){
				l++;
			}
			if(l<20){
				fileNames.push(d.substr(i,l));
			}
		}
	}
}

function GetSyllables(){		//gets available syllables from what sound files are available and adds respective buttons
	if(fileNames.length>0){
		var s=fileNames.pop();
		var sn=s.substr(0,s.length-1);
		var added=false;
		if(isNumeric(s.substr(s.length-1,1))){
			for(var i=0;i<syllables.length;i++){
				if(syllables[i].name==sn){
					var snd=new Howl({
						src:["sounds/"+s+".mp3"],
						preload:"false"
					});
					howls.push(snd);
					syllables[i].sounds.push(snd);
					added=true;
					break;
				}
			}
			if(!added){
				var snd=new Howl({
					src:["sounds/"+s+".mp3"],
					preload:"false"
				});
				var v=new Howl({
					src:["sounds/"+s.substr(0,s.length-1)+".mp3"],
					preload:"false"
				});
				howls.push(snd);
				howls.push(v);
				syllables.push({
					name:s.substr(0,s.length-1),
					sounds:[snd],
					voice:v
				});
				var l=syllables.length-1;
				syllablesFound.push(sn);
				//AddButton(sn,true);
				for(var k=0;k<eqSyllables.length;k++){
					if(eqSyllables[k].name==syllables[l].name){
						console.log(eqSyllables[k])
						for(var p=0;p<eqSyllables[k].equivalencies.length;p++){
							var ve=new Howl({
								src:["sounds/"+eqSyllables[k].equivalencies[p]+".mp3"],
								preload:"false"
							});
							syllables.push({
								name:eqSyllables[k].equivalencies[p],
								sounds:syllables[l].sounds,
								voice:ve
							});
							syllablesFound.push(eqSyllables[k].equivalencies[p]);
							//AddButton(eqSyllables[k].equivalencies[p],true);
						}
					}
				}
			}
		}
		GetSyllables();
	}
}

function AddButton(sn,isSyllable){
	var seq=document.getElementById("sequencer");
	var but=document.createElement("input");
	seq.appendChild(but);
	but.type="button";
	but.value=sn;
	but.id=sn+"Button";
	but.className="seqButton";
	but.addEventListener("click",function(){
		ButtonPressed(this.id.slice(0,-6));
	})
	var k;
	// if(isSyllable){
	// 	if(rowY.length<3 && (rowY.length==0 || rowY[rowY.length-1]!=but.getBoundingClientRect().y)){
	// 		rowY.push(but.getBoundingClientRect().y);
	// 	}
	// 	k=keyboardRows[rowY.length-1].shift();
	// 	wiredKeys.push([k,sn]);
	// }
}

function ButtonPressed(tx){
	TrimText();
	if(cursorPosition>=textBox.innerHTML.length && textBox.scrollHeight>textBox.clientHeight){
		textBox.scrollTop=textBox.scrollHeight-textBox.clientHeight;
	}
	overflowMode=false;
	if(AddText(tx)){
		playVoice(tx,true);
	}
	if(cursorPosition<textBox.innerHTML.length && tx!="->" && tx!="<-")	ReFormat();
	ChangeButtonColors();
	Cursor();
	if(tx!="->" && tx!="<-" && tx!="play" && tx!="stop"){
		changed=true;
	}
}

function Cursor(){
	TrimText();
	t=textBox.innerHTML;
	var c=cursorPosition;
	if(c>=t.length){
		c=t.length-1;
	}
	textBox.innerHTML=t.substr(0,c)+"<span id=\"sUL\">"+t.substr(c,1)+"</span>"+t.substr(c+1)
}

function ChangeButtonColors(){
	var bs=document.getElementsByClassName("seqButton");
	for(var i=0;i<bs.length;i++){
		if(bs[i].value!="back" && bs[i].value!="clear" && bs[i].value!="->" && bs[i].value!="<-" && bs[i].value!="[" && bs[i].value!="]" && bs[i].value!="{" && bs[i].value!="}"){
			if(overflowMode){
				bs[i].disabled=true;
			}else{
				bs[i].disabled=false;
			}
		}
	}
}

function AddText(v){
	if(textBox.innerHTML.substr(textBox.innerHTML.length-5)=="<br> "){
		textBox.innerHTML=textBox.innerHTML.substr(0,textBox.innerHTML.length-1);
		cursorPosition--;
	}
	if(v!="back" && v!="clear" && v!="->" && v!="<-" && v!="paste"){
		if(v!="[" && v!="]" && v!="{" && v!="}"){
			// if(sCounter<gati*tSignature && sCounter+1/tModifier>gati*tSignature){
			// 	return false;
			// }
			sCounter+=1/tModifier;
			// if(sCounter>gati*tSignature){
			// 	textBox.innerHTML=textBox.innerHTML.substring(0,cursorPosition)+"<br>"+textBox.innerHTML.substring(cursorPosition);
			// 	cursorPosition+=4;
			// 	//sCounter=1/tModifier;
			// }
		}else if(v=="[" || v=="}"){
			tModifier=tModifier*2;
			// if(sCounter>=gati*tSignature){
			// 	textBox.innerHTML=textBox.innerHTML.substring(0,cursorPosition)+"<br>"+textBox.innerHTML.substring(cursorPosition);
			// 	cursorPosition+=4;
			// 	//sCounter=0;
			// }
		}else if(v=="]" || v=="{"){
			tModifier=tModifier/2;
			// if(sCounter>=gati*tSignature){
			// 	textBox.innerHTML=textBox.innerHTML.substring(0,cursorPosition)+"<br>"+textBox.innerHTML.substring(cursorPosition);
			// 	cursorPosition+=4;
			// 	//sCounter=0;
			// }
		}
		textBox.innerHTML=textBox.innerHTML.substring(0,cursorPosition)+v+" "+textBox.innerHTML.substring(cursorPosition);
		cursorPosition+=1;
		cursorPosition+=v.length;
		if(sCounter>=gati*tSignature){
				textBox.innerHTML=textBox.innerHTML.substring(0,cursorPosition)+"<br> "+textBox.innerHTML.substring(cursorPosition);
				cursorPosition+=5;
				//sCounter=0;
		}
		if(cursorPosition>textBox.innerHTML.length){
			cursorPosition=textBox.innerHTML.length;
		}
	}else if(v=="back"){
		BackSpace();
	}else if(v=="clear"){
		Clear();
	}else if(v=="->"){
		RightArrow();
	}else if(v=="<-"){
		LeftArrow();
	}else if(v=="paste"){
		Paste();
	}
	textBox.focus();

	AdjustFontSize();
	// cursor.style.top=String(textBox.getBoundingClientRect().top)+"px";
	// cursor.style.left=String(textBox.getBoundingClientRect().left+xPos)+"px";
	// cursorPosition+=v;
	sCounter=(sCounter+gati*tSignature)%(gati*tSignature);
	return true;
}

function Paste(){
	navigator.clipboard.readText()
  .then(text => {
  	TrimText();
    textBox.innerHTML=textBox.innerHTML.substring(0,cursorPosition)+text.toLowerCase()+" "+textBox.innerHTML.substring(cursorPosition);
    ReFormat();
    ResetPosition();
    Cursor();
  })
}

function ImportText(){
	var fr=new FileReader();
	fr.onload=function(){
		Clear();
		textBox.innerHTML=fr.result;
		ReFormat();
    ResetPosition();
    Cursor();
	}
}

function ExportText(){
	console.log("export");
	download("exportedText.txt",textBox.innerText);
}

//borrowed code from https://stackoverflow.com/a/45831280
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  console.log("download");
  document.body.removeChild(element);
}
//end of borrowed code

function ResetPosition(){
	while(cursorPosition>0){
  	LeftArrow();
  	console.log(cursorPosition+" "+sCounter);
  }
  tModifier=1;
  while(cursorPosition<t.length){
  	RightArrow();
  	console.log(cursorPosition+" "+sCounter);
  }
  
}

function RightArrow(){	//handles what happens when you press right arrow
	TrimText();
	t=textBox.innerHTML;
	if(cursorPosition<t.length){
		cursorPosition++;
		if((t.substr(cursorPosition-1,1)!=" " || t.substr(cursorPosition,1)=="<") && t.substr(cursorPosition-1,1)!=">"){
			RightArrow();
		}else{
			var c=t.substr(cursorPosition-2,1);
			if(isLetter(c) || c=="_"){
				sCounter+=tModifier;
				sCounter=(sCounter+gati*tSignature)%(gati*tSignature);
			}else if(c=="[" || c=="}"){
				tModifier=tModifier/2;
			}else if(c=="]" || c=="{"){
				tModifier=tModifier*2;
			}
			Cursor();
		}
	}else{
		cursorPosition=t.length;
	}
}

function LeftArrow(){	//handles what happens when you press left arrow
	TrimText();
	t=textBox.innerHTML;
	if(cursorPosition>0){
		cursorPosition--;
		if((t.substr(cursorPosition-1,1)!=" " || t.substr(cursorPosition,1)=="<") && t.substr(cursorPosition-1,1)!=">"){
			LeftArrow();
		}else{
			var c=t.substr(cursorPosition,1);
			if(isLetter(c) || c=="_"){
				sCounter-=tModifier;
				sCounter=(sCounter+gati*tSignature)%(gati*tSignature);
			}else if(c=="[" || c=="}"){
				tModifier=tModifier*2;
			}else if(c=="]" || c=="{"){
				tModifier=tModifier/2;
			}
			Cursor();
		}
	}else{
		cursorPosition=0;
	}
}

function AdjustFontSize(){	//adjusts the font size as text gets bigger or smaller to fit the window
	var f=parseFloat(window.getComputedStyle(textBox).fontSize);
	var colN=parseFloat(window.getComputedStyle(textBox).columnCount);
	if((textBox.scrollHeight>textBox.clientHeight || textBox.scrollWidth>textBox.clientWidth) && f>minFontSize){
		textBox.style.fontSize=(f-1)+"px";
		AdjustFontSize();
		// if(f<24){
		// 	textBox.style.columnCount = "2";
		// }
	}else if((textBox.scrollHeight<=textBox.clientHeight || textBox.scrollWidth<=textBox.clientWidth) && f<maxFontSize){
		textBox.style.fontSize=(f+1)+"px";
		if((textBox.scrollHeight>textBox.clientHeight || textBox.scrollWidth>textBox.clientWidth) && f>minFontSize){
			textBox.style.fontSize=(f-1)+"px";
		}else if(f>minFontSize){
			AdjustFontSize();
		}
	}
}

function Clear(){	//clears the window
	textBox.innerHTML="";
	sCounter=0;
	tModifier=1;
	cursorPosition=0;
}

function BackSpace(){	//handles what happens when pressing backspace
	TrimText();
	t=textBox.innerHTML.substring(0,cursorPosition);
	c=t.substr(t.length-1,1);
	t=t.substr(0,t.length-1);
	console.log(textBox.innerHTML);
	console.log(t);
	if(t.substr(t.length-4,4)=="<br>"){
		t=t+" ";
		cursorPosition++;
		console.log("add space");
	}else if(t.substr(t.length-3,3)==" <b"){
		t=t.substr(0,t.length-3);
		cursorPosition-=3;
	}
	textBox.innerHTML=t+textBox.innerHTML.substring(cursorPosition);
	cursorPosition--;
	if(t.substr(t.length-1,1)!=" " && t.length>0){
		BackSpace();
	}else if(isLetter(c) || c=="_"){
		sCounter-=1/tModifier;
		sCounter=(sCounter+gati*tSignature)%(gati*tSignature);
	}else if(c=="[" || c=="}"){
		tModifier=tModifier/2;
	}else if(c=="]" || c=="{"){
		tModifier=tModifier*2;
	}
}

function isLetter(c){	//checks if the character is a letter
	if((c.charCodeAt(0)>=65 && c.charCodeAt(0)<=90) || (c.charCodeAt(0)>=97 && c.charCodeAt(0)<=122)){
		return true;
	}else{
		return false;
	}
}


notes=[];

maxSyllableLength=1;
for(var i=0;i<syllables.length-1;i++){
	maxSyllableLength=Math.max(maxSyllableLength,syllables[i].length);
}

textBox=document.getElementById("textBox");
playButton=document.getElementById("playButton");
notePlayedDiv=document.getElementById("notePlayedDiv");
notePlayed=document.getElementById("notePlayed");


playButton.addEventListener("click",play);

maxFontSize=parseFloat(window.getComputedStyle(textBox).fontSize);
minFontSize=26;

analysisResults=[];

function play(){	//called when you press play
	if(!playing){
		ResetPosition();
		if(changed){
			analysisResults=[];
			analyze(textBox.innerHTML.trim().toLowerCase(),analysisResults);
		}else{
			console.log("not changed");
		}
		//console.log(analysisResults);
		playTModifier=1;
		playMusic(analysisResults);
		//notePlayedDiv.style.visibility="visible";
		tempoInput.contentEditable="false";
		gatiInput.contentEditable="false";
	}else{
		StopAll();
	}
}

function analyze(txt,ns,sCounter=0,pos=0){	//parses the text into elements in an array
	if(txt!=""){
		var s={
			text:"",
			isSyllable:false,
			pos:pos
		};	
		isSyllable=false;
		if(txt.substr(0,1)=="[" || txt.substr(0,1)=="]" || txt.substr(0,1)=="{" || txt.substr(0,1)=="}" 
			|| txt.substr(0,1)=="_"){
			s.text=txt.substr(0,1);
		}else if(txt.substr(0,1)=="."){
			s.text="_";
		}else{
			for(var i=0;i<syllables.length;i++){
				if(txt.length>=syllables[i].name.length && syllables[i].name.length>s.text.length && syllables[i].name==txt.substring(0,syllables[i].name.length)){
					s.text=syllables[i].name;
					s.data=syllables[i];
					isSyllable=true;
				}
			}
		}
		if(s.text!=""){
			s.isSyllable=isSyllable;
			ns.push(s);
		}
		if(isSyllable || s.text=="_"){
			sCounter+=1/tModifier;
		}
		console.log(txt + tModifier);
		analyze(txt.slice(Math.max(s.text.length,1)),ns,sCounter,pos+Math.max(s.text.length,1));
	}else{
		return ns;
	}
}

function playMusic(ns){	//plays all the sound after pressing play
	timeOutParams=[];
	var delay=0
	playing=true;
	playButton.value="loading...";
	downloadButton.style.visibility="hidden";
	handStep=0;
	handImg.style.visibility="visible";
	for(var i=0;i<ns.length;i++){
		if(ns[i].text=="tempo" || ns[i].text=="kala"){
			if(i+1<ns.length && isNumeric(ns[i+1])){
				changeTempo(ns[i+1])
				i++;
			}
		}else if(ns[i].text=="g"){
			if(i+1<ns.length && isNumeric(ns[i+1])){
				changeGati(ns[i+1])
				i++;
			}
		}else if(ns[i].text=="[" || ns[i].text=="}"){
			playTModifier=playTModifier*2;
		}else if(ns[i].text=="]" || ns[i].text=="{"){
			playTModifier=playTModifier/2;
		}else{
			console.log("to play "+ns[i].text+" on "+delay);
			if(ns[i].text!="." && ns[i].text!="_"){
				//timeOuts.push(setTimeout(playSyllable,delay,ns[i].data));
				timeOutParams.push([playSyllable,delay,ns[i].data]);
				timeOutParams.push([playVoice,delay,ns[i].text]);
			}
			//timeOuts.push(setTimeout(BoldAt,delay,ns[i]));
			timeOutParams.push([BoldAt,delay,ns[i]]);
			delay=delay+1000*(60/(kala*playTModifier))/gati;
		}
	}
	for(var t=0;t<delay;t+=1000*(60/kala)){
		// timeOuts.push(setTimeout(function(){
		// 	handImg.src=hands[handStep];
		// },t));
		timeOutParams.push([function(){
			handImg.src=hands[handStep];
			handImg.style.opacity="0.8";
		},t]);
		// timeOuts.push(setTimeout(function(){
		// 	handImg.src="pixelHand000.png";
		// 	handStep++;
		// 	handStep=handStep%8;
		// },t+1000*(60/kala)/2));
		timeOutParams.push([function(){
			handImg.src="pixelHand000.png";
			handStep++;
			handStep=handStep%8;
			handImg.style.opacity="0";
		},t+1000*(60/kala)/2]);
		var snd;	
		if(t%(8000*60/kala)==0){
			snd=bellSound;
		}else if((t/(1000*(60/kala)))%8==4){
			snd=bellClickSound;
		}else{
			snd=clickSound;
		}
		//timeOuts.push(setTimeout(playSound,t,snd));
		timeOutParams.push([playMetronome,t,snd]);
	}
	// timeOuts.push(setTimeout(function(){
	// 	timeOuts=[];
	// 	StopAll();
	// 	downloadButton.style.visibility="visible";
	// },delay+1000*(kala/60)/gati))//
	timeOutParams.push([function(){
		timeOuts=[];
		StopAll();
		downloadButton.style.visibility="visible";
	},delay+1000*(kala/60)/gati]);
	SetTimeOuts();
}

function SetTimeOuts(){
	preDelay=1000*timeOutParams.length/100;
	timeOuts.push(setTimeout(function(){mediaRecorder.start();
	playButton.value="stop";},preDelay-1));
	for(var i=0;i<timeOutParams.length;i++){
		if(timeOutParams[i].length==3){
			timeOuts.push(setTimeout(timeOutParams[i][0],timeOutParams[i][1]+preDelay,timeOutParams[i][2]));
		}else if(timeOutParams[i].length==2){
			timeOuts.push(setTimeout(timeOutParams[i][0],timeOutParams[i][1]+preDelay));
		}
	}
}

function StopAll(){
	//notePlayedDiv.style.visibility="hidden";
	TrimText();
	handImg.src="pixelHand000.png";
	handImg.style.visibility = "hidden";
	for(var i=0;i<timeOuts.length;i++){
		clearTimeout(timeOuts[i]);
	}
	for(var i=0;i<howls.length;i++){
		howls[i].stop();
	}
	playButton.value="play";
	timeOuts=[];
	playing=false;
	tempoInput.contentEditable="true";
	gatiInput.contentEditable="true";
	mediaRecorder.stop();
	Cursor();
	changed=false;
}

function BoldAt(e){
	TrimText();
	var pos=e.pos;
	var h=textBox.innerHTML;
	// for(var i=0;i<pos && i<h.length;i++){
	// 	if(h.substr(i,4)=="<br>"){
	// 		pos+=4;
	// 	}
	// }
	h=h.substr(0,pos)+"<span id=\"sBold\">"+e.text+"</span>"+h.substr(pos+e.text.length);
	textBox.innerHTML=h;
	console.log(h);
}

function TrimText(){
	textBox.innerHTML=textBox.innerHTML.replace(/<span.{0,15}>/g,"");
	textBox.innerHTML=textBox.innerHTML.replace("</span>","");
}

function changeTempo(t){
	kala=t;
}

function changeGati(g){
	var prevG=gati;
	gati=g;
	if(gati!=prevG){
		console.log("gati changed");
		ReFormat();
		ResetPosition();
	}
}

function ReFormat(i=0,ns=[],cp=0){
	if(i==0){
		var t=textBox.innerHTML;
		var c=0;
		for(i=0;i<cursorPosition;i++){
			if(t.substr(i,4)=="<br>" && i<=cursorPosition-4){
				i+=4;
			}
			c++;
		}
		TrimText();
		ns=[];
		analyze(textBox.innerHTML,ns);
		textBox.innerHTML="";
		cursorPosition=0;
		sCounter=0;
		tModifier=1;
		console.log(ns);
	}else{
		var c=cp;
	}
	if(ns.length>0){
		i++;
		var e=ns.shift();
		AddText(e.text);
		ReFormat(i,ns,c);
	}else{
		var t=textBox.innerHTML;
		var c=0;
		for(i=0;i<textBox.innerHTML.length;i++){
			if(t.substr(i,4)=="<br>"){
				i+=4;
			}
			c++;
			if(c>cp){
				c=i;
				break;
			}
		}

		while(cursorPosition>c){
			LeftArrow();
		}

		Cursor();
	}
}

function playSyllable(s,override=false){
	if(percussionOn || override){
		var h=s.sounds[Math.floor(Math.random()*s.sounds.length)];
		playSound(h);
	}
	//notePlayed.innerHTML=s.name;
}

function playMetronome(s,override=false){
	if(metronomeOn){
		playSound(s);
	}
}

function playSound(h){
	h.play();
}

function syllable(txt,sounds){
	this.txt=txt;
}

function isNumeric(str) {			//function from https://stackoverflow.com/a/175787
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function playVoice(n,override=false){
	if(voiceOn || override){
		for(var i=0;i<syllables.length;i++){
			if(n==syllables[i].name){
				console.log("playing "+syllables[i].name);
				playSound(syllables[i].voice);
				break;
			}
		}
	}
}

// textBox.addEventListener("change",function(){
// 	if(textBox.innerHTML.substr(textBox.innerHTML.length-1,1)==" "){

// 	}
// })

tempoInput=document.getElementById("tempoInput")

tempoInput.addEventListener("input",function(){
	numOnly(this);
	if(isNumeric(this.innerHTML) && this.innerHTML!=""){
		changeTempo(parseFloat(this.innerHTML));
	}
})

tempoInput.addEventListener("blur",function(){
	if(tempoInput.innerHTML==""){
		tempoInput.innerHTML=kala.toString();
	}
})

gatiInput=document.getElementById("gatiInput")

gatiInput.addEventListener("input",function(){
	numOnly(this);
	if(isNumeric(this.innerHTML) && this.innerHTML!=""){
		changeGati(parseFloat(this.innerHTML));
	}
})

gatiInput.addEventListener("blur",function(){
	if(gatiInput.innerHTML==""){
		gatiInput.innerHTML=gati.toString();
	}
})

function numOnly(el){
	var r=!isNumeric(el.innerHTML);
	while(el.innerHTML!="" && !isNumeric(el.innerHTML)){
		console.log("erasing");
		el.innerHTML=el.innerHTML.substr(0,el.innerHTML.length-1);
	}
	r=r&&el.innerHTML!="";
	if(r){
		var range = document.createRange();
	  var sel = window.getSelection();
	  range.setStart(el.childNodes[0],el.innerHTML.length);
	  range.collapse(true);
	  sel.removeAllRanges();
	  sel.addRange(range);
	}
}