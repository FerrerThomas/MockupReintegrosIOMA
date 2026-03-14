async function loadView(viewName) {
    let url = '';
    if (viewName === 'inicio') url = 'VistaInicioWeb.html';
    else if (viewName === 'iniciarReintegro') url = 'VistaIniciarReintegro.html';
    else if (viewName === 'datosPrecargador') url = 'VistaDatosPrecargador.html';

    try {
        const response = await fetch(url);
        const htmlText = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        const mainContent = doc.querySelector('main');
        
        if (mainContent) {
            const container = document.getElementById('main-content');
            container.innerHTML = mainContent.innerHTML;
            container.className = mainContent.className; // Preserve styling

            // Setup navigation and transitions
            setupInteractions(viewName);
            setActiveNav(viewName);
        }
    } catch (e) {
        console.error('Error loading view:', e);
        document.getElementById('main-content').innerHTML = `
            <div class="p-10 text-center text-red-500">
                <p>Error cargando la vista. Asegúrese de correr esto sobre un servidor web local (ej. npx serve).</p>
            </div>
        `;
    }
}

function setupInteractions(viewName) {
    if (viewName === 'iniciarReintegro') {
        const buttons = document.querySelectorAll('#main-content button');
        buttons.forEach(btn => {
            if(btn.innerText.trim().includes('Buscar')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Simulate loading and switch view
                    const originalText = btn.innerHTML;
                    btn.innerHTML = `<span class="material-symbols-outlined animate-spin">refresh</span> Buscando...`;
                    setTimeout(() => {
                        window.history.pushState({}, '', '#datosPrecargador');
                        loadView('datosPrecargador');
                    }, 800);
                });
            }
        });
    }
}

function setActiveNav(viewName) {
    const navs = document.querySelectorAll('aside nav a');
    navs.forEach(nav => {
        nav.className = 'flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors';
        const text = nav.innerText.toLowerCase();
        if (viewName === 'inicio' && text.includes('inicio')) {
            nav.className = 'flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-colors';
        } else if (viewName !== 'inicio' && text.includes('iniciar reintegro')) {
            nav.className = 'flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-colors';
        }
    });
}

// Router
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1) || 'inicio';
    loadView(hash);
});

document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1) || 'inicio';
    loadView(hash);
    
    // Fix navigation links in sidebar
    const navs = document.querySelectorAll('aside nav a');
    navs[0].addEventListener('click', (e) => { e.preventDefault(); window.history.pushState({}, '', '#inicio'); loadView('inicio'); });
    navs[1].addEventListener('click', (e) => { e.preventDefault(); window.history.pushState({}, '', '#iniciarReintegro'); loadView('iniciarReintegro'); });
});
