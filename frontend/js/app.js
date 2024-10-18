
import { registerUser, loginUser, recoverPassword, salvarQuestao, loadModules } from './api.js';
// import jwt_decode from './node_modules/jwt-decode/build/jwt-decode.esm.js';
// import jwt_decode from './node_modules/jwt-decode/build/jwt-decode.esm.js';


document.addEventListener('DOMContentLoaded', () => {
    /* Variáveis da tela de Login */
    const container = document.querySelector('.container');
    const loginEmail = document.querySelector('#inputEmail');
    const loginPass = document.querySelector('#inputPass');
    const loginPassIcon = document.querySelector('.showPass');
    const loginButton = document.querySelector('#loginButton');
    const lembrarSenha = document.querySelector('#forgotPass');

    /* Variáveis da tela de Cadastro */
    const section3 = document.querySelector('.registration');
    const userName = document.querySelector('#name');
    const passName = document.querySelector('#senha');
    const passNameConfirmation = document.querySelector("#confirmaçaoSenha");
    const registEmail = document.querySelector('#Email');
    const registButton = document.querySelector('#cadastro');
    const divMessage = document.querySelector('#Error');

    /* Variáveis para criação de questões */
    const btnGabarito = document.querySelector('.gab-btn1');
    const editQuestion = document.querySelector(".edit-questao");
    const filterQuestion = document.querySelector('.filter-question');
    const divQuestions = document.querySelector('.questions');
    const subSection = document.querySelector(".subSection");
    const questionContainer = document.querySelector(".questionContainer");

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

    loginPassIcon.addEventListener('click', () => togglePassword(loginPass, loginPassIcon));

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
            return false;
        }

        if (userNameValue.length < 10) {
            const message = document.createElement('p');
            message.textContent = 'O nome tem que ter no mínimo 10 caracteres.';
            divMessage.appendChild(message);
            return false;
        }

        if (passNameValue.length < 8) {
            const message = document.createElement('p');
            message.textContent = 'A senha tem que ter no mínimo 8 caracteres.';
            divMessage.appendChild(message);
            return false;
        }

        if (passNameConfirmationValue !== passNameValue) {
            const message = document.createElement('p');
            message.textContent = 'As senhas não conferem.';
            divMessage.appendChild(message);
            return false;
        }

        return true;
    }

    /* Cadastro de usuário */
    registButton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (checkInputs()) {
            try {
                await registerUser(userName.value.trim(), registEmail.value.trim(), passName.value.trim());
                alert('Conta criada com sucesso!');
                section3.style.display = 'none';
                container.style.display = 'flex';
            } catch (err) {
                alert(err.message);
            }
        }
    });

    btnGabarito.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Botão Fazer gabarito clicado.');
    
        const editQuestion = document.querySelector(".edit-questao");
        const divQuestions = document.querySelector('.questions');
        const filterQuestion = document.querySelector('.filter-question');
        const questionContainer = document.querySelector(".questionContainer");
        const subSection = document.querySelector(".subSection");
    
        if (editQuestion && divQuestions && filterQuestion && questionContainer && subSection) {
            console.log('Todos os elementos foram encontrados, alterando visibilidade...');
            editQuestion.style.display = 'none';
            divQuestions.style.display = 'none';
            filterQuestion.style.display = 'none';
            questionContainer.style.display = 'none';
            subSection.style.display = 'flex';
        } else {
            console.error('Elementos não encontrados!');
        }
    });
        

