
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var N=window.NST||{lang:'en',path:'/'};var BASE=(location.hostname==='localhost'||location.hostname==='127.0.0.1')?location.origin:'https://naturesoundstherapy.github.io';
/* pamiec jezyka: klik w przelacznik zapisuje; EN strona z odpowiednikiem -> przekierowanie */
try{document.addEventListener('click',function(e){var a=e.target.closest('[data-setlang]');if(a)localStorage.setItem('nst-lang',a.getAttribute('data-setlang'))});
 var sl=localStorage.getItem('nst-lang');if(sl&&sl!=='en'&&N.lang==='en'&&N.path&&N.path.charAt(0)==='/'&&!/^\/(sounds|blog\/.+\.html)/.test(location.pathname.replace(/^\/+/,'/'))&&document.documentElement.getAttribute('data-nstlang')==='en'&&N.path!=='none'){location.replace(BASE+'/'+sl+N.path+location.hash)}}catch(e){}
/* motyw */
try{var th=localStorage.getItem('nst-theme');if(th)document.documentElement.setAttribute('data-theme',th)}catch(e){}
/* menu */
var bg=$('#burger'),nl=$('#navlinks');
if(bg)bg.addEventListener('click',function(){var o=nl.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
$$('.links a').forEach(function(a){if(a.pathname===location.pathname&&a.getAttribute('href').indexOf('#')<0)a.classList.add('on')});
/* reveal */
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
 $$('.rv').forEach(function(el){io.observe(el)})}else{$$('.rv').forEach(function(el){el.classList.add('in')})}
/* liczniki */
$$('[data-count]').forEach(function(el){var to=+el.getAttribute('data-count'),sfx=el.getAttribute('data-sfx')||'',t0=null;
 function step(t){t0=t0||t;var p=Math.min((t-t0)/1100,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)))+sfx;if(p<1)requestAnimationFrame(step)}
 var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){requestAnimationFrame(step);o.disconnect()}});o.observe(el)});

