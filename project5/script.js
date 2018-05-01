let moana=document.getElementById('moana')
let shake=document.getElementById('shake')
let body=document.getElementById('theBody')
let theFrame=document.getElementById('theVideo')
let theTitle=document.getElementById('theTitle')
let phase=0

function onYouTubeIframeAPIReady(){
player= new YT.Player('theVideo')
console.log(player)
player.addEventListener("onStateChange","onPlayerStateChange")
}
shake.loop=true
shake.muted=true
shake.autoplay=true
moana.addEventListener('mouseenter',function(){
	shake.muted=false
})
moana.addEventListener('mouseleave',function(){
	if (phase==0){
	shake.muted=true
	}
})
moana.addEventListener('click',function(){
	moana.style.top='-150%'
	phase=1
	for (i in [0,1,2,3,4,5,6,7,8,9]){
		setTimeout(function(){shake.volume-=0.1
			console.log(shake.volume)},100*i)}
	body.style.backgroundImage='url("toys.jpg")'
	theFrame.style.opacity='1'
	theFrame.style.pointerEvents='auto'
	theTitle.style.opacity="1"
	console.log(theFrame)
})
function onPlayerStateChange(event){
	if (event.data==1){
		theFrame.style.opacity='0'
		setTimeout(function(){theFrame.style.opacity='1'
		player.setSize(width="90%",height="90%")
		theFrame.id='biggerVideo'},1000)
		setTimeout(function(){
			body.style.transition="background-image ease-in-out 5s"
			body.style.webkitTransition="background-image ease-in-out 5s"
			body.style.backgroundImage='url("darkToys.jpg")'
			console.log(body.style.backgroundImage)},2000)
	}else if (event.data==0){
		theFrame.style.opacity='0'
		setTimeout(function(){theFrame.style.opacity='1'
		player.setSize(width="40%",height="40%")
		theFrame.id='theVideo'},1000)
	}
}