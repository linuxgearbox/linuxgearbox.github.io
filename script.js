// Responsive nav toggle, smooth scrolling, and small animations
document.addEventListener('DOMContentLoaded',function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const logo = document.querySelector('.logo');
  const brandText = document.querySelector('.brand-text');
  
  // Logo fallback
  if(logo && brandText){
    logo.addEventListener('error', function(){
      logo.style.display = 'none';
      brandText.style.display = 'block !important';
    });
  }
  
  toggle && toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
          history.pushState && history.pushState(null,'',href);
          if(nav.style.display === 'flex'){
            nav.style.display = 'none';
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Subtle reveal on scroll
  const reveals = document.querySelectorAll('.section, .card, .video-card, .trainer-card');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('reveal');
        io.unobserve(e.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));
});
