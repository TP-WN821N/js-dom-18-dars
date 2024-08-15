let selected = document.getElementById('selected')
let prev = document.getElementById('prev')
let next = document.getElementById('next')
let data = []
let castum_per_page = 10
let page = 1

document.addEventListener("DOMContentLoaded", () => {
  getComments()
  selected.addEventListener('change', (e) => {
    castum_per_page = +e.target.value
    getComments()
  })
  prev.addEventListener('click', () => {
    if (page !== 1) {
      page--
      getComments()
    }
  })
  next.addEventListener('click', () => {
    if (data.length) {
      page++
      getComments()
    }
  })
})

async function getComments() {
  try {
    let request = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${castum_per_page}`)
    data = await request.json()
    displayComments()
  } catch (err) {
    console.log(err);
  }
}

function displayComments() {
  let result = document.getElementById('result')
  result.innerHTML = ""

  data.forEach((item, i) => {
    let div = document.createElement('div')
    div.className = `flex gap-2 py-0.5 px-3 ${i % 2 == 0 ? "bg-gray-100" : "bg-green-200"}`
    div.innerHTML += `
      <span class="text-xl">${i + 1}.</span>
      <div>
        <h2 class="text-xl">${item.name[0].toUpperCase() + item.name.slice(1)}: ${item.email}</h2>
        <p class="text-sm">${item.body[0].toUpperCase() + item.body.slice(1)}</p>
      </div>
    `
    result.appendChild(div)
  })
}