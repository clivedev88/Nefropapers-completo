// document.addEventListener('DOMContentLoaded', () =>{

//     /* Variaveis da tela de Login */
//     const container = document.querySelector('.container')
//     const loginForm = document.querySelector('#form')
//     const loginEmail = document.querySelector('#inputEmail')
//     const loginPass = document.querySelector('#inputPass')
//     const loginPassIcon = document.querySelector('.showPass')
//     const loginCheck = document.querySelector('#inputCheck')
//     const lembrarSenha = document.querySelector('#forgotPass')
//     const loginButton = document.querySelector('#loginButton')
//     const loginGoogle = document.querySelector('#hrefGoogle')
//     const loginMeta = document.querySelector('#hrefMeta')
//     const loginFirst = document.querySelector('#firstHref')

//     /* Variaveis da rela de Cadastro */ 

//     const section3 = document.querySelector('.registration')
//     const formRegist = document.querySelector('#form-Regist')
//     const userName = document.querySelector('#name')
//     const passName = document.querySelector('#senha')
//     const passIcon = document.querySelector('.mostarSenha')
//     const passConfirIcon = document.querySelector('.confirSenha')
//     const passNameConfirmation = document.querySelector("#confirmaçaoSenha")
//     const registEmail = document.querySelector('#Email')
//     const registButton = document.querySelector('#cadastro')
//     const logar = document.querySelector('#hrefLogar')
//     const divMessage = document.querySelector('#Error')

//     /* variaveis para recuperar senha */

//     const section2 = document.querySelector('.section-recover')
//     const recoverInput = document.querySelector('#recoverPassword')
//     const recoverButton = document.querySelector('#recoverEmail')
//     const recoverHref = document.querySelector('#hrefRemenber')
//     const body = document.querySelector('body')
    
//     const sectionCreatQuestion = document.querySelector('.create-question')
//     const editBtn = document.querySelectorAll('.edit img')
//     const editHistBtn = document.getElementById('historico')

//     const resendConfirmationEmailInput = document.querySelector('#resendConfirmationEmail');
//     const resendConfirmationButton = document.querySelector('#resendConfirmationButton');
    

// // registButton.addEventListener('click', (event) =>{
// //     event.preventDefault()
// //     checkInputs();
    
// // })

// registButton.addEventListener('click', async (event) => {
//     event.preventDefault();
//     checkInputs();  

//     const userNameValue = userName.value.trim();
//     const emailValue = registEmail.value.trim();
//     const passwordValue = passName.value.trim();

//     if (!userNameValue || !emailValue || !passwordValue) {
//         alert('Todos os campos são obrigatórios!');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 nome: userNameValue,
//                 email: emailValue,
//                 senha: passwordValue
//             })
//         });

//         const data = await response.json();

//         if (response.ok) {
//             alert('Conta criada com sucesso!');
//             section3.style.display = 'none';  
//             container.style.display = 'flex';  
//         } else {
//             alert(`Erro ao registrar: ${data.error}`);
//         }
//     } catch (err) {
//         alert(`Erro ao registrar: ${err.message}`);
//     }
// });


// passIcon.addEventListener('click', () =>{
//     togglePassword(passName, passIcon)
// })
// passConfirIcon.addEventListener('click', () => {
//     togglePassword(passNameConfirmation, passConfirIcon)
// })
// loginPassIcon.addEventListener('click', () =>{
//     togglePassword(loginPass, loginPassIcon)
// })

// logar.addEventListener('click', (e) =>{
//     e.preventDefault();    
//     section3.style.display = 'none'
//     container.style.display = 'flex'

// })

// loginFirst.addEventListener('click', (e) => {
//     e.preventDefault()
//     container.style.display = 'none'
//     section3.style.display = 'flex'
// })  

// lembrarSenha.addEventListener('click', (e) => {
//     e.preventDefault();

//     container.style.display = 'none'
//     section2.style.display = 'flex'
    
// })

// recoverHref.addEventListener('click', (e) =>{
//     e.preventDefault();

//     section2.style.display = 'none'
//     container.style.display = 'flex'
// })

// // loginButton.addEventListener('click', (e) =>{
// //     e.preventDefault()
// //     login();

// // })


