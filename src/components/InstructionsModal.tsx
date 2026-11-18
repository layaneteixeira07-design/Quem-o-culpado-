import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Search, MessageSquare, HelpCircle, Layers, CheckCircle2, 
  Scale, ShieldAlert, ArrowRight, ArrowLeft, Lightbulb, Play, 
  Sparkles, AlertOctagon, Pin, Award, Check
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'passo-a-passo' | 'exemplo-pratico' | 'resumo'>('passo-a-passo');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [interactiveSimDone, setInteractiveSimDone] = useState<Record<string, boolean>>({});

  const steps = [
    {
      stepNumber: 1,
      title: 'Passo 1: Escolher o Caso & Ler o Dossiê',
      subtitle: 'Entenda o crime antes de agir',
      icon: <HelpCircle className="w-5 h-5 text-amber-400" />,
      color: 'amber',
      description: 'Na tela de seleção, escolha a fase desejada (Fácil, Médio, Difícil ou Mestre). Leia atentamente o Dossiê Preliminar: o tipo de crime, o horário exato em que ocorreu e as anotações confidenciais de campo.',
      actionNote: 'Dica de Ouro: O horário do crime é a chave mestra para destruir álibis falsos mais adiante!',
      interactiveType: 'dossier',
      demoContent: {
        header: 'Dossiê: O Roubo do Rubi Sangue de Dragão',
        fact1: 'Horário do Crime: Quinta-feira às 22h45 (Durante a tempestade)',
        fact2: 'Local: Biblioteca do Barão (Cofre digital inviolável)',
        fact3: 'Fato chave: Apenas 4 pessoas estavam na mansão trancada.'
      }
    },
    {
      stepNumber: 2,
      title: 'Passo 2: Investigar Cenários & Coletar Pistas',
      subtitle: 'Encontre as evidências forenses com a lupa',
      icon: <Search className="w-5 h-5 text-blue-400" />,
      color: 'blue',
      description: 'Acesse a aba "Cenários" na barra inferior. Alterne entre os cômodos (Biblioteca, Jardim de Inverno, Escritório). Toque nas lupas e pontos brilhantes para inspecionar e registrar as pistas no seu inventário.',
      actionNote: 'Pistas podem ser físicas (tecidos, pegadas), documentais (anotações de senhas, recibos) ou biológicas (marcas de batom, impressões digitais).',
      interactiveType: 'clue_test',
      demoContent: {
        clueName: 'Retalho de Cetim Verde Esmeralda',
        clueDesc: 'Pedaço de tecido verde preso nos espinhos da roseira na janela de fuga do jardim.',
        buttonLabel: 'Simular Coleta de Pista com Lupa'
      }
    },
    {
      stepNumber: 3,
      title: 'Passo 3: Interrogar os Suspeitos',
      subtitle: 'Ouça depoimentos e analise o nervosismo',
      icon: <MessageSquare className="w-5 h-5 text-purple-400" />,
      color: 'purple',
      description: 'Acesse a aba "Suspeitos". Cada personagem tem uma ficha com idade, profissão, álibi e o motivo levantado pela polícia. Faça perguntas tocando nas opções de interrogatório para ouvir cada versão.',
      actionNote: 'Fique de olho na barra de Tensão Cardíaca! Suspeitos acuados ou que mentem costumam apresentar níveis altos de estresse.',
      interactiveType: 'interrogation_test',
      demoContent: {
        suspectName: 'Clara Bittencourt (Secretária)',
        question: '"Você confirma que foi dormir às 21h30 e não saiu do quarto?"',
        suspectAnswer: '"Sim detetive! Tomei um remédio, vesti meu pijama e apaguei até de manhã!"'
      }
    },
    {
      stepNumber: 4,
      title: 'Passo 4: Apontar Contradições no Ato!',
      subtitle: 'O momento crucial: pegue o mentiroso no pulo',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      color: 'rose',
      description: 'Se um suspeito afirma algo que vai contra uma prova que você já encontrou no cenário, o botão vermelho "CONFRONTAR COM EVIDÊNCIA / APONTAR CONTRADIÇÃO" se torna a sua arma principal!',
      actionNote: 'Atenção: Não adianta apenas desconfiar! Se você não tiver coletado a prova antes no cenário, não conseguirá provar a mentira!',
      interactiveType: 'confront_test',
      demoContent: {
        lie: 'Ela diz que estava de pijama dormindo desde as 21h30...',
        evidence: 'Mas a Dra. Helena a viu às 22h30 de vestido verde, e o retalho do vestido foi achado na roseira molhada da fuga!',
        buttonLabel: 'Simular Confronto de Contradição (+250 pts)'
      }
    },
    {
      stepNumber: 5,
      title: 'Passo 5: Conectar o Mural de Evidências',
      subtitle: 'Monte a teia da trama criminal com fio vermelho',
      icon: <Pin className="w-5 h-5 text-amber-400" />,
      color: 'amber',
      description: 'Acesse a aba "Mural". No clássico quadro de cortiça, toque em um suspeito e depois em uma evidência coletada para traçar o fio vermelho de ligação. Isso ajuda a visualizar claramente quem tem provas materiais contra si.',
      actionNote: 'Suspeitos com várias evidências e contradições marcadas em vermelho são os alvos perfeitos para a acusação formal.',
      interactiveType: 'board_test',
      demoContent: {
        suspect: 'Clara Bittencourt',
        linkedEvidence: 'Rascunho com a nova senha 2-9-4-7 + Taça com Batom Carmim + Retalho verde na roseira'
      }
    },
    {
      stepNumber: 6,
      title: 'Passo 6: Acusação Formal no Tribunal',
      subtitle: 'O Diferencial: Julgamento baseado em provas concretas',
      icon: <Scale className="w-5 h-5 text-emerald-400" />,
      color: 'emerald',
      description: 'Acesse a aba "Acusar". Para que o Mandado de Prisão seja aceito pelo Juiz e pelo Promotor, você deve selecionar corretamente os 4 pilares da verdade:',
      actionNote: '1. O Culpado  ·  2. A Prova Irrefutável  ·  3. O Motivo Real  ·  4. O Método do Crime',
      interactiveType: 'accuse_test',
      demoContent: {
        pillar1: 'Autor: Clara Bittencourt',
        pillar2: 'Prova-Chave: Rascunho da senha secreta do cofre no lixo',
        pillar3: 'Motivo: Vender o rubi no mercado negro para fugir com R$ 2 milhões',
        pillar4: 'Método: Anotou a nova senha, desligou a energia na tempestade e fugiu pela janela'
      }
    }
  ];

  const handleNextStep = () => {
    soundManager.playClick();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    soundManager.playClick();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const activeStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-[#0b101d] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-mystery text-base font-bold text-white">Passo a Passo do Jogo</h2>
              <p className="text-xs text-slate-400">Guia de investigação & mecânicas completas</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View Mode Selector Tabs */}
        <div className="flex items-center p-2 bg-slate-950/60 border-b border-slate-800/80 gap-1.5">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('passo-a-passo');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'passo-a-passo'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Passo a Passo Guiado (1 a 6)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('exemplo-pratico');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'exemplo-pratico'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Exemplo Real (Caso #1)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('resumo');
            }}
            className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'resumo'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Regras
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300">
          {activeTab === 'passo-a-passo' && (
            <div className="space-y-4">
              {/* Step indicator bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <span className="font-bold text-amber-400">
                    ETAPA {currentStep + 1} DE {steps.length}
                  </span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% do Guia</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-1">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        soundManager.playClick();
                        setCurrentStep(idx);
                      }}
                      className={`h-full flex-1 rounded-full cursor-pointer transition-all ${
                        idx <= currentStep ? 'bg-amber-500' : 'bg-slate-700/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Active Step Card */}
              <motion.div
                key={activeStepData.stepNumber}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-4 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
                    {activeStepData.icon}
                  </div>
                  <div>
                    <h3 className="font-mystery text-base font-bold text-white">
                      {activeStepData.title}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium">{activeStepData.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-200 leading-relaxed font-sans-app">
                  {activeStepData.description}
                </p>

                {/* Interactive Demonstrator inside each step */}
                {activeStepData.interactiveType === 'clue_test' && (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-2.5">
                    <span className="text-[10px] font-mono-code uppercase font-bold text-blue-400 block">
                      Demonstração Prática de Busca:
                    </span>
                    <div className="flex items-center justify-between text-xs">
                      <span>{activeStepData.demoContent.clueName}</span>
                      <span className="text-[10px] text-blue-300 font-mono-code bg-blue-500/10 px-2 py-0.5 rounded">
                        Objeto Pessoal
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {activeStepData.demoContent.clueDesc}
                    </p>
                    <button
                      onClick={() => {
                        soundManager.playClueFound();
                        setInteractiveSimDone((prev) => ({ ...prev, clue: true }));
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{interactiveSimDone.clue ? 'Pista Coletada com Som! (+100 pts)' : activeStepData.demoContent.buttonLabel}</span>
                    </button>
                  </div>
                )}

                {activeStepData.interactiveType === 'interrogation_test' && (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-2 text-xs">
                    <span className="text-[10px] font-mono-code uppercase font-bold text-purple-400 block">
                      Exemplo de Pergunta & Resposta:
                    </span>
                    <p className="font-semibold text-slate-200">{activeStepData.demoContent.question}</p>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-200 font-typewriter">
                      {activeStepData.demoContent.suspectAnswer}
                    </div>
                  </div>
                )}

                {activeStepData.interactiveType === 'confront_test' && (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-2.5">
                    <span className="text-[10px] font-mono-code uppercase font-bold text-rose-400 block">
                      Demonstração de Confronto de Mentira:
                    </span>
                    <div className="text-xs space-y-1">
                      <p className="text-slate-300 line-through opacity-75">{activeStepData.demoContent.lie}</p>
                      <p className="text-emerald-300 font-semibold">{activeStepData.demoContent.evidence}</p>
                    </div>
                    <button
                      onClick={() => {
                        soundManager.playContradiction();
                        setInteractiveSimDone((prev) => ({ ...prev, confront: true }));
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>{interactiveSimDone.confront ? 'Mentira Exposta com Efeito! (+250 pts)' : activeStepData.demoContent.buttonLabel}</span>
                    </button>
                  </div>
                )}

                {activeStepData.interactiveType === 'board_test' && (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2 text-xs">
                    <span className="text-[10px] font-mono-code uppercase font-bold text-amber-400 block">
                      Ligação no Mural de Cortiça:
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-bold text-white">{activeStepData.demoContent.suspect}</span>
                    </div>
                    <p className="text-[11px] text-amber-200/90 font-typewriter bg-amber-500/10 p-2 rounded border border-amber-500/20">
                      Conexões com Fio Vermelho: {activeStepData.demoContent.linkedEvidence}
                    </p>
                  </div>
                )}

                {activeStepData.interactiveType === 'accuse_test' && (
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-2 text-xs">
                    <span className="text-[10px] font-mono-code uppercase font-bold text-emerald-400 block">
                      Os 4 Pilares da Acusação Formal:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">1. Culpado</span>
                        <strong className="text-white">{activeStepData.demoContent.pillar1}</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">2. Prova Material</span>
                        <strong className="text-rose-400">{activeStepData.demoContent.pillar2}</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">3. Motivo</span>
                        <strong className="text-amber-400">{activeStepData.demoContent.pillar3}</strong>
                      </div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block">4. Método</span>
                        <strong className="text-blue-400">{activeStepData.demoContent.pillar4}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action golden note */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{activeStepData.actionNote}</span>
                </div>
              </motion.div>

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className={`py-2 px-4 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentStep === 0
                      ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Passo Anterior</span>
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={handleNextStep}
                    className="py-2 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Próximo Passo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      soundManager.playVictory();
                      onClose();
                    }}
                    className="py-2 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Concluir Tutorial & Jogar</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'exemplo-pratico' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <strong className="text-amber-300 font-bold block mb-1">
                  Exemplo de Raciocínio Investigativo (Caso #01):
                </strong>
                Veja como um detetive de verdade resolve o roubo do Rubi na Mansão Valença passo a passo:
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center">1</span>
                    <strong className="text-white text-xs">A Busca nos Cenários</strong>
                  </div>
                  <p className="text-slate-300 text-xs pl-7">
                    Você vai à Biblioteca e descobre no cesto de lixo um rascunho com o timbre da secretária Clara anotando a nova senha do cofre (<strong>2-9-4-7</strong>). No jardim de inverno, encontra um retalho verde na roseira.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-500 text-white font-bold text-[10px] flex items-center justify-center">2</span>
                    <strong className="text-white text-xs">O Interrogatório</strong>
                  </div>
                  <p className="text-slate-300 text-xs pl-7">
                    Você pergunta a Clara sobre a senha do cofre. Ela mente descaradamente: <em>"O Barão nunca compartilha as senhas comigo!"</em>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center">3</span>
                    <strong className="text-white text-xs">O Confronto da Mentira</strong>
                  </div>
                  <p className="text-slate-300 text-xs pl-7">
                    Você clica em <strong>"Confrontar com Evidência"</strong>! O papel no lixo desmente Clara imediatamente! O nível de estresse dela vai a 88% e você ganha <strong>+250 pontos</strong>.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">4</span>
                    <strong className="text-white text-xs">O Mural de Evidências</strong>
                  </div>
                  <p className="text-slate-300 text-xs pl-7">
                    Você liga a foto de Clara às 3 pistas cruciais com os fios vermelhos, comprovando a rota do crime.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">5</span>
                    <strong className="text-white text-xs">A Acusação e Confissão</strong>
                  </div>
                  <p className="text-slate-300 text-xs pl-7">
                    No Tribunal, você seleciona Clara + Rascunho da senha + Venda no mercado negro + Entrada na queda de energia. Caso Solucionado, 3 Estrelas e confissão dramática!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'resumo' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 leading-relaxed">
                <strong className="text-amber-300 font-semibold block mb-1">O Grande Diferencial do Jogo:</strong>
                Você não poderá simplesmente chutar quem é o culpado. Para encerrar o inquérito e prender o verdadeiro culpado, você deve comprovar a prova irrefutável e o motivo real!
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wide">1. Pistas e Evidências (+100/150 pts)</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Explore todos os cômodos para não deixar passar nenhuma prova material.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wide">2. Contradições (+250 pts)</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Confronte declarações falsas assim que possuir a prova no inventário.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Scale className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wide">3. Tribunal Sem Chutes (+1000 pts)</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Acuse com base no Culpado, na Prova-Chave, no Motivo e no Método.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono-code">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Guia Interativo
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Fechar Guia</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