/* przelacznik motywu */
var tb=$('#themebtn');
function setTheme(t){document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem('nst-theme',t)}catch(e){}tb.textContent=t==='light'?'☾':'☼'}
if(tb){var cur=document.documentElement.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');
 tb.textContent=cur==='light'?'☾':'☼';if(cur==='light')document.documentElement.setAttribute('data-theme','light');
 tb.addEventListener('click',function(){setTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light')})}
/* ulubione (localStorage) */
function favs(){try{return JSON.parse(localStorage.getItem('nst-fav')||'[]')}catch(e){return []}}
function saveFavs(a){try{localStorage.setItem('nst-fav',JSON.stringify(a))}catch(e){}}
function decorate(root){$$('.card.vid',root||document).forEach(function(c){if(c.querySelector('.fav'))return;
 var m=(c.getAttribute('href')||'').match(/sounds\/(.+)\.html/);if(!m)return;var s=m[1],b=document.createElement('button');b.className='fav';b.type='button';b.setAttribute('aria-label','Favourite');
 b.textContent=favs().indexOf(s)>=0?'♥':'♡';if(favs().indexOf(s)>=0)b.classList.add('on');
 b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var a=favs(),i=a.indexOf(s);if(i>=0)a.splice(i,1);else a.push(s);saveFavs(a);b.classList.toggle('on',i<0);b.textContent=i<0?'♥':'♡'});
 c.appendChild(b)})}
decorate();new MutationObserver(function(){decorate()}).observe(document.body,{childList:true,subtree:true});
/* timer snu: po czasie zdejmuje odtwarzacz (cisza) */
$$('[data-sleeptimer]').forEach(function(box){var left=$('.timer-left',box),t=null;
 $$('.pill',box).forEach(function(b){b.addEventListener('click',function(){clearInterval(t);var m=+b.getAttribute('data-min');
  if(!m){left.textContent='';return}var end=Date.now()+m*60000;$$('.pill',box).forEach(function(x){x.classList.toggle('on',x===b)});
  t=setInterval(function(){var r=end-Date.now();if(r<=0){clearInterval(t);$$('.player').forEach(function(p){var f=p.querySelector('iframe');if(f)f.remove()});left.textContent='Stopped. Good night.';return}
   left.textContent=Math.ceil(r/60000)+' min left'},1000)})})});
/* licznik odwiedzin */
var vs=$('.visits');if(vs){fetch('https://'+vs.getAttribute('data-goat')+'.goatcounter.com/counter/TOTAL.json').then(function(r){return r.json()}).then(function(d){$('#visits-n').textContent=d.count;vs.hidden=false}).catch(function(){})}
/* fala (hero) — czysty canvas, bez audio */
var cv=$('#wave');
if(cv&&!matchMedia('(prefers-reduced-motion:reduce)').matches){var c=cv.getContext('2d'),W,H,tt=0;
 function rs(){W=cv.width=cv.offsetWidth*devicePixelRatio;H=cv.height=cv.offsetHeight*devicePixelRatio}rs();addEventListener('resize',rs);
 (function draw(){tt+=.008;c.clearRect(0,0,W,H);
  [['230,185,104',.35,1],['127,194,150',.5,1.7],['127,194,150',.25,2.6]].forEach(function(L,k){c.beginPath();
   for(var x=0;x<=W;x+=6){var y=H*.55+Math.sin(x/W*6+tt*L[2]+k)*H*.16*L[1]+Math.sin(x/W*13-tt*L[2]*1.3)*H*.07;x?c.lineTo(x,y):c.moveTo(x,y)}
   c.strokeStyle='rgba('+L[0]+','+(.65-k*.18)+')';c.lineWidth=2*devicePixelRatio;c.stroke()});
  requestAnimationFrame(draw)})()}
/* lazy embed YT */
function mount(box,id){box.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0" title="Video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>'}
document.addEventListener('click',function(e){var l=e.target.closest('[data-live]');if(l){e.preventDefault();l.parentNode.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/live_stream?channel='+l.getAttribute('data-live')+'&autoplay=1" title="Live" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';return}var b=e.target.closest('[data-yt]');if(b){e.preventDefault();mount(b.parentNode,b.getAttribute('data-yt'))}});
/* biblioteka: filtry + szukajka + 'wiecej' */
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function card(v){var n={sleep:'Sleep',focus:'Focus',relax:'Relax'}[v.i]||'';
 return '<a class="card vid" href="'+BASE+esc(v.p||('/sounds/'+v.s))+'.html"><span class="thumb"><img loading="lazy" src="https://i.ytimg.com/vi/'+esc(v.id)+'/hqdefault.jpg" alt="'+esc(v.t)+'" width="480" height="360"><span class="play" aria-hidden="true">&#9654;</span></span><span class="meta"><span class="chip i-'+esc(v.i)+'">'+n+'</span>'+(v.bs?' <span class="chip k">Black screen</span>':'')+'</span><span class="ct">'+esc(v.t)+'</span></a>'}
function load(u){return fetch(BASE+u,{cache:'no-cache'}).then(function(r){return r.json()})}
function dataf(n){return '/data/'+n+(N.lang&&N.lang!=='en'?'.'+N.lang:'')+'.json'}
var lib=$('#lib');
if(lib){load(dataf('library')).then(function(D){
 var q='',it='all',per=24,shown=per,ls=$('#lib-grid'),cnt=$('#lib-count'),more=$('#lib-more');
 var p=new URLSearchParams(location.search);if(p.get('i'))it=p.get('i');if(p.get('q')){q=p.get('q').toLowerCase();$('#lib-q').value=p.get('q')}
 function f(){return D.filter(function(v){return (it==='all'||v.i===it||(it==='bs'&&v.bs)||(it==='fav'&&favs().indexOf(v.s)>=0))&&(!q||(v.t+' '+(v.k||'')).toLowerCase().indexOf(q)>=0)})}
 function r(){var L=f();cnt.textContent=(N.count||'{n} recordings').replace('{n}',L.length);
  ls.innerHTML=L.length?L.slice(0,shown).map(card).join(''):'<div class="empty">'+(N.empty||'Nothing matches.')+'</div>';
  more.style.display=L.length>shown?'':'none';$$('.pill[data-i]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-i')===it)})}
 $$('.pill[data-i]').forEach(function(b){b.addEventListener('click',function(){it=b.getAttribute('data-i');shown=per;r()})});
 $('#lib-q').addEventListener('input',function(e){q=e.target.value.toLowerCase().trim();shown=per;r()});
 more.addEventListener('click',function(){shown+=per;r()});r()})}
/* wybor intencji (home): featured player + 3 propozycje */
var pk=$('#picker');
if(pk){load('/data/library.json').then(function(D){
 var box=$('#stage-player'),ti=$('#stage-title'),lk=$('#stage-link'),ls=$('#stage-list'),cur=null;
 function pick(i){var L=D.filter(function(v){return v.i===i}).sort(function(a,b){return (b.w||0)-(a.w||0)});if(!L.length)return;
  var f=L[0];box.innerHTML='<img src="https://i.ytimg.com/vi/'+f.id+'/hqdefault.jpg" alt="'+esc(f.t)+'"><button data-yt="'+f.id+'" aria-label="Play"><i>&#9654;</i></button>';
  ti.textContent=f.t;lk.href=BASE+'/sounds/'+f.s+'.html';
  ls.innerHTML=L.slice(1,4).map(function(v){return '<a href="'+BASE+'/sounds/'+v.s+'.html">'+esc(v.t)+'</a>'}).join('');
  $$('.pill',pk).forEach(function(b){b.classList.toggle('on',b.getAttribute('data-p')===i)})}
 $$('.pill',pk).forEach(function(b){b.addEventListener('click',function(){pick(b.getAttribute('data-p'))})});pick('sleep')})}
/* blog */
var bl=$('#blog');
if(bl){load('/data/blog.json').then(function(D){
 var q='',src='all',per=18,shown=per,g=$('#blog-grid'),more=$('#blog-more');
 function pc(p){var lock=p.lock?' lock':'',im=p.im?'<span class="pthumb"><img loading="lazy" src="'+esc(p.im)+'" alt="'+esc(p.t)+'"></span>':'<span class="pthumb ph"><img src="'+BASE+'/logo.png" alt="" loading="lazy"></span>';
  return '<a class="card post'+lock+'" href="'+(p.lock?p.u:BASE+'/blog/'+p.s+'.html')+'"'+(p.lock?' rel="noopener"':'')+'>'+im+'<span class="pbody"><span class="src">'+esc(p.src)+(p.lock?' &middot; &#128274; members':'')+'</span><h3>'+esc(p.t)+'</h3>'+(p.x?'<p>'+esc(p.x)+'</p>':'')+'<span class="date">'+esc(p.d)+'</span></span></a>'}
 function f(){return D.filter(function(p){return (src==='all'||p.g===src)&&(!q||(p.t+' '+(p.x||'')).toLowerCase().indexOf(q)>=0)})}
 function r(){var L=f();g.innerHTML=L.length?L.slice(0,shown).map(pc).join(''):'<div class="empty">No posts found.</div>';more.style.display=L.length>shown?'':'none';
  $$('.pill[data-g]').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-g')===src)})}
 $$('.pill[data-g]').forEach(function(b){b.addEventListener('click',function(){src=b.getAttribute('data-g');shown=per;r()})});
 $('#blog-q').addEventListener('input',function(e){q=e.target.value.toLowerCase().trim();shown=per;r()});
 more.addEventListener('click',function(){shown+=per;r()});r()})}
})();