// resendConfirmationButton.addEventListener('click', async () => {
//     const email = resendConfirmationEmailInput.value.trim();  // Usando o novo campo para o reenvio

//     if (!email) {
//         alert('Por favor, insira seu e-mail para reenvio de confirmação.');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/auth/resend-confirmation', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email })
//         });

//         const data = await response.json();

//         if (response.ok) {
//             alert('E-mail de confirmação reenviado com sucesso!');
//         } else {
//             alert(`Erro ao reenviar e-mail: ${data.error}`);
//         }
//     } catch (err) {
//         alert(`Erro ao reenviar e-mail: ${err.message}`);
//     }
// });


// if (loginButton) {
//     loginButton.addEventListener('click', async (e) => {
//         e.preventDefault();

//         const loginEmailValue = loginEmail.value.trim();
//         const loginPassValue = loginPass.value.trim();

//         if (!loginEmailValue || !loginPassValue) {
//             alert('Preencha os campos obrigatórios!');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: loginEmailValue,
//                     senha: loginPassValue
//                 })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem('token', data.token);
//                 alert('Login efetuado com sucesso!');
//                 sectionCreatQuestion.style.display = 'flex';
//                 container.style.display = 'none';
//             } else {
//                 alert(`Erro ao fazer login: ${data.error}`);
//             }
//         } catch (err) {
//             alert(`Erro ao fazer login: ${err.message}`);
//         }
//     });
// } else {
//     console.error('Botão de login não encontrado no DOM.');
// }


// if (recoverButton) {
//     recoverButton.addEventListener('click', async () => {
//         const email = recoverInput.value.trim();

//         if (!email) {
//             alert('Por favor, insira seu e-mail');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:3000/auth/recover-password', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert('E-mail de recuperação enviado com sucesso!');
//             } else {
//                 alert(`Erro ao enviar e-mail: ${data.error}`);
//             }
//         } catch (err) {
//             alert(`Erro ao enviar e-mail: ${err.message}`);
//         }
//     });
// } else {
//     console.error('Botão de recuperação de senha não encontrado no DOM.');
// }


// editBtn.addEventListener('click', ()=>{
//     container.style.display = 'flex'
//     sectionCreatQuestion.style.display = 'none'

// })

// window.onload = function () {
//     setTimeout(function () {
//         const mainContainer = document.getElementById('main_container')
//         const inputScreen = document.getElementById('.inputScreen')

//         inputScreen.style.transition = 'opacity 0.5s ease-out';
//         inputScreen.style.opacity = 0;

//         setTimeout(() =>{
//             inputScreen.style.display = 'none'
//         }, 500)

//         mainContainer.style.display = 'flex'
//     }, 500); 
//   };

// //   LOGIN

// // function  login(){
// //     const loginEmailValue = loginEmail.value.trim()
// //     const loginPassValue = loginPass.value.trim()

// //     if(loginEmailValue === "" || loginPassValue === ""){
// //         alert('campos obrigatorios')
// //     }else{
// //         container.style.display = 'none'
// //         sectionCreatQuestion.style.display = 'flex'
// //     }
// // }

// async function login() {
//     const loginEmailValue = loginEmail.value.trim();
//     const loginPassValue = loginPass.value.trim();

//     if (loginEmailValue === "" || loginPassValue === "") {
//         alert('Preencha os campos obrigatórios!');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email: loginEmailValue, password: loginPassValue })
//         });

//         if (response.ok) {
//             const data = await response.json();
//             localStorage.setItem('token', data.token);
//             container.style.display = 'none';
//             sectionCreatQuestion.style.display = 'flex';
//         } else {
//             const error = await response.json();
//             alert(`Erro ao fazer login: ${error.message}`);
//         }
//     } catch (err) {
//         alert(`Erro ao fazer login: ${err.message}`);
//     }
// }


// function checkInputs(){

//     const userNameValue = userName.value.trim();
//     const passNameValue = passName.value.trim();
//     const passNameConfirmationValue = passNameConfirmation.value.trim();
//     const registEmailValue = registEmail.value.trim();
    
//     let error = false;
//     divMessage.innerHTML = ''; 


