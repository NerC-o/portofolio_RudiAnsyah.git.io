const body = document.body;
const header = document.getElementById("header");
const progress = document.getElementById("progress");
const topBtn = document.getElementById("topBtn");
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

document.getElementById("year").textContent = new Date().getFullYear();

const roles = ["IT Support", "Technical Support", "Network Enthusiast", "Problem Solver", "Open to Work"];
let roleIndex = 0, charIndex = 0, deleting = false;
const typing = document.getElementById("typing");

function typeRole(){
  if(!typing) return;
  const word = roles[roleIndex];
  typing.textContent = deleting ? word.substring(0, charIndex--) : word.substring(0, charIndex++);
  let speed = deleting ? 45 : 90;
  if(!deleting && charIndex > word.length){ speed=1400; deleting=true; }
  if(deleting && charIndex < 0){ deleting=false; roleIndex=(roleIndex+1)%roles.length; charIndex=0; speed=300; }
  setTimeout(typeRole,speed);
}
typeRole();

window.addEventListener("scroll",()=>{
  if(!header) return;
  const y = window.scrollY;
  header.classList.toggle("scrolled",y>20);
  topBtn.classList.toggle("show",y>500);
  const max = document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width = `${max>0?(y/max)*100:0}%`;
});

topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

themeBtn.addEventListener("click",()=>{
  body.classList.toggle("dark");
  themeBtn.textContent = body.classList.contains("dark") ? "☀" : "☾";
  localStorage.setItem("rudi-theme",body.classList.contains("dark")?"dark":"light");
});
if(localStorage.getItem("rudi-theme")==="dark"){body.classList.add("dark");themeBtn.textContent="☀"}

menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible");});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
