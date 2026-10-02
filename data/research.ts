import type { ResearchArea } from "@/types/content";

export const researchAreas: ResearchArea[] = [
  {
    title: {
      en: "MRI-only radiotherapy and synthetic CT",
      fr: "Radiothérapie IRM seule et CT synthétique",
      es: "Radioterapia solo con RM y CT sintético",
      pt: "Radioterapia só com RM e CT sintético",
      ar: "العلاج الإشعاعي بالرنين المغناطيسي وحده والتصوير المقطعي التركيبي",
    },
    slug: "mri-only-radiotherapy",
    description: {
      en: "How treatment planning can rely on MRI alone, with synthetic CT generated from MR images supplying the electron density that dose calculation needs.",
      fr: "Comment la planification de traitement peut s'appuyer sur l'IRM seule, un CT synthétique issu des images IRM fournissant la densité électronique nécessaire au calcul de dose.",
      es: "Cómo la planificación del tratamiento puede basarse solo en RM, con un CT sintético generado a partir de las imágenes de RM que aporta la densidad electrónica que necesita el cálculo de dosis.",
      pt: "Como o planeamento do tratamento pode assentar só na RM, com um CT sintético gerado a partir das imagens de RM a fornecer a densidade eletrónica de que o cálculo de dose precisa.",
      ar: "كيف يمكن لتخطيط العلاج أن يعتمد على الرنين المغناطيسي وحده، مع تصوير مقطعي تركيبي من صور الرنين يوفّر كثافة الإلكترونات التي يحتاجها حساب الجرعة.",
    },
    tags: {
      en: ["MRI", "Synthetic CT", "Treatment planning"],
      fr: ["IRM", "CT synthétique", "Planification"],
      es: ["RM", "CT sintético", "Planificación"],
      pt: ["RM", "CT sintético", "Planeamento"],
      ar: ["رنين مغناطيسي", "تصوير مقطعي تركيبي", "تخطيط العلاج"],
    },
  },
  {
    title: {
      en: "AI in medical imaging",
      fr: "IA en imagerie médicale",
      es: "IA en imagen médica",
      pt: "IA em imagem médica",
      ar: "الذكاء الاصطناعي في التصوير الطبي",
    },
    slug: "ai-in-medical-imaging",
    description: {
      en: "How deep learning can support image analysis and clinical decisions while its outputs stay validated, explainable, and physically plausible.",
      fr: "Comment l'apprentissage profond peut aider l'analyse d'images et les décisions cliniques tout en restant validé, explicable et physiquement plausible.",
      es: "Cómo el aprendizaje profundo puede apoyar el análisis de imagen y las decisiones clínicas sin dejar de ser validado, explicable y físicamente plausible.",
      pt: "Como a aprendizagem profunda pode apoiar a análise de imagem e as decisões clínicas, mantendo resultados validados, explicáveis e fisicamente plausíveis.",
      ar: "كيف يمكن للتعلم العميق أن يدعم تحليل الصور والقرارات السريرية مع بقاء مخرجاته محققة وقابلة للتفسير ومتوافقة مع الفيزياء.",
    },
    tags: {
      en: ["Deep learning", "Image analysis", "Validation"],
      fr: ["Apprentissage profond", "Analyse d'image", "Validation"],
      es: ["Aprendizaje profundo", "Análisis de imagen", "Validación"],
      pt: ["Aprendizagem profunda", "Análise de imagem", "Validação"],
      ar: ["تعلم عميق", "تحليل الصور", "تحقق"],
    },
  },
  {
    title: {
      en: "Radiation protection, QA, and dose safety",
      fr: "Radioprotection, assurance qualité et sûreté de la dose",
      es: "Protección radiológica, garantía de calidad y seguridad de la dosis",
      pt: "Proteção radiológica, garantia de qualidade e segurança da dose",
      ar: "الحماية من الإشعاع وضمان الجودة وسلامة الجرعة",
    },
    slug: "radiation-protection",
    description: {
      en: "How measurement, quality assurance, and safety culture keep radiation doses justified and optimised for patients, staff, and the public.",
      fr: "Comment la mesure, l'assurance qualité et la culture de sûreté gardent les doses justifiées et optimisées pour les patients, le personnel et le public.",
      es: "Cómo la medición, la garantía de calidad y la cultura de seguridad mantienen las dosis justificadas y optimizadas para pacientes, personal y público.",
      pt: "Como a medição, a garantia de qualidade e a cultura de segurança mantêm as doses justificadas e otimizadas para doentes, profissionais e público.",
      ar: "كيف يُبقي القياس وضمان الجودة وثقافة السلامة الجرعات مبررة ومُحسَّنة للمرضى والعاملين والجمهور.",
    },
    tags: {
      en: ["Dosimetry", "Quality assurance", "Radiation safety"],
      fr: ["Dosimétrie", "Assurance qualité", "Sûreté radiologique"],
      es: ["Dosimetría", "Garantía de calidad", "Seguridad radiológica"],
      pt: ["Dosimetria", "Garantia de qualidade", "Segurança radiológica"],
      ar: ["قياس الجرعات", "ضمان الجودة", "سلامة إشعاعية"],
    },
  },
  {
    title: {
      en: "Physics education",
      fr: "Enseignement de la physique",
      es: "Enseñanza de la física",
      pt: "Ensino da física",
      ar: "تعليم الفيزياء",
    },
    slug: "physics-education",
    description: {
      en: "How physics is taught and learned, and how the next generation of physics teachers and medical physicists is prepared.",
      fr: "Comment la physique s'enseigne et s'apprend, et comment se prépare la prochaine génération d'enseignants de physique et de physiciens médicaux.",
      es: "Cómo se enseña y se aprende la física, y cómo se forma a la siguiente generación de docentes de física y físicos médicos.",
      pt: "Como a física se ensina e se aprende, e como se prepara a próxima geração de professores de física e físicos médicos.",
      ar: "كيف تُدرَّس الفيزياء وتُتعلَّم، وكيف تُعدّ الجيل التالي من معلمي الفيزياء والفيزيائيين الطبيين.",
    },
    tags: {
      en: ["Pedagogy", "Curriculum", "Teacher preparation"],
      fr: ["Pédagogie", "Curriculum", "Formation des enseignants"],
      es: ["Pedagogía", "Currículo", "Formación docente"],
      pt: ["Pedagogia", "Currículo", "Formação de professores"],
      ar: ["تربية", "منهج", "إعداد المعلمين"],
    },
  },
];
