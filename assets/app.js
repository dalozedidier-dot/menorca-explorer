/* ============================================================
   Minorque Explorer — logique applicative
   Aucun framework, aucune compilation. Leaflet + JavaScript natif.
   ============================================================ */
(() => {
'use strict';

/* ---------- 1. Données & constantes ---------- */
const PLACES = window.MENORCA_PLACES || [];
const ROUTES = window.MENORCA_ITINERARIES || [];
const CAMI   = window.MENORCA_CAMI || [];
const TRACE  = window.MENORCA_CAMI_TRACE || [];
const PLANS  = window.MENORCA_CAMI_PLANS || [];
const MONTHS = window.MENORCA_MONTHS || [];
const WINDS  = window.MENORCA_WINDS || [];
const PRACT  = window.MENORCA_PRACTICAL || [];
const FLAV   = window.MENORCA_FLAVOURS || [];
const CULT   = window.MENORCA_CULTURE || [];
const OUTLINE= window.MENORCA_OUTLINE || null;

const byId = new Map(PLACES.map(p => [p.id, p]));

const CATS = [
  {id:'plage',      label:'Plages & criques', short:'Plage',      icon:'🏝️', color:'--c-plage'},
  {id:'nature',     label:'Nature',           short:'Nature',     icon:'🌿', color:'--c-nature'},
  {id:'village',    label:'Villes & villages',short:'Village',    icon:'🏘️', color:'--c-village'},
  {id:'phare',      label:'Phares',           short:'Phare',      icon:'🗼', color:'--c-phare'},
  {id:'panorama',   label:'Panoramas',        short:'Panorama',   icon:'⛰️', color:'--c-panorama'},
  {id:'patrimoine', label:'Patrimoine',       short:'Patrimoine', icon:'🗿', color:'--c-patrimoine'},
  {id:'saveur',     label:'Saveurs',          short:'Saveurs',    icon:'🧀', color:'--c-saveur'}
];
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));

const FLAGS = {
  famille:'Famille', services:'Services sur place', parking:'Parking',
  snorkeling:'Snorkeling', ombre:'De l’ombre', coucher:'Coucher de soleil',
  lever:'Lever de soleil', oiseaux:'Observation d’oiseaux', panorama:'Grande vue',
  pluie:'Se visite sous la pluie', naturisme:'Naturisme toléré', navette:'Navette en été',
  saut:'Sauts / plongeons'
};
const EFFORT = {facile:'Sans marcher', marche:'Un peu de marche', rando:'Vraie randonnée'};
const CROWD  = {calme:'Tranquille', modere:'Modérée', frequente:'Très fréquenté'};
const ANGLE  = {N:0, NE:45, E:90, SE:135, S:180, SW:225, W:270, NW:315};
const REGIONS = [...new Set(PLACES.map(p => p.region))].sort((a,b) => a.localeCompare(b,'fr'));

/* ---------- 2. État ---------- */
const S = {
  cats:new Set(), regions:new Set(), efforts:new Set(), crowds:new Set(), flags:new Set(),
  wind:null, q:'', sort:'score', topOnly:false, here:null, active:null, layer:'carte'
};
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v===null? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
let trip = store.get('menorca-trip', {days:[[]]});
if(!trip || !Array.isArray(trip.days) || !trip.days.length) trip = {days:[[]]};

const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600);
}
function km(a, b){
  const R = 6371, r = Math.PI/180;
  const dLat = (b[0]-a[0])*r, dLon = (b[1]-a[1])*r;
  const h = Math.sin(dLat/2)**2 + Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}
const fmtKm = d => d < 1 ? Math.round(d*1000)+' m' : (d < 10 ? d.toFixed(1) : Math.round(d))+' km';

/* ---------- 3. Thème ---------- */
function applyTheme(mode){
  if(mode) document.documentElement.dataset.theme = mode;
  else document.documentElement.removeAttribute('data-theme');
  const dark = mode === 'dark' || (!mode && matchMedia('(prefers-color-scheme: dark)').matches);
  $('#themeIcon').textContent = dark ? '☀' : '☾';
  $('#themeBtn').title = dark ? 'Passer en thème clair' : 'Passer en thème sombre';
  if(window._map) refreshMarkerColors();
}
$('#themeBtn').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  const next = dark ? 'light' : 'dark';
  store.set('menorca-theme', next); applyTheme(next);
});
applyTheme(store.get('menorca-theme', null));
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if(!store.get('menorca-theme', null)) applyTheme(null);
});

/* ---------- 4. Carte ---------- */
const map = L.map('map', {zoomControl:false, scrollWheelZoom:true, attributionControl:true})
  .setView([39.96, 4.06], 10);
window._map = map;
L.control.zoom({position:'bottomright'}).addTo(map);

