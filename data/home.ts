import type { Localized } from "@/i18n/localized";

export interface DisplayLine {
  text: string;
  /** `caps` renders uppercase roman; `italic` renders the text as written, in italic. */
  style: "caps" | "italic";
}

export interface Fact {
  label: string;
  value: string;
}

export interface Pillar {
  title: string;
  body: string;
}

export const hero = {
  eyebrow: {
    en: "Medical Physicist",
    fr: "Physicien médical",
    es: "Físico médico",
    pt: "Físico médico",
    ar: "فيزيائي طبي",
  },
  lines: {
    en: [
      { text: "Physics", style: "caps" as const },
      { text: "that moves", style: "italic" as const },
      { text: "Medicine", style: "caps" as const },
      { text: "forward.", style: "italic" as const },
    ],
    fr: [
      { text: "Une physique", style: "caps" as const },
      { text: "qui fait avancer", style: "italic" as const },
      { text: "la médecine.", style: "caps" as const },
    ],
    es: [
      { text: "Física", style: "caps" as const },
      { text: "que hace avanzar", style: "italic" as const },
      { text: "la medicina.", style: "caps" as const },
    ],
    pt: [
      { text: "Física", style: "caps" as const },
      { text: "que faz avançar", style: "italic" as const },
      { text: "a medicina.", style: "caps" as const },
    ],
    ar: [
      { text: "فيزياء", style: "caps" as const },
      { text: "تحرّك", style: "italic" as const },
      { text: "الطب", style: "caps" as const },
      { text: "إلى الأمام.", style: "italic" as const },
    ],
  } satisfies Localized<DisplayLine[]>,
  lead: {
    en: "Research at the meeting point of physics and medicine: MRI-only radiotherapy and synthetic CT, AI in medical imaging, radiation protection, and the teaching of physics.",
    fr: "Recherche au point de rencontre de la physique et de la médecine : radiothérapie IRM seule et CT synthétique, IA en imagerie médicale, radioprotection et enseignement de la physique.",
    es: "Investigación en el encuentro de la física y la medicina: radioterapia solo con RM y CT sintético, IA en imagen médica, protección radiológica y enseñanza de la física.",
    pt: "Investigação no encontro da física e da medicina: radioterapia só com RM e CT sintético, IA em imagem médica, proteção radiológica e ensino da física.",
    ar: "بحث عند التقاء الفيزياء والطب: العلاج الإشعاعي بالرنين المغناطيسي وحده والتصوير المقطعي التركيبي، والذكاء الاصطناعي في التصوير الطبي، والحماية من الإشعاع، وتعليم الفيزياء.",
  },
  primaryCta: {
    en: "Explore research",
    fr: "Voir la recherche",
    es: "Ver la investigación",
    pt: "Ver a investigação",
    ar: "استكشف البحث",
  },
  secondaryCta: {
    en: "Download CV",
    fr: "Télécharger le CV",
    es: "Descargar CV",
    pt: "Descarregar CV",
    ar: "تنزيل السيرة",
  },
};

