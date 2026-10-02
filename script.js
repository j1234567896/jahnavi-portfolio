"use strict";

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const skills = [
  { group: "Programming", items: [["Python",75],["Java",65],["C",70]] },
  { group: "Computer Science", items: [["Data Structures and Algorithms",70],["DBMS",70]] },
  { group: "Web Development", items: [["HTML",85],["CSS",80],["JavaScript",70],["Web Development",75]] },
  { group: "Tools / Technologies", items: [["Git",70],["GitHub",70],["DevOps Basics",55]] }
];

const projects = [
  {name:"EventMood",cat:"AI",label:"AI / NLP",area:"NLP, emotion detection",desc:"An NLP-based emotion detection project that analyzes text and identifies emotions using a pretrained language model."},
  {name:"Product Sentiment Analysis",cat:"AI",label:"AI / Machine Learning",area:"Machine Learning, text analysis",desc:"An AI/ML-based application that analyzes product-related text and identifies sentiment."},
  {name:"Music Recommendation System",cat:"Data",label:"Data / Recommendation System",area:"TF-IDF, cosine similarity",desc:"A music recommendation system that uses TF-IDF and cosine similarity to identify and recommend similar songs."},
  {name:"AgriSmart",cat:"Web",label:"Web / Agriculture",area:"Web application, crop recommendation",desc:"A practical agriculture-focused web application designed to provide crop recommendation support through a simple user interface."},
  {name:"AI Office Suite",cat:"AI",label:"AI / Productivity",area:"AI-powered office tools",desc:"An AI-powered office suite concept bringing documents, presentations, spreadsheets, letters and other productivity modules into one application."}
];
const projFilters = ["All","AI","Web","Data"];

const certTopics = ["Python","C","Data Structures","Design Thinking","Business Skills","Machine Learning","Feature Engineering","Artificial Intelligence","Quantum Computing","Web Development"];
const achievements = ["Internship achievements","Technical achievements","Hackathons","Other certifications"];
const experiences = [
  {role:"Web Development Internship",tech:"HTML, CSS, JavaScript"},
  {role:"AI / ML Internship",tech:"AI / Machine Learning"},
  {role:"AI and Deep Learning Internship",tech:"AI, Deep Learning"},
  {role:"Other technical internship experience",tech:"Technical projects and development"}
];

function setGreeting(){
  const el=$("#greeting");
  if(!el) return;
  const h=new Date().getHours();
  el.textContent=`${h<12?"Good morning":h<18?"Good afternoon":"Good evening"}, welcome to my portfolio`;
}

function startTyping(){
  const el=$("#typed");
  if(!el || reduceMotion) return;
  const words=["Computer Science Engineering Student","Web Developer","AI Enthusiast"];
  let w=0,c=0,deleting=false;
  function tick(){
    const word=words[w];
    c += deleting ? -1 : 1;
    el.textContent=word.slice(0,c);
    let speed=deleting?40:80;
    if(!deleting && c===word.length){deleting=true;speed=1500;}
    else if(deleting && c===0){deleting=false;w=(w+1)%words.length;speed=350;}
    setTimeout(tick,speed);
  }
  tick();
}

function renderSkills(){
  const grid=$("#skillGrid");
  if(!grid) return;
  grid.innerHTML=skills.map(group=>`<div class="col-md-6"><article class="glass p-4 h-100"><h3 class="h5 mb-3">${group.group}</h3><div class="skill-list">${group.items.map(([name,level])=>`<div class="skill"><span>${name}</span><div class="bar" aria-label="${name} skill level ${level} percent"><i data-w="${level}"></i></div></div>`).join("")}</div></article></div>`).join("");
}

