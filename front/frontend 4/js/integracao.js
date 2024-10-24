async function criarSimulado(titulo, descricao, questoesSelecionadas) {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
        window.location.href = 'index.html'; 
        return;
    }

    const salvarSimuladoBtn = document.querySelector('#salvarSimulado');
    salvarSimuladoBtn.disabled = true;

    try {
        const response = await fetch('http://localhost:3000/simulados', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descricao }) 
        });

        const data = await response.json();

        if (!data.error) {
            const simuladoId = data[0].id; // Assume que o ID do simulado foi retornado aqui

            // Adicionar questões aleatórias ao simulado
            for (const { modulo, quantidade } of questoesSelecionadas) {
                await adicionarQuestoesAleatorias(simuladoId, modulo, quantidade);
            }

            alert('Simulado criado com sucesso!');
            window.location.href = '/front/frontend%203/simulado.html';  
        } else {
            alert(`Erro ao criar simulado: ${data.error}`);
            console.error('Erro ao criar simulado:', data.error);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao criar simulado. Tente novamente mais tarde.');
    } finally {
        salvarSimuladoBtn.disabled = false;
    }
}

// Função para adicionar questões aleatórias ao simulado
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
