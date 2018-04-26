let monkey=document.getElementById('monkey')
let heartMonitor=document.getElementById('heartMonitor')
let player
let page=getElementsByTagName('page')
function onYouTubeIframeAPIReady(){
player= new YT.Player('theVideo')
console.log(player)
player.addEventListener("onStateChange","onPlayerStateChange")
}
function onPlayerStateChange(event){
console.log(event.data)
if (event.data===0){
	console.log('ended')
	heartMonitor.play()
	monkey.style.opacity='1'
	page.style.background.color='white'
}
}