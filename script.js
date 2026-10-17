const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Keep the visitor in the same section when switching language.
document.querySelectorAll('[data-lang-link]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = link.getAttribute('href');
    window.location.href = target + (window.location.hash || '');
  });
});

// Names: letters and spaces only, including Chinese and other Unicode letters.
document.querySelectorAll('[data-letters-only]').forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^\p{L}\s]/gu, '');
  });
});

// WhatsApp / phone: digits only.
document.querySelectorAll('[data-numbers-only]').forEach(input => {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');
  });
});

const JBL_WHATSAPP = '60192648802';
const isChinese = document.documentElement.lang.toLowerCase().startsWith('zh');
function clean(value) { return String(value || '').trim(); }
function openWhatsApp(message) {
  const url = `https://wa.me/${JBL_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

const trialForm = document.getElementById('free-trial-form');
if (trialForm) {
  trialForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!trialForm.reportValidity()) return;
    const data = new FormData(trialForm);
    const message = isChinese ? [
      '您好，乐学双语！', '', '我想预约免费体验课。', '',
      `家长 / 监护人姓名：${clean(data.get('parent-name'))}`,
      `孩子姓名：${clean(data.get('child-name'))}`,
      `孩子年龄：${clean(data.get('child-age'))}`,
      `家长 WhatsApp 号码：${clean(data.get('whatsapp'))}`,
      `课程 / 学习兴趣：${clean(data.get('programme-interest'))}`,
      `希望上课的日期 / 时间：${clean(data.get('preferred-time')) || '未注明'}`,
      `孩子的学习兴趣：${clean(data.get('learning-interests')) || '未注明'}`
    ].join('\n') : [
      'Hi Joyful Bilingual Learning Academy,', '', 'I would like to book a free trial.', '',
      `Parent / Guardian Name: ${clean(data.get('parent-name'))}`,
      `Child’s Name: ${clean(data.get('child-name'))}`,
      `Child’s Age: ${clean(data.get('child-age'))}`,
      `Parent WhatsApp Number: ${clean(data.get('whatsapp'))}`,
      `Programme / Learning Interest: ${clean(data.get('programme-interest'))}`,
      `Preferred Day / Time: ${clean(data.get('preferred-time')) || 'Not specified'}`,
      `Learning Interests: ${clean(data.get('learning-interests')) || 'Not specified'}`
    ].join('\n');
    openWhatsApp(message);
  });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const message = isChinese ? [
      '您好，乐学双语！', '', '我有一个咨询。', '',
      `姓名：${clean(data.get('name'))}`,
      `WhatsApp / 电话：${clean(data.get('phone'))}`,
      `孩子年龄：${clean(data.get('child-age')) || '未注明'}`,
      `咨询内容：${clean(data.get('message'))}`
    ].join('\n') : [
      'Hi Joyful Bilingual Learning Academy,', '', 'I have an enquiry.', '',
      `Name: ${clean(data.get('name'))}`,
      `WhatsApp / Phone: ${clean(data.get('phone'))}`,
      `Child’s Age: ${clean(data.get('child-age')) || 'Not specified'}`,
      `Enquiry: ${clean(data.get('message'))}`
    ].join('\n');
    openWhatsApp(message);
  });
}
