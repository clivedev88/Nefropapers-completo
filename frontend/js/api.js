import { registerUser, loginUser, recoverPassword, salvarQuestao, loadModules, carregarSimulados, criarSimulado, adicionarQuestoes } from './api.js';
import jwt_decode from 'jwt-decode';

document.addEventListener('DOMContentLoaded', () => {
    /* Variáveis da tela de Login */
    const container = document.querySelector('.container');
    const loginEmail = document.querySelector('#inputEmail');
    const loginPass = document.querySelector('#inputPass');
    const loginButton = document.querySelector('#loginButton');
    
    /* Variáveis da tela de Cadastro */
    const section3 = document.querySelector('.registration');
    const userName = document.querySelector('#name');
    const passName = document.querySelector('#senha');
    const passNameConfirmation = document.querySelector("#confirmaçaoSenha");
    const registEmail = document.querySelector('#Email');
    const registButton = document.querySelector('#cadastro');
    const divMessage = document.querySelector('#Error');

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

    // Alternância de visibilidade de senha no login
    const loginPassIcon = document.querySelector('.showPass');
    if (loginPassIcon) {
        loginPassIcon.addEventListener('click', () => togglePassword(loginPass, loginPassIcon));
    }

    /* Validação de campos de cadastro */
    function checkInputs() {
        const userNameValue = userName.value.trim();
        const passNameValue = passName.value.trim();
        const passNameConfirmationValue = passNameConfirmation.value.trim();
        const registEmailValue = registEmail.value.trim();

        divMessage.innerHTML = '';

        if (!userNameValue || !passNameValue || !passNameConfirmationValue || !registEmailValue) {
            divMessage.textContent = 'Preencha todos os campos obrigatórios';
            return false;
        }

        if (userNameValue.length < 10) {
            divMessage.textContent = 'O nome deve ter no mínimo 10 caracteres.';
            return false;
        }

        if (passNameValue.length < 8) {
            divMessage.textContent = 'A senha deve ter no mínimo 8 caracteres.';
            return false;
        }

        if (passNameConfirmationValue !== passNameValue) {
            divMessage.textContent = 'As senhas não conferem.';
            return false;
        }

        return true;
    }

    /* Cadastro de usuário */
    if (registButton) {
        registButton.addEventListener('click', async (event) => {
            event.preventDefault();
            if (checkInputs()) {
                try {
                    await registerUser(userName.value.trim(), registEmail.value.trim(), passName.value.trim());
                    alert('Conta criada com sucesso! Verifique seu e-mail.');
                    section3.style.display = 'none';
                    container.style.display = 'flex';
                } catch (err) {
                    alert(`Erro no cadastro: ${err.message}`);
                }
            }
        });
    }

    /* Login de usuário */
    if (loginButton) {
        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();
    
            // Captura os valores diretamente
            const email = loginEmail.value.trim();
            const senha = loginPass.value.trim();
            
            // Validação dos campos
            if (!email || !senha) {
                alert('Preencha todos os campos.');
                return;
            }
    
            try {
                const data = await loginUser(email, senha);
                
                // Se o token for recebido, salva no localStorage
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'simulado.html';  // Redireciona para página protegida
                } else {
                    throw new Error('Token não recebido.');
                }
            } catch (err) {
                console.error('Erro no login:', err);
                alert('Erro no login. Verifique suas credenciais.');
            }
        });
    }

    /* Alternância entre telas (login e cadastro) */
    const firstAccessLink = document.getElementById('firstHref');
    if (firstAccessLink) {
        firstAccessLink.addEventListener('click', (e) => {
            e.preventDefault();
            const loginContainer = document.querySelector('.container');
            const registrationContainer = document.querySelector('.registration');

            if (loginContainer && registrationContainer) {
                loginContainer.style.display = 'none'; // Esconde o login
                registrationContainer.style.display = 'block'; // Exibe o formulário de cadastro
            } else {
                console.error('Elementos de login ou registro não encontrados!');
            }
        });
    }

    /* Alternância de volta para o login */
    const hrefLogar = document.getElementById('hrefLogar');
    if (hrefLogar) {
        hrefLogar.addEventListener('click', (e) => {
            e.preventDefault();
            const loginContainer = document.querySelector('.container');
            const registrationContainer = document.querySelector('.registration');

            if (loginContainer && registrationContainer) {
                registrationContainer.style.display = 'none'; // Esconde o formulário de cadastro
                loginContainer.style.display = 'block'; // Exibe o formulário de login
            } else {
                console.error('Elementos de login ou registro não encontrados!');
            }
        });
    }

    /* Carregar módulos */
    async function carregarModulos() {
        try {
            const modules = await loadModules();
            const moduleSelect = document.querySelector('#moduleSelect');
            if (moduleSelect) {
                modules.forEach(module => {
                    const option = document.createElement('option');
                    option.value = module.id;
                    option.textContent = module.nome;
                    moduleSelect.appendChild(option);
                });
            }
        } catch (err) {
            console.error('Erro ao carregar módulos:', err);
        }
    }

    carregarModulos();
});
