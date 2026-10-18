import { readFileSync, writeFileSync } from 'node:fs';

const copy = {
  en: {
    nav: 'Projects', metaTitle: 'Projects', metaDescription: 'Explore software and practical tools developed by Dr Isaac Kwesi Acquah, starting with the RadPulse Africa quality-control application.',
    titleFirst: 'Ideas into', titleSecond: 'practice.', lead: 'Tools shaped by medical physics. A place for the ideas that move beyond research and into everyday practice.',
    browse: 'Explore the work', selected: 'Selected projects', read: 'Discover the project', back: 'All projects', platform: 'Platform', version: 'Version', status: 'Status', creator: 'Created by',
    ongoing: 'Ongoing development', completed: 'Completed', planned: 'Planned', inside: 'Inside the app', empty: 'The first project will appear here.',
    screensTitle: 'A closer look.', screensLead: 'Explore the real application screens, from the first check to the record of a hospital visit.', selectScreen: 'Choose an application screen', previousScreen: 'Previous screen', nextScreen: 'Next screen',
    capabilitiesTitle: 'The work, connected.', capabilitiesLead: 'Six capabilities bring the practical tasks around equipment quality control into a single application.', modalities: 'Four diagnostic imaging modalities',
    purposeTitle: 'The thinking behind it.', nextTitle: 'Still taking shape.', feedback: 'Share feedback', closingTitle: 'Good ideas grow together.', closingBody: 'Interested in the work, or have a perspective that could help shape it? Let’s start a conversation.', contact: 'Get in touch',
  },
  fr: {
    nav: 'Projets', metaTitle: 'Projets', metaDescription: 'Découvrez les logiciels et outils pratiques développés par le Dr Isaac Kwesi Acquah, à commencer par RadPulse Africa.',
    titleFirst: 'Des idées', titleSecond: 'à la pratique.', lead: 'Des outils issus de la physique médicale. Des idées qui passent de la recherche à la pratique quotidienne.',
    browse: 'Explorer les projets', selected: 'Projets sélectionnés', read: 'Découvrir le projet', back: 'Tous les projets', platform: 'Plateforme', version: 'Version', status: 'Statut', creator: 'Créé par',
    ongoing: 'En développement', completed: 'Terminé', planned: 'Prévu', inside: 'Dans l’application', empty: 'Le premier projet apparaîtra ici.',
    screensTitle: 'De plus près.', screensLead: 'Explorez les écrans de l’application, du premier contrôle au compte rendu de la visite à l’hôpital.', selectScreen: 'Choisir un écran de l’application', previousScreen: 'Écran précédent', nextScreen: 'Écran suivant',
    capabilitiesTitle: 'Le travail, relié.', capabilitiesLead: 'Six fonctionnalités réunissent les tâches pratiques du contrôle qualité des équipements dans une seule application.', modalities: 'Quatre modalités d’imagerie diagnostique',
    purposeTitle: 'L’idée derrière l’outil.', nextTitle: 'La suite se construit.', feedback: 'Partager un avis', closingTitle: 'Avançons ensemble.', closingBody: 'Ce travail vous intéresse, ou vous avez une idée pour le faire évoluer ? Parlons-en.', contact: 'Prendre contact',
  },
  es: {
    nav: 'Proyectos', metaTitle: 'Proyectos', metaDescription: 'Explore el software y las herramientas prácticas del Dr. Isaac Kwesi Acquah, empezando por RadPulse Africa.',
    titleFirst: 'Ideas en', titleSecond: 'la práctica.', lead: 'Herramientas nacidas de la física médica. Ideas que pasan de la investigación a la práctica cotidiana.',
    browse: 'Explorar los proyectos', selected: 'Proyectos seleccionados', read: 'Descubrir el proyecto', back: 'Todos los proyectos', platform: 'Plataforma', version: 'Versión', status: 'Estado', creator: 'Creado por',
    ongoing: 'En desarrollo', completed: 'Completado', planned: 'Previsto', inside: 'Dentro de la aplicación', empty: 'El primer proyecto aparecerá aquí.',
    screensTitle: 'Más de cerca.', screensLead: 'Explore las pantallas reales de la aplicación, desde la primera prueba hasta el registro de una visita al hospital.', selectScreen: 'Elegir una pantalla de la aplicación', previousScreen: 'Pantalla anterior', nextScreen: 'Pantalla siguiente',
    capabilitiesTitle: 'El trabajo, conectado.', capabilitiesLead: 'Seis funciones reúnen las tareas prácticas del control de calidad de equipos en una sola aplicación.', modalities: 'Cuatro modalidades de imagen diagnóstica',
    purposeTitle: 'La idea detrás.', nextTitle: 'Sigue tomando forma.', feedback: 'Compartir comentarios', closingTitle: 'Las ideas crecen juntas.', closingBody: '¿Le interesa el trabajo o tiene una perspectiva que pueda ayudar a darle forma? Conversemos.', contact: 'Contactar',
  },
  pt: {
    nav: 'Projetos', metaTitle: 'Projetos', metaDescription: 'Explore o software e as ferramentas práticas do Dr. Isaac Kwesi Acquah, a começar pelo RadPulse Africa.',
    titleFirst: 'Ideias em', titleSecond: 'prática.', lead: 'Ferramentas nascidas da física médica. Ideias que passam da investigação para a prática diária.',
    browse: 'Explorar os projetos', selected: 'Projetos selecionados', read: 'Conhecer o projeto', back: 'Todos os projetos', platform: 'Plataforma', version: 'Versão', status: 'Estado', creator: 'Criado por',
    ongoing: 'Em desenvolvimento', completed: 'Concluído', planned: 'Planeado', inside: 'Dentro da aplicação', empty: 'O primeiro projeto aparecerá aqui.',
    screensTitle: 'Mais de perto.', screensLead: 'Explore os ecrãs reais da aplicação, do primeiro teste ao registo de uma visita ao hospital.', selectScreen: 'Escolher um ecrã da aplicação', previousScreen: 'Ecrã anterior', nextScreen: 'Ecrã seguinte',
    capabilitiesTitle: 'O trabalho, ligado.', capabilitiesLead: 'Seis funcionalidades reúnem as tarefas práticas de controlo de qualidade de equipamentos numa única aplicação.', modalities: 'Quatro modalidades de imagiologia diagnóstica',
    purposeTitle: 'A ideia por trás.', nextTitle: 'Ainda a ganhar forma.', feedback: 'Partilhar comentários', closingTitle: 'As ideias crescem juntas.', closingBody: 'Interessa-lhe este trabalho ou tem uma perspetiva que possa ajudar a desenvolvê-lo? Vamos conversar.', contact: 'Entrar em contacto',
  },
  ar: {
    nav: 'المشاريع', metaTitle: 'المشاريع', metaDescription: 'اكتشف البرامج والأدوات العملية التي طورها الدكتور إسحاق كويسي أكواه، بدءاً بتطبيق RadPulse Africa.',
    titleFirst: 'أفكار تصبح', titleSecond: 'واقعاً.', lead: 'أدوات مستمدة من الفيزياء الطبية. أفكار تنتقل من البحث إلى الممارسة اليومية.',
    browse: 'استكشف المشاريع', selected: 'مشاريع مختارة', read: 'اكتشف المشروع', back: 'جميع المشاريع', platform: 'المنصة', version: 'الإصدار', status: 'الحالة', creator: 'من تطوير',
    ongoing: 'قيد التطوير', completed: 'مكتمل', planned: 'مخطط له', inside: 'داخل التطبيق', empty: 'سيظهر المشروع الأول هنا.',
    screensTitle: 'نظرة أقرب.', screensLead: 'استكشف شاشات التطبيق الفعلية، من الفحص الأول إلى سجل زيارة المستشفى.', selectScreen: 'اختر شاشة من التطبيق', previousScreen: 'الشاشة السابقة', nextScreen: 'الشاشة التالية',
    capabilitiesTitle: 'مهام مترابطة.', capabilitiesLead: 'ست وظائف تجمع المهام العملية لمراقبة جودة المعدات في تطبيق واحد.', modalities: 'أربعة أنواع من التصوير التشخيصي',
    purposeTitle: 'الفكرة وراءه.', nextTitle: 'التطوير مستمر.', feedback: 'شارك ملاحظاتك', closingTitle: 'الأفكار تنمو معاً.', closingBody: 'هل يهمك هذا العمل أو لديك وجهة نظر تساعد في تطويره؟ لنتحدث.', contact: 'تواصل معي',
  },
};

for (const [locale, { nav, ...messages }] of Object.entries(copy)) {
  const path = `messages/${locale}.json`;
  const data = JSON.parse(readFileSync(path, 'utf8'));
  data.Nav.projects = nav;
  data.Projects = messages;
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}