const LAYERS = {
  carte: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
  relief: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom:17, attribution:'&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA) · &copy; OpenStreetMap'}),
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom:19, attribution:'Imagerie &copy; Esri, Maxar, Earthstar Geographics'})
};
LAYERS.carte.addTo(map);
$$('.layer-switch button').forEach(b => b.addEventListener('click', () => {
  const id = b.dataset.layer; if(id === S.layer) return;
  map.removeLayer(LAYERS[S.layer]); LAYERS[id].addTo(map); S.layer = id;
  $$('.layer-switch button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
}));

const markerLayer = L.layerGroup().addTo(map);
const routeLayer  = L.layerGroup().addTo(map);
const camiLayer   = L.layerGroup().addTo(map);
const markers = new Map();

function markerIcon(p, active){
  const c = cssVar(CAT[p.cat].color);
  return L.divIcon({
    className:'', iconSize:[30,30], iconAnchor:[15,28], popupAnchor:[0,-28],
    html:`<div class="marker${p.top?' is-top':''}${active?' is-active':''}" style="background:${c}"><span>${p.icon}</span></div>`
  });
}
PLACES.forEach(p => {
  const m = L.marker([p.lat, p.lng], {icon:markerIcon(p), title:p.name, riseOnHover:true});
  m.bindPopup(() => `<div class="pop"><h3>${esc(p.icon)} ${esc(p.name)}</h3>
      <p>${esc(p.region)} · ${esc(CAT[p.cat].label)}${p.top?' · ★ incontournable':''}</p>
      <div class="pop-actions">
        <button class="primary" type="button" data-open="${p.id}">Voir la fiche</button>
        <button type="button" data-add="${p.id}">+ Mon voyage</button>
      </div></div>`);
  m.on('click', () => setActive(p.id, false));
  markers.set(p.id, m);
});
map.on('popupopen', e => {
  const root = e.popup.getElement(); if(!root) return;
  root.querySelector('[data-open]')?.addEventListener('click', ev => openSheet(ev.currentTarget.dataset.open));
  root.querySelector('[data-add]')?.addEventListener('click', ev => { addToTrip(ev.currentTarget.dataset.add); });
});
function refreshMarkerColors(){ drawMarkers(currentResults()); }

/* -- regroupement léger (grille en pixels) -- */
function drawMarkers(list){
  markerLayer.clearLayers();
  const z = map.getZoom(), cell = z >= 12 ? 0 : (z >= 11 ? 44 : 56);
  if(!cell){ list.forEach(p => markerLayer.addLayer(markers.get(p.id).setIcon(markerIcon(p, p.id === S.active)))); return; }
  const grid = new Map();
  list.forEach(p => {
    const pt = map.latLngToLayerPoint([p.lat, p.lng]);
    const k = Math.floor(pt.x/cell)+':'+Math.floor(pt.y/cell);
    (grid.get(k) || grid.set(k, []).get(k)).push(p);
  });
  grid.forEach(group => {
    if(group.length === 1 || group.some(p => p.id === S.active)){
      group.forEach(p => markerLayer.addLayer(markers.get(p.id).setIcon(markerIcon(p, p.id === S.active))));
      return;
    }
    const lat = group.reduce((s,p) => s+p.lat, 0)/group.length;
    const lng = group.reduce((s,p) => s+p.lng, 0)/group.length;
    const big = group.length > 9;
    const c = L.marker([lat,lng], {
      icon: L.divIcon({className:'', iconSize:[38,38], iconAnchor:[19,19],
        html:`<div class="cluster${big?' lg':''}">${group.length}</div>`}),
      title:`${group.length} lieux`
    });
    c.on('click', () => map.flyToBounds(L.latLngBounds(group.map(p => [p.lat,p.lng])), {padding:[60,60], maxZoom:14}));
    markerLayer.addLayer(c);
  });
}
map.on('zoomend moveend', () => drawMarkers(currentResults()));

/* ---------- 5. Filtres ---------- */
function currentResults(){
  const q = S.q.trim().toLocaleLowerCase('fr');
  let out = PLACES.filter(p => {
    if(S.cats.size && !S.cats.has(p.cat)) return false;
    if(S.regions.size && !S.regions.has(p.region)) return false;
    if(S.efforts.size && !S.efforts.has(p.effort)) return false;
    if(S.crowds.size && !S.crowds.has(p.crowd)) return false;
    if(S.flags.size && ![...S.flags].every(f => (p.f||[]).includes(f))) return false;
    if(S.topOnly && !p.top) return false;
    if(S.wind && !sheltered(p, S.wind)) return false;
    if(q){
      const hay = [p.name, p.region, p.desc, p.best, p.access, CAT[p.cat].label, ...(p.tags||[])]
        .join(' ').toLocaleLowerCase('fr');
      if(!hay.includes(q)) return false;
    }
    return true;
  });
  if(S.sort === 'name') out.sort((a,b) => a.name.localeCompare(b.name,'fr'));
  else if(S.sort === 'region') out.sort((a,b) => a.region.localeCompare(b.region,'fr') || b.score-a.score);
  else if(S.sort === 'dist' && S.here) out.sort((a,b) => km(S.here,[a.lat,a.lng]) - km(S.here,[b.lat,b.lng]));
  else out.sort((a,b) => (b.top?1:0)-(a.top?1:0) || b.score-a.score || a.name.localeCompare(b.name,'fr'));
  return out;
}
/* un lieu est abrité si son rivage tourne le dos au vent (> 90° d'écart) */
function sheltered(p, dir){
  if(!p.face) return p.cat === 'village' || p.cat === 'patrimoine' || p.cat === 'saveur';
  const d = Math.abs(ANGLE[p.face] - ANGLE[dir]);
  return Math.min(d, 360-d) > 90;
}
function activeFilterCount(){
  return S.cats.size + S.regions.size + S.efforts.size + S.crowds.size + S.flags.size +
         (S.wind?1:0) + (S.topOnly?1:0) + (S.q?1:0);
}

/* -- construction des contrôles -- */
function buildChips(){
  $('#catChips').innerHTML = CATS.map(c =>
    `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="false">
       <i class="dot" style="background:var(${c.color})"></i>${esc(c.label)}</button>`).join('');
  $('#catChips').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]'); if(!b) return;
    const id = b.dataset.cat;
    S.cats.has(id) ? S.cats.delete(id) : S.cats.add(id);
    b.setAttribute('aria-pressed', String(S.cats.has(id)));
    render(true);
  });
}
function optSet(container, entries, set, after){
  container.innerHTML = entries.map(([v,l]) =>
    `<button class="opt" type="button" data-v="${esc(v)}" aria-pressed="false">${esc(l)}</button>`).join('');
  container.addEventListener('click', e => {
    const b = e.target.closest('[data-v]'); if(!b) return;
    const v = b.dataset.v;
    set.has(v) ? set.delete(v) : set.add(v);
    b.setAttribute('aria-pressed', String(set.has(v)));
    after && after(); render(true);
  });
}
function buildFilters(){
  optSet($('#fRegion'), REGIONS.map(r => [r,r]), S.regions);
  optSet($('#fEffort'), Object.entries(EFFORT), S.efforts);
  optSet($('#fCrowd'),  Object.entries(CROWD),  S.crowds);
  optSet($('#fFlags'),  Object.entries(FLAGS),  S.flags);

  $('#fWind').innerHTML = WINDS.map(w =>
    `<button class="opt" type="button" data-w="${w.dir}" aria-pressed="false" title="${esc(w.name)} — ${esc(w.note)}">${esc(w.name)}</button>`).join('');
  $('#fWind').addEventListener('click', e => {
    const b = e.target.closest('[data-w]'); if(!b) return;
    S.wind = S.wind === b.dataset.w ? null : b.dataset.w;
    $$('#fWind .opt').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.w === S.wind)));
    const note = $('#windNote');
    if(S.wind){
      const w = WINDS.find(x => x.dir === S.wind);
      note.innerHTML = `<b>${esc(w.name)}</b>${w.local?` <i>(${esc(w.local)} à Minorque)</i>`:''} — ${esc(w.note)} La carte ne montre plus que les rivages qui tournent le dos à ce vent.`;
      note.hidden = false;
    } else note.hidden = true;
    render(true);
  });

  $('#filtersToggle').addEventListener('click', () => {
    const p = $('#filtersPanel'), open = p.classList.toggle('open');
    $('#filtersToggle').setAttribute('aria-expanded', String(open));
  });
  $('#resetBtn').addEventListener('click', () => {
    S.cats.clear(); S.regions.clear(); S.efforts.clear(); S.crowds.clear(); S.flags.clear();
    S.wind = null; S.topOnly = false; S.q = ''; $('#q').value = '';
    $$('.chip,[data-v],[data-w]').forEach(b => b.setAttribute('aria-pressed','false'));
    $('#topBtn').setAttribute('aria-pressed','false');
    $('#windNote').hidden = true;
    render(true);
  });
}

