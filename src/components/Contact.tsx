import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface ContactProps {
  onAddLog: (action: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onAddLog }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      onAddLog(`Dispatched contact packet. Source name: ${formData.name}`);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000); // clear greeting inside form
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-radial from-gray-950 via-black to-gray-950">
      {/* Glow backgrounds */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Glassmorphism Contact Form (Left Aligned on final alternating step) */}
          <motion.div 
            className="lg:col-span-7 space-y-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            {/* Header info */}
            <div className="space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan">
                <LucideIcon name="Mail" className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">SIGNAL DECODE</span>
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Initiate Secure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-rose">
                  Connection Link
                </span>
              </h2>
              <p className="text-gray-400 max-w-xl font-light">
                Submit raw telemetry credentials or queries below. The cryptographic handler will route the transaction straight into my continuous inbox feed.
              </p>
            </div>

            {/* Direct coordinate vectors list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-[11px] text-gray-400">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-all duration-300 flex items-center gap-3 shadow-xl">
                <LucideIcon name="Mail" className="text-brand-cyan w-4 h-4" />
                <div className="text-left">
                  <p className="text-gray-500 text-[9px] uppercase font-bold">EMAIL</p>
                  <p className="text-white font-medium mt-0.5">kishan@nova.io</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-all duration-300 flex items-center gap-3 shadow-xl">
                <LucideIcon name="MapPin" className="text-brand-purple w-4 h-4" />
                <div className="text-left">
                  <p className="text-gray-500 text-[9px] uppercase font-bold">COORDINATES</p>
                  <p className="text-white font-medium mt-0.5">Asia Pacific</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-all duration-300 flex items-center gap-3 shadow-xl">
                <LucideIcon name="Rocket" className="text-brand-rose w-4 h-4 animate-bounce" />
                <div className="text-left">
                  <p className="text-gray-500 text-[9px] uppercase font-bold">STATUS</p>
                  <p className="text-brand-rose font-bold mt-0.5 uppercase">OPEN FOR OFFERS</p>
                </div>
              </div>
            </div>

            {/* Form workspace with loading glass shaders and success popups */}
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden text-left shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">Identity Name</label>
                        <input
                          id="contact-name-input"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Kishan Maurya"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 transition-all text-sm shadow-inner"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">Signal Address</label>
                        <input
                          id="contact-email-input"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="kishan@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 transition-all text-sm shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">Topic Vector</label>
                      <input
                        id="contact-subject-input"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project Collaboration / Consultation"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 transition-all text-sm shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold">Payload Mission Text</label>
                      <textarea
                        id="contact-message-input"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Write your connection packet description here..."
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 transition-all text-sm resize-none shadow-inner"
                      />
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 rounded-xl bg-white text-black hover:bg-brand-cyan hover:text-black transition-all duration-300 font-semibold tracking-wide text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                    >
                      {loading ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                          Broadcasting Telemetry packet...
                        </>
                      ) : (
                        <>
                          <LucideIcon name="Send" size={14} />
                          Dispatch Holographic Transmission
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 text-center space-y-6 flex flex-col items-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center animate-pulse">
                      <LucideIcon name="Check" size={32} />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-display font-extrabold text-2xl text-white">Signal Dispatched Successfully!</p>
                      <p className="text-gray-400 text-sm max-w-sm mx-auto font-light leading-relaxed">
                        The connection packet has bypassed system filters. It is logged in the diagnostics database and queued for high-priority response.
                      </p>
                    </div>

                    <div className="font-mono text-[9px] text-gray-500 uppercase tracking-widest bg-gray-950 p-2.5 rounded border border-gray-900">
                      ENCRYPT_ID // AD85_SECURE_TUNNEL
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Premium High Quality Cinematic Image (Right Aligned on alternate grid) */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative p-2.5 rounded-3xl border border-white/10 bg-gray-950/40 backdrop-blur-xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-y-1/2 -left-12 w-48 h-48 bg-brand-cyan/20 rounded-full blur-[60px] pointer-events-none -translate-y-1/2" />
              
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/5 bg-black">
                <img 
                  id="contact-cinematic-img"
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2000&auto=format&fit=crop"
                  alt="Futuristic cyber technology networks stars"
                  className="w-full h-full object-cover scale-[1.01] transition-transform duration-1000 group-hover:scale-105 select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual HUD overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-75" />
                
                {/* floating panel */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl border border-white/10 bg-gray-950/80 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-brand-cyan/15 border border-brand-cyan/20 text-brand-cyan flex items-center justify-center">
                      <LucideIcon name="Cpu" size={16} className="animate-pulse" />
                    </div>
                    <div>
                      <p className="text-white font-extrabold text-xs">Aura Gateway Node Live</p>
                      <p className="text-[9px] text-gray-500 font-mono mt-0.5">READY FOR BROADCASTING TRANSMISSIONS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
