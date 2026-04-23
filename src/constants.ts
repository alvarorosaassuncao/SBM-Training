import { CRTType, CRLType, PMStep, QuizQuestion, ModuleStudy, StudyCard } from './types';

/**
 * MODULE STUDY CONTENT
 */
export const MODULES_STUDY: ModuleStudy[] = [
  {
    category: 'IFS',
    title: { en: 'IFS CMMS: Execution & Engineering', pt: 'CMMS IFS: Execução e Engenharia' },
    pdfUrl: 'assets/docs/Treinamento de PM Action - Create or update PM Action.pdf',
    intro: { 
      en: 'Advanced technical guide for IFS CMMS life-cycle, covering WTT, PM Action engineering, and operational readiness.',
      pt: 'Guia técnico avançado para o ciclo de vida do CMMS IFS, cobrindo WTT, engenharia de Ação de PM e prontidão operacional.'
    },
    sections: [
      {
        title: { en: 'WTT: Technical Baseline', pt: 'WTT: Base Técnica' },
        content: {
          en: 'Work Task Templates (WTT) are the engineering master records. They define the standard procedure (What), the estimated duration (How long), and required skills (Who). Critical Rule: A WTT must be in "Active" status to be utilized by PM Actions. Any technical revision to a WTT propagates to all linked PM Actions, ensuring fleet-wide standardization.',
          pt: 'Os Modelos de Tarefa de Trabalho (WTT) são os registros mestres de engenharia. Eles definem o procedimento padrão (O quê), a duração estimada (Quanto tempo) e as habilidades necessárias (Quem). Regra Crítica: Um WTT deve estar no status "Ativo" para ser utilizado por Ações de PM. Qualquer revisão técnica em um WTT se propaga para todas as Ações de PM vinculadas, garantindo a padronização em toda a frota.'
        }
      },
      {
        title: { en: 'PM Action Engineering', pt: 'Engenharia de Ação de PM' },
        content: {
          en: 'PM Actions define the execution schedule for specific Objects. The "Maintenance Plan" tab is the brain of the PM Action, where you define intervals based on Calendar (Time), Condition (Measurements), or Event (Cycle counts). Technical integrity requires that linked Objects must be in "In Operation" status; otherwise, WO generation will fail.',
          pt: 'As Ações de PM definem o cronograma de execução para Objetos específicos. A guia "Plano de Manutenção" é o cérebro da Ação de PM, onde você define intervalos baseados em Calendário (Tempo), Condição (Medições) ou Evento (Contagem de ciclos). A integridade técnica exige que os Objetos vinculados estejam no status "Em Operação"; caso contrário, a geração da WO falhará.'
        }
      },
      {
        title: { en: 'Strategic Resource Planning', pt: 'Planejamento Estratégico de Recursos' },
        content: {
          en: 'Operational readiness is managed via the "Resource" and "Materials" tabs. You must define Man-Hours (Crafts) and sub-parts (BOM). In SBM standards, missing BOM linkage at the PM stage is a CRL failure, as it prevents the supply chain from proactive procurement of long-lead items.',
          pt: 'A prontidão operacional é gerenciada através das guias "Recurso" e "Materiais". Você deve definir Homem-Hora (Ofícios) e sub-peças (BOM). Nos padrões SBM, a falta de vinculação da BOM no estágio de PM é uma falha de CRL, pois impede que a cadeia de suprimentos realize a compra proativa de itens de longo prazo.'
        }
      },
      {
        title: { en: 'Object Journal & Asset History', pt: 'Journal do Objeto e Histórico do Ativo' },
        content: {
          en: 'The Object Journal tracks every technical change. Historical integrity is maintained by ensuring that every "Finish" status on a Work Order captures the "As Found" and "As Left" condition codes. This data feeds the Reliability Engineering analysis for MTBF (Mean Time Between Failures) calculations.',
          pt: 'O Journal do Objeto rastreia cada mudança técnica. A integridade histórica é mantida garantindo que cada status "Concluído" em uma Ordem de Trabalho capture os códigos de condição "As Found" e "As Left". Esses dados alimentam a análise de Engenharia de Confiabilidade para cálculos de MTBF (Tempo Médio Entre Falhas).'
        }
      }
    ]
  },
  {
    category: 'CR',
    title: { en: 'CR & Lifecycle Management (INS.471.6)', pt: 'Gestão de CR e Ciclo de Vida (INS.471.6)' },
    pdfUrl: 'assets/docs/INS.471.6.ENG - Manage Change Request in CMMS - Approval Flow 2.pdf',
    intro: {
      en: 'Official SBM Standard for managing CMMS change requests, technical review boundaries, and approval flows.',
      pt: 'Padrão Oficial SBM para gerenciar pedidos de mudança no CMMS, limites de revisão técnica e fluxos de aprovação.'
    },
    sections: [
      {
        title: { en: 'CRT Matrix: Strategy vs. Asset', pt: 'Matriz CRT: Estratégia vs. Ativo' },
        content: {
          en: 'CRT1 (Strategy): Use this for EMS updates, frequency changes, or removal of PM actions. CRT2 (Lifecycle): Used for "Object Status" changes, such as moving a pump from "Active" to "Scrapped". CRT3 (Attribute): Used for minor modifications like updating work instructions or resource names that do NOT change the core failure mode mitigation.',
          pt: 'CRT1 (Estratégia): Use para atualizações de EMS, mudanças de frequência ou remoção de ações de PM. CRT2 (Ciclo de Vida): Usado para mudanças de "Status do Objeto", como mover uma bomba de "Ativo" para "Sucateado". CRT3 (Atributo): Usado para modificações menores, como atualizar instruções de trabalho ou nomes de recursos que NÃO alteram a mitigação do modo de falha central.'
        }
      },
      {
        title: { en: 'CRL Hierarchy (Severity Levels)', pt: 'Hierarquia CRL (Níveis de Severidade)' },
        content: {
          en: 'CRL1 (Critical): Immediate threat to people or environment. CRL2 (High): Major production loss risk. CRL3 (Standard): Routine engineering optimization (Project E3 releases). CRL5 (Admin): Typo corrections or descriptive labels. Each CRL level dictates the maximum Time-to-Approval (TTA) for the management team.',
          pt: 'CRL1 (Crítico): Ameaça imediata às pessoas ou ao ambiente. CRL2 (Alto): Risco de grande perda de produção. CRL3 (Padrão): Otimização de engenharia de rotina (liberações do Projeto E3). CRL5 (Admin): Correções de digitação ou rótulos descritivos. Cada nível de CRL dita o Tempo Máximo de Aprovação (TTA) para a equipe de gestão.'
        }
      },
      {
        title: { en: 'The Role of technical review', pt: 'O Papel da revisão técnica' },
        content: {
          en: 'Reviewers (Asset Integrity Team) must verify: 1. ISO 14224 compliant data structure. 2. Failure Mode logic (FASN linkage). 3. BOM availability. A reviewer has the authority to REJECT a CR, moving it to "Cancelled" status. Managers cannot approve a CR until the Technical Reviewer has cleared the Technical Gate.',
          pt: 'Os revisores (Equipe de Integridade de Ativos) devem verificar: 1. Estrutura de dados em conformidade com a ISO 14224. 2. Lógica de Modo de Falha (vínculo FASN). 3. Disponibilidade de BOM. Um revisor tem autoridade para REJEITAR um CR, movendo-o para o status "Cancelado". Os gerentes não podem aprovar um CR até que o Revisor Técnico tenha liberado o Portão Técnico.'
        }
      },
      {
        title: { en: 'Scope: CMS vs SBM Fleet', pt: 'Escopo: CMS vs Frota SBM' },
        content: {
          en: 'The INS.471.6 procedure applies to all hulls, topsides, and subsea assets. Any requested deviation from the "Master Global Strategy" must be explicitly justified in the CR "Business Case" field, referencing localized environmental factors or vendor-specific engineering advisories.',
          pt: 'O procedimento INS.471.6 aplica-se a todos os cascos, topsides e ativos submarinos. Qualquer desvio solicitado da "Estratégia Global Mestra" deve ser explicitamente justificado no campo "Business Case" do CR, referenciando fatores ambientais localizados ou avisos de engenharia específicos do fornecedor.'
        }
      }
    ]
  },
  {
    category: 'E3 Business Rules',
    title: { en: 'E3: Program for Maintenance Optimization', pt: 'E3: Programa de Otimização de Manutenção' },
    pdfUrl: 'assets/docs/E3 2026 - Business Rules 2.pdf',
    intro: {
      en: 'Strategic standards for the E3 Project (Eliminate, Elevate, Enrich), reliability releases, and CMMS cleaning rules.',
      pt: 'Padrões estratégicos para o Projeto E3 (Eliminar, Elevar, Enriquecer), liberações de confiabilidade e regras de limpeza do CMMS.'
    },
    sections: [
      {
        title: { en: 'The Optimization Cycle: E.E.E.', pt: 'O Ciclo de Otimização: E.E.E.' },
        content: {
          en: '1. ELIMINATE: Pruning low-value tasks (cleaning, operational procedures, non-technical routines). 2. ELEVATE: Transitioning from fixed calendars to predictive condition monitoring. 3. ENRICH: Mandatory data cleansing, ensuring every Object has a valid Technical Specification and failure mode mapped in the CMMS.',
          pt: '1. ELIMINAR: Podar tarefas de baixo valor (limpeza, procedimentos operacionais, rotinas não técnicas). 2. ELEVAR: Transição de calendários fixos para monitoramento de condição preditivo. 3. ENRIQUECER: Limpeza de dados obrigatória, garantindo que cada Objeto tenha uma Especificação Técnica válida e modo de falha mapeado no CMMS.'
        },
        image: 'screenshot_for_page_4.png'
      },
      {
        title: { en: 'Strict Inclusion Criteria', pt: 'Critérios de Inclusão Rigorosos' },
        content: {
          en: 'What stays in CMMS? Tasks that prevent technical failure, preserve asset integrity, or are required for safety barriers (SECE). What stays OUT? Day-by-day housekeeping, operational settings, training logs, and checklists that do not result in a direct maintenance action record.',
          pt: 'O que fica no CMMS? Tarefas que previnem falhas técnicas, preservam a integridade do ativo ou são exigidas para barreiras de segurança (SECE). O que fica FORA? Limpeza diária, configurações operacionais, logs de treinamento e checklists que não resultam em um registro de ação de manutenção direta.'
        },
        image: 'screenshot_for_page_5.png'
      },
      {
        title: { en: 'Reliability Release Indexes', pt: 'Índices de Reliability Release' },
        content: {
          en: 'A Reliability Release (RR) is the final technical output. It measures the "Optimization Index" (Delta of PM weight) and "Compliance Index" (Alignment with SBM Global Strategy). Any gaps identified (missing special tools, spare parts stock-outs) must be flagged as "Operational Gaps" in the FCA model.',
          pt: 'Um Reliability Release (RR) é a saída técnica final. Ele mede o "Índice de Otimização" (Delta do peso de PM) e o "Índice de Conformidade" (Alinhamento com a Estratégia Global SBM). Quaisquer lacunas identificadas (ferramentas especiais ausentes, falta de estoque de peças de reposição) devem ser sinalizadas como "Lacunas Operacionais" no modelo FCA.'
        },
        image: 'screenshot_for_page_10.png'
      },
      {
        title: { en: 'SECE & Performance Management', pt: 'SECE e Gestão de Desempenho' },
        content: {
          en: 'Safety and Environmental Critical Elements (SECE) are the highest priority. Every SECE object MUST have a Performance Standard (PS) assigned via the Process Code. The E3 program verifies that for every PS, there is a corresponding PM Action that validates the primary function of the barrier.',
          pt: 'Elementos Críticos de Segurança e Ambiente (SECE) são a prioridade mais alta. Cada objeto SECE DEVE ter um Padrão de Desempenho (PS) atribuído através do Código de Processo. O programa E3 verifica se, para cada PS, existe uma Ação de PM correspondente que valida a função primária da barreira.'
        },
        image: 'screenshot_for_page_23.png'
      }
    ]
  },
  {
    category: 'FCA',
    title: { en: 'Functional Criticality Assessment (FCA)', pt: 'Avaliação de Criticidade Funcional (FCA)' },
    pdfUrl: 'assets/docs/PC58963-OAPRMMWI999001A4 FCA WI update - BP review_feedbac to BP.pdf',
    intro: {
      en: 'Methodology for systematically identifying, classifying, and evaluating consequences in presence of a failure event to direct Maintenance Program efforts.',
      pt: 'Metodologia para identificar, classificar e avaliar sistematicamente as consequências na presença de um evento de falha para direcionar os esforços do Programa de Manutenção.'
    },
    sections: [
      {
        title: { en: 'Taxonomy & Technical Hierarchy', pt: 'Taxonomia e Hierarquia Técnica' },
        content: {
          en: 'All maintainable items are assessed through the Technical Hierarchy, starting with an equipment unit (Level 6) and cascading to a Component item (Level 8), according to the ISO 14224 taxonomy classification.',
          pt: 'Todos os itens manteníveis são avaliados através da Hierarquia Técnica, começando com uma unidade de equipamento (Nível 6) e descendo até um item de Componente (Nível 8), de acordo com a classificação taxonômica ISO 14224.'
        }
      },
      {
        title: { en: 'Main Functions & Sub Functions', pt: 'Funções Principais e Subfunções' },
        content: {
          en: 'A system fulfills its purpose via Main Functions (e.g., Pumping, Cooling). Within a Main Function, Sub Functions (e.g., Controlling, Monitoring, Pressure relief) contribute to its execution. Any Sub Function failure must be considered when assessing the loss of the Main Function.',
          pt: 'Um sistema cumpre seu propósito através de Funções Principais (ex: Bombeamento, Resfriamento). Dentro de uma Função Principal, Subfunções (ex: Controle, Monitoramento, Alívio de pressão) contribuem para sua execução. Qualquer falha de Subfunção deve ser considerada ao avaliar a perda da Função Principal.'
        }
      },
      {
        title: { en: 'Risk Derivation Matrix', pt: 'Matriz de Derivação de Risco' },
        content: {
          en: 'Risk is the combination of Likelihood and Severity. Categories analyzed: Safety, Environment, Production, and Business. The highest score determines the Risk Level: Low (1-3) leads to "Run to Failure", Medium (4-6) requires proactive maintenance, High (7-9) is mandatory for SECEs.',
          pt: 'Risco é a combinação de Probabilidade e Severidade. Categorias analisadas: Segurança, Meio Ambiente, Produção e Negócios. A pontuação mais alta determina o Nível de Risco: Baixo (1-3) leva a "Operar até Falhar", Médio (4-6) exige manutenção proativa, Alto (7-9) é obrigatório para SECEs.'
        }
      },
      {
        title: { en: 'Object Type Designation', pt: 'Designação do Tipo de Objeto' },
        content: {
          en: 'Based on Severity: Slight or Minor impact results in NCE (Non-Critical Element). Moderate, Major, or Massive impacts consider Likelihood to classify as PCE (Production Critical), BCE (Business Critical), or SECE (Safety/Environmental Critical Element).',
          pt: 'Com base na Severidade: Impacto Leve ou Menor resulta em NCE (Elemento Não Crítico). Impactos Moderado, Maior ou Massivo consideram a Probabilidade para classificar como PCE (Crítico de Produção), BCE (Crítico de Negócios) ou SECE (Elemento Crítico de Segurança/Ambiental).'
        }
      }
    ]
  }
];

