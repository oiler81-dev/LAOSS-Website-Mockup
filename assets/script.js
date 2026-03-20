
(function(){
  const data = window.LA_ORTHOS_DATA || {};
  const site = data.site || {};

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }
  function bySlug(arr, slug){ return (arr || []).find(x => x.slug === slug); }
  function getParam(name){ return new URLSearchParams(location.search).get(name); }
  function initials(name){
    return String(name||"").split(/[\s,.-]+/).filter(Boolean).slice(0,2).map(s=>s[0]).join("").toUpperCase();
  }
  function header(active=''){
    return `
    <div class="topbar">
      <div class="container topbar-inner">
        <div>Orthopedic surgery, spine care, sports medicine, and podiatry across Los Angeles</div>
        <div class="topbar-links">
          <a href="locations.html">8 locations</a>
          <a href="services.html">Specialty care</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="index.html" aria-label="LA Orthos Home">
          <img src="${site.logo}" alt="Los Angeles Orthopedic Surgery Specialists logo">
        </a>
        <nav class="nav">
          <a class="${active==='home'?'active':''}" href="index.html">Home</a>
          <a class="${active==='about'?'active':''}" href="about.html">About</a>
          <a class="${active==='providers'?'active':''}" href="providers.html">Providers</a>
          <a class="${active==='services'?'active':''}" href="services.html">Services</a>
          <a class="${active==='conditions'?'active':''}" href="conditions.html">Conditions</a>
          <a class="${active==='locations'?'active':''}" href="locations.html">Locations</a>
          <a class="${active==='contact'?'active':''}" href="contact.html">Contact</a>
        </nav>
        <div class="nav-actions">
          <a class="btn btn-ghost" target="_blank" rel="noopener" href="${site.payUrl}">Pay now</a>
          <a class="btn btn-primary" target="_blank" rel="noopener" href="${site.bookUrl}">Request appointment</a>
        </div>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <div class="container">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="providers.html">Providers</a>
          <a href="services.html">Services</a>
          <a href="conditions.html">Conditions</a>
          <a href="locations.html">Locations</a>
          <a href="contact.html">Contact</a>
          <a class="btn btn-ghost" target="_blank" rel="noopener" href="${site.payUrl}">Pay now</a>
          <a class="btn btn-primary" target="_blank" rel="noopener" href="${site.bookUrl}">Request appointment</a>
        </div>
      </div>
    </header>`;
  }

  function footer(){
    return `
    <footer class="footer">
      <div class="container footer-grid">
        <div>
          <a class="brand" href="index.html"><img src="${site.logo}" alt="LA Orthos logo"></a>
          <p>Los Angeles Orthopedic Surgery Specialists is committed to providing compassionate, high-quality orthopedic care that promotes lifelong well-being.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="about.html">About Us</a>
          <a href="providers.html">Providers</a>
          <a href="services.html">Services</a>
          <a href="conditions.html">Conditions</a>
          <a href="locations.html">Locations</a>
        </div>
        <div>
          <h4>Actions</h4>
          <a target="_blank" rel="noopener" href="${site.bookUrl}">Request appointment</a>
          <a target="_blank" rel="noopener" href="${site.payUrl}">Pay now</a>
          <a href="contact.html">Contact us</a>
          <a href="tel:${String(site.phone).replace(/[^\d]/g,'')}">Call ${site.phone}</a>
        </div>
      </div>
    </footer>
    <div class="sticky-cta">
      <div class="inner">
        <a class="btn btn-dark" href="tel:${String(site.phone).replace(/[^\d]/g,'')}">Call now</a>
        <a class="btn btn-primary" target="_blank" rel="noopener" href="${site.bookUrl}">Book</a>
      </div>
    </div>`;
  }

  function providerCard(p){
    const photo = p.image ? `<img src="${p.image}" alt="${p.name}">` : `<div class="initials">${initials(p.name)}</div>`;
    const tags = (p.specialties || []).slice(0,3).map(t=>`<span>${t}</span>`).join('');
    return `
    <article class="card provider-card" data-category="${p.category}">
      <div class="provider-photo">${photo}</div>
      <div class="provider-body">
        <div class="badge">${p.category}</div>
        <h3>${p.name}</h3>
        <p class="provider-meta">${p.role}</p>
        <p>${p.bio}</p>
        <a class="link" href="provider.html?slug=${p.slug}">View provider</a>
        <div class="provider-tags">${tags}</div>
      </div>
    </article>`;
  }

  function serviceCard(s){
    return `<article class="card feature-card service-card">
      <div class="media"><img src="${s.image}" alt="${s.name}"></div>
      <div class="body">
        <div class="tag">Orthopedic service</div>
        <h3>${s.name}</h3>
        <p>${s.summary}</p>
        <a class="link" href="service.html?slug=${s.slug}">Explore service</a>
      </div>
    </article>`;
  }

  function locationCard(l){
    return `<article class="card location-card">
      <div class="mini">Location</div>
      <h3>${l.name}</h3>
      <p>${l.summary}</p>
      <p><strong>${l.phone}</strong><br>${l.address}</p>
      <a class="link" href="location.html?slug=${l.slug}">View clinic</a>
    </article>`;
  }

  function conditionCard(c){
    return `<article class="card feature-card">
      <div class="media"><img src="${c.image}" alt="${c.name}"></div>
      <div class="body">
        <div class="tag">Condition</div>
        <h3>${c.name}</h3>
        <p>${c.summary}</p>
        <a class="link" href="condition.html?slug=${c.slug}">See treatment paths</a>
      </div>
    </article>`;
  }

  function setupChrome(active){
    const app = qs('#site-chrome');
    if(app) app.innerHTML = header(active);
    const foot = qs('#site-footer');
    if(foot) foot.innerHTML = footer();
    const menuToggle = qs('#menuToggle');
    const mobileMenu = qs('#mobileMenu');
    if(menuToggle && mobileMenu){
      menuToggle.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));
      qsa('a', mobileMenu).forEach(a=>a.addEventListener('click', ()=> mobileMenu.classList.remove('open')));
    }
  }

  function renderHome(){
    setupChrome('home');
    qs('#featured-services').innerHTML = data.services.slice(0,6).map(serviceCard).join('');
    qs('#featured-providers').innerHTML = data.providers.slice(0,8).map(providerCard).join('');
    qs('#featured-locations').innerHTML = data.locations.slice(0,4).map(locationCard).join('');
    qs('#featured-conditions').innerHTML = data.conditions.slice(0,4).map(conditionCard).join('');
  }

  function renderProviders(){
    setupChrome('providers');
    const wrap = qs('#provider-list');
    const search = qs('#provider-search');
    const filterWrap = qs('#provider-filters');
    const categories = [...new Set(data.providers.map(p=>p.category))];
    filterWrap.innerHTML = ['All', ...categories].map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" data-filter="${c}">${c}</button>`).join('');
    function draw(){
      const term = (search.value || '').toLowerCase();
      const active = qs('.filter-btn.active', filterWrap)?.dataset.filter || 'All';
      wrap.innerHTML = data.providers.filter(p=>{
        const hit = [p.name,p.role,p.bio,p.category,...(p.specialties||[])].join(' ').toLowerCase().includes(term);
        const cat = active === 'All' || p.category === active;
        return hit && cat;
      }).map(providerCard).join('');
    }
    filterWrap.addEventListener('click', e=>{
      if(!e.target.matches('.filter-btn')) return;
      qsa('.filter-btn', filterWrap).forEach(b=>b.classList.remove('active'));
      e.target.classList.add('active'); draw();
    });
    search.addEventListener('input', draw);
    draw();
  }

  function renderProviderDetail(){
    setupChrome('providers');
    const p = bySlug(data.providers, getParam('slug')) || data.providers[0];
    document.title = `${p.name} | LA Orthos`;
    qs('#provider-name').textContent = p.name;
    qs('#provider-role').textContent = p.role;
    qs('#provider-category').textContent = p.category;
    qs('#provider-bio').textContent = p.bio;
    qs('#provider-philosophy').textContent = p.philosophy || 'Care is centered on listening, clarity, and a treatment plan that reflects the patient’s real goals.';
    qs('#provider-specialties').innerHTML = (p.specialties || []).map(s=>`<li>${s}</li>`).join('');
    qs('#provider-locations').innerHTML = (p.locations && p.locations.length ? p.locations : ['Multiple LA Orthos locations']).map(s=>`<li>${s}</li>`).join('');
    const img = qs('#provider-image');
    const initialsEl = qs('#provider-initials');
    if(p.image){ img.src = p.image; img.alt = p.name; img.hidden = false; initialsEl.hidden = true; }
    else { initialsEl.textContent = initials(p.name); img.hidden = true; initialsEl.hidden = false; }
    qs('#provider-more').innerHTML = data.providers.filter(x=>x.slug!==p.slug).slice(0,4).map(providerCard).join('');
  }

  function renderServices(){
    setupChrome('services');
    qs('#service-list').innerHTML = data.services.map(serviceCard).join('');
  }

  function renderServiceDetail(){
    setupChrome('services');
    const s = bySlug(data.services, getParam('slug')) || data.services[0];
    document.title = `${s.name} | LA Orthos`;
    qs('#service-name').textContent = s.name;
    qs('#service-summary').textContent = s.summary;
    qs('#service-hero-copy').textContent = s.hero;
    qs('#service-image').src = s.image;
    qs('#service-image').alt = s.name;
    qs('#service-bullets').innerHTML = (s.bullets || []).map(b=>`<li>${b}</li>`).join('');
    qs('#related-conditions').innerHTML = data.conditions.filter(c=> (c.related || []).includes(s.slug)).map(conditionCard).join('');
  }

  function renderConditions(){
    setupChrome('conditions');
    qs('#condition-list').innerHTML = data.conditions.map(conditionCard).join('');
  }

  function renderConditionDetail(){
    setupChrome('conditions');
    const c = bySlug(data.conditions, getParam('slug')) || data.conditions[0];
    document.title = `${c.name} | LA Orthos`;
    qs('#condition-name').textContent = c.name;
    qs('#condition-summary').textContent = c.summary;
    qs('#condition-image').src = c.image;
    qs('#condition-image').alt = c.name;
    const related = (c.related || []).map(sl => bySlug(data.services, sl)).filter(Boolean);
    qs('#condition-services').innerHTML = related.map(serviceCard).join('');
  }

  function renderLocations(){
    setupChrome('locations');
    qs('#location-list').innerHTML = data.locations.map(locationCard).join('');
  }

  function renderLocationDetail(){
    setupChrome('locations');
    const l = bySlug(data.locations, getParam('slug')) || data.locations[0];
    document.title = `${l.name} Clinic | LA Orthos`;
    qs('#location-name').textContent = l.name;
    qs('#location-address').textContent = l.address;
    qs('#location-phone').textContent = l.phone;
    qs('#location-phone').href = `tel:${String(l.phone).replace(/[^\d]/g,'')}`;
    qs('#location-fax').textContent = l.fax;
    qs('#location-hours').textContent = l.hours;
    qs('#location-summary').textContent = l.summary;
    qs('#location-image').src = l.image;
    qs('#location-map').src = `https://www.google.com/maps?q=${encodeURIComponent(l.address)}&output=embed`;
    qs('#other-locations').innerHTML = data.locations.filter(x=>x.slug!==l.slug).slice(0,4).map(locationCard).join('');
  }

  function renderAbout(){
    setupChrome('about');
    qs('#about-providers').textContent = data.providers.length;
    qs('#about-locations').textContent = data.locations.length;
    qs('#about-services').textContent = data.services.length;
  }

  function renderContact(){
    setupChrome('contact');
    qs('#all-locations-mini').innerHTML = data.locations.map(l=>`<div class="item"><strong>${l.name}</strong><p>${l.phone}<br>${l.address}</p></div>`).join('');
  }

  const page = document.body.dataset.page;
  const map = {
    home:renderHome, about:renderAbout, providers:renderProviders, provider:renderProviderDetail,
    services:renderServices, service:renderServiceDetail, conditions:renderConditions,
    condition:renderConditionDetail, locations:renderLocations, location:renderLocationDetail, contact:renderContact
  };
  if(map[page]) map[page]();
})();
