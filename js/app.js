import { app , db } from "./config-firebase.js";
import { doc, setDoc, collection, addDoc, query, where, getDocs,orderBy, deleteDoc, documentId, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
let nome = document.querySelector("#tarefa")
let data = document.querySelector("#data")
let status = document.querySelector("#status")
let btnTarefa = document.querySelector("#btnTarefa")
let bloco = document.querySelector("#bloco")
let formCadastrar = document.querySelector("#formCadastrar")
let formAtualizar = document.querySelector("#formAtualizar")
let btnAtualizar = document.querySelector("#btnAtualizar")
let idAtualizar = ""

async function inserirTarefa(){
    try{
        const docRef = await addDoc(collection(db, "tarefa"), {
            nome: nome.value,
            data: data.value,
            status: status.value});

            console.log("Document written with ID: ", docRef.id);
    } catch (error){
        console.error("Ocorreu o seguinte erro: " + error)
    }
}

async function consultarTarefa(){
    bloco.innerHTML = "" //limpando o elemento html antes de inserir registros, para não acumar dados
    const busca = query(collection(db, "tarefa"), orderBy("nome"));

    const resultado = await getDocs(busca);
    resultado.forEach((item) => {
    
    console.log(item.id, " => ", item.data());

    bloco.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center mb-2">
        <div class="ms-2 me-auto">
        <strong>Nome:</strong> ${item.data().nome} <br>
        <strong>Data:</strong> ${item.data().data} <br>
        <strong>Status:</strong> ${item.data().status} <br>
        </div>
        <div class="d-flex gap-2 justify-content-end">

        <button type="button" class="btn btn-danger rounded-5" id="${item.id}">Excluir</button>
        <button type="button" class="btn btn-primary rounded-5 " id="${item.id}">Alterar</button>

        </div>
        
    </li>
    `
    document.querySelectorAll(".btn-danger").forEach((elemento)=>{
        elemento.addEventListener("click", (evento)=>{
            console.log(evento.target.id)
            excluirTarefa(evento.target.id)
        })
    })

    document.querySelectorAll(".btn-primary").forEach((elemento)=>{
        elemento.addEventListener("click", (evento)=>{
            if(formAtualizar.classList.contains("d-none")){
                formCadastrar.classList.replace("d-block", "d-none")
                formAtualizar.classList.replace("d-none", "d-block")
            }

            consultarUnico(evento.target.id)
        })
    })

    });
}

async function excluirTarefa(id){
    let resultado = confirm("tem certeza que deseja excluir?")
    if(resultado){//se deixar apenas a variavel não precisa comparar ele ja entende como tru
        await deleteDoc(doc(db, "tarefa", id));
        alert("tarefa excluída com sucesso!")
        consultarTarefa()// recarregar os dados após excluir
    }
}

async function consultarUnico(id){
    idAtualizar = id // estamos passando o id do documento salvo no banco para a variável

    const banco = await collection(db, "tarefa")
    const busca = query (banco, where (documentId(), "==", id))

    const consulta = await getDocs(busca)

    console.log(consulta.docs[0].data())
    let resultado =consulta.docs[0].data()

    //inserindo os dados no form html
    tarefa_update.value = resultado.nome
    data_update.value = resultado.data
    status_update.value = resultado.status
}

async function atualizarTarefa(){
    const tarefa = doc(db, "tarefa", idAtualizar);
    try {
        // Set the "tarefa" field of the city 'id'
    await updateDoc(tarefa, {
        nome: tarefa_update.value,
        data: data_update.value,
        status: status_update.value
    });
    alert("Dados atualizados com sucesso!")
    } catch (error) {
        console.log(error)
    }

    
}

btnTarefa.addEventListener("click", (evento)=>{
    evento.preventDefault()
    console.log(nome.value, data.value, status.value)
    inserirTarefa()
    consultarTarefa()
})

btnAtualizar.addEventListener("click",(evento)=>{
    evento.preventDefault()
    atualizarTarefa()
    consultarTarefa()
    if(formAtualizar.classList.contains("d-block")){
        formCadastrar.classList.replace("d-none", "d-block")
        formAtualizar.classList.replace("d-block", "d-none")
    }

})

consultarTarefa()