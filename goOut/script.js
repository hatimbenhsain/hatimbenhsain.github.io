

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
let shawarma=document.getElementById('shawarma')

shawarma.addEventListener('click',function(){
	openInNewTab('shawarma.pdf')
})
console.log(karak)