//     if(userNameValue === "" || passNameValue === "" || passNameConfirmationValue === "" || registEmailValue === ""){
//         const message = document.createElement('p')
//         message.textContent = 'Campos obrigatorios'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true
//         return
//     }else{
//         formRegist.classList.remove('error')
//     }

//     /* VALIDAÇAO DO NOME DE USUARIO */
    
//     if(userNameValue === ""){
//         const message = document.createElement('p')
//         message.textContent = 'Insira seu nome completo.'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true;
//         return

//     }else if(userNameValue.length < 10){
//         const message = document.createElement('p')
//         message.textContent = 'O nome tem que ter no mínimo 10 caracteres.'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true;
//         return
//     }else{
//         formRegist.classList.remove('error')
//         error = false
//     }

//     /* VALIDAÇAO DA SENHA SO USUARIO */


//     if(passNameValue === "" ){
//         const message = document.createElement('p')
//         message.textContent = 'Insira sua senha.'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true;
//         return

//     }else if(passNameValue.length < 8){
//         const message = document.createElement('p')
//         message.textContent = 'A senha tem que ter no mínimo 8 caracteres.'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true;
//         return
//     }else{
//         formRegist.classList.remove('error')
//         error = false
//     }


//     /* VALIDAÇAO DA CONFIRMAÇAO DE SENHA DO USUARIO */

//     if(passNameConfirmationValue !== passNameValue){
//         const message = document.createElement('p')
//         message.textContent = 'As senhas não conferem.'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true;
//         return

//     }else{
//         formRegist.classList.remove('error')
//         error = false
//     }
    
//     /* VALIDAÇAO DE EMAIL DO USUARIO*/

//     if(registEmailValue === "" ){
//         const message = document.createElement('p')
//         message.textContent = 'Insira seu email.'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true;
//         return

//     }else if(!validEmail(registEmailValue)){
//         const message = document.createElement('p')
//         message.textContent = 'Email invalido, tente novamente.'
//         divMessage.appendChild(message)
//         formRegist.classList.add('error')
//         error = true;
//         return
//     }else{
//         formRegist.classList.remove('error')
//         error = false
//     }
// }

// // function checkInputs(){
// //     const userNameValue = userName.value.trim();
// //     const passNameValue = passName.value.trim();
// //     const passNameConfirmationValue = passNameConfirmation.value.trim();
// //     const registEmailValue = registEmail.value.trim();
    
// //     let error = false;
// //     divMessage.innerHTML = ''; 

// //     if(userNameValue === "" || passNameValue === "" || passNameConfirmationValue === "" || registEmailValue === ""){
// //         const message = document.createElement('p')
// //         message.textContent = 'Campos obrigatórios'
// //         divMessage.appendChild(message)
// //         formRegist.classList.add('error')
// //         error = true
// //     } else {
// //         formRegist.classList.remove('error')
// //     }

// //     if(userNameValue.length < 10){
// //         const message = document.createElement('p')
// //         message.textContent = 'O nome tem que ter no mínimo 10 caracteres.'
// //         divMessage.appendChild(message)
// //         formRegist.classList.add('error')
// //         error = true
// //     }

// //     if(passNameValue.length < 8){
// //         const message = document.createElement('p')
// //         message.textContent = 'A senha tem que ter no mínimo 8 caracteres.'
// //         divMessage.appendChild(message)
// //         formRegist.classList.add('error')
// //         error = true
// //     }

// //     if(passNameConfirmationValue !== passNameValue){
// //         const message = document.createElement('p')
// //         message.textContent = 'As senhas não conferem.'
// //         divMessage.appendChild(message)
// //         formRegist.classList.add('error')
// //         error = true
// //     }

// //     if(!validEmail(registEmailValue)){
// //         const message = document.createElement('p')
// //         message.textContent = 'Email inválido, tente novamente.'
// //         divMessage.appendChild(message)
// //         formRegist.classList.add('error')
// //         error = true
// //     }

// //     return !error; 
// // }



// registButton.addEventListener('click', async (event) => {
//     event.preventDefault();
//     if (checkInputs()) {
//         try {
//             const response = await fetch('http://localhost:3000/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     nome: userName.value.trim(),
//                     email: registEmail.value.trim(),
//                     senha: passName.value.trim()
//                 })
//             });

