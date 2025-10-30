const Router = (function(){
  const root = document.getElementById('app');

  async function render(){
    const path = location.hash.replace('#','') || '/';
    let page = 'home';
    if(path.startsWith('/projetos')) page = 'projetos';
    if(path.startsWith('/cadastro')) page = 'cadastro';
    const html = await Templates.load(page);
    root.innerHTML = html;
    // inicializações específicas
    if(page === 'cadastro') FormModule.init();
  }

  function init(){
    window.addEventListener('hashchange', render);
    render();
  }

  return { init, render };
})();
