// CÓMO ENCENDER UNA CATEGORÍA
// 1) Publica el post de esa categoría en Instagram y copia su enlace (Compartir, Copiar enlace).
// 2) En la línea de esa categoría, borra el texto AQUÍ VA EL ENLACE y pega el enlace (sin tocar las comillas).
// 3) Guarda el archivo y vuelve a subirlo a Vercel. El círculo se enciende solo.
// Mientras el texto no empiece por https://, el círculo queda apagado con "Próximamente".
const CATEGORIAS=[
  {n:'Humor',              u:'AQUÍ VA EL ENLACE'},
  {n:'Lifestyle',          u:'AQUÍ VA EL ENLACE'},
  {n:'Moda y Belleza',     u:'AQUÍ VA EL ENLACE'},
  {n:'Vlogs',              u:'AQUÍ VA EL ENLACE'},
  {n:'Fitness',            u:'AQUÍ VA EL ENLACE'},
  {n:'Cocina',             u:'AQUÍ VA EL ENLACE'},
  {n:'Impacto Social',     u:'AQUÍ VA EL ENLACE'},
  {n:'Artistas',           u:'AQUÍ VA EL ENLACE'},
  {n:'Revelación del Año', u:'AQUÍ VA EL ENLACE'},
  {n:'Creador del Año',    u:'AQUÍ VA EL ENLACE', gran:true}
];
const cats=document.getElementById('cats');
CATEGORIAS.forEach(c=>{
  const on=/^https?:\/\//.test(c.u);
  const el=document.createElement(on?'a':'div');
  el.className='cat'+(on?' on':'')+(c.gran?' gran':'');
  if(on){el.href=c.u;el.target='_blank';el.rel='noopener noreferrer';}
  const s=document.createElement('span');s.textContent=c.n;
  const m=document.createElement('small');m.textContent=on?'Ver nominados':'Próximamente';
  el.append(s,m);cats.appendChild(el);
});

// Cuenta regresiva hasta el inicio del 5 de diciembre (hora de La Habana, -05:00).
// Cuando se confirme la hora de la gala, cámbiala aquí.
const OBJETIVO=new Date('2026-12-05T00:00:00-05:00');
const d=document.getElementById('cd-d'),h=document.getElementById('cd-h'),m=document.getElementById('cd-m');
const p=n=>String(Math.max(0,n)).padStart(2,'0');
function tick(){
  let t=OBJETIVO-new Date();
  if(t<=0){d.textContent=h.textContent=m.textContent='00';return;}
  const D=Math.floor(t/864e5);t-=D*864e5;
  const H=Math.floor(t/36e5);t-=H*36e5;
  d.textContent=p(D);h.textContent=p(H);m.textContent=p(Math.floor(t/6e4));
}
tick();setInterval(tick,1000);
