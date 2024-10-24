const answerButtons = document.querySelectorAll('.option-button');

answerButtons.forEach(button => {
    button.addEventListener('click', () => {
        answerButtons.forEach(btn => btn.parentElement.classList.remove('selected'));

        button.parentElement.classList.add('selected');
    });
});

const imageButton = document.querySelector('.image-button');
const warningIcon = document.querySelector('.warning-icon');
const questionButton = document.querySelector('.question-button'); 
const popupImage = document.getElementById('popup-image');
const popupForm = document.getElementById('popup-form');
const popupGabarito = document.getElementById('popup-gabarito'); 

// Função para mostrar o pop-up de imagem
imageButton.addEventListener('click', () => {
    popupImage.style.display = 'flex'; 
});

// Função para mostrar o pop-up de reportar
warningIcon.addEventListener('click', () => {
    popupForm.style.display = 'flex'; 
});

// Função para mostrar o pop-up de gabarito 
questionButton.addEventListener('click', () => {
    popupGabarito.style.display = 'flex'; 
});

popupImage.addEventListener('click', (e) => {
    if (e.target === popupImage) {
        popupImage.style.display = 'none'; 
    }
});

popupForm.addEventListener('click', (e) => {
    if (e.target === popupForm) {
        popupForm.style.display = 'none'; 
    }
});

popupGabarito.addEventListener('click', (e) => {
    if (e.target === popupGabarito) {
        popupGabarito.style.display = 'none'; 
    }
});

// Responder a questão
const submitButton = document.querySelector('.submit-button');
let selectedAnswer = null;
const correctAnswer = 'B';

// Desativa o botão de questão inicialmente
questionButton.disabled = true;
questionButton.style.backgroundColor = '#F5F5F5'; 
questionButton.style.color = '#858585';

// Função para selecionar resposta
answerButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Permite selecionar apenas se o botão "Responder" ainda não foi pressionado
        if (!submitButton.disabled) {
            // Remove a classe 'selected' de todos os botões e aplica à opção selecionada
            answerButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedAnswer = button.textContent.trim(); // captura a letra da resposta selecionada

            // Ativa o botão "Responder"
            submitButton.style.backgroundColor = '#FF9600'; 
            submitButton.style.color = '#ffffff';
            submitButton.disabled = false;
        }
    });
});

// Função para validar a resposta
submitButton.addEventListener('click', () => {
    if (!selectedAnswer) return; // não faz nada se nenhuma resposta foi selecionada
    
    // Desativa o botão "Responder" e muda a cor para cinza
    submitButton.style.backgroundColor = '#F5F5F5'; 
    submitButton.style.color = '#858585';
    submitButton.disabled = true;
    
    // Valida a resposta e altera as cores
    answerButtons.forEach(button => {
        const answer = button.textContent.trim();
        if (answer === correctAnswer) {
            button.style.backgroundColor = '#00C851';
            button.style.color = '#ffffff';
            button.style.border = '#00C851';
        } else if (answer === selectedAnswer) {
            button.style.backgroundColor = '#FF4444'; 
            button.style.color = '#ffffff';
            button.style.border = '#FF4444';
        }
        // Desabilita todos os botões de resposta após a submissão
        button.disabled = true;
        button.style.cursor = 'not-allowed'; // Alterar o cursor para indicar que está desabilitado
    });
    
    // Ativa o botão "?" e altera a cor
    questionButton.style.backgroundColor = '#FF9600'; 
    questionButton.style.color = '#ffffff';
    questionButton.disabled = false;
});


// RENDERIZAÇÃO DAS QUESTÕES

document.addEventListener('DOMContentLoaded', async () => {
    const idSimulado = localStorage.getItem('idSimulado'); 
    const questoes = await carregarQuestoes(idSimulado);

    questoes.forEach(questao => {
        const questaoDiv = document.createElement('div');
        questaoDiv.innerHTML = `
            <div class="question">
                <h3>${questao.pergunta}</h3>
                <ul class="answers">
                    <li>
                        <button class="option-button">A</button>
                        <p>${questao.opcao_a}</p>
                    </li>
                    <li>
                        <button class="option-button">B</button>
                        <p>${questao.opcao_b}</p>
                    </li>
                    <li>
                        <button class="option-button">C</button>
                        <p>${questao.opcao_c}</p>
                    </li>
                    <li>
                        <button class="option-button">D</button>
                        <p>${questao.opcao_d}</p>
                    </li>
                    <li>
                        <button class="option-button">D</button>
                        <p>${questao.opcao_e}</p>
                    </li>
                </ul>
            </div>`;
        document.querySelector('.questions-container').appendChild(questaoDiv);
    });
});
