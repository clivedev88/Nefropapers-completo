async function carregarQuestoes(idSimulado) {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        window.location.href = '/frontend 1/index.html';  
    }

    try {
        const response = await fetch(`http://localhost:3000/questoes/${idSimulado}`, {
            headers: {
                'x-api-key': apiKey, 
                'Content-Type': 'application/json'
            }
        });
        const questoes = await response.json();
        return questoes;
    } catch (error) {
        console.error('Erro ao carregar questões:', error);
        alert('Erro ao carregar questões.');
    }
}
