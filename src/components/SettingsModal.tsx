import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, VolumeX, Smartphone, RotateCcw, ShieldCheck, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface SettingsModalProps {
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  soundEnabled,
  onToggleSound,
  onResetProgress
}) => {
  const [haptics, setHaptics] = useState(soundManager.isHapticsEnabled());
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const toggleHaptics = () => {
    const next = !haptics;
    setHaptics(next);
    soundManager.setHapticsEnabled(next);
    soundManager.playClick();
  };

  const handleReset = () => {
    onResetProgress();
    setShowConfirmReset(false);
    setResetSuccess(true);
    soundManager.playClick();
    setTimeout(() => {
      setResetSuccess(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-[#0e1424] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <h2 className="font-mystery text-base font-bold text-white">Configurações do Jogo</h2>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings List */}
        <div className="p-5 space-y-4">
          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
              </div>
              <div>
                <span className="font-semibold text-white text-sm block">Efeitos Sonoros</span>
                <span className="text-xs text-slate-400">Pistas, interrogatórios e vitórias</span>
              </div>
            </div>
            <button
              onClick={() => {
                onToggleSound();
                soundManager.playClick();
              }}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Haptics / Vibration Toggle for Mobile */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold text-white text-sm block">Vibração Tátil</span>
                <span className="text-xs text-slate-400">Feedback ao tocar em pistas (Android/iOS)</span>
              </div>
            </div>
            <button
              onClick={toggleHaptics}
              className={`w-12 h-7 rounded-full p-1 transition-colors ${
                haptics ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  haptics ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reset Progress */}
          <div className="pt-2">
            {!showConfirmReset ? (
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowConfirmReset(true);
                }}
                className="w-full py-3 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar Todo o Progresso do Jogo</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-600/40 space-y-3">
                <p className="text-xs text-rose-200">
                  Tem certeza? Todos os pontos, estrelas e casos desbloqueados serão resetados.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                  >
                    Confirmar Reset
                  </button>
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {resetSuccess && (
              <div className="mt-2 p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Progresso reiniciado com sucesso!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            Quem é o Culpado? v1.0
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            Pronto
          </button>
        </div>
      </motion.div>
    </div>
  );
};
