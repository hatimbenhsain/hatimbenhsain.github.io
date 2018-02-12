
let player
function onYouTubeIframeAPIReady(){
player= new YT.Player('theVideo')
console.log(player)
player.addEventListener("onStateChange","onPlayerStateChange")
}
function onPlayerStateChange(event){
console.log(event.data)
if (event.data===0){
	console.log('ended')
	go()
}
}
function go(){
	console.log('lol')
	window.location.replace("../index.html")
}