export const CRT_DATA: CRTType[] = [
  {
    id: 'CRT1',
    title: { en: 'Update Maintenance Strategy (EMS)', pt: 'Atualizar Estratégia de Manutenção (EMS)' },
    description: { 
      en: 'Raised for modifications in the Equipment Maintenance Strategy (EMS). Decision Point: Use when change impacts the Performance Standards or WTT structure.',
      pt: 'Solicitado para modificações na Estratégia de Manutenção de Equipamentos (EMS). Ponto de Decisão: Use quando a mudança impacta os Padrões de Desempenho ou a estrutura do WTT.'
    },
    examples: [
      { en: 'Revised Frequency', pt: 'Frequência Revisada' },
      { en: 'Change in Failure Mode mitigation', pt: 'Mudança na mitigação do Modo de Falha' }
    ]
  },
  {
    id: 'CRT3',
    title: { en: 'PM Action Attribute Revision', pt: 'Revisão de Atributo de Ação PM' },
    description: { 
      en: 'Decision Point: Use for localized changes that do NOT alter the global strategy. Limited to PM Action scope.',
      pt: 'Ponto de Decisão: Use para mudanças localizadas que NÃO alteram a estratégia global. Limitado ao escopo da Ação de PM.'
    }
  },
  {
    id: 'CRT5',
    title: { en: 'Spare Part Association', pt: 'Associação de Peças Sobressalentes' },
    description: { 
      en: 'Decision Point: Essential for Bills of Materials (BOM) accuracy. Raised to link parts to specific Object IDs.',
      pt: 'Ponto de Decisão: Essencial para precisão da Lista de Materiais (BOM). Solicitado para vincular peças a Object IDs específicos.'
    }
  }
];