export const statement = {
  index: "01",
  eyebrow: { en: "About", fr: "À propos", es: "Acerca de", pt: "Sobre", ar: "نبذة" },
  lines: {
    en: ["Where physics", "meets medicine."],
    fr: ["Là où la physique", "rejoint la médecine."],
    es: ["Donde la física", "encuentra la medicina."],
    pt: ["Onde a física", "encontra a medicina."],
    ar: ["حيث تلتقي", "الفيزياء بالطب."],
  },
  paragraphs: {
    en: [
      "Behind every trustworthy image and every precise treatment is physics done carefully. A medical physicist makes sure the science holds: that the dose is right, the image can be believed, and the technology serves the patient.",
      "Isaac Kwesi Acquah brings that discipline from the clinic to the classroom. A former medical physicist at Korle-Bu Teaching Hospital, he now lectures in the Department of Physics Education at the University of Education, Winneba, and researches how MRI, AI, and radiation science can make care in Ghana and beyond safer and more precise.",
    ],
    fr: [
      "Derrière chaque image fiable et chaque traitement précis, il y a une physique faite avec soin. Le physicien médical veille à ce que la science tienne : que la dose soit juste, que l'image soit croyable, et que la technique serve le patient.",
      "Isaac Kwesi Acquah porte cette discipline de la clinique à l'amphi. Ancien physicien médical au Korle-Bu Teaching Hospital, il enseigne au Department of Physics Education de l'University of Education, Winneba, et cherche comment l'IRM, l'IA et la science des rayonnements peuvent rendre les soins plus sûrs et plus précis au Ghana et au-delà.",
    ],
    es: [
      "Detrás de cada imagen fiable y de cada tratamiento preciso hay física hecha con cuidado. El físico médico asegura que la ciencia se sostenga: que la dosis sea la correcta, que la imagen sea creíble y que la tecnología sirva al paciente.",
      "Isaac Kwesi Acquah lleva esa disciplina de la clínica al aula. Fue físico médico en el Korle-Bu Teaching Hospital y ahora imparte clases en el Department of Physics Education de la University of Education, Winneba, e investiga cómo la RM, la IA y la ciencia de la radiación pueden hacer la atención más segura y precisa en Ghana y más allá.",
    ],
    pt: [
      "Por trás de cada imagem fiável e de cada tratamento preciso está física feita com cuidado. O físico médico garante que a ciência se sustenta: que a dose está certa, que a imagem se pode acreditar e que a tecnologia serve o doente.",
      "Isaac Kwesi Acquah leva essa disciplina da clínica para a sala de aula. Foi físico médico no Korle-Bu Teaching Hospital e agora leciona no Department of Physics Education da University of Education, Winneba, e investiga como a RM, a IA e a ciência da radiação podem tornar os cuidados mais seguros e precisos no Gana e além.",
    ],
    ar: [
      "خلف كل صورة يُوثق بها وكل علاج دقيق فيزياء تُنجز بعناية. يتأكد الفيزيائي الطبي من أن العلم يصمد: أن الجرعة صحيحة، وأن الصورة يمكن تصديقها، وأن التقنية تخدم المريض.",
      "يحمل إسحاق كويسي أكواه هذا الانضباط من العيادة إلى قاعة الدرس. عمل فيزيائيًا طبيًا في مستشفى كورلي بو التعليمي، ويحاضر الآن في قسم تعليم الفيزياء بجامعة التربية بوينيبا، ويبحث كيف يمكن للرنين المغناطيسي والذكاء الاصطناعي وعلوم الإشعاع أن يجعلوا الرعاية في غانا وخارجها أكثر أمانًا ودقة.",
    ],
  },
  factLabels: {
    en: { role: "Current role", former: "Formerly", location: "Based in", values: "Values" },
    fr: { role: "Fonction actuelle", former: "Auparavant", location: "Basé à", values: "Valeurs" },
    es: { role: "Cargo actual", former: "Anteriormente", location: "Reside en", values: "Valores" },
    pt: { role: "Função atual", former: "Anteriormente", location: "Baseado em", values: "Valores" },
    ar: { role: "الدور الحالي", former: "سابقًا", location: "المقر", values: "القيم" },
  },
};

