var api_url = 'http://127.0.0.1:8000/api/v1/usuarios';
               

/*
 * Função para pegar todos.
 */
function get_all_usuarios() {
    // Fetch metodo JavaScript para acessar e manipular HTTP, tais como os pedidos e respostas.
    fetch(api_url)

    .then(response => response.text())
    .then(function(text) {
    // variavel body acessando o documento, html manipulando tag tbody_usuarios
        let tbody = document.getElementById('tbody_usuarios');
    // variavel let dados convertendo text para json
        let dados = JSON.parse(text);
    // tbody innerHtml recebe uma lista vazia
        tbody.innerHTML = '';

    // variável dados que recebe o nosso texte entra em um foreach.
    // criamos variaáel de usuário.
    dados.forEach(usuario => {
       // tbody.innerhtml incrementando dados convertidos para incrementar nos HTML.
        tbody.innerHTML += ` <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.nome}</td>
                                <td>${usuario.email}</td>
                                <td>
                                    <a class="btn btn-outline-warning" href="save_usuario.html?id=${usuario.id}">editar</a>
                                    <button class="btn btn-outline-danger" onclick='remove(${usuario.id})'>deletar</button>
                                </td>
                            </tr>`;
        });
    });
}


/* 
 * Função buscar por usuario.
 */
function search() {
    // variável id_usuario acessando documento HTML acessando campo idbuscar seu valor.
    let id_usuario = document.getElementById('id_busca_usuario').value;
    // imprimindo id_usuario.
    console.log(id_usuario)
    // se id_usuario for diferente de vazio.
    if (id_usuario != '') {
        // acesse api url da nossa string.
        api_url = `${api_url}/${id_usuario}`
    }
    else {
        return;
    }

    fetch(api_url)

    .then(response => response.text())
    .then(function(text) {
        let tbody = document.getElementById('tbody_usuarios');
        let usuario = JSON.parse(text);
        console.log(usuario);

        tbody.innerHTML = ` <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.nome}</td>
                                <td>${usuario.email}</td>
                                <td>
                                    <a class="btn btn-outline-warning" href="save_usuario.html?id=${usuario.id}">editar</a>
                                    <button class="btn btn-outline-danger" onclick='remove(${usuario.id})'>deletar</button>
                                </td>
                            </tr>`;
    });
}


/*
 * Ela realiza uma busca de usuario por id e retorna usuario Json.
 */
function get_by_id(id_usuario) {
    let usuario = fetch(`${api_url}/${id_usuario}`)
    .then(response => response.text())
    .then(function(text) {    
        return JSON.parse(text);
    });
    return usuario;
}


function load_usuario(id_usuario) {
    get_by_id(id_usuario).then(usuario =>{
        document.getElementById("id").value = usuario.id;
        document.getElementById("nome").value = usuario.nome;
        document.getElementById("email").value = usuario.email;
    });
}


/*
 * Botao salvar tanto para criar quanto editar.
 */
function save() {
    let id = document.getElementById("id").value;
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
      
    if (id != '') {
        console.log('editar')
        usuario = {"id": id, "nome": nome, "email": email}
        update(usuario);
    } else {
       usuario = {"nome": nome, "email": email}
       create(usuario);
   }       
}


function update(usuario) {
    let mensagem = document.getElementById("mensagem");
    fetch(`${api_url}/${usuario.id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.status == 202) {
            mensagem.innerHTML = "Alterado com sucesso";
        } else {
            mensagem.innerHTML = "Erro";
        }
    })
}


function create(usuario) {
    let mensagem = document.getElementById("mensagem");
    fetch(api_url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.status == 201) {
            mensagem.innerHTML = "Criado com sucesso";
        } else {
            mensagem.innerHTML = "Erro";
        }
    })
}

/*
 * Função para deletar Usuário.
 */
function remove(id) {
    fetch(`${api_url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.status == 204) {
            get_all_usuarios();
        } else {
            alert("Erro");
        }
    })
}