//             if (response.ok) {
//                 alert('Conta criada com sucesso!');
//                 section3.style.display = 'none';
//                 container.style.display = 'flex';
//             } else {
//                 const error = await response.json();
//                 alert(`Erro ao registrar: ${error.message}`);
//             }
//         } catch (err) {
//             alert(`Erro ao registrar: ${err.message}`);
//         }
//     }
// });



// function validEmail(email){

//         const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
//         return regexEmail.test(email);
// }



// function togglePassword(input, icon) {

//     if (input.type === "password") {
//         input.type = "text"
//         icon.querySelector('i').classList.add('fa-eye-slash')
//     } else {
//         input.type = "password"
//         icon.querySelector('i').classList.remove('fa-eye-slash')
//     }
// }

// })


// async function loadUserHistory() {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         alert('Usuário não autenticado. Faça login novamente.');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/questoes/historico', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         if (response.ok) {
//             const historico = await response.json();
//             renderHistory(historico.data);  
//         } else {
//             const error = await response.json();
//             alert(`Erro ao carregar histórico: ${error.message}`);
//         }
//     } catch (err) {
//         alert(`Erro ao carregar histórico: ${err.message}`);
//     }
// }

// function renderHistory(historico) {
//     const historicoSection = document.querySelector('.historicos');
//     historicoSection.innerHTML = '';  // Limpa o histórico antigo

//     historico.forEach(item => {
//         const historicoDiv = document.createElement('div');
//         historicoDiv.classList.add('historico-item');
//         historicoDiv.innerHTML = `
//             <div class="imgCurso">
//                 <img src="https://some-image-url.com/test-image.png" alt="Histórico">
//             </div>
//             <div class="texts">
//                 <div class="stas">
//                     <h2>Teste ID: ${item.test_id}</h2>
//                     <span>${item.score}% de acerto</span>
//                 </div>
//                 <div class="porcetagem">
//                     <p>${item.correct_answers} de ${item.total_questions} corretas</p>
//                 </div>
//             </div>
//         `;
//         historicoSection.appendChild(historicoDiv);
//     });
// }


// document.addEventListener('DOMContentLoaded', () => {
//     // Quando o botão de "Histórico" for clicado
//     const historicoButton = document.getElementById('historicoBtn');
//     historicoButton.addEventListener('click', () => {
//         loadUserHistory();
//     });
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// document.addEventListener('DOMContentLoaded', () => {

//     /* Variáveis da tela de Login */
//     const container = document.querySelector('.container');
//     const loginForm = document.querySelector('#form');
//     const loginEmail = document.querySelector('#inputEmail');
//     const loginPass = document.querySelector('#inputPass');
//     const loginPassIcon = document.querySelector('.showPass');
//     const loginButton = document.querySelector('#loginButton');
//     const loginCheck = document.querySelector('#inputCheck');
//     const lembrarSenha = document.querySelector('#forgotPass');
//     const loginFirst = document.querySelector('#firstHref');

//     /* Variáveis da tela de Cadastro */
//     const section3 = document.querySelector('.registration');
//     const formRegist = document.querySelector('#form-Regist');
//     const userName = document.querySelector('#name');
//     const passName = document.querySelector('#senha');
//     const passConfirIcon = document.querySelector('.confirSenha');
//     const passNameConfirmation = document.querySelector("#confirmaçaoSenha");
//     const registEmail = document.querySelector('#Email');
//     const registButton = document.querySelector('#cadastro');
//     const divMessage = document.querySelector('#Error');

//     /* Variáveis para recuperar senha */
//     const section2 = document.querySelector('.section-recover');
//     const recoverInput = document.querySelector('#recoverPassword');
//     const recoverButton = document.querySelector('#recoverEmail');
//     const recoverHref = document.querySelector('#hrefRemenber');

//     /* Variáveis para a seção de criação de questões */
//     const sectionCreateQuestion = document.querySelector('.create-question');
//     const editQuestionBtn = document.querySelector('.edit img');

//     /* Função para alternar a visibilidade da senha */
//     function togglePassword(input, icon) {
//         if (input.type === "password") {
//             input.type = "text";
//             icon.querySelector('i').classList.add('fa-eye-slash');
//         } else {
//             input.type = "password";
//             icon.querySelector('i').classList.remove('fa-eye-slash');
//         }
//     }

