// SPA router básico por hash: #home, #projetos, #cadastro
const routes = {
  '#home': '/pages/index.html',
  '#projetos': '/pages/projetos.html',
  '#cadastro': '/pages/cadastro.html'
};

export async function navigateTo(hash){
  const path = routes[hash] || routes['#home'];
  const main = document.querySelector('main');
  try {
    const res = await fetch(path);
    const text = await res.text();
    // Extrair só o conteúdo principal entre <main>...</main>
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const newMain = doc.querySelector('main');
    if(newMain && main){
      main.replaceWith(newMain);
      history.replaceState(null, '', hash);
      // APÓS inserir, re-executar máscaras/app.js se necessário
    }
  } catch(err){
    console.error('Erro ao carregar rota SPA', err);
  }
}

window.addEventListener('hashchange', () => navigateTo(location.hash));
