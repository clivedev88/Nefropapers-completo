import { registerUser, loginUser, recoverPassword, salvarQuestao, loadModules } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const loginEmail = document.querySelector('#inputEmail');
    const loginPass = document.querySelector('#inputPass');
    const loginPassIcon = document.querySelector('.showPass');
    const loginButton = document.querySelector('#loginButton');
    const lembrarSenha = document.querySelector('#forgotPass');

    const section3 = document.querySelector('.registration');
    const userName = document.querySelector('#name');
    const passName = document.querySelector('#senha');
    const passNameConfirmation = document.querySelector("#confirmaçaoSenha");
    const registEmail = document.querySelector('#Email');
    const registButton = document.querySelector('#cadastro');
    const divMessage = document.querySelector('#Error');

    const btnGabarito = document.querySelector('.gab-btn1');
    const editQuestion = document.querySelector(".edit-questao");
    const filterQuestion = document.querySelector('.filter-question');
    const divQuestions = document.querySelector('.questions');
    const subSection = document.querySelector(".subSection");
    const questionContainer = document.querySelector(".questionContainer");

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
    
        const editQuestion = document.querySelector(".edit-questao");
        const divQuestions = document.querySelector('.questions');
        const filterQuestion = document.querySelector('.filter-question');
        const questionContainer = document.querySelector(".questionContainer");
        const subSection = document.querySelector(".subSection");
    
        if (editQuestion && divQuestions && filterQuestion && questionContainer && subSection) {
            editQuestion.style.display = 'none';
            divQuestions.style.display = 'none';
            filterQuestion.style.display = 'none';
            questionContainer.style.display = 'none';
            subSection.style.display = 'flex';
        } else {
            console.error('Elementos não encontrados!');
        }
    });
        

loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const loginEmail = document.querySelector('#inputEmail').value.trim();
    const loginPass = document.querySelector('#inputPass').value.trim();
    
    if (!loginEmail || !loginPass) {
        alert('Preencha todos os campos.');
        return;
    }

    try {
        const data = await loginUser(loginEmail, loginPass);
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'simulado.html';
        } else {
            throw new Error('Token não recebido.');
        }
        
    } catch (err) {
        console.error('Erro no login:', err);
        alert('Erro no login. Verifique suas credenciais.');
    }
});
        
    lembrarSenha.addEventListener('click', async () => {
        const recoverInput = document.querySelector('#recoverPassword').value.trim();
        try {
            await recoverPassword(recoverInput);
            alert('E-mail de recuperação enviado com sucesso!');
        } catch (err) {
            alert(err.message);
        }
    });

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
                respostaCorreta = opcoesEnum[index];
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
            await salvarQuestao(token, moduleId, questao);
            alert('Questão salva com sucesso!');
        } catch (err) {
            exibirErro(err.message);
        }
    }
    
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

    carregarModulos();
});

import { carregarSimulados } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você não está autenticado. Faça login novamente.');
            window.location.href = 'index1.html';
            return;
        }

        const simulados = await carregarSimulados();
        renderSimulados(simulados);
    } catch (err) {
        console.error('Erro ao carregar simulados:', err);
        alert('Erro ao carregar simulados.');
    }
});

function renderSimulados(simulados) {
    const simuladoList = document.querySelector('.simulado-list');
    simuladoList.innerHTML = '';

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

import { criarSimulado } from './api.js';

document.querySelector('#salvarSimulado').addEventListener('click', async () => {
    const titulo = document.querySelector('#titulo').value;
    const descricao = document.querySelector('#descricao').value;

    if (!titulo || !descricao) {
        alert('Preencha todos os campos.');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você não está autenticado. Faça login novamente.');
            window.location.href = 'index1.html';
            return;
        }

        await criarSimulado(titulo, descricao);
        alert('Simulado criado com sucesso!');
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
        await adicionarQuestoes(simuladoId, questoesSelecionadas);
        alert('Questões adicionadas ao simulado com sucesso!');
    } catch (err) {
        console.error('Erro ao adicionar questões:', err);
        alert('Erro ao adicionar questões.');
    }
});
