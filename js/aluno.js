var api_url = 'http://127.0.0.1:8000/api/v1/alunos';


/*
 * Função para pegar todos.
 */
function get_all_alunos() {
    // Fetch metodo JavaScript para acessar e manipular HTTP, tais como os pedidos e respostas.
    fetch(api_url)

    .then(response => response.text())
    .then(function(text) {
    // variavel body acessando o documento, html manipulando tag tbody_alunos
        let tbody = document.getElementById('tbody_alunos');
    // variavel let dados convertendo text para json
        let dados = JSON.parse(text);
    // tbody innerHtml recebe uma lista vazia
        tbody.innerHTML = '';

    // variável dados que recebe o nosso texte entra em um foreach.
    // criamos variaáel de aluno.
    dados.forEach(aluno => {
       // tbody.innerhtml incrementando dados convertidos para incrementar nos HTML.
        tbody.innerHTML += ` <tr>
                                <td>${aluno.id}</td>
                                <td>${aluno.nome}</td>
                                <td>${aluno.email}</td>
                                <td>
                                    <a class="btn btn-outline-warning" href="save.html?id=${aluno.id}">editar</a>
                                    <button class="btn btn-outline-danger" onclick='remove(${aluno.id})'>deletar</button>
                                </td>
                            </tr>`;
        });
    });
}


/* 
 * Função buscar por aluno.
 */
function search() {
    // variável id_aluno acessando documento HTML acessando campo idbuscar seu valor.
    let id_aluno = document.getElementById('id_busca').value;
    // imprimindo id_aluno.
    console.log(id_aluno)
    // se id_aluno for diferente de vazio.
    if (id_aluno != '') {
        // acesse api url da nossa string.
        api_url = `${api_url}/${id_aluno}`
    }
    else {
        return;
    }

    fetch(api_url)

    .then(response => response.text())
    .then(function(text) {
        let tbody = document.getElementById('tbody_alunos');
        let aluno = JSON.parse(text);
        console.log(aluno);

        tbody.innerHTML = ` <tr>
                                <td>${aluno.id}</td>
                                <td>${aluno.nome}</td>
                                <td>${aluno.email}</td>
                                <td>
                                    <a class="btn btn-outline-warning" href="save.html?id=${aluno.id}">editar</a>
                                    <button class="btn btn-outline-danger" onclick='remove(${aluno.id})'>deletar</button>
                                </td>
                            </tr>`;
    });
}


/*
 * Ela realiza uma busca de aluno por id e retorna aluno Json.
 */
function get_by_id(id_aluno) {
    let aluno = fetch(`${api_url}/${id_aluno}`)
    .then(response => response.text())
    .then(function(text) {    
        return JSON.parse(text);
    });
    return aluno;
}


function load_aluno(id_aluno) {
    get_by_id(id_aluno).then(aluno =>{
        document.getElementById("id").value = aluno.id;
        document.getElementById("nome").value = aluno.nome;
        document.getElementById("email").value = aluno.email;
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
        aluno = {"id": id, "nome": nome, "email": email}
        update(aluno);
    } else {
       aluno = {"nome": nome, "email": email}
       create(aluno);
   }       
}


function update(aluno) {
    let mensagem = document.getElementById("mensagem");
    fetch(`${api_url}/${aluno.id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    })
    .then(response => {
        if (response.status == 202) {
            mensagem.innerHTML = "Alterado com sucesso";
        } else {
            mensagem.innerHTML = "Erro";
        }
    })
}


function create(aluno) {
    let mensagem = document.getElementById("mensagem");
    fetch(api_url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
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
 * Função para deletar Aluno.
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
            get_all_alunos();
        } else {
            alert("Erro");
        }
    })
}