export const CRL_DATA: CRLType[] = [
  { 
    id: 'CRL1', 
    level: { en: 'Critical / Immediate', pt: 'Crítico / Imediato' }, 
    description: { en: 'Immediate intervention required to prevent HSE impact or total production loss.', pt: 'Intervenção imediata necessária para evitar impacto de SMS ou perda total de produção.' },
    color: '#ef4444' 
  },
  { 
    id: 'CRL2', 
    level: { en: 'Important / Strategic', pt: 'Importante / Estratégico' }, 
    description: { en: 'Required to maintain reliability and prevent escalation of secondary failures.', pt: 'Necessário para manter confiabilidade e evitar escalada de falhas secundárias.' },
    color: '#f97316' 
  },
  { 
    id: 'CRL3', 
    level: { en: 'Essential / Routine', pt: 'Essencial / Rotina' }, 
    description: { en: 'Baseline operational change for standard performance alignment.', pt: 'Mudança operacional de linha de base para alinhamento de desempenho padrão.' },
    color: '#eab308' 
  }
];

/**
 * SIMULATION SCENARIO: 
 * "Post-Audit Strategy Alignment for Critical Firewater Pump"
 */
export const PM_ACTION_STEPS: PMStep[] = [
  {
    id: 1,
    title: { en: 'Locate Master WTT', pt: 'Localizar WTT Mestre' },
    instruction: { 
      en: 'SCENARIO: An audit found a gap in the Firewater Pump strategy. Navigate to Work Task Template to find the baseline task.',
      pt: 'CENÁRIO: Uma auditoria encontrou uma lacuna na estratégia da Bomba de Incêndio. Navegue até o Modelo de Tarefa (WTT) para encontrar a tarefa base.'
    }
  },
  {
    id: 2,
    title: { en: 'Execution of Search Filter', pt: 'Execução do Filtro de Busca' },
    instruction: { 
      en: 'Identify the specific Task ID "PM006788" mapped for the Firewater System CDI.',
      pt: 'Identifique o ID de Tarefa específico "PM006788" mapeado para o Sistema de Incêndio CDI.'
    }
  },
  {
    id: 3,
    title: { en: 'Status Verification Gate', pt: 'Portão de Verificação de Status' },
    instruction: { 
      en: 'DECISION: Before generating, ensure Status is ACTIVE. A Preliminary status will block PM Action generation.',
      pt: 'DECISÃO: Antes de gerar, garanta que o Status é ATIVO. Um status Preliminar bloqueará a geração da Ação de PM.'
    }
  },
  {
    id: 4,
    title: { en: 'Technical Object Linkage', pt: 'Vinculação de Objeto Técnico' },
    instruction: { 
      en: 'Link the WTT to Object AM-F3304. Accurate linkage ensures the history is captured at the asset level.',
      pt: 'Vincule o WTT ao Objeto AM-F3304. A vinculação precisa garante que o histórico seja capturado no nível do ativo.'
    }
  },
  {
    id: 5,
    title: { en: 'Priority (CRL) Definition', pt: 'Definição de Prioridade (CRL)' },
    instruction: { 
      en: 'SCENARIO: Audit requires a P2 priority. Update the Priority field to Level 2 and SAVE.',
      pt: 'CENÁRIO: A auditoria exige prioridade P2. Atualize o campo Prioridade para Nível 2 e SALVE.'
    }
  },
  {
    id: 6,
    title: { en: 'Resource Allocation (BOM)', pt: 'Alocação de Recursos (BOM)' },
    instruction: { 
      en: 'Define the craft manpower. Add MECHTECH group to ensure specialized labor is scheduled.',
      pt: 'Defina a mão de obra. Adicione o grupo MECHTECH para garantir que o trabalho especializado seja programado.'
    }
  },
  {
    id: 7,
    title: { en: 'Material Commitment', pt: 'Compromisso de Material' },
    instruction: { 
      en: 'Add the required Spare Parts. Without this, the Work Order will be blocked at the planning phase.',
      pt: 'Adicione as Peças Sobressalentes necessárias. Sem isso, a Ordem de Trabalho será bloqueada na fase de planejamento.'
    }
  },
  {
    id: 8,
    title: { en: 'Final Operational Readiness', pt: 'Prontidão Operacional Final' },
    instruction: { 
      en: 'Activate the PM Action. This transfers the strategy from "Preparation" to "Execution" readiness.',
      pt: 'Ative a Ação de PM. Isso transfere a estratégia da "Preparação" para a prontidão de "Execução".'
    }
  }
];

