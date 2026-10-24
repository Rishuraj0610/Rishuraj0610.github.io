import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Download,
  ArrowRight,
  Loader2,
} from 'lucide-react';

interface ContactProps {
  onOpenResume: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'sent' | 'needs_activation' | 'error' | 'copied'
  >('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setErrorMsg('');
    setStatus('submitting');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PORTFOLIO_DATA.personal.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: formData.subject.trim() || `Portfolio Inquiry from ${formData.name}`,
          message: formData.message,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const data = await response.json().catch(() => null);

      if (data && (data.success === 'true' || data.success === true)) {
        setStatus('sent');
        setFeedbackMsg(
          `Message delivered successfully to ${PORTFOLIO_DATA.personal.email}! Thank you for reaching out—I will respond as soon as possible.`
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (data && data.message && data.message.toLowerCase().includes('activat')) {
        setStatus('needs_activation');
        setFeedbackMsg(
          `FormSubmit has sent an activation link to ${PORTFOLIO_DATA.personal.email}. Please open your Gmail inbox (or Spam/Promotions folder) and click 'Activate Form' once to activate automated email delivery!`
        );
      } else {
        setStatus('sent');
        setFeedbackMsg(
          `Message submitted to ${PORTFOLIO_DATA.personal.email}! If this is your first submission, please verify via the activation link sent to your email.`
        );
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setStatus('error');
      setErrorMsg(
        'Unable to complete automated network dispatch. Please click "Open in Gmail" or "Mail App" below to send directly!'
      );
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setStatus('copied');
    setTimeout(() => setStatus('idle'), 2500);
  };

  const handleOpenGmailWeb = () => {
    const subject = encodeURIComponent(
      formData.subject || `Inquiry from Portfolio - ${formData.name || 'Visitor'}`
    );
    const body = encodeURIComponent(
      formData.message
        ? `Hi Rishu,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
        : `Hi Rishu,\n\nI saw your portfolio and would like to get in touch.\n\nBest regards,\n${formData.name || ''}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.personal.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirectMailto = () => {
    const subject = encodeURIComponent(
      formData.subject || `Inquiry from Portfolio - ${formData.name || 'Visitor'}`
    );
    const body = encodeURIComponent(
      formData.message
        ? `Hi Rishu,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
        : `Hi Rishu,\n\nI saw your portfolio and would like to get in touch.\n\nBest regards,\n${formData.name || ''}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative border-t-2 border-[#111111] bg-[#ebebea] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Recruiter Resume Call-to-Action Banner (21st.dev Style) */}
        <div className="mb-20 rounded-2xl border-2 border-[#111111] bg-white p-8 sm:p-12 shadow-[6px_6px_0px_#111111] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="editorial-pill mb-2">
              <b>HIRING</b> DECISION MAKERS
            </span>
            <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#111111] mt-1">
              WANT TO KNOW MORE ABOUT MY WORK?*
            </h3>
            <p className="text-sm sm:text-base text-[#444444] font-medium mt-2">
              Download my updated resume, inspect project architecture on GitHub, or reach out directly for full-time Software Engineer / Backend Developer opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenResume}
              className="neo-btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] font-bold text-xs uppercase tracking-wider"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Download Resume</span>
            </button>
            <a
              href="#projects"
              className="neo-btn inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#f5f5f4] hover:bg-[#ebebea] text-[#111111] font-bold text-xs uppercase tracking-wider"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contact Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>09</b> GET IN TOUCH
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              LET'S BUILD @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            LET'S BUILD SOMETHING GREAT*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            Whether you have a full-time engineering opening, want to discuss DocuMind AI's RAG architecture, or connect about software engineering—my inbox is open.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct channels & Recruiter FAQs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="neo-box p-6 rounded-xl bg-white space-y-4">
              <h3 className="font-display text-sm uppercase text-[#111111] tracking-tight pb-2 border-b-[1.5px] border-[#111111]">
                Direct Contact Channels
              </h3>

              {/* Email */}
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5fb57a] border border-[#111111] flex items-center justify-center text-[#111111]">
                    <Mail className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666666] block font-mono-code font-bold uppercase">Direct Email</span>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-xs font-bold text-[#111111] hover:underline"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-[#111111] hover:bg-white rounded border border-[#111111] transition-colors"
                  title="Copy email to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5fb57a] border border-[#111111] flex items-center justify-center text-[#111111]">
                    <span className="font-mono-code font-bold text-xs">TEL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666666] block font-mono-code font-bold uppercase">Phone / WhatsApp</span>
                    <a
                      href={`tel:${PORTFOLIO_DATA.personal.phone}`}
                      className="text-xs font-bold text-[#111111] hover:underline"
                    >
                      {PORTFOLIO_DATA.personal.phone}
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code font-bold text-[#555555]">
                  IST (UTC+5:30)
                </span>
              </div>

              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-white transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5fb57a] border border-[#111111] flex items-center justify-center text-[#111111]">
                    <Linkedin className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666666] block font-mono-code font-bold uppercase">LinkedIn</span>
                    <span className="text-xs font-bold text-[#111111] group-hover:underline">
                      linkedin.com/in/rishu-raj0610
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#111111]" />
              </a>

              {/* GitHub */}
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-white transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5fb57a] border border-[#111111] flex items-center justify-center text-[#111111]">
                    <Github className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#666666] block font-mono-code font-bold uppercase">GitHub</span>
                    <span className="text-xs font-bold text-[#111111] group-hover:underline">
                      github.com/Rishuraj0610
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#111111]" />
              </a>
            </div>

            {/* Quick candidate availability notice */}
            <div className="neo-box p-5 rounded-xl bg-white font-mono-code text-xs text-[#333333] space-y-2">
              <div className="flex items-center gap-2 text-[#111111] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] border border-[#111111]" />
                <span className="uppercase">Candidate Availability Status:</span>
              </div>
              <p className="font-semibold text-[#111111]">
                &bull; Available for: Full-Time SDE-1 / Software Engineer / Backend Engineer roles.
              </p>
              <p className="font-semibold text-[#111111]">
                &bull; Location: Greater Noida / Noida / Pan-India (Open to on-site, hybrid, or remote).
              </p>
              <p className="font-semibold text-[#111111]">
                &bull; Response SLA: Typically within 24 hours.
              </p>
            </div>
          </div>

          {/* Form in 21st.dev Brutalist Card */}
          <div className="lg:col-span-7">
            <div className="neo-box p-6 sm:p-8 rounded-2xl bg-white shadow-[6px_6px_0px_#111111]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code font-bold uppercase text-[#111111] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sarah Jenkins (Recruiter)"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] text-xs font-medium text-[#111111] placeholder-[#777777] focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code font-bold uppercase text-[#111111] mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. hiring@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] text-xs font-medium text-[#111111] placeholder-[#777777] focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase text-[#111111] mb-1.5">
                    Subject / Role Opportunity
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. SDE Opportunity / Technical Interview"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] text-xs font-medium text-[#111111] placeholder-[#777777] focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code font-bold uppercase text-[#111111] mb-1.5">
                    Message Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me about the position, team, tech stack, or questions you have..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] text-xs font-medium text-[#111111] placeholder-[#777777] focus:outline-none focus:bg-white resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="flex flex-col gap-2 text-xs text-[#111111] bg-[#ffbd2e]/20 p-3.5 rounded-lg border-[1.5px] border-[#111111] font-medium shadow-[2px_2px_0px_#111111]">
                    <div className="flex items-center gap-2 font-bold font-mono-code text-[#b94a2b]">
                      <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
                      <span>{errorMsg}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleOpenGmailWeb}
                        className="neo-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#ebebea] text-[#111111] font-bold text-[11px]"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#5fb57a]" />
                        <span>Send via Gmail (Web)</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={handleDirectMailto}
                        className="neo-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#ebebea] text-[#111111] font-bold text-[11px]"
                      >
                        <Send className="w-3.5 h-3.5 text-[#5fb57a]" />
                        <span>Send via Mail App</span>
                      </button>
                    </div>
                  </div>
                )}

                {status === 'needs_activation' && (
                  <div className="p-4 rounded-lg bg-[#ffbd2e]/20 border-[1.5px] border-[#111111] text-xs text-[#111111] space-y-2.5 shadow-[2px_2px_0px_#111111]">
                    <div className="flex items-center gap-2 font-bold font-mono-code text-[#111111]">
                      <AlertCircle className="w-4.5 h-4.5 text-[#b98158] stroke-[2.5] shrink-0" />
                      <span className="uppercase text-[11px]">Action Required: Activate Direct Email Delivery</span>
                    </div>
                    <p className="text-[#222222] font-medium leading-relaxed">
                      FormSubmit sent a 1-click verification email to <strong>{PORTFOLIO_DATA.personal.email}</strong>. Please check your inbox (or Spam/Promotions folder) and click <strong>'Activate Form'</strong> once. After that one click, all visitor messages will arrive immediately in your inbox!
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href="https://mail.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neo-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#5fb57a] text-[#111111] font-bold text-[11px]"
                      >
                        <span>Open Gmail Inbox to Activate</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={handleOpenGmailWeb}
                        className="neo-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#111111] font-bold text-[11px]"
                      >
                        <span>Send via Gmail Web Instead</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}

                {status === 'sent' && (
                  <div className="p-4 rounded-lg bg-[#5fb57a]/20 border-[1.5px] border-[#111111] text-xs text-[#111111] space-y-2 font-medium shadow-[2px_2px_0px_#111111]">
                    <div className="flex items-center gap-2 font-bold font-mono-code">
                      <CheckCircle2 className="w-4.5 h-4.5 text-[#5fb57a] stroke-[3]" />
                      <span>Message Dispatched Successfully!</span>
                    </div>
                    <p className="text-[#333333] leading-relaxed">
                      {feedbackMsg || `Your message has been sent directly to ${PORTFOLIO_DATA.personal.email}.`}
                    </p>
                  </div>
                )}

                <div className="pt-3 border-t-[1.5px] border-[#111111]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono-code font-bold text-[#555555]">
                    <span className="w-2 h-2 rounded-full bg-[#5fb57a] border border-[#111111]" />
                    <span>TO: {PORTFOLIO_DATA.personal.email}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handleOpenGmailWeb}
                      className="neo-btn inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white hover:bg-[#fafaf8] text-[#111111] font-bold text-xs"
                      title="Compose directly in Gmail Web"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#5fb57a]" />
                      <span>Gmail Web</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="neo-btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] font-bold text-xs uppercase tracking-wider disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 stroke-[2.5]" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
