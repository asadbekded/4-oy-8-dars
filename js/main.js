let elList = document.querySelector('.js-list') 
let elForm = document.querySelector('.js-form')
let elInp = document.querySelector('.js-inp')
// ----------------------elon qilinib boldi htmldan -------------
var itemFragment = new DocumentFragment()
function renderTodo(arr,node) {
   if(arr.length > 0){
      node.innerHTML = "";
      arr.forEach(el => {
         const newItem = document.createElement('li')
         const newTitle = document.createElement('h5')
         const newImg = document.createElement('img')
         const newSpan = document.createElement('span')
         const newSpan1 = document.createElement('span')

         newTitle.textContent = el.Title
         newImg.src = el.Poster
         newImg.width = '270'
         newImg.height = '300'
         newSpan.textContent = `Year : ${el.Year}`
         newSpan1.textContent = `Type : ${el.Type}`

         newItem.appendChild(newTitle)
         newItem.appendChild(newImg)
         newItem.appendChild(newSpan)
         newItem.appendChild(newSpan1)
         itemFragment.appendChild(newItem)
      })
      node.appendChild(itemFragment)
   }
}

elForm.addEventListener('click', function(evt) {
   evt.preventDefault('')
   let elInpVal = elInp.value
   async function getTodo() {
      const response = await fetch(`https://omdbapi.com/?apikey=fc8e9a22&s=${elInpVal}&`)
      const data = await response.json()
      let datas = data.Search
      renderTodo(datas,elList)
   }
   getTodo()
})
//---------------------- mode btn code begin----------------
const elMode = document.querySelector('.mode-btn')
var theme = false

elMode.addEventListener('click', function(evt){
   theme = !theme
   window.localStorage.setItem('theme', theme? 'dark': 'light')
   changeTheme()
})

var changeTheme = (el => {
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
})
changeTheme()
//---------------------- mode btn code finished----------------