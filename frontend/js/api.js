export async function registerUser(nome, email, senha) {
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Erro ao registrar: ${error.message}`);
    }

    return await response.json();
}

export async function loginUser(email, senha) {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Erro ao fazer login: ${error.error}`);
    }

    return await response.json();
}

export async function recoverPassword(email) {
    const response = await fetch('http://localhost:3000/auth/recover-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Erro ao enviar e-mail: ${error.error}`);
    }

    return await response.json();
}

export async function salvarQuestao(token, moduleId, questao) {
    const response = await fetch(`http://localhost:3000/questoes/${moduleId}/questoes`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(questao)
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(`Erro ao salvar questão: ${data.error}`);
    }

    return await response.json();
}

export async function loadModules() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token não encontrado.');
        return;
    }

    const response = await fetch('http://localhost:3000/modulos/todos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao carregar módulos');
    }

    return await response.json();
}

export async function carregarSimulados() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Usuário não autenticado. Faça o login novamente.');
        return;
    }

    const response = await fetch('http://localhost:3000/simulados', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erro ao carregar simulados');
    }

    return await response.json();
}

export async function criarSimulado(titulo, descricao) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token não encontrado.');
        return;
    }

    const response = await fetch('http://localhost:3000/simulados', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ titulo, descricao })
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(`Erro ao criar simulado: ${data.error}`);
    }

    return await response.json();
}

export async function adicionarQuestoes(simuladoId, questoes) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token não encontrado.');
        return;
    }

    const response = await fetch(`http://localhost:3000/simulados/${simuladoId}/questoes`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ questoes })
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(`Erro ao adicionar questões: ${data.error}`);
    }

    return await response.json();
}
