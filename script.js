(function () {
  const config = window.STORE_CONFIG || {};
  const year = new Date().getFullYear();
  const toast = document.getElementById('toast');
  const wifiCard = document.getElementById('wifiCard');
  const wifiToggle = document.getElementById('wifiToggle');
  const wifiDetails = document.getElementById('wifiDetails');

  document.getElementById('currentYear').textContent = year;

  if (config.storeName) {
    document.title = config.storeName;
    const title = document.querySelector('h1');
    if (title) title.textContent = config.storeName;
  }

  if (config.footerText) {
    document.getElementById('footerText').textContent = config.footerText.replace('{year}', year);
  }

  if (config.wifi) {
    document.getElementById('wifiName').textContent = config.wifi.ssid || '-';
    document.getElementById('wifiPassword').textContent = config.wifi.password || '-';
    document.getElementById('wifiHelp').textContent = config.wifi.helpText || '';
  }

  const linkMap = {
    googleLink: config.links && config.links.googleReview,
    instagramLink: config.links && config.links.instagram,
    whatsappLink: config.links && config.links.whatsapp
  };

  Object.entries(linkMap).forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (url && url !== '#') {
      el.href = url;
    } else {
      el.href = 'javascript:void(0)';
      el.classList.add('disabled');
      el.addEventListener('click', function (event) {
        event.preventDefault();
        showToast('Preencha este link no arquivo config.js');
      });
    }
  });

  if (wifiToggle && wifiDetails && wifiCard) {
    wifiToggle.addEventListener('click', function () {
      const isOpen = wifiToggle.getAttribute('aria-expanded') === 'true';
      wifiToggle.setAttribute('aria-expanded', String(!isOpen));
      wifiDetails.hidden = isOpen;
      wifiCard.classList.toggle('open', !isOpen);
    });
  }

  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const targetId = button.getAttribute('data-copy-target');
      const target = document.getElementById(targetId);
      const text = target ? target.textContent.trim() : '';
      try {
        await navigator.clipboard.writeText(text);
        showToast('Copiado!');
      } catch (error) {
        showToast('Não foi possível copiar');
      }
    });
  });

  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }
})();
