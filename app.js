const sessions = [
 ['Lundi', [['07:30 – 08:30','Yoga Flow','yoga','Sarah'],['12:30 – 13:20','Pilates Core','pilates','Elena'],['18:30 – 19:30','Callisthénie Strength','callisthenie','Marc']]],
 ['Mardi', [['08:00 – 08:50','Pilates Sculpt','pilates','Elena'],['18:00 – 19:00','Vinyasa Flow','yoga','Sarah']]],
 ['Mercredi', [['07:30 – 08:30','Callisthénie Flow','callisthenie','Marc'],['12:30 – 13:20','Sculpt Pilates','pilates','Elena'],['18:30 – 19:45','Yin & Somatic Reset','yoga','Sarah']]],
 ['Jeudi', [['07:30 – 08:30','Morning Yoga Flow','yoga','Sarah'],['18:00 – 19:00','Callisthénie Initiate','callisthenie','Marc']]],
 ['Vendredi', [['08:00 – 08:50','Pilates Sculpt','pilates','Elena'],['18:00 – 19:15','Yin Yoga & Respiration','yoga','Sarah']]],
 ['Samedi', [['09:00 – 10:00','Handstand & Body Control','callisthenie','Marc'],['10:30 – 11:30','Flow & Équilibre','yoga','Sarah']]]
];
const schedule=document.getElementById('schedule');
for (const [day,classes] of sessions) {
 const column=document.createElement('div'); const title=document.createElement('h3'); title.textContent=day; column.append(title);
 for(const [time,name,category,teacher] of classes){ const button=document.createElement('button'); button.className=`session ${category}`; button.innerHTML=`<strong>${time}</strong><span>${name}</span><small>avec ${teacher}</small>`; button.addEventListener('click',()=>openBooking(name,`${day} · ${time}`,teacher)); column.append(button); }
 schedule.append(column);
}
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',b===button?'true':'false')});let count=0;document.querySelectorAll('.course').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++});document.querySelector('.filter-status').textContent=`${count} disciplines affichées`;}));
const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('navigation');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Ouvrir le menu')}));
const modal=document.getElementById('modal'),content=document.getElementById('modal-content');
function showModal(html){content.innerHTML=html;modal.showModal();document.body.style.overflow='hidden'}
modal.addEventListener('close',()=>document.body.style.overflow='');
document.querySelector('.modal-close').addEventListener('click',()=>modal.close());
modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});
function openBooking(name,time,teacher){showModal(`<span class="eyebrow">Votre parenthèse Nuage</span><h2>${name}</h2><div class="booking-summary">${time||'Une pratique à votre rythme'}${teacher?`<br>Avec ${teacher}`:''}</div><p>Un moment pour vous reconnecter à votre corps, guidé dans un cadre calme et bienveillant.</p><p class="demo-note">Cette version reproduit une maquette. Les réservations et les paiements ne sont pas encore ouverts. Aucun créneau n’est réservé.</p><button class="button dark" id="back-planning">Explorer le planning</button>`);document.getElementById('back-planning').addEventListener('click',()=>{modal.close();document.getElementById('planning').scrollIntoView({behavior:'smooth'})})}
document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>openBooking(b.dataset.book)));
const pages={
 about:['Un studio, un univers','Ce site est une reproduction interactive de la maquette Studio Nuage fournie. Les photos ont été recréées ou restaurées en haute définition avec une IA à partir de cette image. Les portraits sont des interprétations visuelles de la maquette. Les contenus fins peu lisibles ont été reformulés pour la lecture sur le web.','Les cours, tarifs, horaires et portraits servent à présenter cette maquette. Le service de réservation reste à connecter au véritable studio.'],
 first:['Votre première séance','Choisissez une discipline et découvrez son créneau dans le planning. Prévoyez une tenue confortable, une gourde et quelques minutes pour vous installer.','Avant l’ouverture des réservations, les modalités pratiques et le matériel disponible devront être confirmés par le studio.'],
 faq:['Questions fréquentes','<strong>Faut-il avoir déjà pratiqué ?</strong><br>La maquette propose plusieurs cours pour débutants et tous niveaux. Chaque fiche indique le niveau.','<strong>Comment réserver ?</strong><br>Sélectionnez un cours pour afficher les détails. La réservation réelle sera disponible une fois le studio connecté.','<strong>Peut-on choisir plusieurs disciplines ?</strong><br>Les formules présentées donnent accès au Yoga, au Pilates et à la Callisthénie. Les conditions définitives restent à confirmer.'],
 contact:['Restons en contact','Les coordonnées du studio n’étaient pas lisibles sur la maquette fournie. Cet espace pourra accueillir son adresse, son e-mail et ses liens sociaux.','Aucune demande n’est envoyée depuis cette version de démonstration.'],
 privacy:['Votre confidentialité','Ce site ne comporte ni formulaire de collecte, ni paiement, ni suivi analytique. Aucun renseignement personnel ne vous est demandé.','Les polices sont chargées depuis Google Fonts. L’hébergement peut utiliser les informations techniques nécessaires à son fonctionnement.']
};
document.querySelectorAll('[data-modal]').forEach(button=>button.addEventListener('click',()=>{const [title,...paragraphs]=pages[button.dataset.modal];showModal(`<span class="eyebrow">Studio Nuage</span><h2>${title}</h2>${paragraphs.map(p=>`<p>${p}</p>`).join('')}`)}));
