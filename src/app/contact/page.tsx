'use client';

import { Mail, Clock, MapPin } from "lucide-react";
import { useRegionStore } from "@/store/useRegionStore";
import { useTranslation } from "@/hooks/useTranslation";

export default function ContactPage() {
  const { region, isHydrated } = useRegionStore();
  const { t } = useTranslation();
  const showMoldova = !isHydrated || region === 'MD' || region === null;
  const showUS = !isHydrated || region === 'US' || region === null;

  return (
    <main className="flex-1 w-full bg-background transition-colors duration-500 overflow-x-hidden">
      
      {/* Hero */}
      <section className="relative py-20 overflow-hidden wave-lines">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{t('nav.contact')}</span>
          <h1 className="text-5xl md:text-6xl font-black text-foreground mt-3 tracking-tight animate-fade-in-up">
            {t('contact.get_in_touch')}
          </h1>
          <p className="text-lg text-muted mt-4 animate-fade-in-up delay-100 max-w-md mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* US Card */}
          <div className={`animate-fade-in-up delay-100 bg-surface rounded-3xl border border-border overflow-hidden card-hover transition-all duration-500 ${!showUS && isHydrated ? 'opacity-40 grayscale' : ''}`}>
            <div className="h-2 bg-gradient-to-r from-coral to-coral/60" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">🇺🇸</span>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{t('footer.usa')}</h2>
                  <p className="text-sm text-muted">{t('contact.nationwide_shipping')}</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5 uppercase tracking-wider font-medium">{t('contact.email')}</p>
                    <a href="mailto:wesmokefish@gmail.com" className="text-foreground font-semibold hover:text-accent transition-colors">
                      wesmokefish@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5 uppercase tracking-wider font-medium">{t('contact.service')}</p>
                    <p className="text-foreground font-semibold">{t('contact.nationwide_delivery')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MD Card */}
          <div className={`animate-fade-in-up delay-200 bg-surface rounded-3xl border border-border overflow-hidden card-hover transition-all duration-500 ${!showMoldova && isHydrated ? 'opacity-40 grayscale' : ''}`}>
            <div className="h-2 bg-gradient-to-r from-accent to-accent/60" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">🇲🇩</span>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{t('footer.moldova')}</h2>
                  <p className="text-sm text-muted">{t('contact.flagship_store')}</p>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5 uppercase tracking-wider font-medium">{t('contact.email')}</p>
                    <a href="mailto:wesmokefishmd@gmail.com" className="text-foreground font-semibold hover:text-accent transition-colors">
                      wesmokefishmd@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5 uppercase tracking-wider font-medium">{t('contact.address')}</p>
                    <p className="text-foreground font-semibold">Șoseaua Balcani 7B, Chișinău</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-xl bg-accent/8 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted mb-0.5 uppercase tracking-wider font-medium">{t('contact.hours')}</p>
                    <p className="text-foreground font-semibold">{t('contact.hours_daily')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Photo */}
        <div className="mt-12 animate-fade-in-up delay-300 rounded-3xl overflow-hidden border border-border shadow-xl">
          <div className="relative h-64 md:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/storefront-wide.png" alt="Our store" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/mascot.jpg" alt="Mascot" className="h-14 w-14 object-contain drop-shadow-lg" />
                <div>
                  <h3 className="text-white font-bold text-xl">{t('contact.visit_us')}</h3>
                  <p className="text-white/70 text-sm">{t('contact.visit_desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