/* ---------- 6. Liste ---------- */
function render(fit){
  const list = currentResults();
  drawMarkers(list);

  $('#resultCount').textContent = `${list.length} lieu${list.length>1?'x':''}`;
  const bits = [];
  if(S.cats.size) bits.push([...S.cats].map(c => CAT[c].short.toLowerCase()).join(', '));
  if(S.regions.size) bits.push([...S.regions].join(', '));
  if(S.wind) bits.push('abrités du ' + WINDS.find(w => w.dir === S.wind).name.toLowerCase());
  if(S.topOnly) bits.push('incontournables');
  $('#resultCtx').textContent = bits.length ? '· ' + bits.join(' · ') : '· sur toute l’île';

  const n = activeFilterCount();
  $('#filterCount').textContent = n; $('#filterCount').hidden = n === 0;
  $('#resetBtn').hidden = n === 0;

  const pane = $('#placeList');
  if(!list.length){
    pane.innerHTML = `<div class="empty"><strong>Aucun lieu ne correspond</strong>
      Essaie un autre mot, ou retire un filtre.</div>`;
  } else {
    pane.innerHTML = list.map(p => {
      const d = S.here ? km(S.here, [p.lat,p.lng]) : null;
      const inTrip = tripHas(p.id);
      return `<article>
        <button class="place-card${p.id===S.active?' active':''}" type="button" data-place="${p.id}">
          <div class="pc-top">
            <div class="pc-icon" data-thumb="${p.id}" style="--cat:var(${CAT[p.cat].color})"><span>${p.icon}</span></div>
            <div class="pc-meta">
              <h3>${esc(p.name)}${p.top?'<span class="badge-top">★ TOP</span>':''}</h3>
              <p class="pc-sub">
                <i class="cat-dot" style="background:var(${CAT[p.cat].color})"></i>${esc(CAT[p.cat].short)}
                <span>·</span>${esc(p.region)}
                ${d!==null?`<span>·</span><span class="pc-dist">${fmtKm(d)}</span>`:''}
              </p>
              <div class="stars" aria-label="Intérêt ${p.score} sur 5">${'★'.repeat(p.score)}${'☆'.repeat(5-p.score)}</div>
            </div>
          </div>
          <p class="pc-desc">${esc(p.desc)}</p>
        </button>
        <button class="fav-mini" type="button" data-fav="${p.id}" aria-pressed="${inTrip}"
          aria-label="${inTrip?'Retirer':'Ajouter'} ${esc(p.name)} de mon voyage">${inTrip?'♥':'♡'}</button>
      </article>`;
    }).join('')
      + `<p class="photo-note">Vignettes chargées depuis <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener">Wikimedia Commons</a> — auteur et licence de chaque image sur sa fiche.</p>`;
  }
  observeThumbs(pane);
  if(fit) fitTo(list);
}
$('#placeList').addEventListener('click', e => {
  const fav = e.target.closest('[data-fav]');
  if(fav){ toggleTrip(fav.dataset.fav); return; }
  const card = e.target.closest('[data-place]');
  if(card) setActive(card.dataset.place, true);
});
$('#placeList').addEventListener('dblclick', e => {
  const card = e.target.closest('[data-place]'); if(card) openSheet(card.dataset.place);
});

function fitTo(list){
  if(!list.length) return;
  map.fitBounds(L.latLngBounds(list.map(p => [p.lat,p.lng])), {padding:[45,45], maxZoom:13});
}
function setActive(id, fly){
  const p = byId.get(id); if(!p) return;
  S.active = id;
  if(fly) map.flyTo([p.lat,p.lng], Math.max(map.getZoom(), 13.5), {duration:.6});
  drawMarkers(currentResults());
  markers.get(id)?.openPopup();
  $$('.place-card').forEach(el => el.classList.toggle('active', el.dataset.place === id));
  if(matchMedia('(max-width:860px)').matches && fly) setView('carte');
}

