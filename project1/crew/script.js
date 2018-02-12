let bio=document.getElementsByClassName("bio")
let pic=document.getElementsByClassName("pic")
let gabyB=document.getElementById('gabyB')
let robertB=document.getElementById('robertB')
let saraB=document.getElementById('saraB')
let hatimB=document.getElementById('hatimB')
let gabyI=document.getElementById('gabyI')
let robertI=document.getElementById('robertI')
let saraI=document.getElementById('saraI')
let hatimI=document.getElementById('hatimI')
let a=document.getElementsByTagName('a')

let headin=document.getElementById('headin')
let sadPiano=document.getElementById('sadPiano')
let heartMonitor=document.getElementById('heartMonitor')
let mutee=document.getElementById('mutee')

sadPiano.autoplay=true
sadPiano.loop=true
sadPiano.muted=false
heartMonitor.autoplay=true
heartMonitor.loop=true
heartMonitor.volume=0
headin.addEventListener("mouseover",function(){
	console.log('eyo')
	for (i in [0,1,2,3,4,5,6,7,8,9]){
	setTimeout(function(){if (sadPiano.volume>0){
		sadPiano.volume-=0.1
		heartMonitor.volume+=0.1}},100*i)}
})
headin.addEventListener("mouseout",function(){
	console.log('eyo')
	for (i in [0,1,2,3,4,5,6,7,8,9]){
	setTimeout(function(){if (sadPiano.volume<1){
		sadPiano.volume+=0.1
		heartMonitor.volume-=0.1}},100*i)}
})
mutee.addEventListener("click",function(){
	console.log('clickd')
	if(sadPiano.muted===false){
		console.log('ok')
		heartMonitor.muted=true
		sadPiano.muted=true
		mutee.style.opacity=0.5
	}
	else{console.log('hmm')
		sadPiano.muted=false
		heartMonitor.muted=false
		mutee.style.opacity=1}
})

let animatedRideau1=document.getElementById('animatedRideau1')
let animatedRideau2=document.getElementById('animatedRideau2')
let rideau1=document.getElementById('rideau1')
let rideau2=document.getElementById('rideau2')
window.onpageshow=function(){
	animatedRideau1.style.right="83%";
	animatedRideau2.style.left="83%";
console.log('yo');
setTimeout(function(){
	animatedRideau1.style.visibility='hidden'
	animatedRideau2.style.visibility='hidden'
},1000)
}


gabyI.onmouseover=()=>{
	console.log(gabyI, gabyB)
	gabyB.style.visibility="visible"
	gabyB.style.opacity=1
}
gabyI.onmouseout=()=>{
	console.log(gabyI,gabyB)
	gabyB.style.opacity=0
	setTimeout(function(){gabyB.style.visibility="hidden"},1000)	
}
robertI.onmouseover=()=>{
	console.log(robertI, robertB)
	robertB.style.visibility="visible"
	robertB.style.opacity=1
}
robertI.onmouseout=()=>{
	console.log(robertI,robertB)
	robertB.style.opacity=0
	setTimeout(function(){robertB.style.visibility="hidden"},1000)	
}
saraI.onmouseover=()=>{
	console.log(saraI, saraB)
	saraB.style.visibility="visible"
	saraB.style.opacity=1
}
saraI.onmouseout=()=>{
	console.log(saraI,saraB)
	saraB.style.opacity=0
	setTimeout(function(){saraB.style.visibility="hidden"},1000)	
}
hatimI.onmouseover=()=>{
	console.log(hatimI, hatimB)
	hatimB.style.visibility="visible"
	hatimB.style.opacity=1
}
hatimI.onmouseout=()=>{
	console.log(hatimI,hatimB)
	hatimB.style.opacity=0
	setTimeout(function(){hatimB.style.visibility="hidden"},1000)	
}
