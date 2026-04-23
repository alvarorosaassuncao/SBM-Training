/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ClipboardCheck, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Database,
  ArrowRight,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Languages,
  User,
  Mail,
  Download,
  Trophy
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MODULES_STUDY, CRT_DATA, CRL_DATA, PM_ACTION_STEPS, TRAINING_QUIZ, PM_ACTION_CARDS } from './constants';

// --- ROBUST ASSET HELPERS ---
const getAssetUrl = (path: string): string => {
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

async function loadImageAsDataURL(url: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => {
      console.warn("Failed to load PDF logo via Image, using fallback.");
      resolve(null);
    };
  });
}

function SbmLogo({ className = "h-10 w-auto" }: { className?: string }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) return <span className="font-black text-sbm-orange italic tracking-tighter">SBM OFFSHORE</span>;
  return (
    <img 
      src={getAssetUrl('assets/sbm-logo.png')} 
      alt="SBM Offshore" 
      className={className} 
      onError={() => setHasError(true)} 
    />
  );
}
// -----------------------------
import { PMStep, QuizQuestion, ModuleCategory, ModuleStudy } from './types';

type Tab = 'welcome' | 'study' | 'quiz' | 'registration' | 'pm-action';
type Language = 'en' | 'pt';

interface UserData {
  name: string;
  email: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('welcome');
  const [lang, setLang] = useState<Language>('pt');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleCategory | null>(null);

  const toggleLang = () => setLang(l => l === 'en' ? 'pt' : 'en');

  const t = (localized: any) => localized[lang] || localized['en'];

  const handleSelectModule = (category: ModuleCategory) => {
    setSelectedModule(category);
    setActiveTab('study');
  };

