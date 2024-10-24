import { registerUser, loginUser, recoverPassword, salvarQuestao, loadModules, carregarSimulados, criarSimulado, adicionarQuestoes } from './api.js';
import jwt_decode from 'jwt-decode';

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

    /* Variáveis da tela de recuperação de senha */
    const sectionRecover = document.querySelector('.section-recover');
    const recoverInput = document.querySelector('#recoverPassword');
    const recoverButton = document.querySelector('#recoverEmail');
    const recoverHref = document.querySelector('#hrefRemenber');

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

    // Adiciona evento para alternar visibilidade da senha
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
            divMessage.textContent = 'Campos obrigatórios';
            return false;
        }

        if (userNameValue.length < 10) {
            divMessage.textContent = 'O nome tem que ter no mínimo 10 caracteres.';
            return false;
        }

        if (passNameValue.length < 8) {
            divMessage.textContent = 'A senha tem que ter no mínimo 8 caracteres.';
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
                    alert('Conta criada com sucesso! Verifique seu e-mail para confirmação.');
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
    
            const loginEmailValue = loginEmail.value.trim();
            const loginPassValue = loginPass.value.trim();
            
            if (!loginEmailValue || !loginPassValue) {
                alert('Preencha todos os campos.');
                return;
            }
    
            try {
                const data = await loginUser(loginEmailValue, loginPassValue);
                
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

    /* Salvar Simulado */
    const salvarSimuladoBtn = document.querySelector('#salvarSimulado');
    if (salvarSimuladoBtn) {
        salvarSimuladoBtn.addEventListener('click', async () => {
            const titulo = document.querySelector('#titulo').value;
            const descricao = document.querySelector('#descricao').value;
            const modulosSelecionados = [...document.querySelectorAll('#module-select option:checked')].map(opt => opt.value);
            const quantidadeQuestoes = document.querySelector('#quantidade-questoes').value;

            if (!titulo || !descricao || modulosSelecionados.length === 0 || !quantidadeQuestoes) {
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

                await criarSimulado(titulo, descricao, modulosSelecionados, quantidadeQuestoes);
                alert('Simulado criado com sucesso!');
            } catch (err) {
                console.error('Erro ao criar simulado:', err);
                alert('Erro ao criar simulado.');
            }
        });
    }

    /* Alternância entre telas (login, cadastro e recuperação) */
    const firstAccessLink = document.getElementById('firstHref');
    const hrefLogar = document.getElementById('hrefLogar');
    const loginContainer = document.querySelector('.container');
    const registrationContainer = document.querySelector('.registration');

    if (firstAccessLink) {
        firstAccessLink.addEventListener('click', (e) => {
            e.preventDefault();
            toggleVisibility(loginContainer, registrationContainer);
        });
    }

    if (hrefLogar) {
        hrefLogar.addEventListener('click', (e) => {
            e.preventDefault();
            toggleVisibility(registrationContainer, loginContainer);
        });
    }

    lembrarSenha.addEventListener('click', (e) => {
        e.preventDefault();
        toggleVisibility(loginContainer, sectionRecover);
    });

    recoverHref.addEventListener('click', (e) => {
        e.preventDefault();
        toggleVisibility(sectionRecover, loginContainer);
    });

    /* Função utilitária para alternar visibilidade */
    function toggleVisibility(hideSection, showSection) {
        if (hideSection && showSection) {
            hideSection.style.display = 'none';
            showSection.style.display = 'flex';
        }
    }

    /* Verifica a tela inicial */
    function exibirTelaInicial() {
        const mainContainer = document.getElementById('main_container');
        const inputScreen = document.getElementById('inputScreen');

        if (mainContainer && inputScreen) {
            setTimeout(() => {
                mainContainer.style.display = 'flex';
                mainContainer.style.opacity = 0;

                inputScreen.style.transition = 'opacity 0.5s ease-out';
                inputScreen.style.opacity = 0;

                setTimeout(() => {
                    inputScreen.style.display = 'none';
                    mainContainer.style.transition = 'opacity 0.5s ease-out';
                    mainContainer.style.opacity = 1;
                }, 500);
            }, 500);
        }
    }

    /* Executa a função ao carregar */
    exibirTelaInicial();
});