function makeFilters(box,list,onPick){
  if(!box) return;
  box.innerHTML=list.map((f,i)=>`<button type="button" class="btn btn-outline-glow btn-sm${i===0?" active":""}" data-f="${f}" aria-pressed="${i===0}">${f}</button>`).join("");
  box.addEventListener("click",event=>{
    const button=event.target.closest("button[data-f]");
    if(!button) return;
    $$('button[data-f]',box).forEach(b=>{const active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-pressed",String(active));});
    onPick(button.dataset.f);
  });
}

function renderProjects(){
  const grid=$("#projGrid");
  if(!grid) return;
  grid.innerHTML=projects.map((p,i)=>`<div class="col-md-6 proj" data-cat="${p.cat}"><article class="glass proj-card"><span class="badge badge-glow align-self-start mb-2">${p.label}</span><h3 class="h4">${p.name}</h3><p>${p.desc}</p><p class="tag"><strong>Area:</strong> ${p.area}</p><div class="d-flex gap-2 flex-wrap"><button type="button" class="btn btn-glow btn-sm" data-project-index="${i}">View Project</button></div></article></div>`).join("");
  makeFilters($("#projFilters"),projFilters,filter=>{
    let shown=0;
    $$(".proj",grid).forEach(card=>{const show=filter==="All"||card.dataset.cat===filter;card.classList.toggle("hide",!show);if(show){shown++;card.classList.add("fade-in");}});
    const old=$("#noProj"); if(old) old.remove();
    if(!shown) grid.insertAdjacentHTML("beforeend",`<p id="noProj" class="col-12 text-center text-muted">No projects in this category yet.</p>`);
  });
  grid.addEventListener("click",event=>{
    const button=event.target.closest("button[data-project-index]");
    if(!button) return;
    const project=projects[Number(button.dataset.projectIndex)];
    $("#modalTitle").textContent=project.name;
    $("#modalCat").textContent=project.label;
    $("#modalDesc").textContent=project.desc;
    if(window.bootstrap) bootstrap.Modal.getOrCreateInstance($("#projModal")).show();
  });
}

function renderCerts(){
  const ach=$("#achGrid"), cert=$("#certGrid"), exp=$("#expList");
  if(ach) ach.innerHTML=achievements.map(a=>`<div class="col-sm-6 col-lg-3"><article class="glass p-3 h-100"><h3 class="h6">${a}</h3><p class="small mb-0">Add details here</p></article></div>`).join("");
  if(cert){
    cert.innerHTML=certTopics.map(t=>`<div class="col-sm-6 col-lg-4 cert-item" data-t="${t}"><article class="glass cert"><h3 class="h6 mb-1">${t}</h3><small>Organization, date and ID: add details</small></article></div>`).join("");
    makeFilters($("#certFilters"),["All",...certTopics],filter=>$$('.cert-item',cert).forEach(card=>card.classList.toggle("hide",filter!=="All"&&card.dataset.t!==filter)));
  }
  if(exp) exp.innerHTML=experiences.map(x=>`<li><article class="glass"><h3 class="h5">${x.role}</h3><p class="mb-0"><strong>Technologies:</strong> ${x.tech}</p></article></li>`).join("");
}

function countUp(el){
  if(!el || el.dataset.done) return;
  el.dataset.done="1";
  const end=Number(el.dataset.count), decimals=String(el.dataset.count).includes(".")?2:0;
  if(reduceMotion){el.textContent=end.toFixed(decimals);return;}
  let value=0;const step=()=>{value+=end/40;if(value>=end){el.textContent=end.toFixed(decimals);return;}el.textContent=value.toFixed(decimals);requestAnimationFrame(step)};step();
}

function initScroll(){
  const sections=$("main");
  if(!sections) return;
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("show");$$('[data-w]',entry.target).forEach(bar=>bar.style.width=`${bar.dataset.w}%`);$$('[data-count]',entry.target).forEach(countUp);}}),{threshold:.12});
  $$('main section').forEach(section=>{section.classList.add("reveal");revealObserver.observe(section);});
  const links=$$(".nav-link");
  const spy=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));}),{rootMargin:"-40% 0px -50% 0px"});
  $$('main section').forEach(section=>spy.observe(section));
  const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;$("#progress").style.width=`${max>0?(scrollY/max)*100:0}%`;$("#topBtn").hidden=scrollY<500};
  addEventListener("scroll",updateProgress,{passive:true});updateProgress();
  $("#topBtn").addEventListener("click",()=>scrollTo({top:0,behavior:reduceMotion?"auto":"smooth"}));
  $$(".navbar-nav .nav-link").forEach(link=>link.addEventListener("click",()=>{const menu=$("#menu");if(menu.classList.contains("show")&&window.bootstrap)bootstrap.Collapse.getOrCreateInstance(menu).hide();}));
}

function initForm(){
  const form=$("#contactForm"); if(!form) return;
  const rules={
    name:value=>value.trim()?"":"Please enter your name.",
    email:value=>!value.trim()?"Please enter your email.":/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())?"":"Enter a valid email like name@example.com.",
    subject:value=>value.trim()?"":"Please enter a subject.",
    message:value=>value.trim()?"":"Please write a message."
  };
  const validate=id=>{const input=$("#"+id);const error=rules[id](input.value);input.classList.toggle("is-invalid",Boolean(error));input.classList.toggle("is-valid",!error);input.nextElementSibling.textContent=error;input.setAttribute("aria-invalid",String(Boolean(error)));return !error;};
  Object.keys(rules).forEach(id=>$("#"+id).addEventListener("input",()=>{validate(id);$("#formAlert").textContent="";$("#formAlert").className="";}));
  $("#message").addEventListener("input",event=>$("#count").textContent=event.target.value.length);
  form.addEventListener("submit",event=>{event.preventDefault();let valid=true;Object.keys(rules).forEach(id=>{if(!validate(id))valid=false;});const alertBox=$("#formAlert");if(valid){alertBox.className="alert alert-success";alertBox.textContent=`Thank you, ${$("#name").value.trim()}! Your message is ready. (Demo form: no email is sent.)`;form.reset();$("#count").textContent="0";$$('.is-valid',form).forEach(input=>input.classList.remove("is-valid"));}else{alertBox.className="alert alert-danger";alertBox.textContent="Please fix the highlighted fields and try again.";const first=$(".is-invalid",form);if(first)first.focus();}});
}

function initPreview(){
  const desktop=$("#desktopPreviewBtn"),mobile=$("#mobilePreviewBtn");if(!desktop||!mobile)return;
  const set=mode=>{const isMobile=mode==="mobile";document.body.classList.toggle("preview-mobile",isMobile);desktop.classList.toggle("active",!isMobile);mobile.classList.toggle("active",isMobile);desktop.setAttribute("aria-pressed",String(!isMobile));mobile.setAttribute("aria-pressed",String(isMobile));};
  desktop.addEventListener("click",()=>set("desktop"));mobile.addEventListener("click",()=>set("mobile"));
}

function initEffects(){
  if(reduceMotion)return;
  document.addEventListener("mousemove",event=>{const card=event.target.closest(".glass:not(.hero-card)");if(!card)return;const rect=card.getBoundingClientRect();if(rect.width>500)return;const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;card.style.transform=`perspective(700px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-2px)`;});
  document.addEventListener("mouseleave",()=>$$('.glass').forEach(card=>card.style.transform=""));
}

document.addEventListener("DOMContentLoaded",()=>{
  renderSkills();
  renderProjects();
  renderCerts();
  setGreeting();
  startTyping();
  initScroll();
  initForm();
  initPreview();
  initEffects();
});
