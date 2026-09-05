/* =========================================================
   CCA — Cuba Content Awards · Contador en tiempo real
   ========================================================= */

// ============================================================
// 👉 CAMBIAR AQUÍ LA FECHA/HORA DEL EVENTO
// Formato ISO con offset de La Habana (-05:00, hora estándar de Cuba).
// Si Cuba entra en horario de verano, ajustar el offset a -04:00.
// ============================================================
const TARGET_DATE = new Date('2026-12-05T20:00:00-05:00');

const elDays = document.getElementById('cd-days');
const elHours = document.getElementById('cd-hours');
const elMinutes = document.getElementById('cd-minutes');

function pad(num) {
  return String(Math.max(0, num)).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  let diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    elDays.textContent = '00';
    elHours.textContent = '00';
    elMinutes.textContent = '00';
    return;
  }

  const msInMinute = 1000 * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(diff / msInDay);
  diff -= days * msInDay;

  const hours = Math.floor(diff / msInHour);
  diff -= hours * msInHour;

  const minutes = Math.floor(diff / msInMinute);

  elDays.textContent = pad(days);
  elHours.textContent = pad(hours);
  elMinutes.textContent = pad(minutes);
}

// Primera pintura inmediata, luego refresco cada segundo
// (los minutos solo cambian visualmente al cruzar el umbral,
// pero comprobamos con esa frecuencia para que sea preciso).
updateCountdown();
setInterval(updateCountdown, 1000);
