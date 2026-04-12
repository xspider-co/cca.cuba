const BREVO_CONTACTS = 'https://api.brevo.com/v3/contacts';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method === 'GET') {
      return json({
        ok: true,
        brevoConfigured: Boolean(process.env.BREVO_API_KEY),
        listId: Number(process.env.BREVO_LIST_ID || '6'),
      });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Método no permitido' }, 405);
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID || '6');

    if (!apiKey) {
      console.error('BREVO_API_KEY no está definida');
      return json({ error: 'Servicio no configurado' }, 500);
    }

    if (!Number.isFinite(listId) || listId < 1) {
      return json({ error: 'Servicio no configurado' }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Petición no válida' }, 400);
    }

    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Introduce un correo válido' }, 400);
    }

    try {
      const r = await fetch(BREVO_CONTACTS, {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds: [listId],
          updateEnabled: true,
        }),
      });

      const text = await r.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (r.ok) {
        return json({ ok: true });
      }

      const code = data.code || '';
      const msg = (data.message || text || '').toString();
      if (
        r.status === 400 &&
        (code === 'duplicate_parameter' || /duplicate/i.test(msg))
      ) {
        return json({ ok: true, duplicate: true });
      }

      console.error('Brevo', r.status, text);
      return json(
        { error: 'No se pudo completar. Inténtalo de nuevo.' },
        502
      );
    } catch (err) {
      console.error(err);
      return json(
        { error: 'No se pudo completar. Inténtalo de nuevo.' },
        502
      );
    }
  },
};
