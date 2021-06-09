fileNames=[];
syllables=[];

kala=80;	//tempo
gati=4;		//akshara per beat

$(document).ready(function () 
{
    $.get("./sounds/", function(data) 
    {
        $("#fileNames").append(data);
        //console.log(data);
        GetFileNames(data);
        GetSyllables();
        console.log(syllables);
    });
})

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
					syllables[i].sounds.push("sounds/"+s+".mp3");
					added=true;
					break;
				}
			}
			if(!added){
				syllables.push({
					name:s.substr(0,s.length-1),
					sounds:["sounds/"+s+".mp3"],
					voice:"sounds/"+s.substr(0,s.length-1)+".mp3"
				});
				AddButton(sn);
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
		textBox.value=textBox.value+this.id.slice(0,-6);
		playVoice(this.id.slice(0,-6));
	})
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

function play(){
	var ns=[]
	analyze(textBox.value.trim().toLowerCase(),ns);
	console.log(ns);
	playMusic(ns);
	notePlayedDiv.style.visibility="visible";
	//console.log(fileNames);
}

function analyze(txt,ns){
	if(txt!=""){
		var s="";
		var sn="";
		if(txt.substr(0,5)=="tempo"){
			s="tempo";
			sn=s;
		}else if(txt.substr(0,4)=="kala"){
			s="kala";
			sn=s;
		}else if(txt.substr(0,1)=="g" || txt.substr(0,1)=="[" || txt.substr(0,1)=="]" || txt.substr(0,1)=="{" || txt.substr(0,1)=="}"){
			s=txt.substr(0,1);
			sn=s;
		}else if(isNumeric(txt.substr(0,1))){
			var l=1;
			while(isNumeric(txt.substr(0,l+1)) && l<txt.length){
				l+=1;
			}
			s=txt.substr(0,l);
			sn=s;
		}else{
			for(var i=0;i<syllables.length;i++){
				if(txt.length>=syllables[i].name.length && syllables[i].name.length>s.length && syllables[i].name==txt.substring(0,syllables[i].name.length)){
					s=syllables[i];
					sn=s.name;
				}
			}
		}
		if(s!=""){
			ns.push(s);
		}
		console.log(txt);
		analyze(txt.slice(Math.max(sn.length,1)),ns);
	}
}

function playMusic(ns){
	var delay=0
	for(var i=0;i<ns.length;i++){
		if(ns[i]=="tempo" || ns[i]=="kala"){
			if(i+1<ns.length && isNumeric(ns[i+1])){
				changeTempo(ns[i+1])
				i++;
			}
		}else if(ns[i]=="g"){
			if(i+1<ns.length && isNumeric(ns[i+1])){
				changeGati(ns[i+1])
				i++;
			}
		}else if(ns[i]=="[" || ns[i]=="}"){
			changeTempo(kala*2);
		}else if(ns[i]=="]" || ns[i]=="{"){
			changeTempo(kala/2);
		}else{
			var fn=ns[i].sounds[Math.floor(Math.random()*ns[i].sounds.length)];
			console.log("to play "+fn+" on "+delay);
			setTimeout(playSound,delay,fn);
			delay=delay+1000*(kala/60)/gati;
		}
	}
	setTimeout(function(){
		notePlayedDiv.style.visibility="hidden";
	},delay+1000*(kala/60)/gati)
}

function changeTempo(t){
	kala=t;
}

function changeGati(g){
	gati=g;
}

function playSound(fn){
	var audio=new Audio(fn);
	audio.play();
	console.log("playing "+fn);
	notePlayed.innerHTML=fn.slice(7,-5);
}

function syllable(txt,sounds){
	this.txt=txt;
	get
}

function isNumeric(str) {			//function from https://stackoverflow.com/a/175787
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function playVoice(n){
	for(var i=0;i<syllables.length;i++){
		if(n==syllables[i].name){
			playSound(syllables[i].voice);
			break;
		}
	}
}