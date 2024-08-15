let selected = document.getElementById('selected')
let prev = document.getElementById('prev')
let next = document.getElementById('next')
let data = []
let castum_per_page = 8
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
    let request = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${castum_per_page}`)
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
    let tr = document.createElement('tr')
    tr.innerHTML += `
      <td class="border text-center">${i + 1}</td>
      <td class="border text-center">${item.name}</td>
      <td class="border text-center">${item.username}</td>
      <td class="border text-center">${item.email}</td>
      <td class="border text-center">${item.address.street}</td>
      <td class="border text-center">${item.phone}</td>
      <td class="border text-center">${item.website}</td>
      <td class="border text-center">${item.company.name}</td>
    `
    result.appendChild(tr)
  })
}