//     /* Registro de evento para o ícone de mostrar senha */
//     loginPassIcon.addEventListener('click', () => {
//         togglePassword(loginPass, loginPassIcon);
//     });

//     /* Função para validar os campos de cadastro */
//     function checkInputs() {
//         const userNameValue = userName.value.trim();
//         const passNameValue = passName.value.trim();
//         const passNameConfirmationValue = passNameConfirmation.value.trim();
//         const registEmailValue = registEmail.value.trim();

//         let error = false;
//         divMessage.innerHTML = ''; 

//         if (userNameValue === "" || passNameValue === "" || passNameConfirmationValue === "" || registEmailValue === "") {
//             const message = document.createElement('p');
//             message.textContent = 'Campos obrigatórios';
//             divMessage.appendChild(message);
//             formRegist.classList.add('error');
//             error = true;
//             return false;
//         }

//         if (userNameValue.length < 10) {
//             const message = document.createElement('p');
//             message.textContent = 'O nome tem que ter no mínimo 10 caracteres.';
//             divMessage.appendChild(message);
//             formRegist.classList.add('error');
//             error = true;
//             return false;
//         }

//         if (passNameValue.length < 8) {
//             const message = document.createElement('p');
//             message.textContent = 'A senha tem que ter no mínimo 8 caracteres.';
//             divMessage.appendChild(message);
//             formRegist.classList.add('error');
//             error = true;
//             return false;
//         }

//         if (passNameConfirmationValue !== passNameValue) {
//             const message = document.createElement('p');
//             message.textContent = 'As senhas não conferem.';
//             divMessage.appendChild(message);
//             formRegist.classList.add('error');
//             error = true;
//             return false;
//         }

//         return !error;
//     }

//     /* Evento para o botão de cadastro */
//     registButton.addEventListener('click', async (event) => {
//         event.preventDefault();
//         if (checkInputs()) {
//             try {
//                 const response = await fetch('http://localhost:3000/auth/register', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         nome: userName.value.trim(),
//                         email: registEmail.value.trim(),
//                         senha: passName.value.trim()
//                     })
//                 });

//                 if (response.ok) {
//                     alert('Conta criada com sucesso!');
//                     section3.style.display = 'none';
//                     container.style.display = 'flex';
//                 } else {
//                     const error = await response.json();
//                     alert(`Erro ao registrar: ${error.message}`);
//                 }
//             } catch (err) {
//                 alert(`Erro ao registrar: ${err.message}`);
//             }
//         }
//     });

//     /* Evento para o botão de login */
//     loginButton.addEventListener('click', async (e) => {
//         e.preventDefault();

//         const loginEmailValue = loginEmail.value.trim();
//         const loginPassValue = loginPass.value.trim();

//         if (!loginEmailValue || !loginPassValue) {
//             alert('Preencha os campos obrigatórios!');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: loginEmailValue,
//                     senha: loginPassValue
//                 })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 localStorage.setItem('token', data.token);
//                 alert('Login efetuado com sucesso!');

//                 // Após o login bem-sucedido, ocultar o container de login e exibir a seção de criação de questões
//                 container.style.display = 'none';
//                 sectionCreateQuestion.style.display = 'block';
//             } else {
//                 alert(`Erro ao fazer login: ${data.error}`);
//             }
//         } catch (err) {
//             alert(`Erro ao fazer login: ${err.message}`);
//         }
//     });

//     /* Função para reenvio de confirmação */
//     recoverButton.addEventListener('click', async () => {
//         const email = recoverInput.value.trim();

//         if (!email) {
//             alert('Por favor, insira seu e-mail');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:3000/auth/recover-password', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email })
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert('E-mail de recuperação enviado com sucesso!');
//             } else {
//                 alert(`Erro ao enviar e-mail: ${data.error}`);
//             }
//         } catch (err) {
//             alert(`Erro ao enviar e-mail: ${err.message}`);
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     /* Variáveis para a criação de questões */
//     const textAreaPergunta = document.getElementById('textQuest');
//     const inputsRespostas = document.querySelectorAll('.input-question input');
//     const switchCorreta = document.querySelectorAll('.switch input');
//     const explicationText = document.querySelector('.explication-text');
//     const questionSaveBtn = document.querySelector('.saveBtn button');
//     const divError = document.getElementById('msgError');

