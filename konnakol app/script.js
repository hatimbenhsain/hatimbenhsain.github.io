fileNames=[];
howls=[];
syllables=[];

potentialSyllableNames=["bheem","cha","dheem","dhi","dhin","dhom","num","ta","tha","tham"];

eqSyllables=[{
	name:"dhi",
	equivalencies:["ka","ki"]
}]

kala=80;	//tempo
gati=4;		//akshara per beat
tSignature=2;
tModifier=1;

overflowMode=false;
playing=false;

timeOuts=[];



// $(document).ready(function () 
// {
//     $.get("./sounds/", function(data) 
//     {
//         $("#fileNames").append(data);
//         //console.log(data);
//         GetFileNames(data);
//         GetSyllables();
//         console.log(syllables);
//     });
// })
getAttempts=0;
getDone=0;

soundsLoaded=0;

sCounter=0;

$(document).ready(function () {
	for(var i=0;i<potentialSyllableNames.length;i++){
		AddFileName(potentialSyllableNames[i],1);
	}
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
		AddButton("[");
		AddButton("]");
		AddButton("{");
		AddButton("}");
		AddButton("_");
		AddButton("back");
		AddButton("clear");
		for(var i=0;i<howls.length;i++){
			howls[i].once("load",function(){
				CheckLoads();	
			});
			howls[i].load();
		}
	}
}

function CheckLoads(){
	console.log("check loads");
	soundsLoaded++;
	if(soundsLoaded>=howls.length){
		document.getElementById("load screen").style.visibility="hidden";
		document.getElementById("loaded").style.visibility="visible";
		changeTempo(kala);
		changeGati(gati);
		textBox.focus();
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
	//console.log(fileNames);
}

function GetSyllables(){
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
				AddButton(sn);
				for(var k=0;k<eqSyllables.length;k++){
					if(eqSyllables[k].name==syllables[l].name){
						console.log(eqSyllables[k])
						for(var p=0;p<eqSyllables[k].equivalencies.length;p++){
							syllables.push({
								name:eqSyllables[k].equivalencies[p],
								sounds:syllables[l].sounds,
								voice:v
							});
							AddButton(eqSyllables[k].equivalencies[p]);
						}
					}
				}
			}
		}
		GetSyllables();
	}
}

function AddButton(sn){
	var seq=document.getElementById("sequencer");
	var but=document.createElement("input");
	seq.appendChild(but);
	but.type="button";
	but.value=sn;
	but.id=sn+"Button";
	but.className="seqButton";
	but.addEventListener("click",function(){
		overflowMode=false;
		var v=this.id.slice(0,-6);
		if(AddText(v)){
			playVoice(v);
		}
		if(sCounter<gati*tSignature && sCounter+1/tModifier>gati*tSignature){
			overflowMode=true;
		}
		ChangeButtonColors();
	})
}

function ChangeButtonColors(){
	var bs=document.getElementsByClassName("seqButton");
	for(var i=0;i<bs.length;i++){
		if(bs[i].value!="back" && bs[i].value!="clear" && bs[i].value!="[" && bs[i].value!="]" && bs[i].value!="{" && bs[i].value!="}"){
			if(overflowMode){
				bs[i].disabled=true;
			}else{
				bs[i].disabled=false;
			}
		}
	}
}

function AddText(v){
	if(v!="back" && v!="clear"){
		if(v!="[" && v!="]" && v!="{" && v!="}"){
			if(sCounter<gati*tSignature && sCounter+1/tModifier>gati*tSignature){
				return false;
			}
			sCounter+=1/tModifier;
			if(sCounter>gati*tSignature){
				textBox.innerHTML=textBox.innerHTML+"<br>";
				sCounter=1/tModifier;
			}
		}else if(v=="[" || v=="}"){
			tModifier=tModifier*2;
			if(sCounter==gati*tSignature){
				textBox.innerHTML=textBox.innerHTML+"<br>";
				sCounter=0;
			}
		}else if(v=="]" || v=="{"){
			tModifier=tModifier/2;
			if(sCounter==gati*tSignature){
				textBox.innerHTML=textBox.innerHTML+"<br>";
				sCounter=0;
			}
		}
		textBox.innerHTML=textBox.innerHTML+v+" ";
	}else if(v=="back"){
		BackSpace();
	}else{
		Clear();
	}
	textBox.focus();

	AdjustFontSize();
	return true;
}

function AdjustFontSize(){
	var f=parseFloat(window.getComputedStyle(textBox).fontSize);
	if(textBox.scrollHeight>textBox.clientHeight){
		textBox.style.fontSize=(f-1)+"px";
		AdjustFontSize();
	}else if(textBox.scrollHeight<=textBox.clientHeight && f<maxFontSize){
		textBox.style.fontSize=(f+1)+"px";
		if(textBox.scrollHeight>textBox.clientHeight){
			textBox.style.fontSize=(f-1)+"px";
		}else{
			AdjustFontSize();
		}
	}
}

function Clear(){
	textBox.innerHTML="";
	sCounter=0;
	tModifier=1;
}

