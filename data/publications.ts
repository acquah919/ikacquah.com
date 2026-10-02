export const publicationTypes = [
  "journal",
  "conference",
  "book-chapter",
  "thesis",
  "other",
] as const;

export type PublicationType = (typeof publicationTypes)[number];
export type PublicationFormat = "pdf" | "docx";

export interface PublicationFile {
  format: PublicationFormat;
  href?: string;
  size?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year: number;
  type: PublicationType;
  abstract?: string;
  doi?: string;
  url?: string;
  areas: string[];
  file: PublicationFile;
  featured?: boolean;
}

export const publications: Publication[] = [
  {
    id: "synthetic-ct-generation-from-mri-2025",
    title:
      "Deep Learning-Based Synthetic-CT Generation from MRI for Enhanced Precision in MRI-Only Radiotherapy Dose Planning",
    authors: [
      "Isaac Kwesi Acquah",
      "Shiraz Issahaku",
      "Samuel Nii Adu Tagoe",
      "Theophilus Akumea Sackey",
    ],
    journal:
      "Polish Journal of Medical Physics and Engineering, 31(3), 219-226",
    year: 2025,
    type: "journal",
    doi: "https://doi.org/10.2478/pjmpe-2025-0025",
    areas: ["mri-only-radiotherapy", "ai-in-medical-imaging"],
    featured: true,
    file: {
      format: "pdf",
      href: "/publications/deep-learning-based-synthetic-CT-generation-from-MRI.pdf",
      size: "351 KB",
    },
  },
  {
    id: "paediatric-ct-doses-ghana-2025",
    title:
      "Assessment of Radiation Doses for Paediatric Head, Chest, and Abdominopelvic Computed Tomography Examinations in a Teaching Hospital in Ghana",
    authors: [
      "Bernard Amedzoame",
      "Isaac Frimpong Brobbey",
      "Bismark Djan",
      "Isaac Kwesi Acquah",
      "Mercy Afadzi Tetteh",
    ],
    journal:
      "Polish Journal of Medical Physics and Engineering, 31(3), 256-262",
    year: 2025,
    type: "journal",
    doi: "https://doi.org/10.2478/pjmpe-2025-0029",
    areas: ["radiation-protection"],
    featured: true,
    file: {
      format: "pdf",
      href: "/publications/assessment-of-radiation-doses-for-paediatric-head-chest.pdf",
      size: "333 KB",
    },
  },
  {
    id: "undergraduate-physics-enrolment-uew-2025",
    title:
      "Exploring the Factors Influencing Undergraduate Students' Decision to Pursue Physics at the University of Education, Winneba",
    authors: [
      "Anthony Babategremine Yuoni",
      "Issahaku Sontaa Jakalia",
      "Victor Antwi",
      "Isaac Kwesi Acquah",
      "Cynthia Jebuni-Adanu",
    ],
    journal: "Research in Science & Technological Education",
    year: 2025,
    type: "journal",
    doi: "https://doi.org/10.1080/02635143.2025.2510404",
    areas: ["physics-education"],
    file: {
      format: "pdf",
      href: "/publications/exploring-the-factors-influencing-undergraduate-students-decision-to-pursue-physics-at-the-university.pdf",
      size: "861 KB",
    },
  },
  {
    id: "systematic-review-synthetic-ct-from-mri-2025",
    title:
      "A Systematic Review of Deep Learning Techniques for Generating Synthetic CT Images from MRI Data",
    authors: ["Isaac Kwesi Acquah", "Shiraz Issahaku", "Samuel Nii Adu Tagoe"],
    journal: "Polish Journal of Medical Physics and Engineering, 31(1), 20-38",
    year: 2025,
    type: "journal",
    doi: "https://doi.org/10.2478/pjmpe-2025-0003",
    areas: ["mri-only-radiotherapy", "ai-in-medical-imaging"],
    featured: true,
    file: {
      format: "pdf",
      href: "/publications/a-systematic-review-of-deep-learning-techniques-for-generating.pdf",
      size: "437 KB",
    },
  },
  {
    id: "jigsaw-electric-circuit-analysis-2025",
    title:
      "Enhancing Conceptual Understanding of Electric Circuit Analysis through the Jigsaw Method: A Quasi-Experimental Study in Senior High Schools",
    authors: ["Isaac Kwesi Acquah"],
    journal: "Schrödinger: Journal of Physics Education, 6(1), 9-18",
    year: 2025,
    type: "journal",
    doi: "https://doi.org/10.37251/sjpe.v6i1.1348",
    areas: ["physics-education"],
    file: {
      format: "pdf",
      href: "/publications/enhancing-conceptual-understanding-of-electric-circuit-analysis-through-the-jigsaw-method-a-quasi-experimental-study-in-senior-high-schools.pdf",
      size: "439 KB",
    },
  },
  {
    id: "institutional-drls-ct-ugmc-2024",
    title:
      "Establishment of institutional Diagnostic Reference Levels for Computed Tomography examination at the University of Ghana Medical Centre",
    authors: [
      "Shirazu Issahaku",
      "Simon Mensah Amoh",
      "Isaac Kwesi Acquah",
      "George Nunoo",
      "Theophilus A. Sackey",
    ],
    journal: "Health and Technology, 14(6), 1199-1207",
    year: 2024,
    type: "journal",
    doi: "https://doi.org/10.1007/s12553-024-00902-2",
    areas: ["radiation-protection"],
    file: {
      format: "pdf",
      href: "/publications/establishment-of-institutional-diagnostic-reference-levels-for.pdf",
      size: "1.1 MB",
    },
  },
  {
    id: "mu-map-generation-petmr-vs-pseudo-ct-2024",
    title:
      "Comparison of Methods of µ-Map Generation: MR-Based Method in PET/MR Imaging Versus Pseudo-CT Method in Radiotherapy Dose Planning",
    authors: ["Isaac Kwesi Acquah", "Stephen Inkoom", "Francis Hasford"],
    journal: "Iranian Journal of Medical Physics, 21(6), 355-364",
    year: 2024,
    type: "journal",
    doi: "https://doi.org/10.22038/ijmp.2024.77457.2369",
    areas: ["mri-only-radiotherapy"],
    file: {
      format: "pdf",
      href: "/publications/comparison-of-methods-of-mu-map-generation.pdf",
      size: "1.5 MB",
    },
  },
  {
    id: "piezo-phototronic-2d-monochalcogenides-2024",
    title:
      "Theoretical Study of the Strong Piezo-phototronic Effect in 2D Monochalcogenides for Multi-Junction Solar Cells",
    authors: [
      "Victor Antwi",
      "Michael Gyan",
      "Desmond Appiah",
      "Isaac Kwesi Acquah",
      "Fortune Addo-Wuver",
      "Cynthia Jebuni-Adanu",
    ],
    journal: "Physica Scripta, 99, 115906",
    year: 2024,
    type: "journal",
    doi: "https://doi.org/10.1088/1402-4896/ad7cdc",
    areas: [],
    file: {
      format: "pdf",
      href: "/publications/theoretical-study-of-piezo-phototronic-effect-in-2d-monochalcogenides.pdf",
      size: "4.1 MB",
    },
  },
  {
    id: "phet-resolution-of-vectors-2024",
    title:
      "Improving Students' Performance in Resolution of Vectors Using PhET Interactive Simulations",
    authors: [
      "Isaac Kwesi Acquah",
      "Michael Gyan",
      "Desmond Appiah",
      "Bright Owusu Ansah",
      "Robert Wilson",
      "Charles Enoch Mensah",
    ],
    journal: "Schrödinger: Journal of Physics Education, 5(3), 107-116",
    year: 2024,
    type: "journal",
    doi: "https://doi.org/10.37251/sjpe.v5i3.1078",
    areas: ["physics-education"],
    file: {
      format: "pdf",
      href: "/publications/improving-students-performance-in-resolution-of-vectors-using-PhET-interactive-simulations.pdf",
      size: "438 KB",
    },
  },
  {
    id: "heat-transfer-practical-activities-2023",
    title:
      "Improvement of Senior High Students' Performance in Heat Transfer Using Practical Activities in Effutu Municipal, Ghana",
    authors: [
      "Fortune Addo-Wuver",
      "Victor Antwi",
      "Isaac Kwesi Acquah",
      "Desmond Appiah",
      "Michael Gyan",
      "Cynthia Jebuni-Adanu",
      "Peter Opoku",
    ],
    journal: "European Journal of Education Studies, 10(9), 438-446",
    year: 2023,
    type: "journal",
    doi: "https://doi.org/10.46827/ejes.v10i9.4997",
    areas: ["physics-education"],
    file: {
      format: "pdf",
      href: "/publications/improvement-of-senior-high-school-students.pdf",
      size: "458 KB",
    },
  },
  {
    id: "optical-characterisation-polarised-light-2023",
    title:
      "Optical Characterisation of Polarised Light Beam under Different Aqueous Concentrations",
    authors: [
      "Desmond Appiah",
      "Victor Antwi",
      "Michael Gyan",
      "Isaac Kwesi Acquah",
      "Fortune Addo-Wuver",
    ],
    journal:
      "International Journal of Engineering and Applied Physics, 3(2), 799-804",
    year: 2023,
    type: "journal",
    url: "https://ijeap.org/ijeap/article/view/149",
    areas: [],
    file: {
      format: "pdf",
      href: "/publications/optical-characterisation-of-polarised-light-beam-under-different-aqueous-concentrations.pdf",
      size: "335 KB",
    },
  },
  {
    id: "covid-19-immunisation-ghanaian-students-2023",
    title:
      "COVID-19 Immunisation: Perception, Acceptance and Attitude of Ghanaian Students",
    authors: [
      "Isaac Kwesi Acquah",
      "Desmond Appiah",
      "Victor Antwi",
      "Michael Gyan",
      "Fortune Addo-Wuver",
      "Cynthia Jebuni-Adanu",
    ],
    journal: "American Journal of Public Health Research, 11(4), 136-142",
    year: 2023,
    type: "journal",
    doi: "https://doi.org/10.12691/ajphr-11-4-2",
    areas: [],
    file: {
      format: "pdf",
      href: "/publications/covid-19-immunisation-perception-acceptance-and-attitude-of-ghanaian-students.pdf",
      size: "143 KB",
    },
  },
  {
    id: "phet-energy-conversion-conservation-2023",
    title:
      "Utilizing Physics Education Technology (PhET) for Improving Students' Understanding of Energy Conversion and Conservation in a Senior High Technical School",
    authors: [
      "Cynthia Jebuni-Adanu",
      "Victor Antwi",
      "Isaac Kwesi Acquah",
      "Desmond Appiah",
      "Michael Gyan",
      "Fortune Addo-Wuver",
      "Issahaku Sontaa Jakalia",
      "Bernard Sarkyi",
    ],
    journal: "Journal of Education and Practice, 14(8), 45-49",
    year: 2023,
    type: "journal",
    doi: "https://doi.org/10.7176/JEP/14-8-06",
    areas: ["physics-education"],
    file: {
      format: "pdf",
      href: "/publications/utilizing-phet-for-improving-energy-conversion-understanding.pdf",
      size: "137 KB",
    },
  },
];
