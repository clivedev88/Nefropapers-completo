document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        window.location.href = 'index.html'; 
    }
    
    try {
        const simulados = await carregarSimulados(apiKey);

        if (simulados.meusSimulados.length > 0 || simulados.simuladosDisponiveis.length > 0) {
            renderizarSimulados(simulados.meusSimulados, 'meus-simulados');
            
            renderizarSimulados(simulados.simuladosDisponiveis, 'simulados-disponiveis');
        } else {
            console.log('Nenhum simulado encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar simulados:', error);
    }
});

async function carregarSimulados(apiKey) {
    try {
        const response = await fetch('http://localhost:3000/simulados', {
            method: 'GET',
            headers: {
                'x-api-key': apiKey, 
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar simulados. Status: ' + response.status);
        }

        const simulados = await response.json();
        console.log('Simulados recebidos:', simulados);

        return simulados;

    } catch (error) {
        console.error('Erro ao carregar simulados:', error);
        return { meusSimulados: [], simuladosDisponiveis: [] };
    }
}
