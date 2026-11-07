const menu = document.querySelector('#menu');
const nav = document.querySelector('#navigation');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
 document.querySelectorAll('main > section:not(.hero)').forEach(section => { section.classList.add('reveal'); observer.observe(section); });
}
const emailButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
function copyWithSelection(text) {
  const field = document.createElement('textarea');
  field.value = text;
  field.readOnly = true;
  field.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px;';
  document.body.append(field);
  field.focus();
  field.select();
  field.setSelectionRange(0, text.length);
  let copied = false;
  try { copied = document.execCommand('copy'); } catch {}
  field.remove();
  emailButton.focus({ preventScroll: true });
  return copied;
}
let copyStatusTimer;
emailButton.addEventListener('click', async () => {
  clearTimeout(copyStatusTimer);
  const email = emailButton.dataset.email;
  copyStatus.textContent = '';
  // Run the fallback during the click, while browser user activation is valid.
  let copied = copyWithSelection(email);
  if (!copied && navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(email); copied = true; } catch {}
  }
  copyStatus.textContent = copied ? (document.documentElement.lang === 'en' ? 'Copied' : 'Скопировано') : (document.documentElement.lang === 'en' ? 'Copying is blocked. The address is selected — copy it manually.' : 'Браузер запретил копирование. Адрес выделен — скопируйте его вручную.');
  if (copied) {
    copyStatusTimer = setTimeout(() => { copyStatus.textContent = ''; }, 2000);
  }
  if (!copied) {
    const range = document.createRange();
    range.selectNodeContents(emailButton);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
const objectCard = document.querySelector('.interface-object');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
objectCard.addEventListener('pointermove', event => {
 if (!finePointer.matches || reducedMotion.matches) return;
 const rect = objectCard.getBoundingClientRect();
 const x = (event.clientX - rect.left) / rect.width - .5;
 const y = (event.clientY - rect.top) / rect.height - .5;
 objectCard.style.transform = `perspective(1000px) rotateX(${-y*5}deg) rotateY(${x*6}deg) rotateZ(3deg)`;
});
function resetObject() { objectCard.style.transform = ''; }
objectCard.addEventListener('pointerleave', resetObject);
reducedMotion.addEventListener('change', resetObject);
