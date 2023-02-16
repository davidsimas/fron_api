var api_url = 'http://127.0.0.1:8000/api/v1/professores';
               

/*
 * Função para pegar todos.
 */
function get_all_professores() {
    // Fetch metodo JavaScript para acessar e manipular HTTP, tais como os pedidos e respostas.
    fetch(api_url)

    .then(response => response.text())
    .then(function(text) {
    // variavel body acessando o documento, html manipulando tag tbody_professores
        let tbody = document.getElementById('tbody_professores');
    // variavel let dados convertendo text para json
        let dados = JSON.parse(text);
    // tbody innerHtml recebe uma lista vazia
        tbody.innerHTML = '';

    // variável dados que recebe o nosso texte entra em um foreach.
    // criamos variaáel de professor.
    dados.forEach(professor => {
       // tbody.innerhtml incrementando dados convertidos para incrementar nos HTML.
        tbody.innerHTML += ` <tr>
                                <td>${professor.id}</td>
                                <td>${professor.nome}</td>
                                <td>${professor.email}</td>
                                <td>
                                    <a class="btn btn-outline-warning" href="save_professor.html?id=${professor.id}">editar</a>
                                    <button class="btn btn-outline-danger" onclick='remove(${professor.id})'>deletar</button>
                                </td>
                            </tr>`;
        });
    });
}


/* 
 * Função buscar por aluno.
 */
function search() {
    // variável id_professor acessando documento HTML acessando campo idbuscar seu valor.
    let id_professor = document.getElementById('id_busca_professor').value;
    // imprimindo id_professor.
    console.log(id_professor)
    // se id_professor for diferente de vazio.
    if (id_professor != '') {
        // acesse api url da nossa string.
        api_url = `${api_url}/${id_professor}`
    }
    else {
        return;
    }

    fetch(api_url)

    .then(response => response.text())
    .then(function(text) {
        let tbody = document.getElementById('tbody_professores');
        let professor = JSON.parse(text);
        console.log(professor);

        tbody.innerHTML = ` <tr>
                                <td>${professor.id}</td>
                                <td>${professor.nome}</td>
                                <td>${professor.email}</td>
                                <td>
                                    <a class="btn btn-outline-warning" href="save_professor.html?id=${professor.id}">editar</a>
                                    <button class="btn btn-outline-danger" onclick='remove(${professor.id})'>deletar</button>
                                </td>
                            </tr>`;
    });
}


/*
 * Ela realiza uma busca de professor por id e retorna professor Json.
 */
function get_by_id(id_professor) {
    let professor = fetch(`${api_url}/${id_professor}`)
    .then(response => response.text())
    .then(function(text) {    
        return JSON.parse(text);
    });
    return professor;
}


function load_professor(id_professor) {
    get_by_id(id_professor).then(professor => {
        document.getElementById("id").value = professor.id;
        document.getElementById("nome").value = professor.nome;
        document.getElementById("email").value = professor.email;
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
        professor = {"id": id, "nome": nome, "email": email}
        update(professor);
    } else {
       professor = {"nome": nome, "email": email}
       create(professor);
   }       
}


function update(professor) {
    let mensagem = document.getElementById("mensagem");
    fetch(`${api_url}/${professor.id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professor)
    })
    .then(response => {
        if (response.status == 202) {
            mensagem.innerHTML = "Alterado com sucesso";
        } else {
            mensagem.innerHTML = "Erro";
        }
    })
}


function create(professor) {
    let mensagem = document.getElementById("mensagem");
    fetch(api_url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(professor)
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
    fetch(`${api_url}/${id}`,{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.status == 204) {
            get_all_professores();
        } else {
            alert("Erro");
        }
    })
}