export const research = {
  index: "02",
  eyebrow: { en: "Research", fr: "Recherche", es: "Investigación", pt: "Investigação", ar: "البحث" },
  lines: {
    en: ["The questions", "I ask."],
    fr: ["Les questions", "que je pose."],
    es: ["Las preguntas", "que hago."],
    pt: ["As perguntas", "que faço."],
    ar: ["الأسئلة", "التي أطرحها."],
  },
  intro: {
    en: "Four themes, one concern: how physics can make medicine more precise, safer, and more humane, and how that knowledge is passed on.",
    fr: "Quatre thèmes, une exigence : comment la physique peut rendre la médecine plus précise, plus sûre et plus humaine, et comment ce savoir se transmet.",
    es: "Cuatro temas, una preocupación: cómo la física puede hacer la medicina más precisa, más segura y más humana, y cómo se transmite ese saber.",
    pt: "Quatro temas, uma preocupação: como a física pode tornar a medicina mais precisa, mais segura e mais humana, e como esse saber se transmite.",
    ar: "أربعة محاور واهتمام واحد: كيف تجعل الفيزياء الطب أدق وأكثر أمانًا وإنسانية، وكيف يُنقل هذا العلم.",
  },
  compareCaption: {
    en: "Synthetic CT from MRI. In MRI-only radiotherapy the planning CT is replaced by a CT-like image generated from MR data, so the electron density that dose calculation needs can come from a scan that shows soft tissue best.",
    fr: "CT synthétique à partir de l'IRM. En radiothérapie IRM seule, le CT de planification est remplacé par une image de type CT générée à partir des données IRM, pour que la densité électronique du calcul de dose vienne d'un examen qui montre le mieux les tissus mous.",
    es: "CT sintético a partir de RM. En la radioterapia solo con RM, el CT de planificación se sustituye por una imagen tipo CT generada a partir de datos de RM, de modo que la densidad electrónica del cálculo de dosis proviene de un estudio que muestra mejor el tejido blando.",
    pt: "CT sintético a partir da RM. Na radioterapia só com RM, o CT de planeamento é substituído por uma imagem do tipo CT gerada a partir de dados de RM, para que a densidade eletrónica do cálculo de dose venha de um exame que mostra melhor os tecidos moles.",
    ar: "تصوير مقطعي تركيبي من الرنين المغناطيسي. في العلاج الإشعاعي بالرنين وحده يُستبدل تصوير التخطيط المقطعي بصورة شبيهة بالتصوير المقطعي مولَّدة من بيانات الرنين، فتأتي كثافة الإلكترونات التي يحتاجها حساب الجرعة من فحص يُظهر الأنسجة الرخوة بأفضل صورة.",
  },
};

export const impact = {
  index: "03",
  eyebrow: { en: "Impact", fr: "Impact", es: "Impacto", pt: "Impacto", ar: "الأثر" },
  lines: {
    en: ["Why it", "matters."],
    fr: ["Pourquoi", "cela compte."],
    es: ["Por qué", "importa."],
    pt: ["Porque", "importa."],
    ar: ["لماذا", "يهم."],
  },
  image: {
    src: "/assets/imgs/graduation-pic.jpeg",
    width: 1600,
    height: 2000,
    alt: {
      en: "Isaac Kwesi Acquah in academic dress at a graduation ceremony",
      fr: "Isaac Kwesi Acquah en tenue académique lors d'une cérémonie de remise des diplômes",
      es: "Isaac Kwesi Acquah con vestimenta académica en una ceremonia de graduación",
      pt: "Isaac Kwesi Acquah em traje académico numa cerimónia de graduação",
      ar: "إسحاق كويسي أكواه بالزي الأكاديمي في حفل تخرج",
    },
  },
  chain: {
    en: ["Physics", "Technology", "Medicine", "People", "Impact"],
    fr: ["Physique", "Technologie", "Médecine", "Personnes", "Impact"],
    es: ["Física", "Tecnología", "Medicina", "Personas", "Impacto"],
    pt: ["Física", "Tecnologia", "Medicina", "Pessoas", "Impacto"],
    ar: ["فيزياء", "تقنية", "طب", "ناس", "أثر"],
  },
  pillars: {
    en: [
      {
        title: "Precision",
        body: "A treatment plan is a physics problem before it is a clinical decision. Getting the numbers right, from image to dose, is where care begins.",
      },
      {
        title: "Trust",
        body: "Clinicians act on images and, increasingly, on algorithms. Understanding how both are formed, and where they can mislead, keeps decisions grounded.",
      },
      {
        title: "Safety",
        body: "Radiation is a powerful tool. Measuring it, assuring its quality, and teaching it responsibly protects patients, staff, and the public.",
      },
    ],
    fr: [
      {
        title: "Précision",
        body: "Un plan de traitement est d'abord un problème de physique. Juste les chiffres, de l'image à la dose, c'est là que commence le soin.",
      },
      {
        title: "Confiance",
        body: "Les cliniciens agissent sur des images et, de plus en plus, sur des algorithmes. Comprendre comment les uns et les autres se forment, et où ils peuvent tromper, ancre les décisions.",
      },
      {
        title: "Sûreté",
        body: "Le rayonnement est un outil puissant. Le mesurer, en assurer la qualité et l'enseigner avec responsabilité protège les patients, le personnel et le public.",
      },
    ],
    es: [
      {
        title: "Precisión",
        body: "Un plan de tratamiento es un problema de física antes que una decisión clínica. Acertar los números, de la imagen a la dosis, es donde empieza el cuidado.",
      },
      {
        title: "Confianza",
        body: "Los clínicos actúan sobre imágenes y, cada vez más, sobre algoritmos. Entender cómo se forman ambos, y dónde pueden engañar, mantiene las decisiones a tierra.",
      },
      {
        title: "Seguridad",
        body: "La radiación es una herramienta poderosa. Medirla, asegurar su calidad y enseñarla con responsabilidad protege a pacientes, personal y público.",
      },
    ],
    pt: [
      {
        title: "Precisão",
        body: "Um plano de tratamento é um problema de física antes de ser uma decisão clínica. Acertar os números, da imagem à dose, é onde o cuidado começa.",
      },
      {
        title: "Confiança",
        body: "Os clínicos agem sobre imagens e, cada vez mais, sobre algoritmos. Compreender como ambos se formam, e onde podem enganar, mantém as decisões no chão.",
      },
      {
        title: "Segurança",
        body: "A radiação é uma ferramenta poderosa. Medi-la, assegurar a sua qualidade e ensiná-la com responsabilidade protege doentes, profissionais e público.",
      },
    ],
    ar: [
      {
        title: "الدقة",
        body: "خطة العلاج مسألة فيزيائية قبل أن تكون قرارًا سريريًا. ضبط الأرقام من الصورة إلى الجرعة هو حيث تبدأ الرعاية.",
      },
      {
        title: "الثقة",
        body: "يعمل الأطباء على الصور، وبشكل متزايد على الخوارزميات. فهم كيف تتكوّن وكيف قد تضلّ يُبقي القرارات راسخة.",
      },
      {
        title: "السلامة",
        body: "الإشعاع أداة قوية. قياسه وضمان جودته وتعليمه بمسؤولية يحمي المرضى والعاملين والجمهور.",
      },
    ],
  },
};

