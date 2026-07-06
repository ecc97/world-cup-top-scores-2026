"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function ImageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Tiempo de carga simulado

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05060a] overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ 
              scale: { duration: 2, ease: "easeOut" },
              opacity: { duration: 0.5 }
            }}
            className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center"
          >
            {/* Máscara de imagen con efecto zoom */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
               <Image
                src="/assets/img/mundial_2026-wcf.png"
                alt="Loading Mundial 2026"
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
