'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { SITE, PROJECT_TYPES } from '@/lib/constants'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', projectType: '', message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('success') }
      else        { setStatus('error') }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#F5F5F7] px-6">
        <div className="container-site text-center">
          <div className="eyebrow mb-4">Get In Touch</div>
          <h1 className="heading-section mb-4">Let&apos;s Design Your<br/>Perfect System</h1>
          <p className="text-lg text-[#6E6E73] max-w-[520px] mx-auto">
            Share your project details and our engineers will respond within 24 hours with a customized proposal.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontSize: 13, color: '#6E6E73', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#1D1D1F', fontWeight: 500 }} aria-current="page">Contact</span>
        </div>
      </nav>

      {/* Content */}
      <section className="section-padding bg-white px-6">
        <div className="container-site">
          <div className="grid lg:grid-cols-5 gap-16">

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl mb-6">Contact Details</h2>
                <div className="space-y-5">
                  <a href={`tel:${SITE.phoneRaw}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[#0071E3]/[0.08] flex items-center justify-center shrink-0 group-hover:bg-[#0071E3]/[0.15] transition-colors">
                      <Phone size={16} className="text-[#0071E3]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6E6E73] mb-0.5">Call us</div>
                      <div className="font-semibold text-[#111] group-hover:text-[#0071E3] transition-colors">{SITE.phone}</div>
                    </div>
                  </a>

                  <a href={`mailto:${SITE.email}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[#0071E3]/[0.08] flex items-center justify-center shrink-0 group-hover:bg-[#0071E3]/[0.15] transition-colors">
                      <Mail size={16} className="text-[#0071E3]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6E6E73] mb-0.5">Email us</div>
                      <div className="font-semibold text-[#111] group-hover:text-[#0071E3] transition-colors">{SITE.email}</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0071E3]/[0.08] flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-[#0071E3]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6E6E73] mb-0.5">Visit us</div>
                      <div className="font-semibold text-[#111]">Kathmandu, Nepal</div>
                    </div>
                  </div>

                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/[0.1] flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/[0.2] transition-colors">
                      <MessageCircle size={16} className="text-[#25D366]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6E6E73] mb-0.5">WhatsApp</div>
                      <div className="font-semibold text-[#111] group-hover:text-[#25D366] transition-colors">Chat instantly</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office hours */}
              <div className="bg-[#F5F5F7] rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Sunday – Friday</span>
                    <span className="font-medium">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Saturday</span>
                    <span className="font-medium">10:00 AM – 4:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a4e0000001%3A0x0!2sKathmandu%2C+Nepal!5e0!3m2!1sen!2snp!4v1"
                  width="100%"
                  height="192"
                  style={{ border: 0, borderRadius: 16, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AudioVisual Nepal location"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <CheckCircle size={56} className="text-[#0071E3] mb-6" />
                  <h3 className="font-display font-bold text-2xl mb-3">Message Received!</h3>
                  <p className="text-[#6E6E73] max-w-sm">
                    Thank you for reaching out. Our team will review your requirements and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111] mb-2">
                        Full Name <span className="text-[#0071E3]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#F5F5F7] border border-transparent rounded-xl px-4 py-3 text-[15px] text-[#111] placeholder-[#6E6E73] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111] mb-2">Company / Organization</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-[#F5F5F7] border border-transparent rounded-xl px-4 py-3 text-[15px] text-[#111] placeholder-[#6E6E73] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-colors"
                        placeholder="Company name (optional)"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#111] mb-2">
                        Email <span className="text-[#0071E3]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#F5F5F7] border border-transparent rounded-xl px-4 py-3 text-[15px] text-[#111] placeholder-[#6E6E73] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#111] mb-2">
                        Phone <span className="text-[#0071E3]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#F5F5F7] border border-transparent rounded-xl px-4 py-3 text-[15px] text-[#111] placeholder-[#6E6E73] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-colors"
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111] mb-2">
                      Project Type <span className="text-[#0071E3]">*</span>
                    </label>
                    <select
                      required
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full bg-[#F5F5F7] border border-transparent rounded-xl px-4 py-3 text-[15px] text-[#111] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-colors appearance-none"
                    >
                      <option value="">Select project type</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#111] mb-2">
                      Project Details <span className="text-[#0071E3]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#F5F5F7] border border-transparent rounded-xl px-4 py-3 text-[15px] text-[#111] placeholder-[#6E6E73] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-colors resize-none"
                      placeholder="Describe your space, number of rooms, approximate area, and what you're trying to achieve..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-500 text-sm">
                      Something went wrong. Please try again or WhatsApp us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Sending...' : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
