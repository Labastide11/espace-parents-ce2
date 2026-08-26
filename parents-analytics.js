// V35.22 - Journal de visites anonyme de l'Espace Parents.
// Donnees envoyees : page, langue, appareil, orientation.
// Date/heure ajoutees cote Google Apps Script.
// Aucun nom, email, identifiant famille ou IP n'est envoye par ce code.
// Anti-doublon : une meme page au maximum toutes les 30 minutes par navigateur.
(function(){
  'use strict';

  const ENDPOINT = 'https://script.google.com/macros/s/AKfycby5ZFxvBE-o7oO4Xc4mTZ7iQ5XjYe1_qiSsLnvEUxcR0ULsYtNQV41FgsLTaFA1PRmNLQ/exec';
  const DEDUPE_MS = 30 * 60 * 1000;
  const STORAGE_PREFIX = 'parentsVisit30m:';

  // Ne jamais journaliser les essais locaux (file://, localhost, serveur local).
  function isProductionLike(){
    if(location.protocol !== 'https:') return false;
    const h = String(location.hostname || '').toLowerCase();
    if(!h || h === 'localhost' || h === '127.0.0.1' || h === '::1') return false;
    return true;
  }

  function pageFromHash(){
    const hash = String(location.hash || '').replace(/^#/, '');
    const pages = {
      '': 'accueil',
      'schedule': 'emploi-du-temps',
      'homework': 'devoirs',
      'learning': 'ce-que-nous-apprenons',
      'info': 'infos-classe',
      'info-rappels': 'cahier-famille-ecole',
      'info-upcoming': 'prochainement',
      'info-material': 'materiel-scolaire',
      'info-help': 'aider-mon-enfant',
      'info-digital': 'ecrans-numerique',
      'info-resources': 'ressources-utiles'
    };
    return pages[hash] || ('autre:' + hash.slice(0, 60));
  }

  function language(){
    try{
      if(window.PARENTS_I18N && window.PARENTS_I18N.lang){
        return String(window.PARENTS_I18N.lang).slice(0, 10);
      }
      return String(localStorage.getItem('parentsLanguage') || 'fr').slice(0, 10);
    }catch(e){
      return 'fr';
    }
  }

  function device(){
    const ua = String(navigator.userAgent || '').toLowerCase();
    const touch = Number(navigator.maxTouchPoints || 0) > 1;
    const minSide = Math.min(
      Number(window.screen && window.screen.width) || window.innerWidth || 0,
      Number(window.screen && window.screen.height) || window.innerHeight || 0
    );

    if(/ipad|tablet|kindle|silk/.test(ua)) return 'tablette';
    if(/android/.test(ua) && !/mobile/.test(ua)) return 'tablette';
    if(/iphone|ipod|android.*mobile|windows phone/.test(ua)) return 'mobile';

    // iPadOS peut se presenter comme un Mac.
    if(/macintosh/.test(ua) && touch) return 'tablette';

    // Secours simple pour les petits ecrans tactiles.
    if(touch && minSide >= 600 && minSide <= 1100) return 'tablette';
    if(minSide > 0 && minSide < 600) return 'mobile';
    return 'ordinateur';
  }

  function orientation(){
    try{
      return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'paysage';
    }catch(e){
      return window.innerHeight >= window.innerWidth ? 'portrait' : 'paysage';
    }
  }

  function storageKey(page){
    return STORAGE_PREFIX + page;
  }

  function recentlyLogged(page){
    try{
      const last = Number(localStorage.getItem(storageKey(page)) || 0);
      return last > 0 && (Date.now() - last) < DEDUPE_MS;
    }catch(e){
      // Si le stockage est bloque, on prefere ne pas multiplier les envois.
      return true;
    }
  }

  function markLogged(page){
    try{
      localStorage.setItem(storageKey(page), String(Date.now()));
    }catch(e){}
  }

  function sendVisit(){
    if(!isProductionLike()) return;

    const page = pageFromHash();
    if(recentlyLogged(page)) return;

    const payload = {
      page,
      langue: language(),
      appareil: device(),
      orientation: orientation()
    };

    // Marquer avant l'envoi evite les doublons dus a plusieurs evenements de navigation.
    markLogged(page);

    try{
      fetch(ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-store',
        keepalive: true,
        headers: {'Content-Type': 'text/plain;charset=UTF-8'},
        body: JSON.stringify(payload)
      }).catch(function(){
        // En cas d'echec reseau, autoriser un nouvel essai apres 2 minutes.
        try{
          localStorage.setItem(storageKey(page), String(Date.now() - DEDUPE_MS + 120000));
        }catch(e){}
      });
    }catch(e){}
  }

  function scheduleVisit(){
    clearTimeout(scheduleVisit._timer);
    scheduleVisit._timer = setTimeout(sendVisit, 150);
  }

  // history.replaceState est utilise par l'Espace Parents pour ses pseudo-pages.
  ['pushState','replaceState'].forEach(function(name){
    const original = history[name];
    if(typeof original !== 'function') return;
    history[name] = function(){
      const result = original.apply(this, arguments);
      scheduleVisit();
      return result;
    };
  });

  window.addEventListener('hashchange', scheduleVisit);
  window.addEventListener('popstate', scheduleVisit);

  // Un changement de langue ne force pas une nouvelle visite dans les 30 minutes,
  // mais la prochaine page consultee prendra bien la nouvelle langue.
  window.addEventListener('parentslanguagechange', scheduleVisit);

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', scheduleVisit, {once:true});
  }else{
    scheduleVisit();
  }
})();
