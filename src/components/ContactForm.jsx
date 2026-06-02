import { Send } from 'lucide-react'
import { useI18n } from '../i18n/LanguageContext.jsx'

export default function ContactForm() {
  const { t } = useI18n()
  return (
    <form
      action="https://formsubmit.co/ismEngineer23@gmail.com"
      method="POST"
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="_subject" value="Nuevo mensaje desde el portfolio" />
      <input type="text" name="_honey" style={{ display: 'none' }} />
      <input
        type="text"
        name="name"
        required
        placeholder={t('contact.name')}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none transition-colors focus:border-accent"
      />
      <input
        type="email"
        name="email"
        required
        placeholder={t('contact.email')}
        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none transition-colors focus:border-accent"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t('contact.message')}
        className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-ivory outline-none transition-colors focus:border-accent"
      />
      <button
        type="submit"
        className="group flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-void transition-transform hover:scale-[1.02]"
      >
        {t('contact.send')}
        <Send size={18} className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  )
}
