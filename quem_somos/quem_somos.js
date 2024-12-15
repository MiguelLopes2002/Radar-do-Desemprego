document.addEventListener('DOMContentLoaded', () => {
    const listaAtivos = document.getElementById('lista-ativos');
    const navegacaoTopo = document.getElementById('navegacao-topo');
    const navegacaoRodape = document.getElementById('navegacao-rodape');
    const tituloMembros = document.getElementById('titulo-membros-ativos');
    const seta = tituloMembros.querySelector('.seta');
    let membros = [];
    const membrosPorPagina = 5;
    let currentPage = 0;
    let membrosVisiveis = false;

    fetch('./quem_somos/integrantes.json') // Corrige o caminho
    .then(response => response.json())
    .then(data => {
        membros = data;
        atualizarLista();
    })
    .catch(error => console.error('Erro ao carregar os integrantes:', error));


    function atualizarLista() {
        const inicio = currentPage * membrosPorPagina;
        const fim = inicio + membrosPorPagina;
        const membrosPagina = membros.slice(inicio, fim);

        listaAtivos.innerHTML = '';
        membrosPagina.forEach(membro => {
            listaAtivos.appendChild(criarMembroDiv(membro));
        });

        atualizarNavegacao(navegacaoTopo);
        atualizarNavegacao(navegacaoRodape);
    }

    function criarMembroDiv(membro) {
        const div = document.createElement('div');
        div.classList.add('info-container');
        div.innerHTML = `
            <div class="foto-container">
                <img src="${membro.foto}" alt="${membro.nome}" class="foto-membro"/>
            </div>
            <div class="detalhes-container">
                <h2>${membro.nome}</h2>
                <p><strong>Lattes:</strong> <a href="${membro.lattes}" target="_blank">${membro.lattes}</a></p>
                <p><strong>ORCID:</strong> <a href="${membro.orcid}" target="_blank">${membro.orcid}</a></p>
                <p><strong>Filiação:</strong> ${membro.ies}</p>
                <p><strong>Data de Ingresso:</strong> ${membro.data_ingresso}</p>
                <p><strong>Status:</strong> ${membro.status}</p>
            </div>
        `;
        return div;
    }

    function atualizarNavegacao(container) {
        container.innerHTML = '';
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Voltar';
        prevButton.classList.add('btn-prev');
        prevButton.disabled = currentPage === 0;
        prevButton.onclick = () => {
            currentPage--;
            atualizarLista();
        };

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Próximo';
        nextButton.classList.add('btn-next');
        nextButton.disabled = (currentPage + 1) * membrosPorPagina >= membros.length;
        nextButton.onclick = () => {
            currentPage++;
            atualizarLista();
        };

        container.appendChild(prevButton);
        container.appendChild(nextButton);
        container.style.display = membrosVisiveis ? 'flex' : 'none';
    }

    function mostrarMembros() {
        membrosVisiveis = !membrosVisiveis;
        listaAtivos.classList.toggle('visible', membrosVisiveis);
        seta.classList.toggle('mostrar', membrosVisiveis);
        navegacaoTopo.style.display = membrosVisiveis ? 'flex' : 'none';
        navegacaoRodape.style.display = membrosVisiveis ? 'flex' : 'none';
        if (membrosVisiveis) atualizarLista();
    }

    tituloMembros.addEventListener('click', mostrarMembros);
});
