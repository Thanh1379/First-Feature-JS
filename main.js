//  const { json } = require("express");

var userApi = 'http://localhost:3000/user';

function getApi(url) {
    fetch(url)
        .then(response => response.json())
        .then((json) => {
            render(json)
        })
        .catch()
}

function render(json) {
    var memeListElm = document.querySelector('.meme-list')

    var html = json.map(data => {
        return `<li id="meme-${data.id}"><h2>${data.name}</h2>
        <img src="${data.image}"><button onclick="deleteApi(${data.id})" id="delete-btn-${data.id}">Xóa</button>
        <button onclick="changeContent(${data.id})" id="put-btn-${data.id}">Sửa</button>
        </li>
        `
    })

    memeListElm.innerHTML += html.join(" ")
}

function postApi(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
        .then(response => response.json())
        .then(json => {
            render(json)
        })
}

function addContent(url) {
    const submitBtnElm = document.querySelector('#submit-btn')

    submitBtnElm.addEventListener('click', () => {
        var name = document.querySelector('#name-input').value
        var urlImg = document.querySelector('#image-url-input').value

        var data = {name: name, image: urlImg}

        postApi(url, data)
    })
}

function deleteApi(id) {
    var userApi = 'http://localhost:3000/user';

    fetch(userApi + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(() => {
            const memeItem = document.querySelector('#meme-' + id)    
            if(memeItem) {
                memeItem.remove()
            }        
        })
}

function putApi(id, data) {
    var userApi = 'http://localhost:3000/user';

    fetch(userApi + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => {
            var memeItem = document.querySelector(`#meme-` + id)

            memeItem.innerHTML = `<img src="${json.image}"><button onclick="deleteApi(${json.id})" id="delete-btn-${json.id}">Xóa</button>
            <button onclick="outApi(${json.id})" id="put-btn-${json.id}">Sửa</button>`
        })
}

function changeContent(id) {
    const inputFieldElm = document.querySelector('.input-field')
    const changeContenBtnElm = document.querySelector('#change-content-btn')
    const putFieldElm = document.querySelector('.put-field')

    inputFieldElm.classList.add("display-disable")
    putFieldElm.classList.remove("display-disable")

    changeContenBtnElm.addEventListener('click', () => {
        var name = document.querySelector('#change-content-name-input').value
        var urlImg = document.querySelector('#change-content-image-url-input').value

        var data = {name: name, image: urlImg}

        putApi(id, data)

        putFieldElm.classList.add("display-disable")
        inputFieldElm.classList.remove("display-disable")
    })
}

getApi(userApi)
addContent(userApi)