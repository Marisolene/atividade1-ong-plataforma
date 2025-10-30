const Storage = (function(){
  const KEY = 'ev_voluntarios_v1';
  function read(){ try{ return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; } }
  function save(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }
  function add(item){ const arr = read(); arr.push(item); save(arr); }
  function existsCPF(cpf){ const arr = read(); return arr.some(v => v.cpf === cpf); }
  function all(){ return read(); }
  function exportCSV(){ const arr = read(); if(!arr.length) return null;
    const keys = Object.keys(arr[0]);
    const lines = [keys.join(',')].concat(arr.map(o=> keys.map(k=> `"${String(o[k]||'').replace(/"/g,'""')}"`).join(',')));
    return lines.join('\n');
  }
  return { add, existsCPF, all, exportCSV };
})();