/* ---------- 7. Barre de carte ---------- */
$('#fitBtn').addEventListener('click', () => { routeLayer.clearLayers(); camiLayer.clearLayers(); highlightStage(null); fitTo(currentResults()); });
$('#topBtn').addEventListener('click', e => {
  S.topOnly = !S.topOnly; e.currentTarget.setAttribute('aria-pressed', String(S.topOnly)); render(true);
});
$('#geoBtn').addEventListener('click', e => {
  if(S.here){ S.here = null; e.currentTarget.setAttribute('aria-pressed','false');
    $('#sortSelect option[value="dist"]').disabled = true;
    if(S.sort === 'dist'){ S.sort = 'score'; $('#sortSelect').value = 'score'; }
    render(); return; }
  if(!navigator.geolocation) return toast('Géolocalisation indisponible sur cet appareil.');
  toast('Recherche de ta position…');
  navigator.geolocation.getCurrentPosition(pos => {
    S.here = [pos.coords.latitude, pos.coords.longitude];
    e.currentTarget.setAttribute('aria-pressed','true');
    $('#sortSelect option[value="dist"]').disabled = false;
    S.sort = 'dist'; $('#sortSelect').value = 'dist';
    const far = km(S.here, [39.96,4.06]) > 120;
    toast(far ? 'Position trouvée — tu es loin de l’île, les distances sont à vol d’oiseau.' : 'Position trouvée.');
    render(); if(!far) map.flyTo(S.here, 12);
  }, () => toast('Position refusée ou indisponible.'), {enableHighAccuracy:false, timeout:9000});
});
$('#sortSelect').addEventListener('change', e => { S.sort = e.target.value; render(); });
$('#q').addEventListener('input', e => { S.q = e.target.value; render(); });
$('#qClear').addEventListener('click', () => { S.q = ''; $('#q').value = ''; $('#q').focus(); render(); });
$('#surpriseBtn').addEventListener('click', () => {
  const pool = currentResults(); if(!pool.length) return;
  openSheet(pool[Math.floor(Math.random()*pool.length)].id);
});
$$('.view-switch button').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));
function setView(v){
  document.body.dataset.view = v;
  $$('.view-switch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
  if(v === 'carte') setTimeout(() => map.invalidateSize(), 60);
}

/* ---------- 8. Légende ---------- */
$('#legend').innerHTML = CATS.map(c =>
  `<span><i style="background:var(${c.color})"></i>${esc(c.short)}</span>`).join('');

/* ---------- 9. Fiche d'un lieu ---------- */
const sheet = $('#placeSheet');
/* Résolution des photos.
 * 1) surcharge manuelle (data/photos.js) → fichier Commons imposé ;
 * 2) recherche plein texte Commons sur l'espace Fichier ;
 * 3) repli : recherche géographique autour du point.
 * Résultat mis en cache en mémoire et dans le navigateur (30 jours). */
const OVERRIDES = window.MENORCA_PHOTOS || {};
const QUERIES   = window.MENORCA_PHOTO_QUERIES || {};
const API = 'https://commons.wikimedia.org/w/api.php?origin=*&format=json&formatversion=2&action=query';
const photoCache = new Map();
const photoWait  = new Map();
const PHOTO_TTL  = 30*24*3600*1000;
const BAD = /(map|mapa|carte|plànol|flag|bandera|coat[ _]of[ _]arms|escut|escudo|logo|seal|diagram|chart|graph|plan[ _]|location|localitz|svg|icon|sign[ _]|panorama[ _]of[ _]the[ _]world)/i;

function photoStore(){ return store.get('menorca-photos', {}); }
function photoRemember(id, data){
  const all = photoStore(); all[id] = {t:Date.now(), d:data};
  const keys = Object.keys(all);
  if(keys.length > 220) keys.slice(0, keys.length-200).forEach(k => delete all[k]);
  store.set('menorca-photos', all);
}
function searchTerm(p){
  if(QUERIES[p.id]) return QUERIES[p.id];
  const base = p.name.split(/[&(—]/)[0].trim();
  return `${base} Menorca`;
}
function shapeInfo(page){
  const i = page.imageinfo && page.imageinfo[0];
  if(!i) return null;
  return {
    src: i.thumburl || i.url,
    link: i.descriptionurl,
    title: (page.title || '').replace(/^File:/,''),
    author: (i.extmetadata?.Artist?.value || '').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim().slice(0,80),
    licence: (i.extmetadata?.LicenseShortName?.value || '').trim()
  };
}
function usable(page, minW){
  if(!/\.(jpe?g|png)$/i.test(page.title || '')) return false;
  if(BAD.test(page.title || '')) return false;
  const i = page.imageinfo && page.imageinfo[0];
  return !!i && (i.width || 0) >= minW;
}
async function apiPages(url){
  const r = await fetch(url, {referrerPolicy:'no-referrer'});
  if(!r.ok) throw new Error('HTTP '+r.status);
  const j = await r.json();
  const pages = j?.query?.pages || [];
  return Array.isArray(pages) ? pages : Object.values(pages);
}
const IIPROP = '&prop=imageinfo&iiprop=url%7Cextmetadata%7Csize&iiurlwidth=1000';

async function resolvePhoto(p){
  if(photoCache.has(p.id)) return photoCache.get(p.id);
  if(photoWait.has(p.id))  return photoWait.get(p.id);

  const cached = photoStore()[p.id];
  if(cached && Date.now()-cached.t < PHOTO_TTL){ photoCache.set(p.id, cached.d); return cached.d; }

  const job = (async () => {
    let data = null;
    try{
      if(OVERRIDES[p.id]){
        const pages = await apiPages(`${API}&titles=${encodeURIComponent('File:'+OVERRIDES[p.id])}${IIPROP}`);
        const hit = pages.find(x => x.imageinfo);
        if(hit) data = shapeInfo(hit);
      }
      if(!data){
        const pages = await apiPages(`${API}&generator=search&gsrnamespace=6&gsrlimit=12`
          + `&gsrsearch=${encodeURIComponent(searchTerm(p))}${IIPROP}`);
        pages.sort((a,b) => (a.index||99)-(b.index||99));
        const hit = pages.find(x => usable(x, 900)) || pages.find(x => usable(x, 500));
        if(hit) data = shapeInfo(hit);
      }
      if(!data){
        const pages = await apiPages(`${API}&generator=geosearch&ggsnamespace=6&ggslimit=10`
          + `&ggsradius=1200&ggscoord=${p.lat}%7C${p.lng}${IIPROP}`);
        pages.sort((a,b) => (a.index||99)-(b.index||99));
        const hit = pages.find(x => usable(x, 900)) || pages.find(x => usable(x, 500));
        if(hit) data = shapeInfo(hit);
      }
    }catch(e){ data = null; }
    photoCache.set(p.id, data);
    photoRemember(p.id, data);
    photoWait.delete(p.id);
    return data;
  })();
  photoWait.set(p.id, job);
  return job;
}
function credit(d){
  if(!d) return '';
  const who = d.author || 'Wikimedia Commons';
  return d.licence ? `${who} · ${d.licence}` : who;
}

/* vignette d'une carte de la liste, chargée à l'approche du viewport */
const thumbObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(!en.isIntersecting) return;
    thumbObserver.unobserve(en.target);
    const p = byId.get(en.target.dataset.thumb); if(!p) return;
    resolvePhoto(p).then(d => {
      if(!d || !en.target.isConnected) return;
      const img = new Image();
      img.src = d.src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      img.title = 'Photo : ' + credit(d) + ' (Wikimedia Commons)';
      img.onload = () => { if(en.target.isConnected){ en.target.classList.add('has-photo'); en.target.prepend(img); } };
    });
  });
}, {rootMargin:'260px'}) : null;

function observeThumbs(root){
  if(!thumbObserver) return;
  (root || document).querySelectorAll('[data-thumb]:not(.seen)').forEach(el => {
    el.classList.add('seen'); thumbObserver.observe(el);
  });
}

