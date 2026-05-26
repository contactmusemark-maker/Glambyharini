import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PHONE = '917305306497';
const DEFAULT_MSG = encodeURIComponent(
  'Hi Harini! I found your website and would love to know more about your services and availability. 🌸'
);

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  const waUrl = `https://wa.me/${PHONE}?text=${DEFAULT_MSG}`;

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-2xl shadow-2xl p-5 max-w-[260px] border border-black/5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center">
                  <WhatsAppIcon size={18} color="white" />
                </div>
                <div>
                  <p className="font-serif text-sm text-foreground leading-none">GlamByHarini</p>
                  <p className="font-mono text-[9px] tracking-wider text-green-500 uppercase mt-0.5">Online</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-foreground/30 hover:text-foreground transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <div className="bg-[#ECE5DD] rounded-xl px-3 py-2 mb-4">
              <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                Hi there! 👋 Looking to book a makeup session or want to know more about my services?
              </p>
              <p className="font-mono text-[9px] text-foreground/30 mt-1 text-right">just now</p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-xl font-mono text-xs tracking-widest uppercase hover:bg-[#1da851] transition-colors"
            >
              <WhatsAppIcon size={14} color="white" />
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main bubble */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/40 flex items-center justify-center relative"
        aria-label="Chat on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={24} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="wa"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <WhatsAppIcon size={26} color="white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
}

function WhatsAppIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