// Função de login atualizada
loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const loginEmailValue = loginEmail.value.trim();
        const loginPassValue = loginPass.value.trim();
        
        if (!loginEmailValue || !loginPassValue) {
            alert('Preencha todos os campos.');
            return;
        }

        console.log('Iniciando processo de login...');
        const data = await loginUser(loginEmailValue, loginPassValue);
        
        if (data && data.token) {
            localStorage.setItem('token', data.token);
            alert('Login efetuado com sucesso!');
            container.style.display = 'none';
            document.querySelector('.create-question').style.display = 'block';
        } else {
            throw new Error('Erro ao obter token.');
        }

    } catch (err) {
        console.error('Erro no login:', err);
        alert(err.message);
    }
});
        
    /* Recuperação de senha */
    lembrarSenha.addEventListener('click', async () => {
        const recoverInput = document.querySelector('#recoverPassword').value.trim();
        try {
            await recoverPassword(recoverInput);
            alert('E-mail de recuperação enviado com sucesso!');
        } catch (err) {
            alert(err.message);
        }
    });

    /* Funções e eventos relacionados à criação de questões */
    const textAreaPergunta = document.getElementById('textQuest');
    const inputsRespostas = document.querySelectorAll('.input-question input');
    const switchCorreta = document.querySelectorAll('.switch input');
    const explicationText = document.querySelector('.explication-text');
    const questionSaveBtn = document.querySelector('.saveBtn button');
    const divError = document.getElementById('msgError');

    function prepararQuestao() {
        const pergunta = textAreaPergunta.value.trim();
        const respostas = Array.from(inputsRespostas).map(input => input.value.trim());
        const explicacao = explicationText.value.trim();
        let respostaCorreta = null;

        switchCorreta.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const opcoesEnum = ["opcao_a", "opcao_b", "opcao_c", "opcao_d", "opcao_e"];
                respostaCorreta = opcoesEnum[index] ;
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

    function exibirErro(mensagem) {
        divError.textContent = mensagem;
        divError.style.display = 'block';
        setTimeout(() => {
            divError.style.display = 'none';
        }, 3000);
    }

    /* Salvar questão */
    questionSaveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const questao = prepararQuestao();
        if (!questao) return;

        const moduleId = document.querySelector('#moduleSelect').value;
        if (!moduleId) {
            alert('Escolha um módulo antes de salvar a questão.');
            return;
        }

        const token = localStorage.getItem('token');
        if (token) {
            enviarQuestao(questao, moduleId);
        } else {
            exibirErro('Token de autenticação não encontrado.');
        }
    });

    async function enviarQuestao(questao, moduleId) {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            console.log('Questão:', questao);
            console.log('ModuleId:', moduleId);
            
            await salvarQuestao(token, moduleId, questao);
            alert('Questão salva com sucesso!');
        } catch (err) {
            exibirErro(err.message);
        }
    }
    
    /* Carregar módulos */
    async function carregarModulos() {
        try {
            const modules = await loadModules();
            const moduleSelect = document.querySelector('#moduleSelect');

            modules.forEach(module => {
                const option = document.createElement('option');
                option.value = module.id;
                option.textContent = module.nome;
                moduleSelect.appendChild(option);
            });
        } catch (err) {
            console.error('Erro ao carregar módulos:', err);
        }
    }

    /* Chamada de carregar módulos na inicialização */
    carregarModulos();
});

import { carregarSimulados } from './api.js';

// Função para renderizar simulados na interface
function renderSimulados(simulados) {
    const simuladoList = document.querySelector('.simulado-list');
    simuladoList.innerHTML = '';  // Limpar a lista antes de renderizar

    simulados.forEach(simulado => {
        const simuladoCard = document.createElement('div');
        simuladoCard.classList.add('simulado-card');
        simuladoCard.innerHTML = `
            <h2>${simulado.titulo}</h2>
            <p>${simulado.descricao}</p>
        `;
        simuladoList.appendChild(simuladoCard);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const simulados = await carregarSimulados();  // Chama a função da API para carregar os simulados
        renderSimulados(simulados);  // Função responsável por renderizar os simulados na página
    } catch (err) {
        console.error('Erro ao carregar simulados:', err);
        alert('Erro ao carregar simulados.');
    }
});

import { criarSimulado } from './api.js';

document.querySelector('#salvarSimulado').addEventListener('click', async () => {
    const titulo = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#descricao').value;

    if (!titulo || !descricao) {
        alert('Preencha todos os campos.');
        return;
    }

    try {
        await criarSimulado(titulo, descricao);  // Chamar a função da API para criar o simulado
        alert('Simulado criado com sucesso!');
        // Redirecionar ou exibir o simulado criado
    } catch (err) {
        console.error('Erro ao criar simulado:', err);
        alert('Erro ao criar simulado.');
    }
});

import { adicionarQuestoes } from './api.js';

document.querySelector('#salvarQuestoes').addEventListener('click', async () => {
    const questoesSelecionadas = [...document.querySelectorAll('#questao-list .questao-card')].map(card => card.dataset.id);
    const simuladoId = localStorage.getItem('simuladoId');

    try {
        await adicionarQuestoes(simuladoId, questoesSelecionadas);  // Chamar a função da API para adicionar questões
        alert('Questões adicionadas ao simulado com sucesso!');
    } catch (err) {
        console.error('Erro ao adicionar questões:', err);
        alert('Erro ao adicionar questões.');
    }
});