//     let respostaCorreta = null;

//     /* Função para preparar os dados da questão */
//     function prepararQuestao() {
//         const pergunta = textAreaPergunta.value.trim();
//         const respostas = Array.from(inputsRespostas).map(input => input.value.trim());
//         const explicacao = explicationText.value.trim();

//         return {
//             pergunta,
//             opcao_a: respostas[0],
//             opcao_b: respostas[1],
//             opcao_c: respostas[2],
//             opcao_d: respostas[3],
//             opcao_e: respostas[4],  // Agora incluindo a 5ª opção
//             resposta_correta: respostaCorreta,
//             explicacao,
//         };
//     }

//     /* Função para validar os dados da questão */
//     function validarQuestao(questao) {
//         const { pergunta, opcao_a, opcao_b, opcao_c, opcao_d, opcao_e, resposta_correta } = questao;

//         if (!pergunta || !opcao_a || !opcao_b || !opcao_c || !opcao_d || !opcao_e) {
//             exibirErro('Preencha todos os campos de resposta.');
//             return false;
//         }

//         if (respostaCorreta === null) {
//             exibirErro('Selecione a resposta correta.');
//             return false;
//         }

//         return true;
//     }

//     /* Função para exibir mensagens de erro */
//     function exibirErro(mensagem) {
//         divError.textContent = mensagem;
//         divError.style.display = 'block';
//         setTimeout(() => {
//             divError.style.display = 'none';
//         }, 3000);
//     }

//     /* Função para enviar a questão ao backend */
//     async function enviarQuestao(questao) {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:3000/questoes/1/questoes', {  // Atualize o endpoint conforme necessário
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(questao)
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 alert('Questão salva com sucesso!');
//                 console.log('Questão criada:', data);
//             } else {
//                 const errorData = await response.json();
//                 exibirErro(`Erro ao salvar questão: ${errorData.error}`);
//             }
//         } catch (error) {
//             exibirErro(`Erro de conexão: ${error.message}`);
//         }
//     }

//     /* Evento para salvar a questão */
//     questionSaveBtn.addEventListener('click', (event) => {
//         event.preventDefault();

//         const questao = prepararQuestao();

//         if (validarQuestao(questao)) {
//             enviarQuestao(questao);
//         }
//     });