/* grande photo de la fiche */
function loadPhoto(p, host){
  resolvePhoto(p).then(d => {
    if(!host || !host.isConnected) return;
    host.classList.remove('loading');
    if(!d) return;
    const img = new Image();
    img.alt = ''; img.loading = 'eager'; img.decoding = 'async'; img.src = d.src;
    img.onload = () => {
      if(!host.isConnected) return;
      host.querySelector('.fallback')?.remove();
      host.prepend(img);
      const cap = document.createElement('figcaption');
      cap.innerHTML = `Photo : ${esc(credit(d))} · <a href="${esc(d.link)}" target="_blank" rel="noopener">Wikimedia Commons ↗</a>`;
      host.appendChild(cap);
    };
    img.onerror = () => host.classList.remove('loading');
  });
}

function openSheet(id){
  const p = byId.get(id); if(!p) return;
  S.active = id;
  const near = PLACES.filter(x => x.id !== p.id)
    .map(x => ({p:x, d:km([p.lat,p.lng],[x.lat,x.lng])}))
    .sort((a,b) => a.d-b.d).slice(0,4);
  const inTrip = tripHas(p.id);
  const wind = p.face ? WINDS.filter(w => sheltered(p, w.dir)).map(w => w.name).join(', ') : null;

  $('#sheetBody').innerHTML = `
    <figure class="photo loading" id="sheetPhoto" style="--cat:var(${CAT[p.cat].color})"><div class="fallback">${p.icon}</div></figure>
    <div class="sheet-in">
      <p class="kicker"><i style="width:9px;height:9px;border-radius:50%;background:var(${CAT[p.cat].color});display:inline-block"></i>
        ${esc(CAT[p.cat].label)} · ${esc(p.region)}${p.top?' · ★ Incontournable':''}</p>
      <h2 id="sheetTitle">${esc(p.name)}</h2>
      <p class="lead">${esc(p.desc)}</p>
      <div class="detail-grid">
        <div class="detail-box"><span>Meilleur moment</span><strong>${esc(p.best)}</strong></div>
        <div class="detail-box"><span>Accès</span><strong>${esc(p.access)}</strong></div>
        <div class="detail-box"><span>Effort</span><strong>${esc(EFFORT[p.effort]||'—')}</strong></div>
        <div class="detail-box"><span>Affluence</span><strong>${esc(CROWD[p.crowd]||'—')}</strong></div>
        ${wind?`<div class="detail-box"><span>Abrité des vents</span><strong>${esc(wind)}</strong></div>`:''}
        ${(p.f||[]).length?`<div class="detail-box"><span>Sur place</span><strong>${p.f.map(f => esc(FLAGS[f]||f)).join(' · ')}</strong></div>`:''}
      </div>
      <div class="tags">${(p.tags||[]).map(t => `<span># ${esc(t)}</span>`).join('')}</div>
      <div class="sheet-actions">
        <button class="btn ${inTrip?'btn-soft':'btn-primary'}" type="button" data-trip="${p.id}">
          ${inTrip?'♥ Retirer de mon voyage':'♡ Ajouter à mon voyage'}</button>
        <button class="btn btn-soft" type="button" data-map="${p.id}">Voir sur la carte</button>
        <a class="btn btn-soft" target="_blank" rel="noopener"
           href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}">Itinéraire ↗</a>
        <button class="btn btn-soft" type="button" data-share="${p.id}">Partager</button>
      </div>
      <div class="nearby">
        <h3>À moins de ${fmtKm(near[near.length-1].d)} d’ici</h3>
        <div class="nearby-list">
          ${near.map(({p:n,d}) => `<button class="nearby-row" type="button" data-goto="${n.id}">
            <span class="e">${n.icon}</span>
            <span><b>${esc(n.name)}</b><small>${esc(CAT[n.cat].short)} · ${esc(n.region)}</small></span>
            <span class="km">${fmtKm(d)}</span></button>`).join('')}
        </div>
      </div>
    </div>`;

  loadPhoto(p, $('#sheetPhoto'));
  if(!sheet.open) sheet.showModal();
  history.replaceState(null, '', '#lieu=' + p.id);

  const body = $('#sheetBody');
  body.querySelector('[data-trip]').addEventListener('click', () => { toggleTrip(p.id); openSheet(p.id); });
  body.querySelector('[data-map]').addEventListener('click', () => { sheet.close(); setActive(p.id, true);
    $('#explorer').scrollIntoView({behavior:'smooth', block:'start'}); });
  body.querySelector('[data-share]').addEventListener('click', () => share(location.origin + location.pathname + '#lieu=' + p.id, 'Lien du lieu copié.'));
  body.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => openSheet(b.dataset.goto)));
}
function share(url, msg){
  if(navigator.share){ navigator.share({title:'Minorque Explorer', url}).catch(()=>{}); return; }
  navigator.clipboard?.writeText(url).then(() => toast(msg), () => toast(url));
}
$$('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
[sheet, $('#tripSheet')].forEach(d => {
  d.addEventListener('click', e => { if(e.target === d) d.close(); });
});
sheet.addEventListener('close', () => {
  if(location.hash.startsWith('#lieu=')) history.replaceState(null, '', location.pathname + location.search);
});

/* ---------- 10. Planificateur ---------- */
function tripHas(id){ return trip.days.some(d => d.includes(id)); }
function saveTrip(){ store.set('menorca-trip', trip); paintTripCount(); }
function paintTripCount(){
  const n = trip.days.reduce((s,d) => s+d.length, 0);
  $('#tripCount').textContent = n;
  $('#tripBtn').classList.toggle('is-empty', n === 0);
}
function addToTrip(id, day){
  if(tripHas(id)) return;
  const d = day ?? trip.days.length-1;
  trip.days[d].push(id); saveTrip();
  toast(`${byId.get(id).name} ajouté au jour ${d+1}.`);
  render();
}
function toggleTrip(id){
  if(tripHas(id)){
    trip.days = trip.days.map(d => d.filter(x => x !== id)); saveTrip();
    toast('Retiré de ton voyage.');
  } else addToTrip(id);
  render(); if($('#tripSheet').open) paintTrip();
}
function moveItem(id, dir){
  for(let i=0;i<trip.days.length;i++){
    const j = trip.days[i].indexOf(id); if(j < 0) continue;
    trip.days[i].splice(j,1);
    if(dir === 'up' && j > 0) trip.days[i].splice(j-1,0,id);
    else if(dir === 'down' && j < trip.days[i].length) trip.days[i].splice(j+1,0,id);
    else if(dir === 'prev' && i > 0) trip.days[i-1].push(id);
    else if(dir === 'next'){ if(i === trip.days.length-1) trip.days.push([]); trip.days[i+1].push(id); }
    else trip.days[i].splice(j,0,id);
    break;
  }
  saveTrip(); paintTrip();
}
function paintTrip(){
  const total = trip.days.reduce((s,d) => s+d.length, 0);
  const body = $('#tripBody');
  body.innerHTML = `
    <div class="trip-head">
      <div><p class="kicker">Mon voyage</p><h2 id="tripTitle">${total} lieu${total>1?'x':''} en ${trip.days.length} jour${trip.days.length>1?'s':''}</h2></div>
      <div class="trip-tools">
        <button class="mini-btn sec" type="button" id="addDay">+ Ajouter un jour</button>
        <button class="mini-btn sec" type="button" id="shareTrip">Partager</button>
        <button class="mini-btn sec" type="button" id="printTrip">Imprimer</button>
        <button class="mini-btn sec" type="button" id="clearTrip">Vider</button>
      </div>
    </div>
    ${trip.days.map((day, i) => {
      const items = day.map(id => byId.get(id)).filter(Boolean);
      const dist = items.length > 1 ? items.slice(1).reduce((s,p,k) => s + km([items[k].lat,items[k].lng],[p.lat,p.lng]), 0) : 0;
      const gmap = items.length ? 'https://www.google.com/maps/dir/' + items.map(p => `${p.lat},${p.lng}`).join('/') : null;
      return `<section class="day">
        <div class="day-head">
          <b>Jour ${i+1}</b>
          <span class="count">${items.length} lieu${items.length>1?'x':''}${dist?` · ${fmtKm(dist)} à vol d’oiseau`:''}</span>
          <span class="day-links">
            ${items.length?`<a class="mini-btn sec" href="${gmap}" target="_blank" rel="noopener">Google Maps ↗</a>`:''}
            ${items.length?`<button class="mini-btn sec" type="button" data-showday="${i}">Sur la carte</button>`:''}
            ${trip.days.length>1?`<button class="mini-btn sec" type="button" data-delday="${i}">Supprimer</button>`:''}
          </span>
        </div>
        <div class="day-body">
          ${items.length ? items.map(p => `<div class="trip-row">
              <span class="e">${p.icon}</span>
              <span class="txt"><b>${esc(p.name)}</b><small>${esc(CAT[p.cat].short)} · ${esc(p.region)} · ${esc(p.best)}</small></span>
              <span class="ops">
                <button type="button" data-mv="up"   data-id="${p.id}" aria-label="Monter">↑</button>
                <button type="button" data-mv="down" data-id="${p.id}" aria-label="Descendre">↓</button>
                <button type="button" data-mv="prev" data-id="${p.id}" aria-label="Jour précédent">◀</button>
                <button type="button" data-mv="next" data-id="${p.id}" aria-label="Jour suivant">▶</button>
                <button type="button" data-rm="${p.id}" aria-label="Retirer">×</button>
              </span></div>`).join('')
            : `<p class="day-empty">Aucun lieu pour ce jour — ajoute-en depuis la carte ou un itinéraire.</p>`}
        </div>
      </section>`;
    }).join('')}
    <p class="trip-hint">Ton voyage est enregistré dans ce navigateur uniquement. « Partager » copie un lien qui
      contient toute la sélection : ouvre-le sur un autre appareil pour la retrouver.</p>`;

  body.querySelector('#addDay').onclick = () => { trip.days.push([]); saveTrip(); paintTrip(); };
  body.querySelector('#clearTrip').onclick = () => { trip = {days:[[]]}; saveTrip(); paintTrip(); render(); };
  body.querySelector('#printTrip').onclick = () => window.print();
  body.querySelector('#shareTrip').onclick = () => {
    const code = trip.days.map(d => d.join('.')).join('|');
    share(location.origin + location.pathname + '#voyage=' + code, 'Lien de ton voyage copié.');
  };
  body.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { toggleTrip(b.dataset.rm); });
  body.querySelectorAll('[data-mv]').forEach(b => b.onclick = () => moveItem(b.dataset.id, b.dataset.mv));
  body.querySelectorAll('[data-delday]').forEach(b => b.onclick = () => {
    const i = +b.dataset.delday; trip.days.splice(i,1);
    if(!trip.days.length) trip.days = [[]];
    saveTrip(); paintTrip(); render();
  });
  body.querySelectorAll('[data-showday]').forEach(b => b.onclick = () => {
    const items = trip.days[+b.dataset.showday].map(id => byId.get(id)).filter(Boolean);
    if(!items.length) return;
    $('#tripSheet').close();
    routeLayer.clearLayers(); camiLayer.clearLayers();
    L.polyline(items.map(p => [p.lat,p.lng]), {color:cssVar('--trace'), weight:4, opacity:.85, dashArray:'9 7'}).addTo(routeLayer);
    map.fitBounds(L.latLngBounds(items.map(p => [p.lat,p.lng])), {padding:[60,60], maxZoom:13});
    $('#explorer').scrollIntoView({behavior:'smooth', block:'start'});
  });
}
$('#tripBtn').addEventListener('click', () => { paintTrip(); $('#tripSheet').showModal(); });

/* ---------- 11. Itinéraires ---------- */
function buildRoutes(){
  const moods = [...new Set(ROUTES.map(r => r.mood))];
  $('#routeFilter').innerHTML = `<button class="chip" type="button" data-mood="" aria-pressed="true">Tous</button>` +
    moods.map(m => `<button class="chip" type="button" data-mood="${esc(m)}" aria-pressed="false">${esc(m)}</button>`).join('');
  $('#routeFilter').addEventListener('click', e => {
    const b = e.target.closest('[data-mood]'); if(!b) return;
    $$('#routeFilter .chip').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    paintRoutes(b.dataset.mood);
  });
  paintRoutes('');
}
function paintRoutes(mood){
  const list = mood ? ROUTES.filter(r => r.mood === mood) : ROUTES;
  $('#routeGrid').innerHTML = list.map(r => {
    const pts = r.places.map(id => byId.get(id)).filter(Boolean);
    return `<article class="route-card">
      <span class="emoji">${r.emoji}</span>
      <p class="sub">${esc(r.sub)}</p>
      <h3>${esc(r.name)}</h3>
      <p class="dur">${esc(r.duration)} · ${pts.length} étapes</p>
      <div class="pills">${pts.map(p => `<span>${esc(p.name)}</span>`).join('')}</div>
      <p class="note">${esc(r.note)}</p>
      <div class="route-actions">
        <button class="mini-btn" type="button" data-route="${r.id}">Voir sur la carte →</button>
        <button class="mini-btn sec" type="button" data-routeadd="${r.id}">+ Mon voyage</button>
      </div></article>`;
  }).join('');
  $$('[data-route]').forEach(b => b.onclick = () => showRoute(b.dataset.route));
  $$('[data-routeadd]').forEach(b => b.onclick = () => {
    const r = ROUTES.find(x => x.id === b.dataset.routeadd);
    const ids = r.places.filter(id => byId.has(id) && !tripHas(id));
    if(!ids.length) return toast('Tous ces lieux sont déjà dans ton voyage.');
    trip.days.push(ids); saveTrip(); render();
    toast(`${r.name} ajouté comme jour ${trip.days.length}.`);
  });
}
function showRoute(id){
  const r = ROUTES.find(x => x.id === id); if(!r) return;
  const pts = r.places.map(pid => byId.get(pid)).filter(Boolean);
  if(!pts.length) return;
  routeLayer.clearLayers(); camiLayer.clearLayers(); highlightStage(null);
  L.polyline(pts.map(p => [p.lat,p.lng]), {color:cssVar('--trace'), weight:4, opacity:.85, dashArray:'9 7'}).addTo(routeLayer);
  pts.forEach((p,i) => L.marker([p.lat,p.lng], {icon:L.divIcon({className:'', iconSize:[24,24], iconAnchor:[12,12],
    html:`<div class="cluster" style="width:24px;height:24px;font-size:11px">${i+1}</div>`})}).addTo(routeLayer));
  map.fitBounds(L.latLngBounds(pts.map(p => [p.lat,p.lng])), {padding:[60,60], maxZoom:13});
  $('#explorer').scrollIntoView({behavior:'smooth', block:'start'});
  toast(`${r.name} — ${pts.length} étapes affichées.`);
}

/* ---------- 12. Camí de Cavalls ---------- */
let stageOn = null;
function buildCami(){
  const sw = $('.plan-switch');
  PLANS.forEach((p,i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.plan = i; b.setAttribute('aria-pressed','false'); b.textContent = p.name;
    sw.appendChild(b);
  });
  sw.addEventListener('click', e => {
    const b = e.target.closest('[data-plan]'); if(!b) return;
    $$('.plan-switch button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    paintPlan(+b.dataset.plan);
  });
  $('#camiGrid').innerHTML = CAMI.map(s => `
    <button class="stage" type="button" data-stage="${s.n}">
      <span class="stage-num">ÉTAPE ${String(s.n).padStart(2,'0')}</span>
      <h3>${esc(s.from)} → ${esc(s.to)}</h3>
      <span class="stage-foot">
        <span>${s.km} km · ${esc(s.h)}</span>
        <span class="diff" aria-label="Difficulté ${s.d} sur 4">${[1,2,3,4].map(i => `<i class="${i<=s.d?'on':''}"></i>`).join('')}</span>
      </span>
      <span class="stage-hi">${esc(s.hi)}<br><b>Eau :</b> ${esc(s.eau)}</span>
    </button>`).join('');
  $('#camiGrid').addEventListener('click', e => {
    const b = e.target.closest('[data-stage]'); if(!b) return;
    highlightStage(+b.dataset.stage === stageOn ? null : +b.dataset.stage);
  });
  $('#camiNote').innerHTML = 'Le tracé affiché sur la carte est un <b>corridor côtier indicatif</b>, généralisé à partir '
    + 'du trait de côte OpenStreetMap : il situe l’étape, il ne remplace ni le balisage du GR-223 ni une carte de randonnée. '
    + 'Distances et durées sont celles du découpage officiel en 20 étapes.';
  drawFullTrace();
}
function drawFullTrace(){
  camiLayer.clearLayers();
  TRACE.forEach(seg => L.polyline(seg, {color:cssVar('--trace'), weight:2.5, opacity:.45, interactive:false}).addTo(camiLayer));
}
function highlightStage(n){
  stageOn = n;
  $$('.stage').forEach(el => el.classList.toggle('active', +el.dataset.stage === n));
  routeLayer.clearLayers(); camiLayer.clearLayers();
  if(n === null){ drawFullTrace(); return; }
  TRACE.forEach((seg,i) => L.polyline(seg, {color:cssVar('--trace'), weight:2, opacity:i === n-1 ? 0 : .28, interactive:false}).addTo(camiLayer));
  const seg = TRACE[n-1]; if(!seg) return;
  L.polyline(seg, {color:'#e0a83f', weight:5, opacity:.95, lineCap:'round'}).addTo(camiLayer);
  const s = CAMI[n-1];
  [[seg[0], s.from], [seg[seg.length-1], s.to]].forEach(([ll,label]) => {
    L.marker(ll, {icon:L.divIcon({className:'', iconSize:[26,26], iconAnchor:[13,13],
      html:`<div class="cluster" style="width:26px;height:26px;font-size:11px;background:#e0a83f;color:#0c2b2c">●</div>`}),
      title:label}).addTo(camiLayer);
  });
  map.fitBounds(L.latLngBounds(seg), {padding:[60,60]});
  $('#explorer').scrollIntoView({behavior:'smooth', block:'start'});
  toast(`Étape ${n} — ${s.from} → ${s.to} · ${s.km} km`);
}
function paintPlan(i){
  const box = $('#planGroups');
  if(i < 0){ box.hidden = true; return; }
  const plan = PLANS[i];
  box.hidden = false;
  box.innerHTML = plan.groups.map((g,k) => {
    const legs = CAMI.slice(g[0]-1, g[1]);
    const total = legs.reduce((s,l) => s+l.km, 0);
    return `<div class="plan-day"><b>Jour ${k+1}</b>
      <p>${esc(legs[0].from)} → ${esc(legs[legs.length-1].to)}</p>
      <em>${total.toFixed(1)} km · étapes ${g[0]}${g[1]>g[0]?'–'+g[1]:''}</em></div>`;
  }).join('');
}

/* ---------- 13. Pratique + calendrier ---------- */
function buildPractical(){
  $('#practicalGrid').innerHTML = PRACT.map((b,i) => `
    <div class="acc-item${i===0?' open':''}">
      <button class="acc-head" type="button" aria-expanded="${i===0}">
        <span class="ic">${b.icon}</span><h3>${esc(b.title)}</h3>
        <span class="caret" aria-hidden="true">⌄</span>
      </button>
      <div class="acc-body"><dl>${b.items.map(([t,d]) => `<dt>${esc(t)}</dt><dd>${esc(d)}</dd>`).join('')}</dl></div>
    </div>`).join('');
  $('#practicalGrid').addEventListener('click', e => {
    const h = e.target.closest('.acc-head'); if(!h) return;
    const item = h.parentElement, open = item.classList.toggle('open');
    h.setAttribute('aria-expanded', String(open));
  });
}
function buildCalendar(){
  const max = Math.max(...MONTHS.map(m => m.sea));
  const min = Math.min(...MONTHS.map(m => m.sea));
  /* rampe ordinale : on ne descend pas sous l'étape 2, trop claire pour rester lisible */
  const step = v => `var(--seq-${Math.min(6, Math.max(2, Math.round((v-min)/(max-min)*4)+2))})`;
  const nb = n => n.toLocaleString('fr-FR', {maximumFractionDigits:1});
  $('#calGrid').innerHTML = MONTHS.map((m,i) => `
    <div class="cal-col" data-m="${i}" tabindex="0" role="button"
         aria-label="${m.m} : mer ${nb(m.sea)} degrés, ${nb(m.rainDays)} jours de pluie dans le mois, affluence ${m.crowd} sur 5">
      <p class="cal-m">${m.m}</p>
      <div class="cal-bar"><i style="height:${Math.round(m.sea/max*100)}%;background:${step(m.sea)}"></i></div>
      <p class="cal-v">${nb(m.sea)}°</p>
      <div class="cal-dots">${[1,2,3,4,5].map(k => `<i style="${k<=m.crowd?`background:var(--seq2-${Math.min(5,m.crowd)})`:''}"></i>`).join('')}</div>
    </div>`).join('');
  const show = i => {
    const m = MONTHS[i];
    $('#calNote').innerHTML = `<b>${esc(m.m)}</b> — mer ${nb(m.sea)} °C, température moyenne de l’air ${nb(m.air)} °C, `
      + `${nb(m.rainDays)} jour${m.rainDays>=2?'s':''} de pluie en moyenne dans le mois. ${esc(m.note)}`;
    $$('.cal-col').forEach(c => c.classList.toggle('on', +c.dataset.m === i));
  };
  $('#calGrid').addEventListener('mouseover', e => { const c = e.target.closest('[data-m]'); if(c) show(+c.dataset.m); });
  $('#calGrid').addEventListener('focusin',  e => { const c = e.target.closest('[data-m]'); if(c) show(+c.dataset.m); });
  show(4);
  $('#calTable').innerHTML = `<caption>Températures et jours de pluie : moyennes mesurées. L’affluence est une appréciation éditoriale.</caption>
    <thead><tr><th>Mois</th><th>Mer (°C)</th><th>Air, moyenne (°C)</th><th>Jours de pluie / mois</th><th>Affluence</th><th>Note</th></tr></thead>
    <tbody>${MONTHS.map(m => `<tr><th>${esc(m.m)}</th><td>${nb(m.sea)}</td><td>${nb(m.air)}</td>
      <td>${nb(m.rainDays)}</td><td>${m.crowd}/5</td><td>${esc(m.note)}</td></tr>`).join('')}</tbody>`;
}
function buildFlavours(){
  $('#flavourGrid').innerHTML = FLAV.map(f =>
    `<article class="mini-card"><span class="ic">${f.icon}</span><h3>${esc(f.name)}</h3><p>${f.text}</p></article>`).join('');
  $('#cultureGrid').innerHTML = CULT.map(c =>
    `<article class="mini-card"><span class="ic">${c.icon}</span><span class="when">${esc(c.when)}</span>
      <h3>${esc(c.name)}</h3><p>${c.text}</p></article>`).join('');
}

/* ---------- 14. Silhouette + navigation ---------- */
function buildOutline(){
  if(!OUTLINE) return;
  const brand = $('#brandPath'), cami = $('#camiOutlinePath');
  if(brand){ brand.setAttribute('d', OUTLINE.d); brand.closest('svg').setAttribute('viewBox', `0 0 ${OUTLINE.w} ${OUTLINE.h}`); }
  if(cami){ cami.setAttribute('d', OUTLINE.d); cami.closest('svg').setAttribute('viewBox', `0 0 ${OUTLINE.w} ${OUTLINE.h}`); }
}
function navSpy(){
  const links = $$('.mainnav a');
  const secs = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(!en.isIntersecting) return;
      links.forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === '#'+en.target.id)));
    });
  }, {rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s => io.observe(s));
  addEventListener('scroll', () => $('#topbar').classList.toggle('scrolled', scrollY > 10), {passive:true});
}

/* ---------- 15. Raccourcis clavier & routage ---------- */
addEventListener('keydown', e => {
  if(e.target.matches('input,textarea,select')) return;
  if(e.key === '/' ){ e.preventDefault(); $('#q').focus(); $('#explorer').scrollIntoView({behavior:'smooth'}); }
  else if(e.key === 'm' || e.key === 'M'){ $('#tripBtn').click(); }
  else if(e.key === 't' || e.key === 'T'){ $('#themeBtn').click(); }
  else if(e.key === 'r' || e.key === 'R'){ $('#surpriseBtn').click(); }
});
function readHash(){
  const h = location.hash;
  let m = h.match(/^#lieu=(.+)$/);
  if(m && byId.has(decodeURIComponent(m[1]))) { setTimeout(() => openSheet(decodeURIComponent(m[1])), 350); return; }
  m = h.match(/^#voyage=(.*)$/);
  if(m){
    const days = decodeURIComponent(m[1]).split('|').map(d => d.split('.').filter(x => byId.has(x)));
    if(days.some(d => d.length)){
      trip = {days: days.length ? days : [[]]}; saveTrip();
      setTimeout(() => { paintTrip(); $('#tripSheet').showModal(); toast('Voyage partagé chargé.'); }, 350);
    }
    history.replaceState(null, '', location.pathname + location.search);
  }
}

/* ---------- 16. Démarrage ---------- */
const yearEl = $('#year'); if(yearEl) yearEl.textContent = new Date().getFullYear();
$('#statPlaces').textContent = PLACES.length;
$('#statRoutes').textContent = ROUTES.length;
buildChips(); buildFilters(); buildRoutes(); buildCami(); buildPractical();
buildCalendar(); buildFlavours(); buildOutline(); navSpy();
paintTripCount();
render(true);
setTimeout(() => map.invalidateSize(), 200);
readHash();
addEventListener('hashchange', readHash);
if(matchMedia('(max-width:860px)').matches) setView('carte');
})();
