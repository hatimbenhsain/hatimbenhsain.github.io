

function openInNewTab(url) {
  let win = window.open(url, '_blank');
  win.focus();
}

let karak=document.getElementById('karak')

karak.addEventListener('click',function(){
	openInNewTab('karak.pdf')
})
let parotha=document.getElementById('parotha')

parotha.addEventListener('click',function(){
	openInNewTab('parotha.pdf')
})
let lugaimat=document.getElementById('lugaimat')

lugaimat.addEventListener('click',function(){
	openInNewTab('lugaimat.pdf')
})
console.log(karak)