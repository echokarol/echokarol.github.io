const translations = [
['К содержимому','Skip to content'],['Портфолио','Portfolio'],['Веб-разработчик','Web developer'],['Меню ＋','Menu ＋'],['Проекты','Projects'],['Обо мне','About'],['Связаться ↗','Get in touch ↗'],['Связаться','Get in touch'],['НЕЗАВИСИМАЯ ВЕБ-РАЗРАБОТКА','INDEPENDENT WEB DEVELOPMENT'],['Разрабатываю современные сайты, которые','I build modern websites that are'],['удобно использовать.','a pleasure to use.'],['HTML, CSS, JavaScript • Адаптивная вёрстка • Доработка существующих сайтов','HTML, CSS, JavaScript • Responsive layouts • Website improvements'],['Посмотреть проекты','Explore projects'],['От идеи — к работающей странице ↓','From an idea to a working page ↓'],['01 / ПОДХОД','01 / APPROACH'],['Хороший сайт начинается','A good website starts'],['с внимания.','with care.'],['К задаче, к деталям интерфейса и к человеку по другую сторону экрана.','For the brief, the interface details and the person on the other side of the screen.'],['Как строится работа ↗','How I work ↗'],['ИЗБРАННОЕ / 01','SELECTED / 01'],['Характер в деталях.','Character in every detail.'],['Демонстрационный сайт барбершопа.','A barbershop demo website.'],['В ФОКУСЕ','IN FOCUS'],['Чистая вёрстка.','Clean markup.'],['Понятная интерактивность.','Intuitive interactions.'],['Разные экраны.','Every screen.'],['ИНСТРУМЕНТЫ','TOOLKIT'],['01 / ОБО МНЕ','01 / ABOUT'],['Внимание к деталям.','Attention to detail.'],['Понятный подход.','A clear approach.'],['Я начинающий веб-разработчик. Создаю сайты на HTML, CSS и JavaScript, развиваю навыки на учебных проектах и готов работать над первыми задачами.','I am an early-career web developer. I build websites with HTML, CSS and JavaScript, develop my skills through practice projects and am ready to take on my first assignments.'],['Мне интересны чистая вёрстка, удобные интерфейсы и то, как сайт ощущается на разных экранах. Обсуждаю задачу заранее, объясняю решения и внимательно отношусь к обратной связи.','I care about clean markup, usable interfaces and how a website feels on different screens. I discuss the brief upfront, explain my decisions and listen carefully to feedback.'],['Семантический HTML','Semantic HTML'],['Адаптивный CSS','Responsive CSS'],['02 / ИЗБРАННЫЙ ПРОЕКТ','02 / SELECTED PROJECT'],['Из идеи — в браузер.','From idea to browser.'],['ДЕМОНСТРАЦИОННЫЙ ПРОЕКТ','DEMO PROJECT'],['УЧЕБНЫЙ / ДЕМОНСТРАЦИОННЫЙ ПРОЕКТ','PRACTICE / DEMO PROJECT'],['NOIR — сайт барбершопа','NOIR — barbershop website'],['Адаптивный демонстрационный сайт барбершопа с разделами услуг, галереей, контактами и интерактивной демонстрационной формой записи. Это учебный проект, а не оплаченный заказ клиента.','A responsive barbershop demo featuring services, a gallery, contacts and an interactive demo booking form. This is a practice project, not paid client work.'],['Открыть сайт ↗','Visit website ↗'],['03 / УСЛУГИ','03 / SERVICES'],['Для новой идеи.','For a new idea.'],['И существующего сайта.','Or an existing website.'],['Создание лендингов и сайтов-визиток','Landing pages and small business websites'],['Адаптивная HTML/CSS-вёрстка','Responsive HTML/CSS development'],['Исправление ошибок вёрстки','Layout bug fixes'],['Доработка существующих страниц','Improvements to existing pages'],['Добавление интерактивности на JavaScript','JavaScript interactions'],['04 / ПРОЦЕСС РАБОТЫ','04 / PROCESS'],['Каждый шаг — понятен.','Clarity at every step.'],['Обсуждение','Discovery'],['Уточняем задачу, материалы и желаемый результат.','We clarify the brief, available materials and desired result.'],['Оценка','Estimate'],['Согласуем объём, сроки и стоимость до начала работы.','We agree on scope, timeline and price before starting.'],['Разработка','Development'],['Создаю страницы и показываю промежуточный результат.','I build the pages and share progress along the way.'],['Проверка','Review'],['Проверяю адаптивность и поведение элементов, вношу правки.','I check layouts and interactions, then make adjustments.'],['Передача','Handover'],['Передаю файлы и пояснения по запуску сайта.','I deliver the files and explain how to launch the website.'],['05 / КОНТАКТЫ','05 / CONTACT'],['Начнём с вашей','Let’s start with your'],['идеи.','idea.'],['Расскажите, какой сайт вам нужен или что хотите улучшить.','Tell me about the website you need or what you would like to improve.'],['Напишите мне в Telegram или на email — обсудим задачу и следующий шаг.','Message me on Telegram or email me to discuss your project and the next step.'],['Портфолио веб-разработчика','Web developer portfolio'],['Услуги','Services'],['Наверх ↑','Back to top ↑'],['Основная навигация','Main navigation'],['Навигация в подвале','Footer navigation'],['Посмотреть проект NOIR','Explore the NOIR project'],['Открыть демонстрационный сайт NOIR в новой вкладке','Open the NOIR demo website in a new tab'],['Главный экран NOIR: барбер за работой и заголовок Характер. В каждой детали.','NOIR homepage showing a barber at work and the headline Character in every detail.'],['Скопировать email gghdjv164@gmail.com','Copy email gghdjv164@gmail.com']
];
const dictionary = new Map(translations);
const textEntries = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) {
 const node = walker.currentNode;
 if (node.parentElement.closest('script,style')) continue;
 const original = node.textContent;
 const translated = dictionary.get(original.trim());
 if (translated) textEntries.push({node, ru:original, en:original.replace(original.trim(), translated)});
}
const attributeEntries = [];
document.querySelectorAll('[aria-label],[alt]').forEach(node => ['aria-label','alt'].forEach(attribute => {
 const ru = node.getAttribute(attribute);
 if (dictionary.has(ru)) attributeEntries.push({node, attribute, ru, en:dictionary.get(ru)});
}));
let currentLanguage = 'ru';
const russianTitle = document.title;
const metadata = [...document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"]')].map(node=>({node,ru:node.content}));
function applyLanguage(language) {
 currentLanguage = language;
 document.documentElement.lang = language;
 textEntries.forEach(entry => { entry.node.textContent = entry[language]; });
 attributeEntries.forEach(entry => entry.node.setAttribute(entry.attribute, entry[language]));
 document.title = language === 'ru' ? russianTitle : 'Web developer — responsive HTML, CSS and JavaScript websites';
 metadata.forEach(entry => { entry.node.content = language === 'ru' ? entry.ru : 'Independent web developer portfolio. Responsive websites, HTML/CSS development and JavaScript improvements. Explore projects and get in touch.'; });
 document.querySelector('meta[property="og:locale"]').content = language === 'ru' ? 'ru_RU' : 'en_US';
 document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.language === language)));
 copyStatus.textContent = '';
}
let savedLanguage;
try { savedLanguage = localStorage.getItem('portfolio-language'); } catch {}
const browserLanguage = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
applyLanguage(['ru','en'].includes(savedLanguage) ? savedLanguage : browserLanguage.startsWith('ru') ? 'ru' : 'en');
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click',()=>{
 applyLanguage(button.dataset.language);
 try { localStorage.setItem('portfolio-language',currentLanguage); } catch {}
}));
