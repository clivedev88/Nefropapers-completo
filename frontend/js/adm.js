// import { prepararQuestao } from './forms.js';


// const questions = {
//     questoes: "",
//     respostas: ["", "", "", "", ""],
//     correta: null,
//     explicaçao: ""
// }

// const textArea = document.getElementById('textQuest')
// const questionInput = document.querySelectorAll('.input-question input')
// const questionSaveBtn = document.querySelector('.saveBtn button')
// const explicationText = document.querySelector('.explication-text')
// const switchCheck = document.querySelectorAll('.switch input')
// const divError = document.getElementById('msgError')


// const btnGabarito = document.querySelector('.gab-btn1')
// const editQuestion = document.querySelector(".edit-questao")
// const filterQuestion = document.querySelector('.filter-question')
// const divQuestions = document.querySelector('.questions')
// const subSection = document.querySelector(".subSection")
// const questionContainer = document.querySelector(".questionContainer")

// function Questao() {
//     questions.questoes = textArea.value
//     questionInput.forEach((input, index) => {
//         questions.respostas[index] = input.value
//     });
//     questions.explicaçao = explicationText.value

// }

// function respostaCorreta() {
//     switchCheck.forEach((switch_, index)  => {
//         switch_.addEventListener('change', ()=>{
//             if(switch_.checked){
//                 questions.correta= index

//                 switchCheck.forEach((restSwitch, restIndex) => {
//                     if(restIndex !== index) restSwitch.checked = false
//                 })
//             }else{
//                 questions.correta = null
//             }
//         })
//     })
// }

// function validQuestion() {
//     if(questions.questoes.trim() === ''){
//         messageError('Por favor, insira o enunciado da questão.')
//         return false
//     }
//     if(questions.respostas.some( correta => correta.trim() === "")){
//         messageError('Preencha todas as opções de respostas.')
//         return false
//     }
//     if(questions.correta === null){
//         messageError('Selecione a reposta correta.')
//         return false
//     }
//     return true
// }

// function messageError(message){
//     divError.textContent = message;
//     divError.style.display = 'block'
//     setTimeout(() => {
//         divError.style.display = 'none'
//     }, 3000)
// }

// questionSaveBtn.addEventListener('click', async () => {
//     const moduleId = document.querySelector('#moduleSelect').value; 
    
//     if (!moduleId) {
//         alert('Escolha um módulo antes de salvar a questão.');
//         return;
//     }

//     const questao = prepararQuestao();  
//     if (validarQuestao(questao)) {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:3000/questoes/${moduleId}/questoes`, {  
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(questao)
//             });

//             if (response.ok) {
//                 alert('Questão salva com sucesso!');
//             } else {
//                 const data = await response.json();
//                 alert(`Erro ao salvar questão: ${data.error}`);
//             }
//         } catch (err) {
//             alert(`Erro ao salvar questão: ${err.message}`);
//         }
//     }
// });


// respostaCorreta();

// btnGabarito.addEventListener('click', function(event){
//     event.preventDefault()

//     editQuestion.style.display = 'none'
//     divQuestions.style.display = 'none'
//     filterQuestion.style.display = 'none'
//     questionContainer.style.display = 'none'
//     subSection.style.display = 'flex'
// })

// // Mostrando os módulos
// async function loadModules() {
//     const moduleSelect = document.querySelector('#moduleSelect');
    
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:3000/modulos/todos', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Erro ao carregar módulos');
//         }

//         const modules = await response.json();

//         modules.forEach(module => {
//             const option = document.createElement('option');
//             option.value = module.id;
//             option.textContent = module.nome; 
//             moduleSelect.appendChild(option);
//         });
//     } catch (err) {
//         console.error('Erro ao carregar módulos:', err);
//     }
// }

// document.addEventListener('DOMContentLoaded', loadModules);


// // questionSaveBtn.addEventListener('click', () =>{
// //     Questao()
// //     if(validQuestion()){
// //         console.log('pergunta salva:', questions)

// //         messageError('pergunta salva com sucesso')
// //     }
// // })