export const educator = {
  index: "04",
  eyebrow: { en: "Teaching", fr: "Enseignement", es: "Docencia", pt: "Ensino", ar: "التدريس" },
  lines: {
    en: ["Teaching is", "how science", "continues."],
    fr: ["Enseigner,", "c'est faire", "durer la science."],
    es: ["Enseñar es", "cómo sigue", "la ciencia."],
    pt: ["Ensinar é", "como a ciência", "continua."],
    ar: ["التدريس هو", "كيف يستمر", "العلم."],
  },
  body: {
    en: "In the Department of Physics Education at the University of Education, Winneba, lectures, supervision, and mentorship carry the discipline forward: students learn to measure carefully, question confidently, and take responsibility for the physics behind a patient's care.",
    fr: "Au Department of Physics Education de l'University of Education, Winneba, cours, encadrement et mentorat font avancer la discipline : les étudiants apprennent à mesurer avec soin, à questionner avec assurance, et à répondre de la physique derrière le soin d'un patient.",
    es: "En el Department of Physics Education de la University of Education, Winneba, las clases, la supervisión y la mentoría llevan la disciplina adelante: el alumnado aprende a medir con cuidado, a preguntar con confianza y a responder de la física detrás del cuidado de un paciente.",
    pt: "No Department of Physics Education da University of Education, Winneba, aulas, supervisão e mentoria levam a disciplina adiante: os estudantes aprendem a medir com cuidado, a questionar com confiança e a responsabilizar-se pela física por trás do cuidado de um doente.",
    ar: "في قسم تعليم الفيزياء بجامعة التربية بوينيبا، تحمل المحاضرات والإشراف والإرشاد التخصص إلى الأمام: يتعلم الطلاب القياس بعناية، والسؤال بثقة، وتحمّل مسؤولية الفيزياء وراء رعاية المريض.",
  },
  sequence: {
    en: ["Learn", "Explore", "Question", "Research", "Contribute"],
    fr: ["Apprendre", "Explorer", "Questionner", "Chercher", "Contribuer"],
    es: ["Aprender", "Explorar", "Preguntar", "Investigar", "Contribuir"],
    pt: ["Aprender", "Explorar", "Questionar", "Investigar", "Contribuir"],
    ar: ["تعلّم", "استكشف", "اسأل", "ابحث", "أسهم"],
  },
  pillars: {
    en: ["Courses and lectures", "Research supervision", "Mentorship"],
    fr: ["Cours et conférences", "Encadrement de recherche", "Mentorat"],
    es: ["Cursos y clases", "Supervisión de investigación", "Mentoría"],
    pt: ["Cursos e aulas", "Supervisão de investigação", "Mentoria"],
    ar: ["مقررات ومحاضرات", "إشراف بحثي", "إرشاد"],
  },
};

