const elList = document.querySelector('.js-list') 
const elForm = document.querySelector('.js-form')
const elInp = document.querySelector('.js-inp')
const elGroupBtn = document.querySelector('.buttons-page')
const elPrex = document.querySelector('.prex-btn')
const elNext = document.querySelector('.next-btn')
const elSel = document.querySelector('.js-select')

let active = 1
// ----------------------elon qilinib boldi htmldan -------------

elForm.addEventListener('click', function(evt) {
   evt.preventDefault('')
   getMovie()
})


var itemFragment = new DocumentFragment()
const renderMovie = (array,node) => {
   if(array.Response == 'True'){
      node.innerHTML = "";
      array.Search.forEach((item) => {
         const newItem = document.createElement('li')
         const newTitle = document.createElement('h5')
         const newImg = document.createElement('img')
         const newSpan = document.createElement('span')
         const newSpan1 = document.createElement('span')
         const newSpan2 = document.createElement('span')
   
         newImg.src = item.Poster
         newImg.classList.add('diaz')
         newImg.width = '270'
         newImg.height = '300'
         newTitle.textContent = item.Title
         newSpan.textContent = `Year : ${item.Year}`
         newSpan1.textContent = `Type : ${item.Type}`
         newSpan2.textContent = `Id : ${item.imdbID}`
   
         newItem.appendChild(newImg)
         newItem.appendChild(newTitle)
         newItem.appendChild(newSpan)
         newItem.appendChild(newSpan1)
         itemFragment.appendChild(newItem)
      })
      node.appendChild(itemFragment)
   }

   if(active == 1){
      elPrex.setAttribute('disabled', true)
   }else{
      elPrex.removeAttribute('disabled')
   }

   let totals = Math.ceil(array.totalResults / 10)

   if(active == totals){
      elNext.setAttribute('disabled', true)
   }else{
      elNext.removeAttribute('disabled')
   }
}

async function getMovie() {
   const response = await fetch(`https://omdbapi.com/?apikey=fc8e9a22&s=${elInp.value}&page=${active}&type=${elSel.value}`)
   const data = await response.json()
   renderMovie(data, elList)
}

elSel.addEventListener('change', function () {
   getMovie()
})

elGroupBtn.addEventListener('click', function(evt) {
   if(evt.target.matches('.prex-btn')){
      active--
      getMovie()
   }
   if(evt.target.matches('.next-btn')){
      active++
      getMovie()
   }
})








//---------------------- mode btn code begin----------------
const elMode = document.querySelector('.mode-btn')

var theme = false
elMode.addEventListener('click', function(evt){
   theme = !theme
   var resulMode = theme? 'dark': 'light';
   window.localStorage.setItem('theme', resulMode)
   changeTheme()
})

function changeTheme () {
   if(window.localStorage.getItem('theme') == 'dark'){
      document.body.style.backgroundColor = '#333'
      elMode.textContent = 'Light'
      elMode.setAttribute('class', 'btn btn-light');
   }
   else{
      document.body.style.backgroundColor = '#fff'
      elMode.textContent = 'Dark'
      elMode.setAttribute('class', 'btn btn-dark');
   }
}
changeTheme()
//---------------------- mode btn code finished----------------