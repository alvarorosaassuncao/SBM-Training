
export type LocalizedString = {
  en: string;
  pt: string;
};

export type CRTType = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  examples?: LocalizedString[];
};

export type CRLType = {
  id: string;
  level: LocalizedString;
  description: LocalizedString;
  color: string;
};

export type PMStep = {
  id: number;
  title: LocalizedString;
  instruction: LocalizedString;
  targetElement?: string;
};

export type ModuleCategory = 'IFS' | 'CR' | 'E3 Business Rules' | 'FCA';

export interface ModuleStudy {
  category: ModuleCategory;
  title: LocalizedString;
  intro: LocalizedString;
  pdfUrl?: string;
  sections: {
    title: LocalizedString;
    content: LocalizedString;
    image?: string;
  }[];
  presentation?: {
    title: LocalizedString;
    description: LocalizedString;
    fileUrl: string;
    coverImage?: string;
  };
}

export interface QuizQuestion {
  id: number;
  category: ModuleCategory;
  image?: string;
  question: LocalizedString;
  options: {
    en: string[];
    pt: string[];
  };
  correctAnswer: number;
  explanation: LocalizedString;
}


export interface StudyCard {
  id: number;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
}

export interface CrVideoChapter {
  title: LocalizedString;
  timestamp: string; // "00:00" format
  seconds: number;
}
