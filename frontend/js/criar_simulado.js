// Seleciona os elementos necessários
const modal = document.getElementById('modal');
const addQuestionBtn = document.getElementById('add-question-btn');
const closeModal = document.querySelector('.close');
const saveQuestionsBtn = document.getElementById('save-questions-btn');
const questionList = document.getElementById('questao-list');

let questoesSelecionadas = [];
let questaoCount = 0;
const maxQuestoes = 10;  // Máximo de questões permitidas

// Questões de exemplo (podem ser dinâmicas)
const questoesExemplo = [
    "Esta é a questão 1 que será exibida apenas uma linha...",
    "Aqui temos a questão 2 com um texto um pouco maior...",
    "Questão 3 de exemplo com descrição limitada na caixa...",
    "Questão 4 com mais detalhes que serão truncados...",
    "A última questão será exibida parcialmente até a rolagem..."
];

// Função para abrir o modal de seleção de questões
addQuestionBtn.addEventListener('click', () => {
    if (questaoCount < maxQuestoes) {
        modal.style.display = 'flex';
    }
});

// Função para fechar o modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Função para salvar as questões selecionadas
saveQuestionsBtn.addEventListener('click', () => {
    const selectedQuestions = document.querySelectorAll('#question-options input:checked');

    selectedQuestions.forEach((question, index) => {
        if (questaoCount < maxQuestoes && !questoesSelecionadas.includes(question.value)) {
            const questaoCard = document.createElement('div');
            questaoCard.classList.add('questao-card');
            questaoCard.innerHTML = `<p>${questoesExemplo[index % questoesExemplo.length]}</p>`;
            questionList.appendChild(questaoCard);
            questoesSelecionadas.push(question.value);
            questaoCount++;
        }
    });

    // Fechar o modal após salvar
    modal.style.display = 'none';

    // Se atingir o limite de 10 questões, ocultar o botão de adicionar
    if (questaoCount >= maxQuestoes) {
        addQuestionBtn.style.display = 'none';
    }
});

// Ao carregar a página, adicionar lógica de exibição truncada
document.addEventListener('DOMContentLoaded', () => {
    if (questaoCount < maxQuestoes) {
        addQuestionBtn.classList.remove('hidden');
    }
});
