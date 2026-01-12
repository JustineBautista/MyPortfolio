// script.js - plain JS implementation of the React portfolio behaviors

// --- Data (converted from original) ---
const projects = [
  {
    title: "Student Management System",
    description: "Full-stack web application for managing student records, attendance tracking, and grade management with role-based access control.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "#",
    live: "#",
    featured: true,
    stats: { type: "Academic", duration: "3 months" }
  },
  {
    title: "E-Commerce Website",
    description: "Online shopping platform with user authentication, product catalog, shopping cart, and checkout functionality. Responsive design for all devices.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    github: "#",
    live: "#",
    featured: true,
    stats: { type: "Personal", duration: "2 months" }
  },
  {
    title: "Weather App",
    description: "Real-time weather application using weather API with location search, 5-day forecast, and beautiful UI with weather animations.",
    tech: ["React", "Tailwind", "OpenWeather API"],
    github: "#",
    live: "#",
    featured: true,
    stats: { type: "Learning", duration: "2 weeks" }
  },
  {
    title: "Task Manager",
    description: "To-do list application with CRUD operations, local storage, drag-and-drop functionality, and task categorization.",
    tech: ["JavaScript", "HTML", "CSS", "Local Storage"],
    github: "https://github.com/JustineBautista/TO-DO-LIST-WEB-APP",
    live: "https://justinebautista.github.io/TO-DO-LIST-WEB-APP/",
    featured: false,
    stats: { type: "Personal", duration: "1 month" }
  },
  {
    title: "EHR System",
    description: "AURORA is a comprehensive Electronic Health Records (EHR) system designed for Olivarez College Tagaytay's College of Nursing and Health-Related Sciences. It provides a secure, user-friendly platform for managing patient information, medical records, and healthcare data with automated record integration and reliable data retrieval.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
    featured: false,
    stats: { type: "Personal", duration: "3 weeks" }
  },
  {
    title: "Quiz Application",
    description: "Interactive quiz app with timer, score tracking, multiple categories, and results analysis. Built as a learning project.",
    tech: ["JavaScript", "React", "CSS"],
    github: "#",
    live: "#",
    featured: false,
    stats: { type: "Learning", duration: "2 weeks" }
  }
];

// --- DOM Helpers ---
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// --- Typewriter effect ---
(function typewriter(){
  const fullText = "Full Stack Developer";
  const el = document.getElementById('typedText');
  let i = 0;
  const speed = 90;
  const interval = setInterval(()=>{
    i++;
    el.textContent = fullText.slice(0,i);
    if(i >= fullText.length) clearInterval(interval);
  }, speed);
})();

// --- Mouse-follow blob ---
(function mouseBlob(){
  const blob = document.getElementById('blobFollow');
  if(!blob) return;
  window.addEventListener('mousemove', (e)=>{
    // Use transform to position blob center on cursor
    const x = e.clientX;
    const y = e.clientY;
    blob.style.transform = `translate(${x - 210}px, ${y - 210}px)`; // 420/2
  }, {passive:true});
})();

// --- Scroll navbar change ---
(function scrollNav(){
  const nav = document.getElementById('mainNav');
  function onScroll(){
    if(window.scrollY > 60){
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

// --- Mobile menu toggle ---
(function mobileMenu(){
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let open = false;
  menuToggle.addEventListener('click', ()=>{
    open = !open;
    mobileMenu.classList.toggle('hidden', !open);
    // simple animation: change icon (swap inner svg) - not required
  });

  // Close mobile menu on link click
  $$('.mobile-link').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const t = e.currentTarget.dataset.target;
      document.getElementById(t)?.scrollIntoView({behavior:'smooth', block:'start'});
      open = false;
      mobileMenu.classList.add('hidden');
    });
  });
})();

// --- Navigation buttons scrolling ---
(function navButtons(){
  $$('.nav-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const t = e.currentTarget.dataset.target;
      document.getElementById(t)?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
  $$('.link-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const t = e.currentTarget.dataset.target;
      document.getElementById(t)?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
})();

// --- Projects render ---
(function renderProjects(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  projects.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card project-card';
    card.innerHTML = `
      ${p.featured ? `<div class="project-badge">⭐ Featured</div>` : ''}
      <div class="project-title">${escapeHtml(p.title)}</div>
      <p class="project-desc">${escapeHtml(p.description)}</p>
      <div class="tech-list">
        ${p.tech.map(t=>`<span class="tech-pill">${escapeHtml(t)}</span>`).join('')}
      </div>
      <div class="project-meta" style="color:var(--muted);font-size:13px;margin-bottom:12px;">
        ${Object.entries(p.stats).map(([k,v])=>`<span style="margin-right:12px"><strong style="color:var(--accent1)">${v}</strong> ${k}</span>`).join('')}
      </div>
      <div style="display:flex;gap:8px;">
        <a href="${p.github}" class="btn ghost" target="_blank">Code</a>
        <a href="${p.live}" class="btn primary" target="_blank">Live</a>
      </div>
    `;
    grid.appendChild(card);
  });

  function escapeHtml(s){
    return String(s).replace(/[&<>"'`]/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','`':'&#x60;'}[m]));
  }
})();

// --- Contact form demo behavior ---
(function contactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const subject = $('#subject').value.trim();
    const message = $('#message').value.trim();
    if(!name || !email || !message){
      alert('Please fill required fields.');
      return;
    }
    // Demo: show thank you
    alert('Thank you for your message! This is a demo — connect your own email service.');
    form.reset();
  });
})();

// --- View Work button scroll to Projects ---
(function viewWork(){
  const btn = document.getElementById('viewWorkBtn');
  if(!btn) return;
  btn.addEventListener('click', ()=>{
    document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});
  });
})();

// --- Small helper: hide/show scroll indicator once user scrolls ---
(function scrollIndicator(){
  const indicator = document.querySelector('.scroll-indicator');
  if(!indicator) return;
  const hideOnceScrolled = ()=>{
    if(window.scrollY > 40) indicator.style.opacity = '0';
    else indicator.style.opacity = '1';
  };
  window.addEventListener('scroll', hideOnceScrolled, {passive:true});
  hideOnceScrolled();
})();

// --- Accessibility / minor enhancements ---
(function reduceMotion(){
  try{
    if(window.matchMedia('(prefers-reduced-motion)').matches){
      document.documentElement.style.setProperty('--transition-duration','0s');
    }
  }catch(e){}
})();
