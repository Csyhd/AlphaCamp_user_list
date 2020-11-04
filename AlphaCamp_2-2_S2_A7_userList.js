const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = []
const dataPanel = document.querySelector('#data-panel')

function renderMovieList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `<div class="col-lg-2 col-sm-3 col-6">
        <div class="mb-2 mr-2 ml-2 border">
          <div class="users">
            <img src="${item.avatar}" class="user-img img-fluid w-100 h-100" alt="user avatar" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">
            <div class="user-body">
              <h5 class="user-name">${item.name}</h5>
            </div>
          </div>
        </div>
      </div>`
  })
  dataPanel.innerHTML = rawHTML
}


axios.get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderMovieList(users)
  })
  .catch((error) => {
    console.log('error')
  })

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.user-img')) {
    showUserModal(event.target.dataset.id)
  }
})

function showUserModal(id) {
  const modalName = document.querySelector('#user-modal-name')
  const modalImage = document.querySelector('#user-modal-image')
  const modalDescription = document.querySelector('#user-modal-description')
  modalName.innerText = ''
  modalDescription.innerHTML = ''
  modalImage.innerHTML = ''
  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data
    modalName.innerText = `${data.name} ${data.surname}`
    const dataArray = Object.keys(data)
    dataArray.forEach((value, index) => {
      if (index > 2 && index < 8) {
        modalDescription.innerHTML += `
      <p>${value}: ${data[value]}</p>`
      }
    })
    modalImage.innerHTML = `<img src = "${data.avatar}" alt = "user avatar" class="img-fluid w-100"> `
  })
}