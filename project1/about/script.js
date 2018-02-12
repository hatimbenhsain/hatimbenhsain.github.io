let animatedRideau1=document.getElementById('animatedRideau1')
let animatedRideau2=document.getElementById('animatedRideau2')
let rideau1=document.getElementById('rideau1')
let rideau2=document.getElementById('rideau2')

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

window.onpageshow=function(){
animatedRideau1.style.right="83%";
animatedRideau2.style.left="83%";
console.log('yo');
setTimeout(function(){
	animatedRideau1.style.visibility='hidden'
	animatedRideau2.style.visibility='hidden'
},1000)
}