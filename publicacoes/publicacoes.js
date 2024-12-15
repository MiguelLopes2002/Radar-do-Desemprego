function toggleDropdown() {
    var dropdown = document.getElementById("dropdownContent");
    dropdown.classList.toggle("hidden");
}

function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    var arrow = section.previousElementSibling.querySelector('.arrow');

    // Alterna a visibilidade da seção
    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        arrow.style.transform = 'rotate(90deg)';  // Roda a seta para baixo
    } else {
        section.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';   // Roda a seta para o lado
    }
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const arrow = section.previousElementSibling.querySelector('.arrow');

    if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        arrow.style.transform = 'rotate(90deg)';
    } else {
        section.classList.add('hidden');
        arrow.style.transform = 'rotate(0deg)';
    }
}
/* Botão pra mudar a lista de publicações */
function paginatePublications(sectionId, itemsPerPage = 3) {
    const section = document.getElementById(sectionId);
    const items = section.querySelectorAll('.publication-item');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 0;

    function updateDisplay() {
        items.forEach((item, index) => {
            item.style.display = (index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage) ? 'block' : 'none';
        });

        nextButton.style.display = (currentPage < totalPages - 1) ? 'inline-block' : 'none';
        prevButton.style.display = (currentPage > 0) ? 'inline-block' : 'none';
    }

    const navButtons = document.createElement('div');
    navButtons.id = 'nav-buttons';

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Próximo';
    nextButton.classList.add('btn-next');
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateDisplay();
        }
    });

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Voltar';
    prevButton.classList.add('btn-prev');
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateDisplay();
        }
    });

    navButtons.appendChild(prevButton);
    navButtons.appendChild(nextButton);
    section.appendChild(navButtons);

    updateDisplay();
}

// Chame a função para cada categoria com o ID da seção
paginatePublications('congressPublications');
paginatePublications('journalPublications');
paginatePublications('abstractPublications');
paginatePublications('reportPublications');

async function loadPublications() {
    try {
        const response = await fetch('publicacoes/publicacoes.json');
        const data = await response.json();
        
        for (const category in data) {
            const sectionId = category + 'Publications';
            createPagination(sectionId, data[category], 3);
        }
    } catch (error) {
        console.error('Erro ao carregar as publicações:', error);
    }
}

function createPagination(sectionId, items, itemsPerPage = 5) {
    const section = document.getElementById(sectionId);
    let currentPage = 0;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    function renderPage() {
        section.innerHTML = '';
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = items.slice(start, end);

        pageItems.forEach(item => {
            const publicationItem = document.createElement('div');
            publicationItem.classList.add('publication-item');
            publicationItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p>${item.date}</p>
                <a href="${item.file}" download>Download PDF</a>
            `;
            section.appendChild(publicationItem);
        });

        section.appendChild(createNavButtons());
    }

    function createNavButtons() {
        const navDiv = document.createElement('div');
        navDiv.classList.add('nav-buttons');

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Voltar';
        prevButton.classList.add('btn-prev');
        prevButton.disabled = currentPage === 0;
        prevButton.onclick = () => {
            currentPage--;
            renderPage();
        };

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Próximo';
        nextButton.classList.add('btn-next');
        nextButton.disabled = currentPage >= totalPages - 1;
        nextButton.onclick = () => {
            currentPage++;
            renderPage();
        };

        navDiv.appendChild(prevButton);
        navDiv.appendChild(nextButton);
        return navDiv;
    }

    renderPage();
}

loadPublications();