export const TRAINING_QUIZ: QuizQuestion[] = [
  // Scenario 1: PM Simulation & IFC Logic
  {
    id: 1,
    category: 'IFS',
    image: 'assets/1.Generate PM action from Work Task Template.png',
    question: { 
      en: "SCENARIO: You are in the 'Service and Maintenance' navigator. Which specific screen should you access to find the task template for a Firewater Pump audit?",
      pt: "CENÁRIO: Você está no navegador 'Service and Maintenance'. Qual tela específica você deve acessar para encontrar o modelo de tarefa para uma auditoria de Bomba de Incêndio?"
    },
    options: {
      en: ["Preventive Maintenance > PM Action", "Preventive Maintenance > Work Task Template", "Maintenance Planning > Work Order", "Asset Tree > Object ID"],
      pt: ["Manutenção Preventiva > Ação de PM", "Manutenção Preventiva > Modelo de Tarefa de Trabalho", "Planejamento de Manutenção > Ordem de Trabalho", "Árvore de Ativos > ID do Objeto"]
    },
    correctAnswer: 1,
    explanation: {
      en: "WTT (Work Task Template) is the baseline for all PM Actions. You must start here to generate specific actions.",
      pt: "O WTT (Modelo de Tarefa) é a base para todas as Ações de PM. Você deve começar aqui para gerar ações específicas."
    }
  },
  {
    id: 2,
    category: 'IFS',
    image: 'assets/2 Click on the tool strip item Search..png',
    question: { 
      en: "When searching for a specific task in IFS, what happens if you enter the Task ID but the Status is 'Preliminary'?",
      pt: "Ao procurar uma tarefa específica no IFS, o que acontece se você inserir o ID da Tarefa, mas o Status for 'Preliminar'?"
    },
    options: {
      en: ["You can generate the PM Action normally", "The system will automatically activate it", "The option 'Generate PM Action' will be unavailable or blocked", "You must first associate it with a Change Request"],
      pt: ["Você pode gerar a Ação de PM normalmente", "O sistema irá ativá-la automaticamente", "A opção 'Gerar Ação de PM' estará indisponível ou bloqueada", "Você deve primeiro associá-la a um Pedido de Mudança"]
    },
    correctAnswer: 2,
    explanation: {
      en: "System Rule: PM Action generation is only permitted from ACTIVE Work Task Templates.",
      pt: "Regra do Sistema: A geração de Ação de PM é permitida apenas a partir de Modelos de Tarefa ATIVOS."
    }
  },
  {
    id: 3,
    category: 'IFS',
    question: { 
      en: "In the 'PM Generation' dialog, why is it critical to select both the correct Site (e.g., CDI) and Object ID (e.g., AM-F3304)?",
      pt: "No diálogo de 'Geração de PM', por que é crítico selecionar tanto o Site correto (ex: CDI) quanto o ID do Objeto (ex: AM-F3304)?"
    },
    options: {
      en: ["To define the budget center", "To ensure the PM strategy is linked to the physical asset and its history track", "Just for reporting purposes", "To automatically assign a technician"],
      pt: ["Para definir o centro de custo", "Para garantir que a estratégia de PM esteja vinculada ao ativo físico e seu rastreamento de histórico", "Apenas para fins de relatório", "Para atribuir automaticamente um técnico"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Accurate linkage ensures maintenance history is correctly recorded against the specific asset ID in the global tree.",
      pt: "A vinculação precisa garante que o histórico de manutenção seja registrado corretamente contra o ID do ativo específico na árvore global."
    }
  },
  {
    id: 4,
    category: 'IFS',
    question: { 
      en: "You created a PM Action but forgot to add 'Resources' (Men) or 'Materials' (Parts). What is the operational impact?",
      pt: "Você criou uma Ação de PM, mas esqueceu de adicionar 'Recursos' (Homens) ou 'Materiais' (Peças). Qual é o impacto operacional?"
    },
    options: {
      en: ["None, the technician will add them manually", "The system will use default values", "The resulting Work Order will have no planning, causing delays and lack of parts", "The PM will not activate"],
      pt: ["Nenhum, o técnico irá adicioná-los manualmente", "O sistema usará valores padrão", "A Ordem de Trabalho resultante não terá planejamento, causando atrasos e falta de peças", "A PM não será ativada"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Resources and Materials must be defined at the PM level to populate the Work Order planning automatically.",
      pt: "Recursos e Materiais devem ser definidos no nível da PM para preencher o planejamento da Ordem de Trabalho automaticamente."
    }
  },
  {
    id: 5,
    category: 'IFS',
    question: { 
      en: "What is the final step to make a PM Action operational and ready for scheduling?",
      pt: "Qual é a etapa final para tornar uma Ação de PM operacional e pronta para programação?"
    },
    options: {
      en: ["Saving the document (Ctrl+S)", "Printing the PM report", "Changing the status from 'Preliminary' to 'Active'", "Closing the IFS navigator"],
      pt: ["Salvar o documento (Ctrl+S)", "Imprimir o relatório da PM", "Alterar o status de 'Preliminar' para 'Ativo'", "Fechar o navegador IFS"]
    },
    correctAnswer: 2,
    explanation: {
      en: "A PM Action in 'Preliminary' status will not generate Work Orders. 'Active' status is mandatory for execution.",
      pt: "Uma Ação de PM no status 'Preliminar' não gerará Ordens de Trabalho. O status 'Ativo' é obrigatório para execução."
    }
  },
  // Scenario 2: CRT / CRL & Policy
  {
    id: 6,
    category: 'CR',
    question: { 
      en: "SCENARIO: An offshore manager requires a change to several equipment attributes that do NOT impact the Maintenance Strategy. Which CRT should be used?",
      pt: "CENÁRIO: Um gerente offshore exige uma mudança em vários atributos de equipamentos que NÃO impactam a Estratégia de Manutenção. Qual CRT deve ser usado?"
    },
    options: {
      en: ["CRT1 - Update Strategy", "CRT3 - Update Attributes", "CRT5 - Associate Spare", "CRT7 - Emergency"],
      pt: ["CRT1 - Atualizar Estratégia", "CRT3 - Atualizar Atributos", "CRT5 - Associar Sobressalente", "CRT7 - Emergência"]
    },
    correctAnswer: 1,
    explanation: {
      en: "CRT3 is the correct classification for equipment attribute changes that do not modify the global maintenance strategy.",
      pt: "O CRT3 é a classificação correta para mudanças de atributos de equipamentos que não modificam a estratégia global de manutenção."
    }
  },
  {
    id: 7,
    category: 'CR',
    question: { 
      en: "A change is requested to mitigate a failure mode that could cause an immediate explosion. Which CRL (Criticality Level) MUST be assigned?",
      pt: "Uma mudança é solicitada para mitigar um modo de falha que pode causar uma explosão imediata. Qual CRL (Nível de Criticidade) DEVE ser atribuído?"
    },
    options: {
      en: ["CRL5 Cosmetic", "CRL3 Essential", "CRL1 Critical", "CRL4 Improvement"],
      pt: ["CRL5 Cosmótico", "CRL3 Essencial", "CRL1 Crítico", "CRL4 Melhoria"]
    },
    correctAnswer: 2,
    explanation: {
      en: "CRL1 Critical is mandatory for any change linked to immediate HSE risks or catastrophic asset damage.",
      pt: "O CRL1 Crítico é obrigatório para qualquer mudança vinculada a riscos imediatos de SMS ou danos catastróficos aos ativos."
    }
  },
  {
    id: 8,
    category: 'CR',
    question: { 
      en: "TRUE OR FALSE: If a Change Request is rejected by the Technical Reviewer, the proposer can directly appeal to the Manager to override the decision.",
      pt: "VERDADEIRO OU FALSO: Se um Pedido de Mudança for rejeitado pelo Revisor Técnico, o proponente pode apelar diretamente ao Gerente para anular a decisão."
    },
    options: {
      en: ["True", "False"],
      pt: ["Verdadeiro", "Falso"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Rejection/Cancellation is final for that specific workflow; the procedure ends as per SBM standard policy.",
      pt: "A rejeição/cancelamento é definitiva para aquele fluxo de trabalho específico; o procedimento termina conforme a política padrão da SBM."
    }
  },
  {
    id: 9,
    category: 'CR',
    question: { 
      en: "What is the primary role of the 'Technical Reviewer' in the Change Request workflow?",
      pt: "Qual é o papel principal do 'Revisor Técnico' no fluxo de trabalho de Pedido de Mudança?"
    },
    options: {
      en: ["To approve the budget", "To validate the technical integrity and logic of the proposed change", "To execute the data entry in the system", "To assign technicians to the work"],
      pt: ["Aprovar o orçamento", "Validar a integridade técnica e lógica da mudança proposta", "Executar a entrada de dados no sistema", "Atribuir técnicos ao trabalho"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The Technical Reviewer acts as the quality gate for asset integrity and procedural compliance.",
      pt: "O Revisor Técnico atua como o portão de qualidade para a integridade de ativos e conformidade procedimental."
    }
  },
  {
    id: 10,
    category: 'CR',
    question: { 
      en: "Refining the CRT selection: When a change impacts the 'EMS - Performance Standard', which CRT is required?",
      pt: "Refinando a seleção do CRT: Quando uma mudança impacta o 'EMS - Performance Standard', qual CRT é necessário?"
    },
    options: {
      en: ["CRT3", "CRT5", "CRT1", "CRT7"],
      pt: ["CRT3", "CRT5", "CRT1", "CRT7"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Modifications to strategy (EMS/EMS Standard) demand a CRT1 Change Request.",
      pt: "Modificações na estratégia (EMS/Padrão EMS) exigem um Pedido de Mudança do tipo CRT1."
    }
  },
  // Scenario 3: E3 Business Rules
  {
    id: 11,
    category: 'E3 Business Rules',
    image: 'screenshot_for_page_4.png',
    question: {
      en: "What are the three core pillars of the E3 Project objective for optimizing maintenance plans?",
      pt: "Quais são os três pilares centrais do objetivo do Projeto E3 para otimização dos planos de manutenção?"
    },
    options: {
      en: ["Plan, Do, Check", "Eliminate, Elevate, Enrich", "Review, Update, Deploy", "Identify, Analyze, Mitigate"],
      pt: ["Planejar, Fazer, Checar", "Eliminar, Elevar, Enriquecer", "Revisar, Atualizar, Implantar", "Identificar, Analisar, Mitigar"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The E3 objective is defined by: Eliminate (remove non-value tasks), Elevate (continuous monitoring credit), and Enrich (update attributes).",
      pt: "O objetivo do E3 é definido por: Eliminar (remover tarefas sem valor), Elevar (crédito de monitoramento contínuo) e Enriquecer (atualizar atributos)."
    }
  },
  {
    id: 12,
    category: 'E3 Business Rules',
    image: 'screenshot_for_page_5.png',
    question: {
      en: "According to E3 premises, which of the following items should NOT be part of the CMMS?",
      pt: "De acordo com as premissas do E3, qual dos seguintes itens NÃO deve fazer parte do CMMS?"
    },
    options: {
      en: ["Regulatory certifications", "Preventive Maintenance tasks", "Day-by-day routines and Operational tasks", "Condition Monitoring steps"],
      pt: ["Certificações regulatórias", "Tarefas de Manutenção Preventiva", "Rotinas do dia-a-dia e tarefas Operacionais", "Etapas de Monitoramento de Condição"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Operational tasks, day-by-day routines, procedures, and class certifications are excluded from CMMS as per E3 'Eliminate' premises.",
      pt: "Tarefas operacionais, rotinas diárias, procedimentos e certificações de classe são excluídos do CMMS conforme as premissas de 'Eliminar' do E3."
    }
  },
  {
    id: 13,
    category: 'E3 Business Rules',
    image: 'screenshot_for_page_8.png',
    question: {
      en: "In the WTT level, if all maintenance interval fields are left blank for all criticality levels, what does it signify?",
      pt: "No nível do WTT, se todos os campos de intervalo de manutenção forem deixados em branco para todos os níveis de criticidade, o que isso significa?"
    },
    options: {
      en: ["The strategy is invalid", "The interval is interpretative based on standards described in 'Justification'", "It is a Run to Failure equipment", "The object doesn't need maintenance"],
      pt: ["A estratégia é inválida", "O intervalo é interpretativo com base em normas descritas na 'Justificativa'", "É um equipamento Run to Failure", "O objeto não precisa de manutenção"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Blank interval fields mean the interval is interpretative according to a standard, usually described in the 'Justification' field.",
      pt: "Campos de intervalo em branco significam que o intervalo é interpretativo de acordo com uma norma, geralmente descrita no campo 'Justificativa'."
    }
  },
  {
    id: 14,
    category: 'E3 Business Rules',
    image: 'screenshot_for_page_10.png',
    question: {
      en: "What is the primary purpose of the 'Reliability Release' document output from the E3 tool?",
      pt: "Qual é o objetivo principal da saída do documento 'Reliability Release' da ferramenta E3?"
    },
    options: {
      en: ["To authorize budget spending", "To highlight benefits, motivations, gaps, and compliance index for an Item Class", "To schedule the next maintenance work order", "To list the technicians' names"],
      pt: ["Autorizar gastos orçamentários", "Destacar benefícios, motivações, lacunas e índice de conformidade para uma Classe de Item", "Agendar a próxima ordem de trabalho de manutenção", "Listar os nomes dos técnicos"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The Reliability Release highlights benefits, motivations, gaps found in the analysis, and the compliance index (As Found x As Left).",
      pt: "O Reliability Release destaca benefícios, motivações, lacunas encontradas na análise e o índice de conformidade (As Found x As Left)."
    }
  },
  {
    id: 15,
    category: 'E3 Business Rules',
    image: 'screenshot_for_page_12.png',
    question: {
      en: "For objects classified as 'SECE' (Safety Barrier), which attribute is MANDATORY to indicate the Performance Standard?",
      pt: "Para objetos classificados como 'SECE' (Barreira de Segurança), qual atributo é OBRIGATÓRIO para indicar o Performance Standard?"
    },
    options: {
      en: ["Category Code", "Process Code", "Item Class", "Strategic Level"],
      pt: ["Código de Categoria", "Código de Processo", "Classe de Item", "Nível Estratégico"]
    },
    correctAnswer: 1,
    explanation: {
      en: "The Process Code is mandatory for all objects classified with Object Type 'SECE' to indicate its Performance Standard.",
      pt: "O Código de Processo é obrigatório para todos os objetos classificados com o Tipo de Objeto 'SECE' para indicar seu Padrão de Desempenho."
    }
  },
  {
    id: 16,
    category: 'E3 Business Rules',
    image: 'screenshot_for_page_23.png',
    question: {
      en: "Which of the following is a prerequisite for a PM Action to be classified as 'Eligible for Replacement'?",
      pt: "Qual dos seguintes é um pré-requisito para uma Ação de PM ser classificada como 'Elegível para Substituição'?"
    },
    options: {
      en: ["Status must be Preliminary", "Performed Date Based must be 'No'", "Equal Lead Times are not required", "Different Object IDs"],
      pt: ["O status deve ser Preliminar", "O Performed Date Based deve ser 'Não'", "Lead Times iguais não são necessários", "IDs de objeto diferentes"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Eligible for Replacement requires: Performed Date Based 'No', PM Action Active, Same Object ID, and Equal Lead Times, among others.",
      pt: "Elegível para Substituição requer: Performed Date Based 'Não', Ação PM Ativa, mesmo ID de Objeto e Lead Times iguais, entre outros."
    }
  },
  {
    id: 17,
    category: 'IFS',
    question: {
      en: "What happens to historical integrity if 'As Found' and 'As Left' condition codes are not captured in the Work Order?",
      pt: "O que acontece com a integridade histórica se os códigos de condição 'As Found' e 'As Left' não forem capturados na Ordem de Trabalho?"
    },
    options: {
      en: ["Nothing, the WO is still valid", "It prevents Reliability Engineering from calculating accurate MTBF", "The system automatically fills them", "The equipment is deleted"],
      pt: ["Nada, a WO ainda é válida", "Impede que a Engenharia de Confiabilidade calcule o MTBF com precisão", "O sistema os preenche automaticamente", "O equipamento é excluído"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Condition codes are critical for MTBF and reliability analysis within SBM Asset Integrity standards.",
      pt: "Os códigos de condição são críticos para a análise de MTBF e confiabilidade nos padrões de Integridade de Ativos da SBM."
    }
  },
  {
    id: 18,
    category: 'CR',
    question: {
      en: "In the CRL Severity hierarchy, what is the significance of CRL2?",
      pt: "Na hierarquia de severidade CRL, qual é a significância de CRL2?"
    },
    options: {
      en: ["Cosmetic typo", "Standard optimization", "High risk of production loss", "Immediate death threat"],
      pt: ["Erro de digitação cosmético", "Otimização padrão", "Alto risco de perda de produção", "Ameaça de morte imediata"]
    },
    correctAnswer: 2,
    explanation: {
      en: "CRL2 represents a 'High' severity level where there is a major risk of production loss if the change is not applied.",
      pt: "CRL2 representa um nível de severidade 'Alto', onde há um risco significativo de perda de produção se a mudança não for aplicada."
    }
  },
  {
    id: 19,
    category: 'E3 Business Rules',
    question: {
      en: "Which of the following activities should be EXCLUDED from the CMMS as per E3 'Eliminate' premises?",
      pt: "Qual das seguintes atividades deve ser EXCLUÍDA do CMMS de acordo com as premissas 'Eliminar' do E3?"
    },
    options: {
      en: ["Pressure safety valve testing", "Day-to-day cleaning and administrative reminders", "Vibration analysis", "Emergency generator routine"],
      pt: ["Teste de válvula de segurança de pressão", "Limpeza diária e lembretes administrativos", "Análise de vibração", "Rotina do gerador de emergência"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Non-technical routines like housekeeping and admin alerts are removed to keep the CMMS focused on technical integrity.",
      pt: "Rotinas não técnicas, como limpeza e alertas administrativos, são removidas para manter o CMMS focado na integridade técnica."
    }
  },
  {
    id: 20,
    category: 'E3 Business Rules',
    question: {
      en: "Under the 'Elevate' pillar of the E3 project, what is the strategy for optimizing PM Action frequencies?",
      pt: "Sob o pilar 'Elevar' do projeto E3, qual é a estratégia para otimizar as frequências de Ação de PM?"
    },
    options: {
      en: [
        "Maintain fixed calendar intervals for all equipment",
        "Transition from time-based to condition-based or usage-based maintenance (e.g. running hours)",
        "Double the frequency of all tasks for safety",
        "Remove all frequencies and rely on breakdowns"
      ],
      pt: [
        "Manter intervalos de calendário fixos para todos os equipamentos",
        "Transição da manutenção baseada em tempo para baseada em condição ou uso (ex: horas de operação)",
        "Dobrar a frequência de todas as tarefas para segurança",
        "Remover todas as frequências e depender de quebras"
      ]
    },
    correctAnswer: 1,
    explanation: {
      en: "The Elevate pillar seeks to align maintenance frequency with actual equipment risk and operational context using data/condition.",
      pt: "O pilar Elevar busca alinhar a frequência de manutenção com o risco real do equipamento e o contexto operacional usando dados/condição."
    }
  },
  {
    id: 21,
    category: 'E3 Business Rules',
    question: {
      en: "What does the 'Enrich' pillar mandate for Object classification within the CMMS?",
      pt: "O que o pilar 'Enriquecer' determina para a classificação de Objetos no CMMS?"
    },
    options: {
      en: [
        "Any name can be used for Objects",
        "The mandatory inclusion of the 'Process Code' attribute for all SECE objects",
        "Eliminating the need for Item Classes",
        "Using colors instead of codes"
      ],
      pt: [
        "Qualquer nome pode ser usado para Objetos",
        "A inclusão obrigatória do atributo 'Código de Processo' para todos os objetos SECE",
        "Eliminar a necessidade de Classes de Item",
        "Usar cores em vez de códigos"
      ]
    },
    correctAnswer: 1,
    explanation: {
      en: "Enrich includes technical data completion, such as linking SECE objects to their Performance Standards via Process Codes.",
      pt: "Enriquecer inclui a conclusão de dados técnicos, como vincular objetos SECE aos seus Padrões de Desempenho via Códigos de Processo."
    }
  },
  // FCA Advanced Questions
  {
    id: 22,
    category: 'FCA',
    question: {
      en: "According to ISO 14224 taxonomy, at which level does the assessment of maintainable items typically begin?",
      pt: "De acordo com a taxonomia ISO 14224, em qual nível a avaliação de itens manteníveis normalmente começa?"
    },
    options: {
      en: ["Level 2 - Plant", "Level 4 - Subunit", "Level 6 - Equipment Unit", "Level 8 - Component"],
      pt: ["Nível 2 - Planta", "Nível 4 - Subunidade", "Nível 6 - Unidade de Equipamento", "Nível 8 - Componente"]
    },
    correctAnswer: 2,
    explanation: {
      en: "The assessment begins at the Equipment Unit (Level 6) and cascades down to the Component item (Level 8).",
      pt: "A avaliação começa na Unidade de Equipamento (Nível 6) e desce até o item de Componente (Nível 8)."
    }
  },
  {
    id: 23,
    category: 'FCA',
    question: {
      en: "When establishing the Risk Score for a function, four categories are evaluated (Safety, Environment, Production, Business). How is the final Function Risk Score determined?",
      pt: "Ao estabelecer a Pontuação de Risco para uma função, quatro categorias são avaliadas (Segurança, Meio Ambiente, Produção, Negócios). Como é determinada a Pontuação de Risco da Função final?"
    },
    options: {
      en: ["By taking the average of the four scores", "By taking the lowest score to be conservative", "By summing all the scores together", "By selecting the highest score among the four categories"],
      pt: ["Tirando a média das quatro pontuações", "Pegando a pontuação mais baixa para ser conservador", "Somando todas as pontuações", "Selecionando a pontuação mais alta entre as quatro categorias"]
    },
    correctAnswer: 3,
    explanation: {
      en: "The category that sets the function Risk Score is always the highest of the four, ensuring the worst-case scenario is addressed.",
      pt: "A categoria que define a Pontuação de Risco da função é sempre a mais alta das quatro, garantindo que o pior cenário seja abordado."
    }
  },
  {
    id: 24,
    category: 'FCA',
    question: {
      en: "What maintenance strategy is typically recommended for items that receive a 'LOW Risk' (Score 1-3) rating in the FCA?",
      pt: "Qual estratégia de manutenção é tipicamente recomendada para itens que recebem uma classificação de 'Risco BAIXO' (Pontuação 1-3) no FCA?"
    },
    options: {
      en: ["Preventive Maintenance every 6 months", "Condition-based monitoring", "Run to Failure", "Immediate replacement"],
      pt: ["Manutenção Preventiva a cada 6 meses", "Monitoramento baseado na condição", "Operar até Falhar (Run to Failure)", "Substituição imediata"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Low Risk items are typically allowed to 'Run to Failure', meaning no proactive maintenance is scheduled.",
      pt: "Itens de Baixo Risco geralmente podem 'Operar até Falhar', o que significa que nenhuma manutenção proativa é programada."
    }
  },
  {
    id: 25,
    category: 'FCA',
    question: {
      en: "If a failure's severity score is 'Minor Impact', what will the Object Type designation be, regardless of its likelihood?",
      pt: "Se a pontuação de severidade de uma falha for 'Impacto Menor', qual será a designação do Tipo de Objeto, independentemente de sua probabilidade?"
    },
    options: {
      en: ["PCE (Production Critical)", "NCE (Non-Critical Element)", "BCE (Business Critical)", "SECE"],
      pt: ["PCE (Crítico de Produção)", "NCE (Elemento Não Crítico)", "BCE (Crítico de Negócios)", "SECE"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Any element with a highest severity score of 'Slight' or 'Minor' is classified as NCE (Non-Critical Element) regardless of how likely it is to occur.",
      pt: "Qualquer elemento com uma pontuação de severidade mais alta de 'Leve' ou 'Menor' é classificado como NCE (Elemento Não Crítico), independentemente da probabilidade de ocorrência."
    }
  },
  {
    id: 26,
    category: 'FCA',
    question: {
      en: "SCENARIO: A Pressure Safety Valve (PSV) is found on a purge line. According to standard FCA simplifying rules, what severity ratings should be assigned to it?",
      pt: "CENÁRIO: Uma Válvula de Segurança de Pressão (PSV) é encontrada em uma linha de purga. De acordo com as regras de simplificação do FCA, quais classificações de severidade devem ser atribuídas a ela?"
    },
    options: {
      en: ["Massive Impact for Production", "Slight rating for Production and Business", "SECE mandatory rating", "Moderate for Safety only"],
      pt: ["Impacto Massivo para Produção", "Classificação 'Leve' para Produção e Negócios", "Classificação obrigatória SECE", "Moderado apenas para Segurança"]
    },
    correctAnswer: 1,
    explanation: {
      en: "Standard simplifying rule: PSVs on purge lines receive Production and Business severity ratings of 'Slight'.",
      pt: "Regra de simplificação padrão: PSVs em linhas de purga recebem classificações de severidade de Produção e Negócios como 'Leve'."
    }
  },
  {
    id: 27,
    category: 'FCA',
    question: {
      en: "Are pipelines assessed during the standard Function Criticality Assessment (FCA) process?",
      pt: "As tubulações (pipelines) são avaliadas durante o processo padrão de Avaliação de Criticidade Funcional (FCA)?"
    },
    options: {
      en: ["Yes, they are considered Level 6 equipment", "Yes, but only if they carry gas", "No, they are covered by the Risk Based Inspection (RBI) process", "No, because they are NCE"],
      pt: ["Sim, são consideradas equipamentos de Nível 6", "Sim, mas apenas se transportarem gás", "Não, são cobertas pelo processo de Inspeção Baseada em Risco (RBI)", "Não, porque são NCE"]
    },
    correctAnswer: 2,
    explanation: {
      en: "Pipelines are excluded from FCA boundaries because they are addressed by the Risk Based Inspection (RBI) carried out by the Integrity Management team.",
      pt: "As tubulações estão excluídas dos limites do FCA porque são tratadas pela Inspeção Baseada em Risco (RBI) realizada pela equipe de Gestão de Integridade."
    }
  },
  {
    id: 28,
    category: 'FCA',
    question: {
      en: "If an electric motor drives a pump that is classified as SECE (Safety/Environmental Critical), does the motor automatically receive the same SECE classification?",
      pt: "Se um motor elétrico aciona uma bomba que é classificada como SECE (Crítica de Segurança/Ambiental), o motor recebe automaticamente a mesma classificação SECE?"
    },
    options: {
      en: ["Yes, the entire skid is always SECE", "No, motors that drive SECE equipment do not necessarily receive the SECE classification", "Yes, but only if the motor is above 500kW", "No, motors are never assessed in FCA"],
      pt: ["Sim, o skid inteiro é sempre SECE", "Não, motores que acionam equipamentos SECE não recebem necessariamente a classificação SECE", "Sim, mas apenas se o motor for superior a 500kW", "Não, motores nunca são avaliados no FCA"]
    },
    correctAnswer: 1,
    explanation: {
      en: "According to simplifying rules, motors driving equipment classified as SECE (due to loss of containment) shall not receive the SECE classification themselves.",
      pt: "De acordo com as regras de simplificação, motores que acionam equipamentos classificados como SECE (devido à perda de contenção) não devem receber a classificação SECE."
    }
  }
];

export const PM_ACTION_CARDS: StudyCard[] = [
  {
    id: 1,
    title: { en: 'Initiate Generation', pt: 'Iniciar Geração' },
    description: { 
      en: 'Start the PM Action generation process directly from the Work Task Template screen.',
      pt: 'Inicie o processo de geração de Ação de PM diretamente da tela de Modelo de Tarefa de Trabalho.'
    },
    image: 'assets/1.Generate PM action from Work Task Template.png'
  },
  {
    id: 2,
    title: { en: 'Open Search', pt: 'Abrir Busca' },
    description: { 
      en: 'Access the search tool strip to locate the desired template in the system.',
      pt: 'Acesse a barra de ferramentas de busca para localizar o modelo desejado no sistema.'
    },
    image: 'assets/2 Click on the tool strip item Search..png'
  },
  {
    id: 3,
    title: { en: 'Identify Template Field', pt: 'Identificar Campo de Modelo' },
    description: { 
      en: 'Locate and click on the Task Template ID field to prepare for filtering.',
      pt: 'Localize e clique no campo ID do Modelo de Tarefa para preparar a filtragem.'
    },
    image: 'assets/3 click on the field Task Template ID.png'
  },
  {
    id: 4,
    title: { en: 'Input Template ID', pt: 'Inserir ID do Modelo' },
    description: { 
      en: 'Enter the specific Task Template ID you wish to use as a baseline.',
      pt: 'Insira o ID específico do Modelo de Tarefa que deseja usar como linha de base.'
    },
    image: 'assets/4 Enter Task Template ID.png'
  },
  {
    id: 5,
    title: { en: 'Execute Filtering', pt: 'Executar Filtragem' },
    description: { 
      en: 'Click the Search command button to find the specific template record.',
      pt: 'Clique no botão de comando Buscar para encontrar o registro específico do modelo.'
    },
    image: 'assets/5 clique on the command button Search.png'
  },
  {
    id: 6,
    title: { en: 'Verify Active Status', pt: 'Verificar Status Ativo' },
    description: { 
      en: 'Ensure the Work Task status is "Active". PM Actions cannot be generated from preliminary templates.',
      pt: 'Garanta que o status da Tarefa seja "Ativo". Ações de PM não podem ser geradas a partir de modelos preliminares.'
    },
    image: 'assets/6 The Status of Work Task is Active..png'
  },
  {
    id: 7,
    title: { en: 'Context Menu', pt: 'Menu de Contexto' },
    description: { 
      en: 'Right-click on the form background to reveal the technical action menu.',
      pt: 'Clique com o botão direito no fundo do formulário para revelar o menu de ações técnicas.'
    },
    image: 'assets/7 To Generate PM Action Right click on the background of the form.png'
  },
  {
    id: 8,
    title: { en: 'Generate PM Action', pt: 'Gerar Ação de PM' },
    description: { 
      en: 'Select the "Generate PM Action" menu item to launch the generation wizard.',
      pt: 'Selecione o item de menu "Gerar Ação de PM" para iniciar o assistente de geração.'
    },
    image: 'assets/8 Click on the menu item Generate PM Action.png'
  },
  {
    id: 9,
    title: { en: 'Site Configuration', pt: 'Configuração de Site' },
    description: { 
      en: 'Access the Site data field and click the list button to associate a specific location.',
      pt: 'Acesse o campo de dados Site e clique no botão de lista para associar um local específico.'
    },
    image: 'assets/9 Click on the data field Site It enbles to connect sites to the PM Action Click on the button List.png'
  },
  {
    id: 10,
    title: { en: 'Select & Confirm Site', pt: 'Selecionar e Confirmar Site' },
    description: { 
      en: 'Choose the CDI site from the list and click OK to confirm the association.',
      pt: 'Escolha o site CDI na lista e clique em OK para confirmar a associação.'
    },
    image: 'assets/10 Click on the column Site with the value CDI.Click on the push butthon OK.png'
  },
  {
    id: 11,
    title: { en: 'Object Identification', pt: 'Identificação do Objeto' },
    description: { 
      en: 'Link the specific Equipment Object ID to ensure the PM Action is applied to the correct asset.',
      pt: 'Vincule o ID do Objeto de Equipamento específico para garantir que a Ação de PM seja aplicada ao ativo correto.'
    },
    image: 'assets/11 Click on the data field Object ID. It refers to an identity for the equipment object. Click on the list.png'
  }
];