  const handleStartQuiz = () => {
    if (!userData) {
      setActiveTab('registration');
    } else {
      setActiveTab('quiz');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col lg:flex-row">
      {/* Sidebar / Nav */}
      <nav className="lg:w-72 bg-sbm-dark-grey flex flex-col p-8 text-white relative lg:fixed lg:h-full z-50 w-full mb-6 lg:mb-0 shadow-2xl lg:shadow-none">
        <div className="mb-6 lg:mb-10 flex flex-row lg:flex-col justify-between items-center lg:items-start gap-4">
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-1">
            <div className="bg-white p-2 rounded-xl inline-block shadow-xl overflow-hidden">
              <SbmLogo className="h-10 w-auto object-contain" />
            </div>
             <span className="font-black text-lg tracking-tight uppercase lg:mt-4 text-sbm-orange hidden sm:block">Certification Portal</span>
          </div>
          
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all"
          >
            <Languages size={14} className="text-sbm-orange" />
            <span className="hidden sm:block">{lang === 'en' ? 'English' : 'Português'}</span>
            <span className="sm:hidden">{lang === 'en' ? 'EN' : 'PT'}</span>
          </button>
        </div>

        <div className="flex-row lg:flex-col flex flex-wrap gap-4 flex-1 mb-6 lg:mb-0">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2 lg:pl-4 w-full hidden lg:block">
            {lang === 'en' ? 'ASSESSMENT' : 'AVALIAÇÃO'}
          </p>
          {[
            { id: 'welcome', label: lang === 'en' ? 'Module Overview' : 'Visão dos Módulos', icon: BookOpen },
            { id: 'quiz', label: lang === 'en' ? 'Final Quiz' : 'Quiz Final', icon: Trophy },
            { id: 'pm-action', label: 'PM Action', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`flex-1 lg:flex-none lg:w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 text-sm font-semibold
                ${activeTab === item.id ? 'bg-sbm-orange shadow-lg text-white' : 'text-slate-400 hover:bg-white/5 bg-black/20 lg:bg-transparent'}
              `}
            >
              <item.icon size={16} className="lg:w-[18px] lg:h-[18px]" />
              <span className="whitespace-nowrap truncate">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={14} className="ml-auto opacity-50 hidden lg:block" />}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex flex-col gap-4">
          {userData && (
            <div className="bg-white/5 rounded-3xl p-4 border border-white/10">
              <p className="text-[10px] font-black text-sbm-orange uppercase tracking-widest mb-1">{lang === 'en' ? 'Active Candidate' : 'Candidato Ativo'}</p>
              <p className="text-xs font-bold truncate">{userData.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{userData.email}</p>
            </div>
          )}

          <div className="bg-sbm-grey/20 rounded-3xl p-5 border border-white/10">
            <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-tighter">
              {lang === 'en' ? 'Certification' : 'Certificação'}
            </p>
            <div className="h-2 w-full bg-slate-700 rounded-full mb-3">
              <div className="h-2 bg-sbm-orange rounded-full transition-all duration-1000" style={{ width: userData ? '100%' : '20%' }}></div>
            </div>
            <p className="text-[10px] font-medium leading-tight">
              {userData 
                ? (lang === 'en' ? 'Ready to earn certificate.' : 'Pronto para obter certificado.')
                : (lang === 'en' ? 'Must complete registration.' : 'Deve completar o registro.')
              }
            </p>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 md:p-10 flex flex-col gap-8 w-full max-w-[100vw]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + lang}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            {activeTab === 'welcome' && (
              <WelcomeView 
                lang={lang} 
                onSelectModule={handleSelectModule} 
                t={t}
              />
            )}
            {activeTab === 'study' && selectedModule && (
              <StudyView 
                lang={lang} 
                category={selectedModule} 
                onBack={() => setActiveTab('welcome')}
                onStartQuiz={handleStartQuiz}
                t={t} 
              />
            )}
            {activeTab === 'registration' && (
              <RegistrationView 
                lang={lang} 
                onComplete={(data) => {
                  setUserData(data);
                  setActiveTab('quiz');
                }}
                t={t} 
              />
            )}
            {activeTab === 'quiz' && selectedModule && (
              userData ? (
                <QuizView lang={lang} t={t} userData={userData} category={selectedModule} onBackToModules={() => setActiveTab('welcome')} />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-10">
                  <div className="bg-white rounded-[40px] shadow-2xl p-10 text-center max-w-md border-8 border-slate-100 space-y-6">
                    <div className="w-16 h-16 bg-sbm-orange/10 text-sbm-orange rounded-2xl flex items-center justify-center mx-auto">
                      <User size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-sbm-dark-grey">{lang === 'en' ? 'Authentication Required' : 'Autenticação Necessária'}</h2>
                    <p className="text-slate-500 font-medium">
                      {lang === 'en' 
                        ? 'Identify yourself to record your score and enable PDF certificate generation.' 
                        : 'Identifique-se para registrar sua pontuação e habilitar a geração do certificado em PDF.'}
                    </p>
                    <button 
                      onClick={() => setActiveTab('registration')}
                      className="w-full bg-sbm-dark-grey text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all font-sans"
                    >
                      {lang === 'en' ? 'Set Up Candidate Profile' : 'Configurar Perfil de Candidato'}
                    </button>
                  </div>
                </div>
              )
            )}
            {activeTab === 'quiz' && !selectedModule && (
                <div className="flex-1 flex flex-col items-center justify-center p-10 h-full">
                  <div className="bg-white rounded-[40px] shadow-2xl p-10 text-center max-w-md border-8 border-slate-100 space-y-6">
                    <div className="w-16 h-16 bg-orange-50 text-sbm-orange rounded-2xl flex items-center justify-center mx-auto">
                      <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-sbm-dark-grey">{lang === 'en' ? 'Select a Module' : 'Selecione um Módulo'}</h2>
                    <p className="text-slate-500 font-medium">
                      {lang === 'en' 
                        ? 'Please select a module from the Overview to take its validation quiz.' 
                        : 'Por favor, selecione um módulo na Visão Geral para fazer seu quiz de validação.'}
                    </p>
                    <button 
                      onClick={() => setActiveTab('welcome')}
                      className="w-full bg-sbm-orange text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all font-sans"
                    >
                      {lang === 'en' ? 'Go to Modules' : 'Ir para Módulos'}
                    </button>
                  </div>
                </div>
            )}
            {activeTab === 'study' && !selectedModule && (
                <div className="flex-1 flex flex-col items-center justify-center p-10 h-full">
                  <div className="bg-white rounded-[40px] shadow-2xl p-10 text-center max-w-md border-8 border-slate-100 space-y-6">
                    <div className="w-16 h-16 bg-orange-50 text-sbm-orange rounded-2xl flex items-center justify-center mx-auto">
                      <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-sbm-dark-grey">{lang === 'en' ? 'Select a Module' : 'Selecione um Módulo'}</h2>
                    <button 
                      onClick={() => setActiveTab('welcome')}
                      className="w-full bg-sbm-orange text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all font-sans"
                    >
                      {lang === 'en' ? 'Go to Modules' : 'Ir para Módulos'}
                    </button>
                  </div>
                </div>
            )}
            {activeTab === 'pm-action' && (
              <PmActionView lang={lang} t={t} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function RegistrationView({ lang, onComplete, t }: { lang: Language, onComplete: (data: UserData) => void, t: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name && email) {
      onComplete({ name, email });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
      <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border-8 border-slate-100 max-w-lg w-full space-y-8">
        <header className="text-center space-y-2">
          <h2 className="text-3xl font-black text-sbm-dark-grey tracking-tight">
            {lang === 'en' ? 'Corporate Registration' : 'Registro Corporativo'}
          </h2>
          <p className="text-slate-500 font-medium">
            {lang === 'en' ? 'Enter your details to generate your certificate' : 'Insira seus dados para gerar seu certificado'}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <User size={14} className="text-sbm-orange" /> {lang === 'en' ? 'Full Name' : 'Nome Completo'}
            </label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: John Doe"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sbm-orange outline-none font-bold text-sbm-dark-grey transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} className="text-sbm-orange" /> {lang === 'en' ? 'Corporate Email' : 'E-mail Corporativo'}
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@sbmoffshore.com"
              className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl focus:border-sbm-orange outline-none font-bold text-sbm-dark-grey transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-sbm-orange hover:bg-orange-600 text-white font-black py-5 rounded-[24px] shadow-xl shadow-orange-100 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {lang === 'en' ? 'Initialize Certification' : 'Inicializar Certificação'} <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

function Lock({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function WelcomeView({ lang, onSelectModule, t }: { lang: Language, onSelectModule: (cat: ModuleCategory) => void, t: any }) {
  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <SbmLogo className="h-8 w-auto grayscale opacity-50 block" />
          <div className="w-px h-4 bg-slate-300 hidden md:block"></div>
          <div className="px-3 py-2 md:px-4 bg-sbm-orange text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100 italic">SBM Certification</div>
          <div className="px-3 py-2 md:px-4 bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-300">ISO 14224 & INS.471.6</div>
          <div className="hidden sm:block px-4 py-2 bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-300">Rev 2026</div>
        </div>
        <h1 className="text-5xl lg:text-6xl font-black text-sbm-dark-grey tracking-tighter max-w-4xl leading-[1.1]">
          {lang === 'en' ? 'SBM Training & Certification' : 'Treinamento e Certificação SBM'}
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
          {lang === 'en' 
            ? 'Select a technical module below to start your study and proceed to the validation exam.' 
            : 'Selecione um módulo técnico abaixo para iniciar seu estudo e prosseguir para o exame de validação.'}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {/* Module 1: IFS Flow */}
        <div 
          onClick={() => onSelectModule('IFS')}
          className="bg-white p-10 rounded-[48px] shadow-xl border-x-4 border-t-4 border-b-12 border-slate-100 flex flex-col justify-between group hover:border-sbm-orange transition-all cursor-pointer hover:-translate-y-2"
        >
          <div className="space-y-8">
            <div className="flex justify-between items-start">
               <div className="w-16 h-16 bg-sbm-dark-grey text-sbm-orange rounded-3xl flex items-center justify-center shadow-xl rotate-2 group-hover:rotate-0 transition-transform">
                 <Settings size={32} />
               </div>
               <span className="bg-slate-50 px-4 py-1 rounded-full text-[9px] font-black text-slate-400 border border-slate-100 uppercase">Module 01</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-sbm-dark-grey tracking-tight leading-none">{lang === 'en' ? 'IFS CMMS Execution' : 'Execução CMMS IFS'}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {lang === 'en' 
                  ? 'Master the technical sequence: WTT validation, Object linking, and Status transitions.' 
                  : 'Domine a sequência técnica: validação do WTT, vinculação de Objetos e transições de Status.'}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-2 text-sbm-orange font-black text-xs uppercase tracking-widest">
            {lang === 'en' ? 'Start Study' : 'Iniciar Estudo'} <ArrowRight size={16} />
          </div>
        </div>

        {/* Module 2: CR Management */}
        <div 
          onClick={() => onSelectModule('CR')}
          className="bg-white p-10 rounded-[48px] shadow-xl border-x-4 border-t-4 border-b-12 border-slate-100 flex flex-col justify-between group hover:border-sbm-orange transition-all cursor-pointer hover:-translate-y-2"
        >
          <div className="space-y-8">
            <div className="flex justify-between items-start">
               <div className="w-16 h-16 bg-sbm-orange text-white rounded-3xl flex items-center justify-center shadow-xl -rotate-2 group-hover:rotate-0 transition-transform">
                 <ClipboardCheck size={32} />
               </div>
               <span className="bg-slate-50 px-4 py-1 rounded-full text-[9px] font-black text-slate-400 border border-slate-100 uppercase">Module 02</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-sbm-dark-grey tracking-tight leading-none">{lang === 'en' ? 'CR Management' : 'Gestão de CR'}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {lang === 'en' 
                  ? 'Master the CRT/CRL classification matrix and standard approval flow logic.' 
                  : 'Domine a matriz de classificação CRT/CRL e a lógica do fluxo de aprovação padrão.'}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-2 text-sbm-orange font-black text-xs uppercase tracking-widest">
            {lang === 'en' ? 'Start Study' : 'Iniciar Estudo'} <ArrowRight size={16} />
          </div>
        </div>

        {/* Module 4: E3 Business Rules */}
        <div 
          onClick={() => onSelectModule('E3 Business Rules')}
          className="bg-white p-10 rounded-[48px] shadow-xl border-x-4 border-t-4 border-b-12 border-slate-100 flex flex-col justify-between group hover:border-sbm-orange transition-all cursor-pointer hover:-translate-y-2"
        >
          <div className="space-y-8">
            <div className="flex justify-between items-start">
               <div className="w-16 h-16 bg-orange-50 text-sbm-orange rounded-3xl flex items-center justify-center shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                 <ShieldCheck size={32} />
               </div>
               <span className="bg-orange-50/50 px-4 py-1 rounded-full text-[9px] font-black text-sbm-orange border border-orange-100 uppercase">Module 03</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-sbm-dark-grey tracking-tight leading-none">{lang === 'en' ? 'E3 Business Rules' : 'Regras de Negócio E3'}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {lang === 'en' 
                  ? 'Optimization pillars: Eliminate, Elevate, Enrich. Standards for reliability releases.' 
                  : 'Pilares de otimização: Eliminar, Elevar, Enriquecer. Padrões para liberações de confiabilidade.'}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-2 text-sbm-orange font-black text-xs uppercase tracking-widest">
            {lang === 'en' ? 'Start Study' : 'Iniciar Estudo'} <ArrowRight size={16} />
          </div>
        </div>

        {/* Module 4: FCA */}
        <div 
          onClick={() => onSelectModule('FCA')}
          className="bg-white p-10 rounded-[48px] shadow-xl border-x-4 border-t-4 border-b-12 border-slate-100 flex flex-col justify-between group hover:border-sbm-orange transition-all cursor-pointer hover:-translate-y-2"
        >
          <div className="space-y-8">
            <div className="flex justify-between items-start">
               <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center shadow-xl -rotate-3 group-hover:rotate-0 transition-transform">
                 <ShieldAlert size={32} />
               </div>
               <span className="bg-blue-50/50 px-4 py-1 rounded-full text-[9px] font-black text-blue-500 border border-blue-100 uppercase">Module 04</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-sbm-dark-grey tracking-tight leading-none">{lang === 'en' ? 'FCA & Criticality' : 'FCA e Criticidade'}</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                {lang === 'en' 
                  ? 'Functional Criticality Assessment methodology, Severity matrices, and ISO 14224 Taxonomic levels.' 
                  : 'Metodologia de Avaliação de Criticidade Funcional, matrizes de Severidade e níveis Taxonômicos ISO 14224.'}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-2 text-sbm-orange font-black text-xs uppercase tracking-widest">
            {lang === 'en' ? 'Start Study' : 'Iniciar Estudo'} <ArrowRight size={16} />
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[48px] shadow-2xl border-8 border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-2">
          <h4 className="text-xs font-black text-sbm-orange uppercase tracking-widest">{lang === 'en' ? 'Standards' : 'Normas'}</h4>
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase">
            ISO 14224, Petroleum & Natural Gas Industries
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-black text-sbm-orange uppercase tracking-widest">{lang === 'en' ? 'E3 Project' : 'Projeto E3'}</h4>
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase">
            Optimization focusing on Asset Integrity & Lifecycle
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-black text-sbm-orange uppercase tracking-widest">{lang === 'en' ? 'Certification' : 'Certificação'}</h4>
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase">
            Requires 70% Score in each individual module exam
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-xs font-black text-sbm-orange uppercase tracking-widest">{lang === 'en' ? 'Compliance' : 'Conformidade'}</h4>
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed uppercase">
            Gaps identified are used for continuous fleet improvement
          </p>
        </div>
      </div>
    </div>
  );
}

function StudyView({ lang, category, onBack, onStartQuiz, t }: { lang: Language, category: ModuleCategory, onBack: () => void, onStartQuiz: () => void, t: any }) {
  const content = MODULES_STUDY.find(m => m.category === category);
  if (!content) return null;

  return (
    <div className="space-y-12 pb-20 w-full max-w-5xl mx-auto overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-100/50 p-4 rounded-3xl backdrop-blur-md sticky top-4 z-40 border border-white/50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-sbm-dark-grey font-black transition-colors group px-6 py-2"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {lang === 'en' ? 'Exit Training' : 'Sair do Treinamento'}
        </button>

        {content.pdfUrl && (
          <a 
            href={getAssetUrl(content.pdfUrl)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-sbm-dark-grey px-6 py-3 rounded-2xl shadow-sm font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors border border-slate-100"
          >
            <Download size={16} className="text-sbm-orange" />
            {lang === 'en' ? 'Source Document (PDF)' : 'Documento Fonte (PDF)'}
          </a>
        )}
      </div>

      <div className="bg-white shadow-2xl rounded-[48px] overflow-hidden border border-slate-200 relative">
        {/* Document Header Decoration */}
        <div className="absolute top-0 left-0 w-full h-4 bg-sbm-orange flex gap-2 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="h-full w-2 bg-white/20 skew-x-12"></div>
          ))}
        </div>

        {/* Training Header */}
        <div className="px-16 pt-12 md:pt-20 pb-8 md:pb-12 border-b border-slate-100 space-y-8">
           <div className="flex flex-col md:flex-row justify-between items-start gap-6">
             <div className="space-y-2">
               <div className="flex items-center gap-3">
                 <SbmLogo className="h-6 w-auto grayscale" />
                 <span className="w-px h-4 bg-slate-300"></span>
                 <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase italic">Internal Technical Document</span>
               </div>
               <h1 className="text-5xl font-black text-sbm-dark-grey tracking-tighter leading-none pt-4 max-w-3xl">
                {t(content.title)}
               </h1>
             </div>
             <div className="text-left md:text-right space-y-1">
               <div className="text-[10px] font-black text-sbm-orange uppercase tracking-widest">Training Version 2.0</div>
               <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ref: SBM-AI-CERT-{category.replace(/\s+/g, '')}</div>
             </div>
           </div>
           
           <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-sbm-orange flex-shrink-0">
                <Info size={24} />
              </div>
              <p className="text-lg text-slate-600 font-medium leading-relaxed italic">
                {t(content.intro)}
              </p>
           </div>
        </div>

        {/* Content Body */}
        <div className="p-16 space-y-16">
          {content.sections.map((section, idx) => (
            <div key={idx} className="space-y-8 relative">
              <div className="flex items-center gap-6">
                 <span className="flex-shrink-0 w-12 h-12 bg-sbm-dark-grey text-white rounded-2xl flex items-center justify-center text-xl font-black italic shadow-lg">
                   {idx + 1}
                 </span>
                 <h2 className="text-3xl font-black text-sbm-dark-grey tracking-tight border-b-4 border-slate-100 pb-2 flex-grow">
                   {t(section.title)}
                 </h2>
              </div>
              
              <div className={`grid grid-cols-1 ${section.image ? 'lg:grid-cols-2' : ''} gap-12`}>
                 <div className="space-y-6">
                    <p className="text-xl text-slate-600 font-medium leading-[1.6] first-letter:text-4xl first-letter:font-black first-letter:text-sbm-orange first-letter:mr-1 first-letter:float-left">
                      {t(section.content)}
                    </p>
                    <div className="p-6 bg-orange-50/50 border-l-4 border-sbm-orange rounded-r-3xl space-y-2">
                       <h4 className="text-[10px] font-black text-sbm-orange uppercase tracking-widest flex items-center gap-2">
                         <ShieldAlert size={14} /> Critical Learning Note
                       </h4>
                       <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase tracking-tight">
                         {lang === 'en' 
                            ? 'Compliance with this chapter is mandatory for certification. Failure to execute these rules in IFS often leads to CRL1 severity failures.'
                            : 'A conformidade com este capítulo é obrigatória para a certificação. Falhas na execução destas regras no IFS frequentemente levam a falhas de severidade CRL1.'}
                       </p>
                    </div>
                 </div>

                 {section.image && (
                   <div className="space-y-4">
                     <div className="bg-slate-100/50 p-4 rounded-[40px] border border-slate-200">
                        <div className="rounded-[28px] overflow-hidden border-2 border-slate-200 shadow-2xl bg-white">
                          <img 
                            src={getAssetUrl(section.image)} 
                            alt="Document Asset" 
                            className="w-full h-auto opacity-100 transition-all cursor-zoom-in"
                          />
                        </div>
                     </div>
                     <div className="px-4 text-[10px] italic text-slate-400 font-bold flex items-center gap-2">
                       <Search size={12} /> Fig 1.{idx + 1} - Reference illustration for technical baseline
                     </div>
                   </div>
                 )}
              </div>
            </div>
          ))}
        </div>

        {/* Document Footer Decoration */}
        <div className="bg-slate-50 p-16 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex gap-4">
              <div className="w-12 h-1 bottom-1 bg-sbm-orange px-2 flex items-center justify-center font-black text-[8px] text-white italic">OFFICIAL</div>
              <div className="w-12 h-1 bottom-1 bg-slate-300"></div>
              <div className="w-12 h-1 bottom-1 bg-slate-300"></div>
           </div>
           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" /> Technical Audit Ready
           </div>
        </div>
      </div>

      <div className="bg-sbm-dark-grey p-12 rounded-[56px] shadow-2xl flex flex-col md:flex-row items-center justify-between text-white border-8 border-white/5 relative overflow-hidden mt-12 gap-6 text-center sm:text-left">
         <div className="absolute left-0 top-0 h-full w-4 bg-sbm-orange"></div>
         <div className="space-y-2">
           <h4 className="text-3xl font-black tracking-tighter">{lang === 'en' ? 'Study Complete?' : 'Estudo Concluído?'}</h4>
           <div className="text-base font-medium opacity-60">
             {lang === 'en' 
               ? `Validate your knowledge on ${category} to earn your certificate.` 
               : `Valide seu conhecimento em ${category} para obter seu certificado.`}
           </div>
         </div>
         <button 
           onClick={onStartQuiz}
           className="bg-sbm-orange hover:bg-orange-600 text-white font-black px-12 py-6 rounded-[28px] shadow-2xl shadow-orange-950 transition-all active:scale-95 flex items-center gap-3 text-lg"
         >
           {lang === 'en' ? 'Start Exam' : 'Iniciar Exame'} <ArrowRight size={24} />
         </button>
      </div>
    </div>
  );
}
function QuizView({ lang, t, userData, category, onBackToModules }: { lang: Language, t: any, userData: UserData, category: ModuleCategory, onBackToModules: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter questions by module
  const filteredQuestions = TRAINING_QUIZ.filter(q => q.category === category);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(filteredQuestions.length).fill(null));

  const question = filteredQuestions[currentQuestion];

  const handleAnswer = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = selectedOption;
    setUserAnswers(newAnswers);
    
    setIsAnswered(true);
    if (selectedOption === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(s => s + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const downloadCertificate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      const isPt = lang === 'pt';
      const percent = Math.round((score / filteredQuestions.length) * 100);

      // Styling
      doc.setFillColor(31, 41, 55); // SBM Dark Grey
      doc.rect(0, 0, 297, 210, 'F');
      
      // Border
      doc.setDrawColor(243, 111, 33); // SBM Orange
      doc.setLineWidth(5);
      doc.rect(10, 10, 277, 190);

      // Add SBM Logo using robust DataURL loader
      const logoData = await loadImageAsDataURL(getAssetUrl('assets/sbm-logo.png'));
      if (logoData) {
        doc.addImage(logoData, 'PNG', 123.5, 20, 50, 15);
      } else {
        // Fallback text if logo fails to load
        doc.setFontSize(22);
        doc.setTextColor(243, 111, 33);
        doc.text("SBM OFFSHORE", 148.5, 30, { align: 'center' });
      }

      // Content
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(30);
      doc.text(isPt ? 'CERTIFICADO DE CONFLUÊNCIA TÉCNICA' : 'TECHNICAL COMPLETION CERTIFICATE', 148.5, 60, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(243, 111, 33);
      doc.text(isPt ? 'ESTE CERTIFICADO É CONCEDIDO A:' : 'THIS CERTIFICATE IS PROUDLY PRESENTED TO:', 148.5, 85, { align: 'center' });

      doc.setFontSize(30);
      doc.setTextColor(255, 255, 255);
      doc.text(userData.name.toUpperCase(), 148.5, 110, { align: 'center' });

      doc.setFontSize(14);
      doc.setTextColor(150, 150, 150);
      doc.text(userData.email, 148.5, 120, { align: 'center' });

      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text(
        isPt 
          ? `Módulo: ${category}` 
          : `Module: ${category}`, 
        148.5, 145, { align: 'center' }
      );

      // Score
      doc.setFillColor(243, 111, 33);
      doc.roundedRect(120, 155, 57, 15, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text(`${isPt ? 'NOTA FINAL' : 'FINAL SCORE'}: ${percent}%`, 148.5, 165, { align: 'center' });

      // Date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const formattedDate = new Intl.DateTimeFormat(isPt ? 'pt-BR' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(new Date());

      doc.text(`${isPt ? 'Data de Emissão' : 'Issue Date'}: ${formattedDate}`, 148.5, 185, { align: 'center' });

      // Clean filename
      const cleanCategory = category.replace(/[^a-z0-9]/gi, '_');
      const cleanName = userData.name.replace(/[^a-z0-9]/gi, '_');
      const fileName = `SBM_Cert_${cleanCategory}_${cleanName}.pdf`;

      // ROBUST DOWNLOAD PATTERN: Using Blob + URL.createObjectURL
      // This is more reliable in iframes than doc.save()
      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 100);
      
      console.log("PDF download triggered successfully via Blob URL.");
    } catch (err) {
      console.error("Critical error generating PDF:", err);
      alert(lang === 'en' 
        ? 'Error generating PDF. Please ensure you are not in Private/Incognito mode or try a different browser.' 
        : 'Erro ao gerar o PDF. Por favor, certifique-se de que não está no modo Privado/Anônimo ou tente outro navegador.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (showResult && !reviewMode) {
    const passed = (score / filteredQuestions.length) >= 0.7;
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10">
        <div className="bg-white rounded-[40px] shadow-2xl p-16 text-center max-w-xl space-y-8 border-8 border-slate-100 flex flex-col items-center">
           <SbmLogo className="h-10 w-auto mb-2 md:mb-4" />
           <div className="w-32 h-32 bg-sbm-dark-grey mx-auto rounded-[32px] flex items-center justify-center text-white shadow-xl relative">
              <div className="absolute inset-0 border-4 border-sbm-orange m-2 rounded-[24px]"></div>
              <span className="text-4xl font-black text-white">{Math.round((score / filteredQuestions.length) * 100)}%</span>
           </div>
           <div className="space-y-2">
             <div className="flex items-center justify-center gap-2 text-sbm-orange mb-2">
               <Trophy size={20} className="md:w-6 md:h-6" />
               <h2 className="text-3xl font-black text-sbm-dark-grey tracking-tight">{passed ? (lang === 'en' ? 'Module Certified' : 'Módulo Certificado') : (lang === 'en' ? 'Review Required' : 'Revisão Necessária')}</h2>
             </div>
             <p className="text-slate-500 font-medium tracking-tight text-base">
               {passed 
                 ? (lang === 'en' ? `Well done! You master ${category}.` : `Bem feito! Você domina ${category}.`)
                 : (lang === 'en' ? 'Review the content and try again.' : 'Revise o conteúdo e tente novamente.')}
             </p>
             <p className="text-slate-400 text-[10px] pt-1 font-medium italic">
               {lang === 'en' 
                 ? 'Tip: If download doesn\'t start, open in a NEW TAB.' 
                 : 'Dica: Se o download não iniciar, abra em uma NOVA ABA.'}
             </p>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
             {passed && (
               <button 
                 onClick={downloadCertificate}
                 disabled={isGenerating}
                 className={`${isGenerating ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'} text-white font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2`}
               >
                 <Download size={20} className={isGenerating ? 'animate-bounce' : ''} /> 
                 {isGenerating 
                   ? (lang === 'en' ? 'Generating...' : 'Gerando...') 
                   : (lang === 'en' ? 'Download PDF' : 'Baixar PDF')}
               </button>
             )}
             <button 
               onClick={() => {
                 setReviewMode(true);
                 setCurrentQuestion(0);
                 setSelectedOption(userAnswers[0]);
                 setIsAnswered(true);
               }}
               className="bg-sbm-dark-grey hover:bg-slate-800 text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
             >
               <ClipboardCheck size={20} /> {lang === 'en' ? 'Review' : 'Revisar'}
             </button>
             <button 
               onClick={onBackToModules}
               className="col-span-2 bg-slate-100 hover:bg-slate-200 text-sbm-dark-grey font-black py-4 rounded-2xl transition-all active:scale-95"
             >
                {lang === 'en' ? 'Finish & Back to Modules' : 'Finalizar e Voltar aos Módulos'}
             </button>
           </div>
        </div>
      </div>
    );
  }

  if (reviewMode) {
    return (
      <div className="flex flex-col lg:flex-row gap-8 h-full ">
        <div className="flex-1 flex flex-col gap-8 min-h-full">
          <header className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-sbm-dark-grey tracking-tight">{lang === 'en' ? 'Quiz Review' : 'Revisão do Quiz'} - <span className="text-sbm-orange">{category}</span></h1>
              <div className="flex flex-wrap gap-2 pt-2">
                {filteredQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setSelectedOption(userAnswers[idx]);
                    }}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                      currentQuestion === idx ? 'ring-4 ring-sbm-orange/30 border-sbm-orange border-2' : ''
                    } ${
                      userAnswers[idx] === filteredQuestions[idx].correctAnswer ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-rose-500 text-white shadow-lg shadow-rose-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => setReviewMode(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold transition-all text-sm">
               {lang === 'en' ? 'Back to Results' : 'Voltar aos Resultados'}
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
            <div className="bg-white rounded-[40px] shadow-2xl p-10 border-8 border-slate-100 space-y-8 ">
               <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-100 text-orange-600`}>
                    {category}
                  </span>
               </div>
               {question.image && (
                 <div className="rounded-2xl overflow-hidden border-4 border-slate-100 shadow-inner bg-slate-50">
                   <img 
                     src={getAssetUrl(question.image)} 
                     alt="Technical Reference" 
                     className="w-full h-auto max-h-48 object-contain"
                   />
                 </div>
               )}
               <h2 className="text-2xl font-black text-sbm-dark-grey leading-tight">
                 {t(question.question)}
               </h2>
               <div className="space-y-3">
                 {question.options[lang].map((opt, idx) => (
                    <div
                      key={idx}
                      className={`w-full p-4 text-left rounded-2xl border-2 font-bold text-sm flex items-center justify-between
                        ${userAnswers[currentQuestion] === idx ? 'bg-sbm-dark-grey text-white border-transparent' : 'bg-slate-50 border-slate-100 text-slate-400'}
                        ${idx === question.correctAnswer ? '!bg-emerald-500 !text-white !border-transparent !opacity-100' : ''}
                        ${userAnswers[currentQuestion] === idx && idx !== question.correctAnswer ? '!bg-rose-500 !text-white !border-transparent' : ''}
                      `}
                    >
                      <span>{opt}</span>
                      {idx === question.correctAnswer && <CheckCircle2 size={16} className="md:w-5 md:h-5 flex-shrink-0 ml-2" />}
                      {userAnswers[currentQuestion] === idx && idx !== question.correctAnswer && <XCircle size={16} className="md:w-5 md:h-5 flex-shrink-0 ml-2" />}
                    </div>
                 ))}
               </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-sbm-dark-grey rounded-[40px] p-10 text-white flex flex-col justify-center space-y-6 shadow-2xl relative overflow-hidden"
            >
             <div className="absolute bottom-0 right-0 p-8 opacity-5">
               {userAnswers[currentQuestion] === question.correctAnswer ? <CheckCircle2 size={200} /> : <XCircle size={200} />}
             </div>
             <div className="flex items-center gap-3 relative z-10">
               <div className={`p-2 rounded-xl ${userAnswers[currentQuestion] === question.correctAnswer ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                  {userAnswers[currentQuestion] === question.correctAnswer ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
               </div>
               <h3 className="text-xl font-black uppercase tracking-tight">
                  {userAnswers[currentQuestion] === question.correctAnswer ? (lang === 'en' ? 'Technical Correct' : 'Tecnicamente Correto') : (lang === 'en' ? 'Deviation Found' : 'Desvio Encontrado')}
               </h3>
             </div>
             <p className="text-xl font-medium opacity-90 leading-relaxed italic relative z-10 border-l-4 border-sbm-orange pl-6 py-2">
               "{t(question.explanation)}"
             </p>
             <div className="pt-8 border-t border-white/5 relative z-10 flex items-center gap-4">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <ClipboardCheck className="text-sbm-orange" size={24} />
                </div>
                <p className="text-xs font-medium text-slate-400 max-w-xs leading-relaxed uppercase">
                  SBM Technical Integrity Policy 2026
                </p>
             </div>
          </motion.div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 h-full ">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-sbm-dark-grey tracking-tight">{lang === 'en' ? 'Validation Quiz' : 'Quiz de Validação'}</h1>
          <p className="text-slate-500 font-medium tracking-tight text-base">
            {lang === 'en' ? `Question ${currentQuestion + 1} of ${filteredQuestions.length}` : `Pergunta ${currentQuestion + 1} de ${filteredQuestions.length}`}
          </p>
        </div>
        <button onClick={onBackToModules} className="text-xs font-black uppercase text-slate-400 hover:text-sbm-orange transition-colors">
          {lang === 'en' ? 'Abort Exam' : 'Abortar Exame'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 p-10 border-8 border-slate-100 space-y-8 h-fit">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-100 text-orange-600`}>
                  {category}
                </span>
              </div>
           </div>
           {question.image && (
             <div className="rounded-2xl overflow-hidden border-4 border-slate-100 shadow-inner bg-slate-50">
               <img 
                 src={getAssetUrl(question.image)} 
                 alt="Technical Reference" 
                 className="w-full h-auto max-h-64 object-contain"
               />
             </div>
           )}
           <h2 className="text-2xl font-black text-sbm-dark-grey leading-tight">
             {t(question.question)}
           </h2>
           <div className="space-y-3">
             {question.options[lang].map((opt, idx) => (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full p-5 text-left rounded-2xl border-2 transition-all font-bold text-sm flex items-center justify-between
                    ${selectedOption === idx ? 'bg-sbm-dark-grey text-white border-transparent' : 'bg-slate-50 border-slate-100 text-sbm-dark-grey hover:bg-slate-100'}
                    ${isAnswered && idx === question.correctAnswer ? '!bg-emerald-500 !text-white !border-transparent' : ''}
                    ${isAnswered && selectedOption === idx && idx !== question.correctAnswer ? '!bg-sbm-orange !text-white !border-transparent' : ''}
                  `}
                >
                  {opt}
                  {isAnswered && idx === question.correctAnswer && <CheckCircle2 size={20} />}
                  {isAnswered && selectedOption === idx && idx !== question.correctAnswer && <XCircle size={20} />}
                </button>
             ))}
           </div>
           
           {!isAnswered ? (
             <button 
                disabled={selectedOption === null}
                onClick={handleAnswer}
                className="w-full bg-sbm-orange hover:bg-orange-600 text-white font-black py-4 rounded-2xl shadow-lg transition-all disabled:opacity-30 active:scale-95"
             >
               {lang === 'en' ? 'Submit' : 'Enviar'}
             </button>
           ) : (
             <button 
                onClick={handleNext}
                className="w-full bg-sbm-dark-grey hover:bg-slate-800 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95"
             >
               {currentQuestion < filteredQuestions.length - 1 ? (lang === 'en' ? 'Next' : 'Próxima') : (lang === 'en' ? 'Show Results' : 'Ver Resultados')}
             </button>
           )}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-sbm-dark-grey rounded-[40px] p-10 text-white flex flex-col justify-center space-y-6 shadow-2xl relative overflow-hidden h-fit"
            >
               <div className="absolute bottom-0 right-0 p-8 opacity-5">
                 <ClipboardCheck size={200} />
               </div>
               <div className="flex items-center gap-3 relative z-10">
                 <div className={`p-2 rounded-xl ${selectedOption === question.correctAnswer ? 'bg-emerald-500' : 'bg-sbm-orange'}`}>
                    {selectedOption === question.correctAnswer ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-tight">
                    {selectedOption === question.correctAnswer ? (lang === 'en' ? 'Correct' : 'Correto') : (lang === 'en' ? 'Incorrect' : 'Incorreto')}
                 </h3>
               </div>
               <p className="text-lg font-medium opacity-90 leading-relaxed italic relative z-10">
                 "{t(question.explanation)}"
               </p>
               <div className="pt-6 border-t border-white/10 space-y-1 relative z-10">
                 <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{lang === 'en' ? 'POLICY REF' : 'REF POLÍTICA'}</p>
                 <p className="text-xs font-bold text-sbm-orange tracking-tight uppercase">SBM Offshore Operational Standards v24</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
function PmActionView({ lang, t }: { lang: Language, t: any }) {
  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-5xl lg:text-6xl font-black text-sbm-dark-grey tracking-tighter max-w-4xl leading-[1.1]">
          {lang === 'en' ? 'PM Action Study Cards' : 'Cards de Estudo: PM Action'}
        </h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
          {lang === 'en' 
            ? 'Review the essential steps and interfaces for PM Action management through visual study cards.' 
            : 'Revise as etapas e interfaces essenciais para a gestão de Ações de PM através de cards visuais de estudo.'}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {PM_ACTION_CARDS.map((card) => (
          <motion.div 
            key={card.id}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100 flex flex-col group"
          >
            <div className="h-64 overflow-hidden bg-slate-100 relative">
              <img 
                src={getAssetUrl(card.image)} 
                alt={t(card.title)} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <span className="text-white text-xs font-black uppercase tracking-widest">{lang === 'en' ? 'View Details' : 'Ver Detalhes'}</span>
              </div>
            </div>
            <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-sbm-orange uppercase tracking-widest">Step {card.id}</span>
                <h3 className="text-2xl font-black text-sbm-dark-grey tracking-tight">{t(card.title)}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {t(card.description)}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                 <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-sbm-orange"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                 </div>
                 <ArrowRight size={20} className="text-sbm-orange opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative empty state if needed */}
      {PM_ACTION_CARDS.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[40px] border-8 border-slate-100">
           <p className="text-slate-400 font-bold uppercase tracking-widest">Aguardando novas imagens...</p>
        </div>
      )}
    </div>
  );
}

// Keep original file end if any