export const services = {
  index: "05",
  eyebrow: { en: "Consultancy", fr: "Conseil", es: "Consultoría", pt: "Consultoria", ar: "الاستشارة" },
  lines: {
    en: ["Expertise", "you can call on."],
    fr: ["Une expertise", "à appeler."],
    es: ["Una pericia", "a la que acudir."],
    pt: ["Uma perícia", "a que pode recorrer."],
    ar: ["خبرة", "يمكنك الاستعانة بها."],
  },
  body: {
    en: "Medical physics and academic consultancy grounded in clinical practice and university teaching, for hospitals, institutions, and research teams.",
    fr: "Conseil en physique médicale et en enseignement, ancré dans la pratique clinique et l'université, pour hôpitaux, institutions et équipes de recherche.",
    es: "Consultoría en física médica y en docencia, anclada en la práctica clínica y la universidad, para hospitales, instituciones y equipos de investigación.",
    pt: "Consultoria em física médica e em ensino, assente na prática clínica e na universidade, para hospitais, instituições e equipas de investigação.",
    ar: "استشارات في الفيزياء الطبية والتعليم الجامعي، مرتكزة على الممارسة السريرية والتدريس، للمستشفيات والمؤسسات وفرق البحث.",
  },
  strands: {
    en: [
      {
        title: "Medical physics consultancy",
        body: "Imaging and radiotherapy physics, quality assurance, and radiation protection advice for clinical teams and facilities.",
      },
      {
        title: "Academic consultancy",
        body: "Curriculum, training, and research support for departments and programmes in physics and medical physics.",
      },
    ],
    fr: [
      {
        title: "Conseil en physique médicale",
        body: "Physique de l'imagerie et de la radiothérapie, assurance qualité et radioprotection pour les équipes et les établissements cliniques.",
      },
      {
        title: "Conseil académique",
        body: "Curriculum, formation et appui à la recherche pour les départements et programmes de physique et de physique médicale.",
      },
    ],
    es: [
      {
        title: "Consultoría en física médica",
        body: "Física de imagen y radioterapia, garantía de calidad y protección radiológica para equipos y centros clínicos.",
      },
      {
        title: "Consultoría académica",
        body: "Currículo, formación y apoyo a la investigación para departamentos y programas de física y física médica.",
      },
    ],
    pt: [
      {
        title: "Consultoria em física médica",
        body: "Física de imagem e radioterapia, garantia de qualidade e proteção radiológica para equipas e unidades clínicas.",
      },
      {
        title: "Consultoria académica",
        body: "Currículo, formação e apoio à investigação para departamentos e programas de física e física médica.",
      },
    ],
    ar: [
      {
        title: "استشارة الفيزياء الطبية",
        body: "فيزياء التصوير والعلاج الإشعاعي، وضمان الجودة، والمشورة في الحماية من الإشعاع للفرق والمنشآت السريرية.",
      },
      {
        title: "استشارة أكاديمية",
        body: "المناهج والتدريب ودعم البحث للأقسام والبرامج في الفيزياء والفيزياء الطبية.",
      },
    ],
  },
  disclaimer: {
    en: "Clinical and radiation-related services are provided within the applicable regulatory framework and do not replace an institution's licensed radiation protection arrangements.",
    fr: "Les services cliniques et liés aux rayonnements s'inscrivent dans le cadre réglementaire applicable et ne remplacent pas les dispositions de radioprotection autorisées d'un établissement.",
    es: "Los servicios clínicos y relacionados con la radiación se prestan dentro del marco normativo aplicable y no sustituyen los arreglos de protección radiológica autorizados de una institución.",
    pt: "Os serviços clínicos e ligados à radiação prestam-se no quadro regulamentar aplicável e não substituem os arranjos de proteção radiológica licenciados de uma instituição.",
    ar: "تُقدَّم الخدمات السريرية والمتعلقة بالإشعاع ضمن الإطار التنظيمي المعمول به ولا تحل محل ترتيبات الحماية من الإشعاع المرخّصة لدى المؤسسة.",
  },
  ctaLabel: {
    en: "Discuss a project",
    fr: "Discuter d'un projet",
    es: "Hablar de un proyecto",
    pt: "Discutir um projeto",
    ar: "ناقش مشروعًا",
  },
};

