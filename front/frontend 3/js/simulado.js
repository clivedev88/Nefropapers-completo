document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        window.location.href = 'index.html'; 
    }
    
    try {
        const simulados = await carregarSimulados(apiKey); 

        if (Array.isArray(simulados.meusSimulados) || Array.isArray(simulados.simuladosDisponiveis)) {
            console.log('Meus simulados:', simulados.meusSimulados); 
            console.log('Simulados disponíveis:', simulados.simuladosDisponiveis);

            renderizarSimulados(simulados.meusSimulados, 'meus-simulados');
            
            renderizarSimulados(simulados.simuladosDisponiveis, 'simulados-disponiveis');
        } else {
            console.log('Nenhum simulado encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar simulados:', error);
    }
});

function renderizarSimulados(simulados, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Contêiner com ID ${containerId} não encontrado.`);
        return;
    }

    container.innerHTML = ''; 
    simulados.forEach(simulado => {
        const quantidadeQuestoes = simulado.quantidadeQuestoes || 0; 
        const modulos = simulado.modulos || []; 

        const simuladoDiv = document.createElement('div');
        simuladoDiv.classList.add('simulado-card');
        simuladoDiv.innerHTML = `
            <div class="simulado-info" onclick="showSimuladoInfo('${simulado.titulo}', '${simulado.descricao}', ${quantidadeQuestoes}, ${JSON.stringify(modulos)})">
                <h2>${simulado.titulo}</h2>
                <div class="dificuldade">
                    ${renderStars(simulado.dificuldade)}
                </div>
            </div>
            <div class="simulado-actions">
                <button class="like-btn" onclick="toggleLike(this)">❤</button>
            </div>
        `;
        container.appendChild(simuladoDiv);
    });
}

function toggleLike(button) {
    button.classList.toggle('liked');
}


function renderStars(dificuldade) {
    let stars = '';
    dificuldade = Math.min(Math.max(parseInt(dificuldade), 0), 5); 

    for (let i = 1; i <= 5; i++) {
        stars += i <= dificuldade ? '<span class="star filled">★</span>' : '<span class="star">★</span>';
    }
    return stars;
}

function showSimuladoInfo(title, description, questionCount = 0, modules = []) {
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-description').innerText = description;
    document.getElementById('popup-questions').innerText = 'Quantidade de questões: ' + questionCount;
    document.getElementById('popup-modules').innerText = 'Módulos: ' + modules.join(', ');
    document.getElementById('simulado-popup').style.display = 'flex';
}


document.getElementById('close-popup').addEventListener('click', function () {
    document.getElementById('simulado-popup').style.display = 'none';
});

document.querySelector('.create-simulado').addEventListener('click', function() {
    window.location.href = '/front/frontend%204/criar_simulado.html';

});

