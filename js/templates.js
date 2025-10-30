const Templates = (function(){
  async function load(name){
    const url = `templates/${name}.html`;
    try{
      const r = await fetch(url);
      if(!r.ok) throw new Error('Template não encontrado');
      return await r.text();
    }catch(e){
      return `<section class="card"><h2>Erro</h2><p>Não foi possível carregar a página.</p></section>`;
    }
  }
  return { load };
})();
