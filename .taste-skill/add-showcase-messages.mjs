import { readFileSync, writeFileSync } from 'node:fs';

const copy = {
  en: {
    nav: 'Projects',
    projects: {
      metaTitle: 'Projects', metaDescription: 'Tools and projects built by Dr Isaac Kwesi Acquah, connecting medical physics, education, and practical technology.',
      eyebrow: 'Projects', title: 'Ideas, put to work.', lead: 'Practical tools shaped by the questions that come up in research, healthcare, and the classroom.',
      inDevelopment: 'In development', completed: 'Completed', version: 'Version {version}', exploreProject: 'Explore the project',
      catalogueNote: 'An evolving collection of work, from an idea in practice to a tool in your hands.', getInTouch: 'Start a conversation',
      devicePreview: 'RadPulse Africa shown in Android and iPhone presentation frames', deviceFrame: 'Phone frame', frameNote: 'Screens from the Android development build. iPhone shown as a presentation frame.',
      breadcrumb: 'Breadcrumb', seeItInAction: 'Inside the app', preview: 'View development preview',
      fallback: 'The project story is currently available in English. Navigation and controls remain in your selected language.',
      motivationEyebrow: 'The starting point', motivationTitle: 'Beyond the measurement.', modalities: 'Four diagnostic imaging modalities',
      walkthroughEyebrow: 'Inside RadPulse', walkthroughTitle: 'A notebook in motion.', walkthroughNote: 'A guided walkthrough made from real development screenshots. Choose a chapter, or press play to explore.',
      appAppearance: 'App appearance', light: 'Light', dark: 'Dark', playbackControls: 'Walkthrough playback controls', previousScreen: 'Previous screen', nextScreen: 'Next screen', play: 'Play demo', pause: 'Pause demo', restart: 'Replay demo', screenCount: 'Screen {current} of {total}', chapters: 'App walkthrough chapters',
      capabilitiesEyebrow: 'The working toolkit', capabilitiesTitle: 'From check to report.', privacy: 'Built around equipment quality control. Patient records stay outside the notebook.',
      creatorEyebrow: 'Created by', creatorTitle: 'Experience, made useful.', developmentEyebrow: 'A work in progress', developmentTitle: 'Help shape what comes next.',
      feedback: 'Suggestions, collaborations, and constructive feedback from colleagues in medical imaging quality assurance and healthcare technology are welcome.', shareFeedback: 'Share feedback or collaborate', backToProjects: 'Back to all projects',
    },
    blog: { title: 'Notes & perspectives.', lead: 'Writing on medical physics, teaching, and life beyond the lecture hall.', allCategories: 'All', categories: 'Filter articles by category', searchLabel: 'Search articles', searchPlaceholder: 'Search articles', resultRange: 'Showing {start} to {end} of {total} articles', noResultsTitle: 'No articles found.', noResultsBody: 'Try another search or clear the filters to explore all the writing.', clearFilters: 'Clear filters', pagination: 'Article pages', previousPage: 'Previous', nextPage: 'Next', pageLabel: 'Page {page}', resultsHeading: 'Articles', },
  },
  fr: {
    nav: 'Projets',
    projects: {
      metaTitle: 'Projets', metaDescription: 'Outils et projets du Dr Isaac Kwesi Acquah, à la croisée de la physique médicale, de l’enseignement et de la technologie.',
      eyebrow: 'Projets', title: 'Des idées en pratique.', lead: 'Des outils concrets inspirés des questions de la recherche, de la santé et de l’enseignement.',
      inDevelopment: 'En développement', completed: 'Terminé', version: 'Version {version}', exploreProject: 'Découvrir le projet',
      catalogueNote: 'Une collection de travaux en évolution, de l’idée mise en pratique à l’outil entre vos mains.', getInTouch: 'Engager la conversation',
      devicePreview: 'RadPulse Africa dans des maquettes Android et iPhone', deviceFrame: 'Maquette de téléphone', frameNote: 'Captures de la version Android en développement. L’iPhone sert de maquette de présentation.',
      breadcrumb: 'Fil d’Ariane', seeItInAction: 'Dans l’application', preview: 'Voir la version en développement',
      fallback: 'Le récit du projet est actuellement disponible en anglais. La navigation et les commandes restent dans la langue sélectionnée.',
      motivationEyebrow: 'Le point de départ', motivationTitle: 'Au-delà de la mesure.', modalities: 'Quatre modalités d’imagerie diagnostique',
      walkthroughEyebrow: 'Dans RadPulse', walkthroughTitle: 'Un carnet en mouvement.', walkthroughNote: 'Une visite guidée à partir de véritables captures de développement. Choisissez un chapitre ou lancez la démonstration.',
      appAppearance: 'Apparence de l’application', light: 'Clair', dark: 'Sombre', playbackControls: 'Commandes de la démonstration', previousScreen: 'Écran précédent', nextScreen: 'Écran suivant', play: 'Lancer la démo', pause: 'Mettre en pause', restart: 'Revoir la démo', screenCount: 'Écran {current} sur {total}', chapters: 'Chapitres de la visite',
      capabilitiesEyebrow: 'Les outils du quotidien', capabilitiesTitle: 'Du contrôle au rapport.', privacy: 'Centré sur le contrôle qualité des équipements. Les dossiers patients restent hors du carnet.',
      creatorEyebrow: 'Créé par', creatorTitle: 'L’expérience au service du métier.', developmentEyebrow: 'Un projet en évolution', developmentTitle: 'Construisons la suite.',
      feedback: 'Suggestions, collaborations et retours constructifs des professionnels de l’assurance qualité en imagerie médicale et des technologies de santé sont les bienvenus.', shareFeedback: 'Partager un avis ou collaborer', backToProjects: 'Retour aux projets',
    },
    blog: { title: 'Notes et perspectives.', lead: 'Écrits sur la physique médicale, l’enseignement et la vie au-delà de l’amphithéâtre.', allCategories: 'Tous', categories: 'Filtrer les articles par catégorie', searchLabel: 'Rechercher des articles', searchPlaceholder: 'Rechercher un article', resultRange: 'Articles {start} à {end} sur {total}', noResultsTitle: 'Aucun article trouvé.', noResultsBody: 'Essayez une autre recherche ou effacez les filtres pour voir tous les articles.', clearFilters: 'Effacer les filtres', pagination: 'Pages des articles', previousPage: 'Précédent', nextPage: 'Suivant', pageLabel: 'Page {page}', resultsHeading: 'Articles', },
  },
  es: {
    nav: 'Proyectos',
    projects: {
      metaTitle: 'Proyectos', metaDescription: 'Herramientas y proyectos del Dr. Isaac Kwesi Acquah que conectan física médica, educación y tecnología práctica.',
      eyebrow: 'Proyectos', title: 'Ideas en práctica.', lead: 'Herramientas prácticas inspiradas en las preguntas de la investigación, la atención sanitaria y el aula.',
      inDevelopment: 'En desarrollo', completed: 'Completado', version: 'Versión {version}', exploreProject: 'Explorar el proyecto',
      catalogueNote: 'Una colección en evolución, desde una idea puesta en práctica hasta una herramienta en tus manos.', getInTouch: 'Iniciar una conversación',
      devicePreview: 'RadPulse Africa en maquetas de Android y iPhone', deviceFrame: 'Marco del teléfono', frameNote: 'Capturas de la versión Android en desarrollo. El iPhone se usa como marco de presentación.',
      breadcrumb: 'Ruta de navegación', seeItInAction: 'Dentro de la aplicación', preview: 'Ver versión en desarrollo',
      fallback: 'La historia del proyecto está disponible actualmente en inglés. La navegación y los controles permanecen en el idioma seleccionado.',
      motivationEyebrow: 'El punto de partida', motivationTitle: 'Más allá de la medición.', modalities: 'Cuatro modalidades de diagnóstico por imagen',
      walkthroughEyebrow: 'Dentro de RadPulse', walkthroughTitle: 'Un cuaderno en movimiento.', walkthroughNote: 'Un recorrido con capturas reales de desarrollo. Elige un capítulo o reproduce la demostración.',
      appAppearance: 'Apariencia de la aplicación', light: 'Claro', dark: 'Oscuro', playbackControls: 'Controles de reproducción', previousScreen: 'Pantalla anterior', nextScreen: 'Pantalla siguiente', play: 'Reproducir demo', pause: 'Pausar demo', restart: 'Repetir demo', screenCount: 'Pantalla {current} de {total}', chapters: 'Capítulos del recorrido',
      capabilitiesEyebrow: 'Herramientas de trabajo', capabilitiesTitle: 'Del control al informe.', privacy: 'Centrado en el control de calidad del equipo. Los registros de pacientes quedan fuera del cuaderno.',
      creatorEyebrow: 'Creado por', creatorTitle: 'Experiencia que ayuda.', developmentEyebrow: 'Un proyecto en evolución', developmentTitle: 'Demos forma al futuro.',
      feedback: 'Son bienvenidas las sugerencias, colaboraciones y opiniones constructivas de colegas de garantía de calidad en imagen médica y tecnología sanitaria.', shareFeedback: 'Enviar comentarios o colaborar', backToProjects: 'Volver a los proyectos',
    },
    blog: { title: 'Notas y perspectivas.', lead: 'Escritos sobre física médica, enseñanza y la vida más allá del aula.', allCategories: 'Todos', categories: 'Filtrar artículos por categoría', searchLabel: 'Buscar artículos', searchPlaceholder: 'Buscar artículos', resultRange: 'Mostrando {start} a {end} de {total} artículos', noResultsTitle: 'No se encontraron artículos.', noResultsBody: 'Prueba otra búsqueda o borra los filtros para ver todos los artículos.', clearFilters: 'Borrar filtros', pagination: 'Páginas de artículos', previousPage: 'Anterior', nextPage: 'Siguiente', pageLabel: 'Página {page}', resultsHeading: 'Artículos', },
  },
  pt: {
    nav: 'Projetos',
    projects: {
      metaTitle: 'Projetos', metaDescription: 'Ferramentas e projetos do Dr. Isaac Kwesi Acquah que ligam física médica, educação e tecnologia prática.',
      eyebrow: 'Projetos', title: 'Ideias na prática.', lead: 'Ferramentas práticas inspiradas nas questões da investigação, dos cuidados de saúde e da sala de aula.',
      inDevelopment: 'Em desenvolvimento', completed: 'Concluído', version: 'Versão {version}', exploreProject: 'Explorar o projeto',
      catalogueNote: 'Uma coleção de trabalhos em evolução, da ideia posta em prática à ferramenta nas suas mãos.', getInTouch: 'Iniciar uma conversa',
      devicePreview: 'RadPulse Africa em modelos Android e iPhone', deviceFrame: 'Modelo de telefone', frameNote: 'Capturas da versão Android em desenvolvimento. O iPhone serve de modelo de apresentação.',
      breadcrumb: 'Caminho de navegação', seeItInAction: 'Dentro da aplicação', preview: 'Ver versão em desenvolvimento',
      fallback: 'A história do projeto está atualmente disponível em inglês. A navegação e os controlos mantêm-se no idioma selecionado.',
      motivationEyebrow: 'O ponto de partida', motivationTitle: 'Para além da medição.', modalities: 'Quatro modalidades de diagnóstico por imagem',
      walkthroughEyebrow: 'Dentro do RadPulse', walkthroughTitle: 'Um caderno em movimento.', walkthroughNote: 'Uma visita guiada com capturas reais de desenvolvimento. Escolha um capítulo ou reproduza a demonstração.',
      appAppearance: 'Aspeto da aplicação', light: 'Claro', dark: 'Escuro', playbackControls: 'Controlos da demonstração', previousScreen: 'Ecrã anterior', nextScreen: 'Ecrã seguinte', play: 'Reproduzir demo', pause: 'Pausar demo', restart: 'Repetir demo', screenCount: 'Ecrã {current} de {total}', chapters: 'Capítulos da visita',
      capabilitiesEyebrow: 'Ferramentas de trabalho', capabilitiesTitle: 'Do controlo ao relatório.', privacy: 'Centrado no controlo de qualidade dos equipamentos. Os registos de pacientes ficam fora do caderno.',
      creatorEyebrow: 'Criado por', creatorTitle: 'Experiência com propósito.', developmentEyebrow: 'Um projeto em evolução', developmentTitle: 'Vamos construir o próximo passo.',
      feedback: 'São bem-vindas sugestões, colaborações e opiniões construtivas de colegas da garantia de qualidade em imagem médica e tecnologia de saúde.', shareFeedback: 'Dar opinião ou colaborar', backToProjects: 'Voltar aos projetos',
    },
    blog: { title: 'Notas e perspetivas.', lead: 'Textos sobre física médica, ensino e a vida para além da sala de aula.', allCategories: 'Todos', categories: 'Filtrar artigos por categoria', searchLabel: 'Pesquisar artigos', searchPlaceholder: 'Pesquisar artigos', resultRange: 'A mostrar {start} a {end} de {total} artigos', noResultsTitle: 'Nenhum artigo encontrado.', noResultsBody: 'Experimente outra pesquisa ou limpe os filtros para ver todos os artigos.', clearFilters: 'Limpar filtros', pagination: 'Páginas de artigos', previousPage: 'Anterior', nextPage: 'Seguinte', pageLabel: 'Página {page}', resultsHeading: 'Artigos', },
  },
  ar: {
    nav: 'المشاريع',
    projects: {
      metaTitle: 'المشاريع', metaDescription: 'أدوات ومشاريع الدكتور إسحاق كويسي أكواه التي تربط الفيزياء الطبية والتعليم والتقنية العملية.',
      eyebrow: 'المشاريع', title: 'أفكار قيد التطبيق.', lead: 'أدوات عملية مستوحاة من أسئلة البحث والرعاية الصحية وقاعات الدراسة.',
      inDevelopment: 'قيد التطوير', completed: 'مكتمل', version: 'الإصدار {version}', exploreProject: 'استكشف المشروع',
      catalogueNote: 'مجموعة أعمال متنامية، من فكرة قيد التجربة إلى أداة بين يديك.', getInTouch: 'ابدأ محادثة',
      devicePreview: 'تطبيق RadPulse Africa داخل إطاري Android وiPhone للعرض', deviceFrame: 'إطار الهاتف', frameNote: 'لقطات من نسخة Android قيد التطوير. يُستخدم iPhone كإطار للعرض.',
      breadcrumb: 'مسار التنقل', seeItInAction: 'داخل التطبيق', preview: 'عرض نسخة التطوير',
      fallback: 'قصة المشروع متاحة حاليًا بالإنجليزية. تبقى عناصر التنقل والتحكم باللغة التي اخترتها.',
      motivationEyebrow: 'نقطة البداية', motivationTitle: 'ما بعد القياس.', modalities: 'أربع تقنيات للتصوير التشخيصي',
      walkthroughEyebrow: 'داخل RadPulse', walkthroughTitle: 'دفتر ينبض بالحركة.', walkthroughNote: 'جولة إرشادية من لقطات حقيقية لنسخة التطوير. اختر قسمًا أو شغّل العرض.',
      appAppearance: 'مظهر التطبيق', light: 'فاتح', dark: 'داكن', playbackControls: 'عناصر التحكم في العرض', previousScreen: 'الشاشة السابقة', nextScreen: 'الشاشة التالية', play: 'تشغيل العرض', pause: 'إيقاف مؤقت', restart: 'إعادة العرض', screenCount: 'الشاشة {current} من {total}', chapters: 'أقسام جولة التطبيق',
      capabilitiesEyebrow: 'أدوات العمل', capabilitiesTitle: 'من الفحص إلى التقرير.', privacy: 'يركز على مراقبة جودة المعدات. تبقى سجلات المرضى خارج الدفتر.',
      creatorEyebrow: 'من تطوير', creatorTitle: 'خبرة تصنع فائدة.', developmentEyebrow: 'عمل قيد التطوير', developmentTitle: 'ساهم في تشكيل الخطوة المقبلة.',
      feedback: 'نرحب باقتراحات الزملاء وتعاونهم وملاحظاتهم البناءة في ضمان جودة التصوير الطبي وتقنيات الرعاية الصحية.', shareFeedback: 'شارك رأيك أو تعاون معنا', backToProjects: 'العودة إلى جميع المشاريع',
    },
    blog: { title: 'ملاحظات ورؤى.', lead: 'كتابات عن الفيزياء الطبية والتعليم والحياة خارج قاعة المحاضرات.', allCategories: 'الكل', categories: 'تصفية المقالات حسب الفئة', searchLabel: 'البحث في المقالات', searchPlaceholder: 'ابحث في المقالات', resultRange: 'عرض {start} إلى {end} من {total} مقالات', noResultsTitle: 'لم يتم العثور على مقالات.', noResultsBody: 'جرّب بحثًا آخر أو امسح عوامل التصفية لاستكشاف جميع المقالات.', clearFilters: 'مسح عوامل التصفية', pagination: 'صفحات المقالات', previousPage: 'السابق', nextPage: 'التالي', pageLabel: 'الصفحة {page}', resultsHeading: 'المقالات', },
  },
};

for (const [locale, values] of Object.entries(copy)) {
  const file = `messages/${locale}.json`;
  const messages = JSON.parse(readFileSync(file, 'utf8'));
  messages.Nav.projects = values.nav;
  delete messages.Sections.revealEmail;
  delete values.projects.frameNote;
  values.projects.screenLabels = {
    en: { home: 'Home', equipment: 'Equipment', tasks: 'Tasks', records: 'Records', more: 'More', about: 'About' },
    fr: { home: 'Accueil', equipment: 'Équipement', tasks: 'Tâches', records: 'Historique', more: 'Plus', about: 'À propos' },
    es: { home: 'Inicio', equipment: 'Equipos', tasks: 'Tareas', records: 'Registros', more: 'Más', about: 'Acerca de' },
    pt: { home: 'Início', equipment: 'Equipamento', tasks: 'Tarefas', records: 'Registos', more: 'Mais', about: 'Sobre' },
    ar: { home: 'الرئيسية', equipment: 'المعدات', tasks: 'المهام', records: 'السجلات', more: 'المزيد', about: 'حول' },
  }[locale];
  messages.Projects = values.projects;
  Object.assign(messages.Blog, values.blog);
  writeFileSync(file, `${JSON.stringify(messages, null, 2)}\n`);
}