function BackSpace(){
	//console.log("back space "+textBox.innerHTML.substr(textBox.innerHTML.length-1,1));
	c=textBox.innerHTML.substr(textBox.innerHTML.length-1,1);
	textBox.innerHTML=textBox.innerHTML.substr(0,textBox.innerHTML.length-1);
	if(textBox.innerHTML.substr(textBox.innerHTML.length-4,4)=="<br>"){
		textBox.innerHTML=textBox.innerHTML.substr(0,textBox.innerHTML.length-4)
	}
	if(textBox.innerHTML.substr(textBox.innerHTML.length-1,1)!=" " && textBox.innerHTML.length>0){
		BackSpace();
	}else if(isLetter(c) || c=="_"){
		sCounter-=1/tModifier;
		if(sCounter<=0){
			if(textBox.innerHTML.length>0){
				sCounter=gati*tSignature;
			}else{
				sCounter=0;
			}
		}
	}else if(c=="[" || c=="}"){
		tModifier=tModifier/2;
	}else if(c=="]" || c=="{"){
		tModifier=tModifier*2;
	}
}

function isLetter(c){
	if((c.charCodeAt(0)>=65 && c.charCodeAt(0)<=90) || (c.charCodeAt(0)>=97 && c.charCodeAt(0)<=122)){
		return true;
	}else{
		return false;
	}
}

//console.log(files);

//syllables=["bheem","cha","dheem","dhi","dhin","dhom","num","ta","tha","tham"]
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

function play(){
	if(!playing){
		var ns=[]
		analyze(textBox.innerHTML.trim().toLowerCase(),ns);
		console.log(ns);
		playMusic(ns);
		notePlayedDiv.style.visibility="visible";
		tempoInput.contentEditable="false";
		gatiInput.contentEditable="false";
	}else{
		StopAll();
	}
	//console.log(fileNames);
}

function analyze(txt,ns,sCounter=0,pos=0){
	if(txt!=""){
		var s={
			text:"",
			isSyllable:false,
			pos:pos
		};	
		isSyllable=false;
		if(txt.substr(0,5)=="tempo"){
			s.text="tempo";
		}else if(txt.substr(0,4)=="kala"){
			s.text="kala";
		}else if(txt.substr(0,1)=="g" || txt.substr(0,1)=="[" || txt.substr(0,1)=="]" || txt.substr(0,1)=="{" || txt.substr(0,1)=="}" || txt.substr(0,1)=="."
			|| txt.substr(0,1)=="_"){
			s.text=txt.substr(0,1);
		}else if(isNumeric(txt.substr(0,1))){
			var l=1;
			while(isNumeric(txt.substr(0,l+1)) && l<txt.length){
				l+=1;
			}
			s.text=txt.substr(0,l);
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
		console.log(txt);
		analyze(txt.slice(Math.max(s.text.length,1)),ns,sCounter,pos+Math.max(s.text.length,1));
	}else{
		return ns;
	}
}

function playMusic(ns){
	var delay=0
	playing=true;
	playButton.value="stop";
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
			changeTempo(kala*2);
		}else if(ns[i].text=="]" || ns[i].text=="{"){
			changeTempo(kala/2);
		}else{
			console.log("to play "+ns[i].text+" on "+delay);
			if(ns[i].text!="." && ns[i].text!="_"){
				timeOuts.push(setTimeout(playSyllable,delay,ns[i].data));
			}
			timeOuts.push(setTimeout(BoldAt,delay,ns[i]));
			delay=delay+1000*(60/kala)/gati;
		}
	}
	timeOuts.push(setTimeout(function(){
		timeOuts=[];
		StopAll();
	},delay+1000*(kala/60)/gati))
}

function StopAll(){
	notePlayedDiv.style.visibility="hidden";
	NoBold();
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
}

function BoldAt(e){
	NoBold();
	var pos=e.pos;
	var h=textBox.innerHTML;
	// for(var i=0;i<pos && i<h.length;i++){
	// 	if(h.substr(i,4)=="<br>"){
	// 		pos+=4;
	// 	}
	// }
	h=h.substr(0,pos)+"<span>"+e.text+"</span>"+h.substr(pos+e.text.length);
	textBox.innerHTML=h;
	console.log(h);
}

function NoBold(){
	textBox.innerHTML=textBox.innerHTML.replace("<span>","");
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
	}
}

function ReFormat(i=0,ns=[]){
	if(i==0){
		ns=[];
		analyze(textBox.innerHTML,ns);
		textBox.innerHTML="";
		sCounter=0;
		console.log(ns);
	}
	if(ns.length>0){
		i++;
		var e=ns.shift();
		AddText(e.text);
		ReFormat(i,ns);
	}
}

function playSyllable(s){
	var h=s.sounds[Math.floor(Math.random()*s.sounds.length)];
	playSound(h);
	console.log("playing "+s.name);
	notePlayed.innerHTML=s.name;
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

function playVoice(n){
	for(var i=0;i<syllables.length;i++){
		if(n==syllables[i].name){
			console.log("playing "+syllables[i].name);
			playSound(syllables[i].voice);
			break;
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

gatiInput=document.getElementById("gatiInput")

gatiInput.addEventListener("input",function(){
	numOnly(this);
	if(isNumeric(this.innerHTML) && this.innerHTML!=""){
		changeGati(parseFloat(this.innerHTML));
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
		// following code from https://stackoverflow.com/a/40633263
		var range = document.createRange();
	  var sel = window.getSelection();
	  range.setStart(el.childNodes[0],el.innerHTML.length);
	  range.collapse(true);
	  sel.removeAllRanges();
	  sel.addRange(range);
	  // end of borrowed code
	}
}