export const perspective = {
  index: "06",
  eyebrow: { en: "Perspective", fr: "Regard", es: "Perspectiva", pt: "Perspetiva", ar: "رؤية" },
  lines: {
    en: [
      "Good physics is invisible",
      "in the clinic. It shows up",
      "as confidence: in an image,",
      "in a dose, in a decision.",
    ],
    fr: [
      "Une bonne physique est invisible",
      "à la clinique. Elle se voit",
      "comme une confiance : dans une image,",
      "dans une dose, dans une décision.",
    ],
    es: [
      "La buena física es invisible",
      "en la clínica. Se nota",
      "como confianza: en una imagen,",
      "en una dosis, en una decisión.",
    ],
    pt: [
      "A boa física é invisível",
      "na clínica. Mostra-se",
      "como confiança: numa imagem,",
      "numa dose, numa decisão.",
    ],
    ar: [
      "الفيزياء الجيدة خفية",
      "في العيادة. تظهر",
      "كثقة: في صورة،",
      "في جرعة، في قرار.",
    ],
  },
};

export const connection = {
  index: "07",
  eyebrow: { en: "Get in touch", fr: "Contact", es: "Contacto", pt: "Contacto", ar: "تواصل" },
  lines: {
    en: ["Let's build", "what comes next."],
    fr: ["Construisons", "la suite."],
    es: ["Construyamos", "lo que sigue."],
    pt: ["Construamos", "o que vem a seguir."],
    ar: ["لنبنِ", "ما يأتي بعد."],
  },
  body: {
    en: "Research collaboration, consultancy, lectures and workshops, or a student enquiry: if physics and medicine meet in your work, there is a conversation worth having.",
    fr: "Collaboration de recherche, conseil, cours et ateliers, ou demande d'un étudiant : si physique et médecine se rencontrent dans votre travail, la conversation vaut la peine.",
    es: "Colaboración de investigación, consultoría, clases y talleres, o una consulta de un estudiante: si la física y la medicina se encuentran en su trabajo, vale la pena hablar.",
    pt: "Colaboração de investigação, consultoria, aulas e workshops, ou um pedido de um estudante: se a física e a medicina se encontram no seu trabalho, vale a pena conversar.",
    ar: "تعاون بحثي، أو استشارة، أو محاضرات وورش، أو استفسار طالب: إذا التقت الفيزياء والطب في عملك، فالحوار يستحق.",
  },
  invitations: {
    en: ["Research collaboration", "Consultancy", "Lectures and workshops", "Student enquiries"],
    fr: ["Collaboration de recherche", "Conseil", "Cours et ateliers", "Demandes d'étudiants"],
    es: ["Colaboración de investigación", "Consultoría", "Clases y talleres", "Consultas de estudiantes"],
    pt: ["Colaboração de investigação", "Consultoria", "Aulas e workshops", "Pedidos de estudantes"],
    ar: ["تعاون بحثي", "استشارة", "محاضرات وورش", "استفسارات الطلاب"],
  },
  cta: {
    en: "Start a conversation",
    fr: "Engager la conversation",
    es: "Empezar una conversación",
    pt: "Começar uma conversa",
    ar: "ابدأ حوارًا",
  },
  secondaryCta: {
    en: "Download CV",
    fr: "Télécharger le CV",
    es: "Descargar CV",
    pt: "Descarregar CV",
    ar: "تنزيل السيرة",
  },
};

export const footer = {
  descriptor: {
    en: "Medical physicist, lecturer, researcher, and consultant. University of Education, Winneba, Ghana.",
    fr: "Physicien médical, enseignant, chercheur et consultant. University of Education, Winneba, Ghana.",
    es: "Físico médico, docente, investigador y consultor. University of Education, Winneba, Ghana.",
    pt: "Físico médico, docente, investigador e consultor. University of Education, Winneba, Gana.",
    ar: "فيزيائي طبي ومحاضر وباحث ومستشار. جامعة التربية بوينيبا، غانا.",
  },
};