//     /* Evento para definir a resposta correta */
//     switchCorreta.forEach((switch_, index) => {
//         switch_.addEventListener('change', () => {
//             if (switch_.checked) {
//                 respostaCorreta = `opcao_${String.fromCharCode(97 + index)}`;  // Define como 'opcao_a', 'opcao_b', etc.
//                 switchCorreta.forEach((otherSwitch, otherIndex) => {
//                     if (otherIndex !== index) {
//                         otherSwitch.checked = false;
//                     }
//                 });
//             }
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', () => {

    /* Variáveis da tela de Login */
    const container = document.querySelector('.container');
    const loginForm = document.querySelector('#form');
    const loginEmail = document.querySelector('#inputEmail');
    const loginPass = document.querySelector('#inputPass');
    const loginPassIcon = document.querySelector('.showPass');
    const loginButton = document.querySelector('#loginButton');
    const loginCheck = document.querySelector('#inputCheck');
    const lembrarSenha = document.querySelector('#forgotPass');
    const loginFirst = document.querySelector('#firstHref');

    /* Variáveis da tela de Cadastro */
    const section3 = document.querySelector('.registration');
    const formRegist = document.querySelector('#form-Regist');
    const userName = document.querySelector('#name');
    const passName = document.querySelector('#senha');
    const passIcon = document.querySelector('.mostarSenha');
    const passConfirIcon = document.querySelector('.confirSenha');
    const passNameConfirmation = document.querySelector("#confirmaçaoSenha");
    const registEmail = document.querySelector('#Email');
    const registButton = document.querySelector('#cadastro');
    const divMessage = document.querySelector('#Error');

    /* Variáveis para recuperar senha */
    const section2 = document.querySelector('.section-recover');
    const recoverInput = document.querySelector('#recoverPassword');
    const recoverButton = document.querySelector('#recoverEmail');
    const recoverHref = document.querySelector('#hrefRemenber');

    /* Variáveis para a seção de criação de questões */
    const sectionCreateQuestion = document.querySelector('.create-question');
    const editBtn = document.querySelector('.edit img');

    /* Função para alternar a visibilidade da senha */
    function togglePassword(input, icon) {
        if (input.type === "password") {
            input.type = "text";
            icon.querySelector('i').classList.add('fa-eye-slash');
        } else {
            input.type = "password";
            icon.querySelector('i').classList.remove('fa-eye-slash');
        }
    }

    /* Registro de evento para o ícone de mostrar senha */
    loginPassIcon.addEventListener('click', () => {
        togglePassword(loginPass, loginPassIcon);
    });
    passIcon.addEventListener('click', () => {
        togglePassword(passName, passIcon);
    });
    passConfirIcon.addEventListener('click', () => {
        togglePassword(passNameConfirmation, passConfirIcon);
    });

    /* Função para validar os campos de cadastro */
    function checkInputs() {
        const userNameValue = userName.value.trim();
        const passNameValue = passName.value.trim();
        const passNameConfirmationValue = passNameConfirmation.value.trim();
        const registEmailValue = registEmail.value.trim();

        let error = false;
        divMessage.innerHTML = ''; 

        if (userNameValue === "" || passNameValue === "" || passNameConfirmationValue === "" || registEmailValue === "") {
            const message = document.createElement('p');
            message.textContent = 'Campos obrigatórios';
            divMessage.appendChild(message);
            formRegist.classList.add('error');
            error = true;
            return false;
        }

        if (userNameValue.length < 10) {
            const message = document.createElement('p');
            message.textContent = 'O nome tem que ter no mínimo 10 caracteres.';
            divMessage.appendChild(message);
            formRegist.classList.add('error');
            error = true;
            return false;
        }

        if (passNameValue.length < 8) {
            const message = document.createElement('p');
            message.textContent = 'A senha tem que ter no mínimo 8 caracteres.';
            divMessage.appendChild(message);
            formRegist.classList.add('error');
            error = true;
            return false;
        }

        if (passNameConfirmationValue !== passNameValue) {
            const message = document.createElement('p');
            message.textContent = 'As senhas não conferem.';
            divMessage.appendChild(message);
            formRegist.classList.add('error');
            error = true;
            return false;
        }

        return !error;
    }

    /* Evento para o botão de cadastro */
    registButton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (checkInputs()) {
            try {
                const response = await fetch('http://localhost:3000/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: userName.value.trim(),
                        email: registEmail.value.trim(),
                        senha: passName.value.trim()
                    })
                });

                if (response.ok) {
                    alert('Conta criada com sucesso!');
                    section3.style.display = 'none';
                    container.style.display = 'flex';
                } else {
                    const error = await response.json();
                    alert(`Erro ao registrar: ${error.message}`);
                }
            } catch (err) {
                alert(`Erro ao registrar: ${err.message}`);
            }
        }
    });

    /* Evento para o botão de login */
    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();
    
        const loginEmailValue = loginEmail.value.trim();
        const loginPassValue = loginPass.value.trim();
    
        if (!loginEmailValue || !loginPassValue) {
            alert('Preencha os campos obrigatórios!');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginEmailValue,
                    senha: loginPassValue
                })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                localStorage.setItem('token', data.token);  // Armazena o token no localStorage
                alert('Login efetuado com sucesso!');
    
                // Após o login bem-sucedido, ocultar o container de login e exibir a seção de criação de questões
                container.style.display = 'none';
                sectionCreateQuestion.style.display = 'block';
            } else {
                alert(`Erro ao fazer login: ${data.error}`);
            }
        } catch (err) {
            alert(`Erro ao fazer login: ${err.message}`);
        }
    });
    
    /* Função para reenvio de recuperação de senha */
    recoverButton.addEventListener('click', async () => {
        const email = recoverInput.value.trim();

        if (!email) {
            alert('Por favor, insira seu e-mail');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/recover-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                alert('E-mail de recuperação enviado com sucesso!');
            } else {
                alert(`Erro ao enviar e-mail: ${data.error}`);
            }
        } catch (err) {
            alert(`Erro ao enviar e-mail: ${err.message}`);
        }
    });

    /* Funções para a seção de criação de questões */
    const textAreaPergunta = document.getElementById('textQuest');
    const inputsRespostas = document.querySelectorAll('.input-question input');
    const switchCorreta = document.querySelectorAll('.switch input');
    const explicationText = document.querySelector('.explication-text');
    const questionSaveBtn = document.querySelector('.saveBtn button');
    const divError = document.getElementById('msgError');

    let respostaCorreta = null;

    /* Função para preparar os dados da questão */
    function prepararQuestao() {
        // Defina a função como fizemos anteriormente
        const pergunta = textAreaPergunta.value.trim();
        const respostas = Array.from(inputsRespostas).map(input => input.value.trim());
        const explicacao = explicationText.value.trim();
    
        let respostaCorreta = null;
    
        switchCorreta.forEach((checkbox, index) => {
            if (checkbox.checked) {
                respostaCorreta = index;
            }
        });
    
        if (respostaCorreta === null) {
            exibirErro('Selecione a resposta correta.');
            return null;
        }
    
        return {
            pergunta,
            opcao_a: respostas[0],
            opcao_b: respostas[1],
            opcao_c: respostas[2],
            opcao_d: respostas[3],
            opcao_e: respostas[4],
            resposta_correta: respostaCorreta,
            explicacao,
        };
    }
                
    /* Função para validar os dados da questão */
    function validarQuestao(questao) {
        const { pergunta, opcao_a, opcao_b, opcao_c, opcao_d, opcao_e, resposta_correta } = questao;
    
        if (!pergunta || !opcao_a || !opcao_b || !opcao_c || !opcao_d || !opcao_e) {
            exibirErro('Preencha todos os campos de resposta.');
            return false;
        }
    
        if (resposta_correta === null || resposta_correta === undefined) {
            exibirErro('Selecione a resposta correta.');
            return false;
        }
    
        return true;
    }
    
    /* Função para exibir mensagens de erro */
    function exibirErro(mensagem) {
        divError.textContent = mensagem;
        divError.style.display = 'block';
        setTimeout(() => {
            divError.style.display = 'none';
        }, 3000);
    }

    /* Função para enviar a questão ao backend */
    async function enviarQuestao(questao, idModulo) {
        try {
            const token = localStorage.getItem('token');
            console.log(token); 
            console.log('moduleId:', moduleId);
            console.log('questao:', questao);

    
            const response = await fetch(`http://localhost:3000/questoes/${idModulo}/questoes`, { 
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(questao)
            });
    
            if (response.ok) {
                alert('Questão salva com sucesso!');
            } else {
                const data = await response.json();
                exibirErro(`Erro ao salvar questão: ${data.error}`);
            }
        } catch (err) {
            exibirErro(`Erro ao salvar questão: ${err.message}`);
        }
    }
            
    /* Evento para o botão de salvar questão */
    questionSaveBtn.addEventListener('click', (e) => {
        e.preventDefault();
    
        const questao = prepararQuestao();
        
        if (!questao) {
            return;
        }
    
        const moduleId = document.querySelector('#moduleSelect').value;
        if (!moduleId) {
            alert('Escolha um módulo antes de salvar a questão.');
            return;
        }
    
        if (validarQuestao(questao)) {
            enviarQuestao(questao, moduleId);
        }
    });
            
});

export function prepararQuestao() {
    // Defina a função como fizemos anteriormente
    const pergunta = textAreaPergunta.value.trim();
    const respostas = Array.from(inputsRespostas).map(input => input.value.trim());
    const explicacao = explicationText.value.trim();

    let respostaCorreta = null;

    switchCorreta.forEach((checkbox, index) => {
        if (checkbox.checked) {
            respostaCorreta = index;
        }
    });

    if (respostaCorreta === null) {
        exibirErro('Selecione a resposta correta.');
        return null;
    }

    return {
        pergunta,
        opcao_a: respostas[0],
        opcao_b: respostas[1],
        opcao_c: respostas[2],
        opcao_d: respostas[3],
        opcao_e: respostas[4],
        resposta_correta: respostaCorreta,
        explicacao,
    };
}
