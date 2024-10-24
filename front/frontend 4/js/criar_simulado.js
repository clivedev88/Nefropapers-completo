document.addEventListener('DOMContentLoaded', () => {
    const salvarSimuladoBtn = document.querySelector('#salvarSimulado');
    const addQuestionBtn = document.querySelector('#add-question-btn');
    const modal = document.getElementById('modal');
    let questoesSelecionadas = [];
    let questaoCount = 0;

    const closeModal = document.querySelector('.close');
    const saveQuestionsBtn = document.getElementById('save-questions-btn');
    const questionList = document.getElementById('questao-list');
    const quantidadeInput = document.getElementById('quantidade-questoes');
    const moduleSelect = document.getElementById('module-select');
    
    modal.style.display = 'none';

    carregarModulos();

async function carregarModulos() {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/modulos/todos', {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar módulos. Status: ' + response.status);
        }

        const modulos = await response.json();
        moduleSelect.innerHTML = '';  

        modulos.forEach(modulo => {
            const questaoCount = modulo.questaoCount || 0; 
            const option = document.createElement('option');
            option.value = modulo.id;
            option.text = `${modulo.nome} (${questaoCount} questões disponíveis)`;
            moduleSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Erro ao carregar módulos:', error);
        alert('Erro ao carregar módulos. Tente novamente mais tarde.');
    }
}
                
    addQuestionBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    
    const closeModalBtn = document.querySelector('.close');
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    saveQuestionsBtn.addEventListener('click', async () => {
        const quantidade = parseInt(quantidadeInput.value);
        const selectedModule = moduleSelect.value;
    
        if (isNaN(quantidade) || !selectedModule) {
            alert('Informe a quantidade de questões e selecione um módulo.');
            return;
        }
    
        try {
            // Altere a URL para a rota correta
            const response = await fetch(`http://localhost:3000/questoes/${selectedModule}/questoes`, {
                method: 'GET',  // Mudei de POST para GET, pois estamos buscando
                headers: {
                    'x-api-key': localStorage.getItem('apiKey'),
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Erro ao buscar questões. Status: ' + response.status);
            }
    
            const questoes = await response.json();
    
            questoes.forEach(questao => {
                const questaoCard = document.createElement('div');
                questaoCard.classList.add('questao-card');
                const resumo = questao.pergunta.split(' ').slice(0, 2).join(' ') + '...';
                questaoCard.innerHTML = `<p>${resumo}</p>`;
                questionList.appendChild(questaoCard);
    
                questoesSelecionadas.push({
                    id: questao.id,
                    pergunta: questao.pergunta,
                    modulo: selectedModule
                });
            });
    
            modal.style.display = 'none';
            quantidadeInput.value = '';
            moduleSelect.selectedIndex = -1;
        } catch (error) {
            console.error('Erro ao buscar questões:', error);
            alert('Erro ao carregar questões.');
        }
    });
        
    salvarSimuladoBtn.addEventListener('click', async () => {
        const titulo = document.querySelector('#titulo').value.trim();
        const descricao = document.querySelector('#descricao').value.trim();
    
        if (titulo === '' || descricao === '' || questoesSelecionadas.length === 0) {
            alert('Por favor, preencha todos os campos e selecione questões antes de salvar.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/simulados', {
                method: 'POST',
                headers: {
                    'x-api-key': localStorage.getItem('apiKey'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo, descricao })  
            });
    
            const data = await response.json();
    
            if (!data.error) {
                const simuladoId = data[0].id;  
    
                for (const questao of questoesSelecionadas) {
                    await adicionarQuestoesAleatorias(simuladoId, questao.modulo, 1);  
                }
    
                alert('Simulado criado com sucesso!');
                window.location.href = '/front/frontend%203/simulado.html';  
    
            } else {
                alert(`Erro ao criar simulado: ${data.error}`);
                console.error('Erro ao criar simulado:', data.error);
            }
        } catch (error) {
            console.error('Erro ao criar simulado:', error);
            alert('Erro ao criar simulado. Tente novamente mais tarde.');
        }
    });
        
});

async function adicionarQuestoesAleatorias(simuladoId, idModulo, quantidade) {
    const apiKey = localStorage.getItem('apiKey');

    try {
        const response = await fetch(`http://localhost:3000/simulados/${simuladoId}/questoes`, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantidade, idModulo })
        });

        const data = await response.json();
        if (data.error) {
            console.error(`Erro ao adicionar questões ao simulado: ${data.error}`);
        }
    } catch (error) {
        console.error('Erro na requisição ao adicionar questões:', error);
    }
}
