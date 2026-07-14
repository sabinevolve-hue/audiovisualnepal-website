# Contact form — email delivery setup (one-time)

The contact form now emails every enquiry to **info@audiovisualnepal.com** via Resend.
Until the API key is added, the form still works — it opens a pre-filled WhatsApp
message so no enquiry is lost. To switch on email inbox delivery:

## Steps (≈5 minutes)

1. Create a free Resend account: https://resend.com/signup
   (Free plan = 3,000 emails/month — far more than enough.)

2. In Resend → **API Keys** → **Create API Key** → copy it (starts with `re_...`).

3. In Vercel → your project → **Settings → Environment Variables** → add:
   - `RESEND_API_KEY` = the key you copied
   Save, then **Redeploy** (Deployments → ⋯ → Redeploy) so it takes effect.

4. Test: submit the form on /contact. You should receive an email at
   info@audiovisualnepal.com within seconds. Reply-to is set to the sender,
   so you can reply straight from your inbox.

## Optional — send from your own domain (better deliverability)

By default emails send from `onboarding@resend.dev`. To send from your domain:
1. Resend → **Domains** → add `audiovisualnepal.com`, add the shown DNS records.
2. Once verified, add Vercel env `CONTACT_FROM = AudioVisual Nepal <info@audiovisualnepal.com>`.

## Where enquiries go, in order
1. **Email** to info@audiovisualnepal.com (once RESEND_API_KEY is set) — primary.
2. WordPress endpoint (if the avn/v1/contact route is ever registered) — secondary.
3. Vercel server logs (always) — last-resort copy.
4. Client WhatsApp fallback — if email delivery isn't confirmed, the visitor is
   sent to WhatsApp with their message pre-filled.
