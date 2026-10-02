import { en } from "@/i18n/localized";
import type { Image, Professor } from "@/types/content";

export const professor: Professor = {
  honorific: "Dr",
  fullName: "Isaac Kwesi Acquah",
  shortName: "I.K. Acquah",
  initials: "IKA",
  title: {
    en: "Medical Physicist",
    fr: "Physicien médical",
    es: "Físico médico",
    pt: "Físico médico",
    ar: "فيزيائي طبي",
  },
  roles: {
    en: ["Lecturer", "Researcher", "Consultant"],
    fr: ["Enseignant", "Chercheur", "Consultant"],
    es: ["Docente", "Investigador", "Consultor"],
    pt: ["Docente", "Investigador", "Consultor"],
    ar: ["محاضر", "باحث", "مستشار"],
  },
  current: {
    role: {
      en: "Lecturer",
      fr: "Enseignant",
      es: "Docente",
      pt: "Docente",
      ar: "محاضر",
    },
    institution: en("University of Education, Winneba"),
    unit: {
      en: "Department of Physics Education",
      fr: "Département d'éducation en physique",
      es: "Departamento de Educación en Física",
      pt: "Departamento de Educação em Física",
      ar: "قسم تعليم الفيزياء",
    },
  },
  former: [
    {
      role: {
        en: "Medical Physicist",
        fr: "Physicien médical",
        es: "Físico médico",
        pt: "Físico médico",
        ar: "فيزيائي طبي",
      },
      institution: en("Korle-Bu Teaching Hospital"),
    },
  ],
  location: en("Winneba / Accra, Ghana"),
  countryCode: "GH",
  values: {
    en: ["Clinical rigour", "Pedagogical innovation"],
    fr: ["Rigueur clinique", "Innovation pédagogique"],
    es: ["Rigor clínico", "Innovación pedagógica"],
    pt: ["Rigor clínico", "Inovação pedagógica"],
    ar: ["صرامة سريرية", "ابتكار تربوي"],
  },
  shortBio: {
    en: "Medical physicist, lecturer, researcher, and consultant at the University of Education, Winneba, working where physics meets medicine: MRI-only radiotherapy and synthetic CT, AI in medical imaging, radiation protection, and physics education.",
    fr: "Physicien médical, enseignant, chercheur et consultant à l'University of Education, Winneba, là où la physique rejoint la médecine : radiothérapie IRM seule et CT synthétique, IA en imagerie médicale, radioprotection et enseignement de la physique.",
    es: "Físico médico, docente, investigador y consultor en la University of Education, Winneba, donde la física se encuentra con la medicina: radioterapia solo con RM y CT sintético, IA en imagen médica, protección radiológica y enseñanza de la física.",
    pt: "Físico médico, docente, investigador e consultor na University of Education, Winneba, onde a física encontra a medicina: radioterapia só com RM e CT sintético, IA em imagem médica, proteção radiológica e ensino da física.",
    ar: "فيزيائي طبي ومحاضر وباحث ومستشار في جامعة التربية بوينيبا، يعمل حيث تلتقي الفيزياء بالطب: العلاج الإشعاعي بالرنين المغناطيسي وحده والتصوير المقطعي التركيبي، والذكاء الاصطناعي في التصوير الطبي، والحماية من الإشعاع، وتعليم الفيزياء.",
  },
  portrait: {
    src: "/assets/imgs/profile-picture.webp",
    alt: {
      en: "Portrait of Dr Isaac Kwesi Acquah, arms crossed, in a navy jacket",
      fr: "Portrait du Dr Isaac Kwesi Acquah, les bras croisés, en veste bleu marine",
      es: "Retrato del Dr. Isaac Kwesi Acquah, brazos cruzados, con chaqueta azul marino",
      pt: "Retrato do Dr Isaac Kwesi Acquah, de braços cruzados, com casaco azul-marinho",
      ar: "صورة الدكتور إسحاق كويسي أكواه، ذراعاه متقاطعتان، بسترة زرقاء داكنة",
    },
    width: 1100,
    height: 1318,
  },
  email: "ikacquah@uew.edu.gh",
  cv: {
    href: "/cv/Isaac-Kwesi-Acquah-CV.pdf",
    fileName: "Isaac-Kwesi-Acquah-CV.pdf",
    placeholder: true,
  },
  links: [],
};

export const graduationPortrait: Image = {
  src: "/assets/imgs/graduation-pic.jpeg",
  alt: {
    en: "Dr Isaac Kwesi Acquah in an academic gown and kente stole, seated outdoors on a university campus",
    fr: "Le Dr Isaac Kwesi Acquah en toge et étole kente, assis en extérieur sur un campus universitaire",
    es: "El Dr. Isaac Kwesi Acquah con toga y estola kente, sentado al aire libre en un campus universitario",
    pt: "O Dr Isaac Kwesi Acquah com toga e estola kente, sentado ao ar livre num campus universitário",
    ar: "الدكتور إسحاق كويسي أكواه بعباءة أكاديمية ووشاح كينتي، جالس في حرم جامعي في الهواء الطلق",
  },
  width: 720,
  height: 1080,
};

export const displayName = `${professor.honorific} ${professor.fullName}`;
