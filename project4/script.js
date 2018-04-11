let player
function onYouTubeIframeAPIReady(){
player= new YT.Player('theVideo')
console.log(player)
player.addEventListener("onStateChange","onPlayerStateChange")
}
let book=document.getElementById('book')
let Book=document.getElementById('Book')
let content=document.getElementById('content')
let turned=0
Book.addEventListener("click",turn)
function turn(){
	console.log(Book)
	if (turned==0){
		console.log('yo')
		content.style.visibility='visible'
		content.style.opacity="1"
		book.style.top='-150%'
		turned=1
	}
}