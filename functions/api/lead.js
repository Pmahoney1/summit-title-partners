/**
 * Cloudflare Pages Function: POST /api/lead
 * Receives the website contact form as JSON, drops honeypot hits,
 * validates required fields, and forwards the lead to FORM_ENDPOINT
 * (the GoHighLevel inbound webhook). Set FORM_ENDPOINT as an
 * environment variable on the Pages project (Production + Preview).
 */

// situation and county are optional: the homepage form does not ask for them.
const REQUIRED = ['fullName', 'phone', 'email', 'address', 'message'];

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

export async function onRequestPost({ request, env }) {
  const endpoint = env.FORM_ENDPOINT;
  if (!endpoint) return json({ ok: false, error: 'FORM_ENDPOINT is not configured' }, 500);

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json({ ok: false, error: 'Invalid JSON' }, 400);
  }

  // Honeypot: bots fill the hidden "website" field. Pretend it worked.
  if (data.website) return json({ ok: true }, 200);

  for (const key of REQUIRED) {
    if (!data[key] || !String(data[key]).trim()) {
      return json({ ok: false, error: 'Missing ' + key }, 400);
    }
  }

  const payload = {
    full_name: String(data.fullName).trim(),
    phone: String(data.phone).trim(),
    email: String(data.email).trim(),
    property_address: String(data.address).trim(),
    situation: String(data.situation || '').trim(),
    county: String(data.county || '').trim(),
    message: String(data.message).trim(),
    source: data.source || 'summittitlepartners.com',
    page: data.page || '',
    submitted_at: new Date().toISOString(),
    ip: request.headers.get('CF-Connecting-IP') || '',
    user_agent: request.headers.get('User-Agent') || ''
  };

  let upstream;
  try {
    upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    return json({ ok: false, error: 'Upstream request failed' }, 502);
  }

  if (!upstream.ok) return json({ ok: false, error: 'Upstream returned ' + upstream.status }, 502);
  return json({ ok: true }, 200);
}

export function onRequestGet() {
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}
