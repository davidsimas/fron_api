console.log('Rodando arquivo JavaScript')

function get_alunos() {

    fetch('http://127.0.0.1:8000/api/v1/alunos/', {
        headers:{
            'Accept': 'application/json'
        }
    })

    .then(response => response.text())
    .then(text => {
        console.log(text)
        let dados = JSON.parse(text)
        console.log(dados)

        let  tbody = document.getElementById("tbody_alunos")

        dados.forEach(aluno => {
            tbody.innerHTML += `
                                <tr>
                                    <td>${aluno.id}</td>                    
                                    <td>${aluno.nome}</td>                    
                                    <td>${aluno.email}</td>
                                </tr>`
        })
    })

}

function get_aluno(){

    let id = document.getElementById('id_busca').value

    fetch(`http://127.0.0.1:8000/api/v1/alunos/${id}`, {
        headers:{
            'Accept': 'aplication/json'
        }
    })

    .then(response => response.text())

    .then(text => {
        console.log(text)

        let dados = JSON.parse(text)

        console.log(dados)

        let tbody = document.getElementById("tbody_alunos")

    tbody.innerHTML = "";

    tbody.innerHTML += ` 
                                <tr>
                                    <td>${dados.id}</td>
                                    <td>${dados.nome}</td>
                                    <td>${dados.email}</td>
                                </tr>
                                `
    })
   
}


/* 
 * Professores
 */


function get_professsores() {

    fetch('http://127.0.0.1:8000/api/v1/professores/', {
        headers:{
            'Accept': 'application/json'
        }
    })

    .then(response => response.text())
    .then(text => {
        console.log(text)
        let dados = JSON.parse(text)
        console.log(dados)

        let  tbody = document.getElementById("tbody_professores")

        dados.forEach(professor => {
            tbody.innerHTML += `
                                <tr>
                                    <td>${professor.id}</td>                    
                                    <td>${professor.nome}</td>                    
                                    <td>${professor.email}</td>
                                </tr>`
        })
    })

}

function get_professsor(){

    let id = document.getElementById('id_busca_professor').value

    fetch(`http://127.0.0.1:8000/api/v1/professores/${id}`, {
        headers:{
            'Accept': 'aplication/json'
        }
    })

    .then(response => response.text())

    .then(text => {
        console.log(text)

        let dados = JSON.parse(text)

        console.log(dados)

        let tbody = document.getElementById("tbody_professores")

    tbody.innerHTML = "";

    tbody.innerHTML += ` 
                                <tr>
                                    <td>${dados.id}</td>
                                    <td>${dados.nome}</td>
                                    <td>${dados.email}</td>
                                </tr>
                                `
    })
   
}


/*
 * Usuários
 */


function get_usuarios() {

    fetch('http://127.0.0.1:8000/api/v1/usuarios/', {
        headers:{
            'Accept': 'application/json'
        }
    })

    .then(response => response.text())
    .then(text => {
        console.log(text)
        let dados = JSON.parse(text)
        console.log(dados)

        let  tbody = document.getElementById("tbody_usuarios")

        dados.forEach(usuario => {
            tbody.innerHTML += `
                                <tr>
                                    <td>${usuario.id}</td>                    
                                    <td>${usuario.nome}</td>                    
                                    <td>${usuario.email}</td>
                                </tr>`
        })
    })

}

function get_usuario(){

    let id = document.getElementById('id_busca_usuario').value

    fetch(`http://127.0.0.1:8000/api/v1/alunos/${id}`, {
        headers:{
            'Accept': 'aplication/json'
        }
    })

    .then(response => response.text())

    .then(text => {
        console.log(text)

        let dados = JSON.parse(text)

        console.log(dados)

        let tbody = document.getElementById("tbody_usuarios")

    tbody.innerHTML = "";

    tbody.innerHTML += ` 
                                <tr>
                                    <td>${dados.id}</td>
                                    <td>${dados.nome}</td>
                                    <td>${dados.email}</td>
                                </tr>
                                `
    })
   
}


get_alunos()
get_professsores()
get_usuarios()