import { CountryStat, GlobalEvent, KnowledgeDocument, LeaderProfile, NewsItem, PartnerInstitution } from '../types';

export const countriesData: CountryStat[] = [
  { code: 'PS', name: { ar: 'دولة فلسطين', en: 'State of Palestine', fr: 'État de Palestine', es: 'Estado de Palestina' }, x: 56.5, y: 39, membersCount: 4820, eventsCount: 38, partnersCount: 16, region: 'Middle East' },
  { code: 'JO', name: { ar: 'الأردن', en: 'Jordan', fr: 'Jordanie', es: 'Jordania' }, x: 57.5, y: 40.5, membersCount: 2150, eventsCount: 12, partnersCount: 8, region: 'Middle East' },
  { code: 'EG', name: { ar: 'مصر', en: 'Egypt', fr: 'Égypte', es: 'Egipto' }, x: 54, y: 42, membersCount: 2840, eventsCount: 14, partnersCount: 9, region: 'North Africa' },
  { code: 'ZA', name: { ar: 'جنوب أفريقيا', en: 'South Africa', fr: 'Afrique du Sud', es: 'Sudáfrica' }, x: 54.5, y: 79, membersCount: 2240, eventsCount: 16, partnersCount: 11, region: 'Africa' },
  { code: 'ES', name: { ar: 'إسبانيا', en: 'Spain', fr: 'Espagne', es: 'España' }, x: 47, y: 36, membersCount: 2110, eventsCount: 15, partnersCount: 10, region: 'Europe' },
  { code: 'IE', name: { ar: 'أيرلندا', en: 'Ireland', fr: 'Irlande', es: 'Irlanda' }, x: 45, y: 28, membersCount: 1890, eventsCount: 11, partnersCount: 7, region: 'Europe' },
  { code: 'NO', name: { ar: 'النرويج', en: 'Norway', fr: 'Norvège', es: 'Noruega' }, x: 51, y: 22, membersCount: 1420, eventsCount: 9, partnersCount: 6, region: 'Europe' },
  { code: 'GB', name: { ar: 'المملكة المتحدة', en: 'United Kingdom', fr: 'Royaume-Uni', es: 'Reino Unido' }, x: 46.5, y: 29.5, membersCount: 2650, eventsCount: 18, partnersCount: 12, region: 'Europe' },
  { code: 'FR', name: { ar: 'فرنسا', en: 'France', fr: 'France', es: 'Francia' }, x: 48.5, y: 32, membersCount: 2310, eventsCount: 14, partnersCount: 9, region: 'Europe' },
  { code: 'BR', name: { ar: 'البرازيل', en: 'Brazil', fr: 'Brésil', es: 'Brasil' }, x: 34, y: 68, membersCount: 1680, eventsCount: 10, partnersCount: 7, region: 'Latin America' },
  { code: 'CL', name: { ar: 'تشيلي', en: 'Chile', fr: 'Chili', es: 'Chile' }, x: 28.5, y: 78, membersCount: 1940, eventsCount: 12, partnersCount: 8, region: 'Latin America' },
  { code: 'CA', name: { ar: 'كندا', en: 'Canada', fr: 'Canada', es: 'Canadá' }, x: 23, y: 25, membersCount: 1720, eventsCount: 8, partnersCount: 6, region: 'North America' },
  { code: 'US', name: { ar: 'الولايات المتحدة', en: 'United States', fr: 'États-Unis', es: 'Estados Unidos' }, x: 22, y: 36, membersCount: 3100, eventsCount: 22, partnersCount: 14, region: 'North America' },
  { code: 'TR', name: { ar: 'تركيا', en: 'Turkey', fr: 'Turquie', es: 'Turquía' }, x: 55, y: 35, membersCount: 1980, eventsCount: 13, partnersCount: 9, region: 'Europe/Asia' },
  { code: 'MY', name: { ar: 'ماليزيا', en: 'Malaysia', fr: 'Malaisie', es: 'Malasia' }, x: 77, y: 55, membersCount: 1540, eventsCount: 9, partnersCount: 6, region: 'Asia' },
  { code: 'ID', name: { ar: 'إندونيسيا', en: 'Indonesia', fr: 'Indonésie', es: 'Indonesia' }, x: 80, y: 62, membersCount: 2210, eventsCount: 11, partnersCount: 8, region: 'Asia' },
  { code: 'AU', name: { ar: 'أستراليا', en: 'Australia', fr: 'Australie', es: 'Australia' }, x: 85, y: 77, membersCount: 980, eventsCount: 7, partnersCount: 5, region: 'Oceania' },
  { code: 'DZ', name: { ar: 'الجزائر', en: 'Algeria', fr: 'Algérie', es: 'Argelia' }, x: 48, y: 40, membersCount: 1780, eventsCount: 10, partnersCount: 7, region: 'North Africa' }
];

export const newsData: NewsItem[] = [
  {
    id: 'statement-2026-09',
    category: 'statement',
    title: {
      ar: 'بيان الأمانة العامة حول المستجدات الدبلوماسية والقانونية لدولة فلسطين',
      en: 'Statement of the General Secretariat on Diplomatic and Legal Developments Regarding the State of Palestine',
      fr: 'Communiqué du Secrétariat Général sur les développements diplomatiques et juridiques concernant l\'État de Palestine',
      es: 'Declaración de la Secretaría General sobre novedades diplomáticas y jurídicas relativas al Estado de Palestina'
    },
    date: '24 سبتمبر 2026',
    language: 'AR / EN / FR / ES',
    summary: {
      ar: 'تؤكد الأمانة العامة على استناد الحراك الدولي إلى مخرجات الرأي الاستشاري لمحكمة العدل الدولية والتزام المجتمع المدني العالمي بالقرارات الأممية ذات الصلة بحق تقرير المصير وإنهاء الاحتلال.',
      en: 'The General Secretariat emphasizes the anchoring of international civic action in the ICJ Advisory Opinion conclusions and the adherence to relevant UN resolutions affirming self-determination.',
      fr: 'Le Secrétariat Général souligne l\'ancrage de l\'action civique internationale dans les conclusions de l\'avis consultatif de la CIJ et le respect des résolutions de l\'ONU.',
      es: 'La Secretaría General destaca el fundamento de la acción cívica internacional en las conclusiones de la opinión consultiva de la CIJ y las resoluciones de la ONU.'
    },
    content: {
      ar: 'استناداً إلى المبادئ التأسيسية للأمانة العامة للمجتمع العالمي من أجل دولة فلسطين، وفي ضوء التطورات المتسارعة في أروقة المنظمات الدولية، تؤكد الأمانة العامة على الأهمية الاستثنائية لترسيخ الالتزام الجماعي بقواعد القانون الدولي الإنساني وقرارات الجمعية العامة للأمم المتحدة.\n\nإن الأمانة العامة، وهي ترصد اتساع رقعة الدعم المدني والأكاديمي عبر القارات الخمس، تشير إلى أن المعرفة الموثقة بالوثائق والقرارات الصادرة عن المؤسسات الدولية هي الركيزة الأساسية لأي عمل مؤسسي رصين. وتدعو الأمانة كافة الهيئات الأكاديمية والشركاء القانونيين إلى تعزيز منصات التوثيق والأرشفة المشتركة.',
      en: 'Grounded in the foundational charter of the General Secretariat of the Global Community for the State of Palestine, and in light of evolving developments in multilateral forums, the Secretariat affirms the imperative of universal adherence to international humanitarian law and UN General Assembly resolutions.\n\nObserving the expanding horizon of civic and academic solidarity across five continents, the Secretariat emphasizes that documented knowledge, anchored in certified international instruments, remains the cornerstone of principled global engagement.',
      fr: 'Fondé sur les principes statutaires du Secrétariat Général, et face aux évolutions institutionnelles internationales, le Secrétariat réaffirme la primauté du droit international humanitaire et des résolutions onusiennes.\n\nConstatant la vigueur des solidarités civiques et universitaires sur les cinq continents, le Secrétariat rappelle que la documentation rigoureuse demeure le socle incontournable de tout dialogue constructif.',
      es: 'Fundamentada en los principios rectores de la Secretaría General, y a la luz de los avances en los foros multilaterales, la Secretaría reafirma la vigencia imperativa del derecho internacional humanitario y de las resoluciones de la Asamblea General de la ONU.\n\nAnte la creciente articulación de la sociedad civil y el ámbito académico global, la Secretaría reitera que el rigor documental es la piedra angular de cualquier compromiso institucional duradero.'
    },
    source: 'الأمانة العامة — المقر الرقمي الدولي',
    officialRef: 'GS-PAL/2026/DOC-084'
  },
  {
    id: 'report-icj-legal-impact',
    category: 'report',
    title: {
      ar: 'تقرير تحليلي: الآثار القانونية للأحكام الصادرة عن محكمة العدل الدولية على التزامات الدول الثالثة',
      en: 'Analytical Report: Legal Implications of ICJ Advisory Opinions on Third-State Obligations',
      fr: 'Rapport d\'analyse : Conséquences juridiques des avis de la CIJ sur les obligations des États tiers',
      es: 'Informe analítico: Consecuencias jurídicas de los dictámenes de la CIJ para terceros Estados'
    },
    date: '18 سبتمبر 2026',
    language: 'EN / AR',
    summary: {
      ar: 'دراسة قانونية مفصلة أعدتها اللجنة القانونية بالأمانة العامة تستعرض التزامات الدول بموجب قواعد القانون الدولي العرفي واتفاقيات جنيف.',
      en: 'A comprehensive study prepared by the Legal Committee of the Secretariat reviewing state obligations under customary international law and the Geneva Conventions.',
      fr: 'Une étude doctrinale approfondie préparée par le Comité Juridique du Secrétariat examinant les obligations erga omnes.',
      es: 'Un estudio exhaustivo elaborado por el Comité Jurídico de la Secretaría que analiza las obligaciones dimanantes del derecho consuetudinario.'
    },
    content: {
      ar: 'يقدم هذا التقرير قراءة توثيقية رصينة للنتائج القانونية المترتبة على رأي محكمة العدل الدولية بشأن الآثار القانونية المترتبة على سياسات وممارسات الاحتلال في الأرض الفلسطينية المحتلة بما فيها القدس الشرقية. يستند التحليل إلى مبدأ عدم الاعتراف بالأوضاع غير القانونية وعدم تقديم العون أو المساعدة لاستمرارها، ويشمل مراجعة دقيقة لآراء أكثر من 50 فقيهاً قانونياً دولياً.',
      en: 'This report presents a thorough analysis of the legal consequences arising from the ICJ Advisory Opinion concerning policies and practices in the Occupied Palestinian Territory, including East Jerusalem. It examines the customary duty of non-recognition of unlawful situations and non-assistance, supported by reviews from 50 international legal scholars.',
      fr: 'Ce document présente un examen méthodique des obligations juridiques issues de l\'avis consultatif de la CIJ, notamment le devoir de non-reconnaissance et d\'abstention d\'assistance face aux situations contraires au droit international.',
      es: 'El presente informe examina las implicaciones jurídicas del dictamen de la CIJ sobre las obligaciones erga omnes, con particular atención al deber de no reconocimiento y a la cooperación multilateral.'
    },
    source: 'اللجنة القانونية الاستشارية للأمانة العامة',
    officialRef: 'LGL-REP/2026/012'
  },
  {
    id: 'news-global-academic-coalition',
    category: 'news',
    title: {
      ar: 'توسيع شبكة التعاون الأكاديمي الدولي بين مراكز الأبحاث لدراسة التوثيق التاريخي والقانوني',
      en: 'Expansion of the International Academic Consortium for Historical and Legal Documentation',
      fr: 'Élargissement du consortium universitaire international pour la documentation historique et juridique',
      es: 'Ampliación de la red académica internacional para la documentación histórica y jurídica'
    },
    date: '10 سبتمبر 2026',
    language: 'AR / EN',
    summary: {
      ar: 'انضمام 14 كلية حقوق ومركز أبحاث إلى الشبكة المعرفية التابعة للأمانة العامة لتطوير أرشيف مفتوح للوثائق الأصلية والمعاهدات.',
      en: 'Fourteen law faculties and research institutes join the Secretariat’s knowledge network to advance an open repository of treaties and primary sources.',
      fr: 'Quatorze facultés de droit et instituts de recherche rejoignent le réseau documentaire du Secrétariat.',
      es: 'Catorce facultades de derecho y centros de investigación se integran en la red documental de la Secretaría.'
    },
    content: {
      ar: 'في إطار تعزيز البعد المعرفي والبحثي، أعلنت الأمانة العامة عن استكمال انضمام دفعة جديدة من المؤسسات الأكاديمية ومراكز الدراسات الإقليمية في أوروبا وأفريقيا وأمريكا اللاتينية وآسيا. وتهدف المبادرة إلى رقمنة وفهرسة آلاف الوثائق الدبلوماسية والتاريخية المرتبطة بفلسطين وتوفيرها مجاناً للباحثين والمجتمع المدني.',
      en: 'In line with its strategic knowledge mandate, the Secretariat announced the integration of accredited research bodies across Europe, Africa, Latin America, and Asia. The partnership focuses on digitizing and cataloging historical diplomatic manuscripts and treaty records for open academic consultation.',
      fr: 'Dans le cadre de son pilier académique, le Secrétariat Général accueille de nouveaux centres d\'études universitaires afin de mutualiser les fonds d\'archives et les analyses doctrinales.',
      es: 'En cumplimiento de sus objetivos estatutarios, la Secretaría refuerza su colaboración con instituciones universitarias de cuatro continentes para la digitalización sistemática de archivos diplomáticos.'
    },
    source: 'إدارة التعاون الأكاديمي والبحثي',
    officialRef: 'ACAD-NET/2026/04'
  }
];

export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: 'doc-icj-2024',
    accessionNo: 'ACC-ICJ-2024-186',
    category: 'international_law',
    subcategory: { ar: 'محكمة العدل الدولية', en: 'International Court of Justice', fr: 'Cour Internationale de Justice', es: 'Corte Internacional de Justicia' },
    title: {
      ar: 'الرأي الاستشاري لمحكمة العدل الدولية بشأن الآثار القانونية للسياسات والممارسات في الأرض الفلسطينية المحتلة (2024)',
      en: 'ICJ Advisory Opinion on the Legal Consequences arising from Policies and Practices in the Occupied Palestinian Territory (2024)',
      fr: 'Avis consultatif de la CIJ sur les conséquences juridiques des politiques et pratiques dans le Territoire palestinien occupé (2024)',
      es: 'Opinión consultiva de la CIJ sobre las consecuencias jurídicas de las políticas y prácticas en el Territorio Palestino Ocupado (2024)'
    },
    source: 'International Court of Justice (The Hague)',
    date: '19 يوليو 2024',
    language: 'EN / FR (Official) / AR Summary',
    type: 'Advisory Opinion / الرأي الاستشاري',
    summary: {
      ar: 'خلصت المحكمة بأغلبية ساحقة إلى أن استمرار وجود دولة الاحتلال في الأرض الفلسطينية المحتلة غير قانوني، وأن على جميع الدول والمنظمات الدولية واجب عدم الاعتراف بشرعية هذا الوضع أو تقديم أي معونة أو مساعدة في الحفاظ عليه.',
      en: 'The Court concluded that the continued presence in the Occupied Palestinian Territory is unlawful, and that all States are under an obligation not to recognize as legal the situation and not to render aid or assistance in maintaining it.',
      fr: 'La Cour a conclu au caractère illicite du maintien de la présence dans le Territoire palestinien occupé et à l\'obligation pour tous les États de ne pas reconnaître cette situation illégale.',
      es: 'La Corte concluyó que la presencia continuada en el Territorio Palestino Ocupado es ilícita, imponiendo a todos los Estados la obligación de no prestar ayuda ni asistencia al mantenimiento de la misma.'
    },
    citation: 'Legal Consequences arising from the Policies and Practices of Israel in the Occupied Palestinian Territory, including East Jerusalem, Advisory Opinion, I.C.J. Reports 2024.',
    officialUrl: 'https://www.icj-cij.org/case/186',
    pages: 83,
    tags: ['ICJ', 'Self-Determination', 'Occupied Territory', 'International Law']
  },
  {
    id: 'doc-unga-19-67',
    accessionNo: 'ACC-UNGA-2012-RES67-19',
    category: 'international_law',
    subcategory: { ar: 'الأمم المتحدة — الجمعية العامة', en: 'UN General Assembly', fr: 'Assemblée Générale de l\'ONU', es: 'Asamblea General de la ONU' },
    title: {
      ar: 'قرار الجمعية العامة للأمم المتحدة 67/19: منح فلسطين مركز دولة مراقب غير عضو (2012)',
      en: 'UN General Assembly Resolution 67/19: Status of Palestine in the United Nations (Non-Member Observer State, 2012)',
      fr: 'Résolution 67/19 de l\'Assemblée Générale de l\'ONU : Statut de la Palestine (État observateur non membre, 2012)',
      es: 'Resolución 67/19 de la Asamblea General de la ONU: Estatuto de Palestina (Estado observador no miembro, 2012)'
    },
    source: 'United Nations General Assembly',
    date: '29 نوفمبر 2012',
    language: 'AR / EN / FR / ES / RU / ZH',
    type: 'UNGA Resolution / قرار الجمعية العامة',
    summary: {
      ar: 'قررت الجمعية العامة بأغلبية 138 صوتاً منح فلسطين مركز دولة مراقب غير عضو في الأمم المتحدة، مؤكدة حق الشعب الفلسطيني في تقرير المصير والاستقلال في دولته على حدود عام 1967.',
      en: 'Adopted with 138 votes in favor, according Palestine non-member observer State status in the United Nations and reaffirming the right of the Palestinian people to self-determination and independence on the 1967 borders.',
      fr: 'Adoptée à la majorité de 138 voix, accordant à la Palestine le statut d\'État observateur non-membre et réaffirmant le droit à l\'autodétermination.',
      es: 'Aprobada por 138 votos a favor, confiriendo a Palestina el estatuto de Estado observador no miembro en las Naciones Unidas.'
    },
    citation: 'UN General Assembly, Resolution 67/19, Status of Palestine in the United Nations, A/RES/67/19 (29 November 2012).',
    officialUrl: 'https://undocs.org/A/RES/67/19',
    pages: 4,
    tags: ['UN', 'Statehood', 'Recognition', 'Observer State']
  },
  {
    id: 'doc-unga-es10-23',
    accessionNo: 'ACC-UNGA-2024-ES10-23',
    category: 'international_law',
    subcategory: { ar: 'الأمم المتحدة — الدورة الاستثنائية الطارئة', en: 'UN Emergency Special Session', fr: 'Session Extraordinaire de l\'ONU', es: 'Sesión Extraordinaria de Emergencia' },
    title: {
      ar: 'قرار الجمعية العامة ES-10/23: أهلية دولة فلسطين للعضوية الكاملة وترقية حقوق المشاركة (مايو 2024)',
      en: 'UN General Assembly Resolution ES-10/23: Admission of New Members & Palestinian Rights Upgrade (May 2024)',
      fr: 'Résolution ES-10/23 de l\'Assemblée Générale : Admission et droits accrus de l\'État de Palestine (Mai 2024)',
      es: 'Resolución ES-10/23 de la Asamblea General: Admisión y derechos ampliados del Estado de Palestina (Mayo 2024)'
    },
    source: 'United Nations General Assembly',
    date: '10 مايو 2024',
    language: 'AR / EN / FR / ES',
    type: 'UNGA Resolution / قرار أممي',
    summary: {
      ar: 'أقرت الجمعية العامة بأغلبية 143 صوتاً أن دولة فلسطين مؤهلة لعضوية الأمم المتحدة وفقاً للمادة 4 من الميثاق، وأوصت مجلس الأمن بإعادة النظر في طلب العضوية، ومنحت فلسطين حقوقاً إضافية في أروقة الجمعية العامة.',
      en: 'Determined with 143 votes in favor that the State of Palestine is qualified for membership in accordance with Article 4 of the Charter, and upgraded procedural participation modalities in UNGA sessions.',
      fr: 'Adoptée par 143 voix, constatant que l\'État de Palestine remplit les conditions d\'adhésion à l\'ONU et lui accordant des prérogatives de participation renforcées.',
      es: 'Aprobada por 143 votos, reconociendo que el Estado de Palestina reúne los requisitos para la membresía plena conforme a la Carta de la ONU.'
    },
    citation: 'UN General Assembly, Resolution ES-10/23, Admission of new Members to the United Nations, A/RES/ES-10/23 (10 May 2024).',
    officialUrl: 'https://undocs.org/A/RES/ES-10/23',
    pages: 6,
    tags: ['Full Membership', 'UNGA', 'Multilateral Rights']
  },
  {
    id: 'doc-declaration-independence-1988',
    accessionNo: 'ACC-HIST-1988-ALG-DEC',
    category: 'history',
    subcategory: { ar: 'وثائق الاستقلال التاريخية', en: 'Historical Independence Documents', fr: 'Documents Historiques d\'Indépendance', es: 'Documentos Históricos de Independencia' },
    title: {
      ar: 'وثيقة إعلان الاستقلال الفلسطيني — الجزائر (15 نوفمبر 1988)',
      en: 'Palestinian Declaration of Independence — Algiers (15 November 1988)',
      fr: 'Déclaration d\'Indépendance de la Palestine — Alger (15 novembre 1988)',
      es: 'Declaración de Independencia de Palestina — Argel (15 de noviembre de 1988)'
    },
    source: 'Palestine National Council (PNC)',
    date: '15 نوفمبر 1988',
    language: 'AR (Original) / EN / FR / ES',
    type: 'Historical Declaration / إعلان تاريخي',
    summary: {
      ar: 'النص التاريخي لإعلان قيام دولة فلسطين فوق أرضنا الفلسطينية وعاصمتها القدس الشريف، استناداً إلى الحق الطبيعي والتاريخي والقانوني للشعب العربي الفلسطيني في وطنه فلسطين.',
      en: 'The foundational proclamation of the State of Palestine on its Palestinian territory with Jerusalem as its capital, drawing upon natural, historical, and legal rights.',
      fr: 'Proclamation historique de l\'État de Palestine sur sa terre avec Jérusalem pour capitale, fondée sur les droits imprescriptibles du peuple palestinien.',
      es: 'Proclamación histórica del Estado de Palestina en su territorio patrio con Jerusalén como capital, fundamentada en derechos históricos inalienables.'
    },
    citation: 'Palestinian National Council, Declaration of Independence of the State of Palestine, Algiers, 15 November 1988, UN Doc A/43/827-S/20278.',
    officialUrl: 'https://unispal.un.org/UNISPAL.NSF/0/6EB528389E710799852560D4005EE9F4',
    pages: 8,
    tags: ['Independence', 'Sovereignty', 'Jerusalem', 'History']
  },
  {
    id: 'doc-geneva-convention-iv',
    accessionNo: 'ACC-IHL-1949-GCIV',
    category: 'international_law',
    subcategory: { ar: 'القانون الدولي الإنساني', en: 'International Humanitarian Law', fr: 'Droit International Humanitaire', es: 'Derecho Internacional Humanitario' },
    title: {
      ar: 'اتفاقية جنيف الرابعة بشأن حماية الأشخاص المدنيين في وقت الحرب (1949) وانطباقها القانوني',
      en: 'Fourth Geneva Convention Relative to the Protection of Civilian Persons in Time of War (1949) & De Jure Applicability',
      fr: 'Quatrième Convention de Genève relative à la protection des personnes civiles en temps de guerre (1949)',
      es: 'IV Convenio de Ginebra relativo a la protección de personas civiles en tiempo de guerra (1949)'
    },
    source: 'International Committee of the Red Cross (ICRC) & High Contracting Parties',
    date: '12 أغسطس 1949 (انضمام فلسطين الرسمي 2014)',
    language: 'EN / FR / AR',
    type: 'International Treaty / معاهدة دولية',
    summary: {
      ar: 'المعاهدة المنظمة للقواعد الحاكمة للأراضي الواقعة تحت الاحتلال الحربي، وتأكيد الإجماع الدولي وقرارات مجلس الأمن ومحكمة العدل الدولية على انطباقها الفعلي والقانوني على الأرض الفلسطينية المحتلة.',
      en: 'Codifies the legal status and protection regime for civilian populations under military occupation. Reaffirmed by unanimous ICJ and UN resolutions as de jure applicable to all OPT.',
      fr: 'Texte conventionnel régissant la protection des populations civiles sous occupation militaire, de plein droit applicable selon la jurisprudence de la CIJ.',
      es: 'Tratado regulador del régimen de protección de civiles en territorios ocupados, con aplicabilidad de jure confirmada universalmente.'
    },
    citation: 'Geneva Convention relative to the Protection of Civilian Persons in Time of War (Fourth Geneva Convention), 75 U.N.T.S. 287 (1949).',
    officialUrl: 'https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949',
    pages: 45,
    tags: ['Geneva Conventions', 'Civilian Protection', 'Occupation', 'IHL']
  },
  {
    id: 'doc-icc-rome-statute-accession',
    accessionNo: 'ACC-ICC-2015-ROME-STAT',
    category: 'international_law',
    subcategory: { ar: 'المحكمة الجنائية الدولية', en: 'International Criminal Court', fr: 'Cour Pénale Internationale', es: 'Corte Penal Internacional' },
    title: {
      ar: 'صك انضمام دولة فلسطين إلى نظام روما الأساسي للمحكمة الجنائية الدولية (2015)',
      en: 'Instrument of Accession by the State of Palestine to the Rome Statute of the International Criminal Court (2015)',
      fr: 'Instrument d\'adhésion de l\'État de Palestine au Statut de Rome de la Cour Pénale Internationale (2015)',
      es: 'Instrumento de adhesión del Estado de Palestina al Estatuto de Roma de la Corte Penal Internacional (2015)'
    },
    source: 'United Nations Treaty Collection (Depositary)',
    date: '2 يناير 2015',
    language: 'AR / EN / FR',
    type: 'Treaty Accession / صك انضمام',
    summary: {
      ar: 'إيداع صك انضمام دولة فلسطين رسمياً كدولة طرف رقم 123 في نظام روما الأساسي للمحكمة الجنائية الدولية، وتأكيد الدائرة التمهيدية للمحكمة على بسط ولايتها الإقليمية على الأراضي الفلسطينية المحتلة عام 1967.',
      en: 'Formal deposit of accession making Palestine the 123rd State Party to the Rome Statute, enabling ICC territorial jurisdiction over the West Bank, Gaza, and East Jerusalem.',
      fr: 'Dépôt officiel faisant de la Palestine le 123e État partie au Statut de Rome, consacrant la compétence territoriale de la juridiction.',
      es: 'Depósito formal que convirtió a Palestina en el Estado parte n.º 123 del Estatuto de Roma, confirmando la jurisdicción sobre los territorios de 1967.'
    },
    citation: 'Depositary Notification C.N.13.2015.TREATIES-XVIII.10 (State of Palestine: Accession), Rome Statute of the International Criminal Court.',
    officialUrl: 'https://treaties.un.org/pages/ViewDetails.aspx?src=TREATY&mtdsg_no=XVIII-10&chapter=18',
    pages: 5,
    tags: ['ICC', 'Rome Statute', 'Jurisdiction', 'Accountability']
  },
  {
    id: 'doc-historical-maps-archive',
    accessionNo: 'ACC-MAP-1920-1948-MANDATE',
    category: 'history',
    subcategory: { ar: 'الخرائط والأطالس التاريخية', en: 'Cartographic & Survey Archive', fr: 'Archives Cartographiques', es: 'Archivos Cartográficos' },
    title: {
      ar: 'أطلس مساحة فلسطين والمخططات العقارية التاريخية (مسح فلسطين 1920-1948)',
      en: 'Survey of Palestine Historical Cartography & Village Statistics (1920–1948)',
      fr: 'Atlas et statistiques foncières de la Palestine sous mandat (1920-1948)',
      es: 'Atlas y estadísticas catastrales de Palestina bajo Mandato (1920-1948)'
    },
    source: 'Survey of Palestine Archive & British National Archives (Colonial Office records)',
    date: '1945 (مؤرشف ومحقق 2026)',
    language: 'EN / AR',
    type: 'Cartographic Ledger / أطلس وخرائط',
    summary: {
      ar: 'توثيق هندسي وإحصائي شامل للقرى والبلدات والملكيات العقارية والجغرافية لفلسطين التاريخية استناداً إلى إحصاءات القرى الرسمية وسجلات المساحة المعتمدة.',
      en: 'Official cadastral and demographic surveys documenting land ownership, village registries, and topographical data across historic Palestine prior to 1948.',
      fr: 'Relevés topographiques et statistiques foncières officielles établissant le cadastre historique et l\'organisation territoriale des localités palestiniennes.',
      es: 'Registros catastrales y cartográficos oficiales que acreditan la titularidad histórica de la tierra y la delimitación de aldeas y ciudades.'
    },
    citation: 'Government of Palestine, Village Statistics 1945: A Classification of Land and Area Ownership, Palestine Map Survey Series.',
    officialUrl: 'https://www.palestine-studies.org/en/resources/maps',
    pages: 120,
    tags: ['Maps', 'Land Ownership', 'Cadastre', 'Demographics']
  },
  {
    id: 'doc-civic-coalition-charter',
    accessionNo: 'ACC-CIV-2025-GLOB-CHRT',
    category: 'civil_society',
    subcategory: { ar: 'مواثيق المجتمع المدني الدولي', en: 'Global Civil Society Charters', fr: 'Chartes de la Société Civile', es: 'Cartas de la Sociedad Civil' },
    title: {
      ar: 'الميثاق التوجيهي للشبكات المدنية والأكاديمية العالمية للتضامن القانوني والمعرفي',
      en: 'Guiding Charter for Global Civic and Academic Coalitions in Legal & Knowledge Solidarity',
      fr: 'Charte d\'orientation des réseaux civiques et universitaires mondiaux de solidarité juridique',
      es: 'Carta de directrices para las redes cívicas y académicas de solidaridad jurídica y documental'
    },
    source: 'Global Community Secretariat Coordination Desk',
    date: '14 نوفمبر 2025',
    language: 'AR / EN / FR / ES',
    type: 'Civic Charter / ميثاق مجتمعي',
    summary: {
      ar: 'إطار عمل مؤسسي ينظم آليات التنسيق المشترك، وتبادل الأبحاث، والتوعية بالحقوق الأساسية في الجامعات والمنتديات الدولية في إطار القوانين المحلية والدولية.',
      en: 'An institutional framework regulating cross-border civic collaboration, academic exchange, and rights awareness within national and international statutory boundaries.',
      fr: 'Cadre éthique et opérationnel organisant la coopération internationale entre collectifs universitaires et organisations non gouvernementales.',
      es: 'Marco ético e institucional para la coordinación entre colectivos académicos y organizaciones ciudadanas conforme a los ordenamientos legales.'
    },
    citation: 'General Secretariat of the Global Community, Guiding Charter for International Civic Coordination, Doc GS-CIV/2025/11.',
    officialUrl: 'https://palestine-global-community.org/charters/civic',
    pages: 14,
    tags: ['Civil Society', 'Ethics', 'Academic Solidarity', 'Coalition']
  }
];

export const eventsData: GlobalEvent[] = [
  {
    id: 'ev-01',
    title: {
      ar: 'الندوة الدولية: مخرجات محكمة العدل الدولية وآفاق العدالة الدولية لفلسطين',
      en: 'International Symposium: ICJ Findings & Horizons of Multilateral Justice for Palestine',
      fr: 'Symposium International : Les conclusions de la CIJ et l\'avenir de la justice multilatérale',
      es: 'Simposio Internacional: Conclusiones de la CIJ y horizontes de justicia para Palestina'
    },
    date: '28 سبتمبر 2026',
    time: '15:00 UTC (18:00 القدس)',
    format: 'online',
    location: { ar: 'عبر المنصة الرقمية الرسمية (Online)', en: 'Official Digital Platform (Online)', fr: 'Plateforme Numérique Officielle (En ligne)', es: 'Plataforma Digital Oficial (En línea)' },
    country: 'International / Online',
    language: 'English / العربية (ترجمة فورية)',
    description: {
      ar: 'حلقة نقاشية رفيعة المستوى تضم أساتذة في القانون الدولي وباحثين في العلاقات الدولية لمناقشة التزامات الدول الثالثة والأطر الإجرائية في الجمعية العامة للأمم المتحدة.',
      en: 'High-level panel featuring international law jurists and multilateral scholars examining third-state responsibilities and General Assembly follow-up mechanisms.',
      fr: 'Table ronde de haut niveau réunissant des juristes internationaux pour analyser les implications concrètes des décisions des juridictions de La Haye.',
      es: 'Mesa de debate con juristas especializados en derecho internacional para examinar la aplicación práctica de las resoluciones multilaterales.'
    },
    category: 'International Law',
    speakers: ['Prof. Elena V., International Law Chair', 'Dr. Tariq M., Diplomatic Historian', 'Adv. Sarah L., Human Rights Counsel'],
    rsvpCount: 642
  },
  {
    id: 'ev-02',
    title: {
      ar: 'مؤتمر جنيف: التوثيق الأرشيفي وحماية التراث التاريخي والعمراني لدولة فلسطين',
      en: 'Geneva Colloquium: Archival Documentation & Preservation of Historical Heritage in Palestine',
      fr: 'Colloque de Genève : Sauvegarde des archives et du patrimoine architectural en Palestine',
      es: 'Coloquio de Ginebra: Documentación archivística y salvaguarda del patrimonio en Palestina'
    },
    date: '14 أكتوبر 2026',
    time: '10:00 - 17:30 CET',
    format: 'hybrid',
    location: { ar: 'جنيف، سويسرا + بث افتراضي مباشر', en: 'Geneva, Switzerland + Interactive Webcast', fr: 'Genève, Suisse + Retransmission Web', es: 'Ginebra, Suiza + Transmisión en directo' },
    country: 'Switzerland',
    language: 'French / English / العربية',
    description: {
      ar: 'جلسات علمية تجمع مسؤولي الأرشيف والمؤرخين لمراجعة مشاريع الرقمنة الشاملة للخرائط، والوثائق العثمانية والانتدابية وسجلات الملكية التاريخية.',
      en: 'Scholarly gathering of archivists, cartographers, and heritage specialists reviewing comprehensive digitizing initiatives of Mandate and historic municipal registries.',
      fr: 'Rencontre académique d\'archivistes et de conservateurs consacrée aux projets de numérisation des registres cadastraux et du patrimoine.',
      es: 'Jornadas científicas dedicadas a la preservación y digitalización de censos, títulos de propiedad y fondos históricos documentales.'
    },
    category: 'History & Archive',
    speakers: ['Dr. Marc D., Archival Science', 'Dr. Haneen R., Mediterranean Cultural Heritage', 'Prof. Arthur S., Cartographic Historian'],
    rsvpCount: 420
  },
  {
    id: 'ev-03',
    title: {
      ar: 'الملتقى الشبابي الدولي: جسور المعرفة الرقمية والمشاركة المدنية عبر القارات',
      en: 'Global Youth Forum: Digital Knowledge Bridges & Civic Engagement Across Continents',
      fr: 'Forum Mondial de la Jeunesse : Passerelles numériques du savoir et engagement civique',
      es: 'Foro Juvenil Global: Puentes de conocimiento digital y participación cívica'
    },
    date: '05 نوفمبر 2026',
    time: '14:00 UTC',
    format: 'online',
    location: { ar: 'مساحة الحوار التفاعلي (Online)', en: 'Interactive Digital Assembly (Online)', fr: 'Agora Numérique Interactive', es: 'Ágora Digital Interactiva' },
    country: 'International / Online',
    language: 'English / Spanish / العربية',
    description: {
      ar: 'ورش عمل يقودها مبادرون شباب وباحثون في الإعلام الرقمي لتبادل أفضل الممارسات في إيصال الحقائق الموثقة وتطوير أدوات المعرفة المفتوحة.',
      en: 'Workshops led by young researchers and media practitioners sharing verified methodologies for open knowledge exchange and institutional advocacy.',
      fr: 'Ateliers collaboratifs animés par de jeunes chercheurs autour de la diffusion rigoureuse des données factuelles et des ressources éducatives.',
      es: 'Talleres prácticos sobre comunicación basada en evidencias y desarrollo de herramientas de acceso libre al conocimiento.'
    },
    category: 'Civil Society & Youth',
    speakers: ['Layla K., Digital Ethics Fellow', 'Mateo G., Latin American Civic Network', 'Amara B., Pan-African Youth Coalition'],
    rsvpCount: 885
  }
];

export const partnersData: PartnerInstitution[] = [
  {
    id: 'part-01',
    name: { ar: 'المعهد الدولي للقانون العام وحقوق الإنسان', en: 'International Institute of Public Law & Human Rights', fr: 'Institut International de Droit Public', es: 'Instituto Internacional de Derecho Público' },
    category: 'legal',
    country: 'Switzerland / International',
    accreditedYear: 2024,
    description: {
      ar: 'مؤسسة أكاديمية وقانونية مستقلة متخصصة في بحوث القضاء الدولي ودراسات معاهدات جنيف.',
      en: 'An independent legal think tank dedicated to international tribunal jurisprudence and Geneva Convention studies.',
      fr: 'Institut de recherche spécialisé dans la jurisprudence des cours internationales.',
      es: 'Entidad de investigación jurídica enfocada en tribunales multilaterales.'
    },
    focusArea: 'International Adjudication & Treaty Law'
  },
  {
    id: 'part-02',
    name: { ar: 'مركز دراسات المتوسط والشرق الأوسط المقارنة', en: 'Center for Mediterranean & Middle East Studies', fr: 'Centre d\'Études Méditerranéennes', es: 'Centro de Estudios Mediterráneos' },
    category: 'research_center',
    country: 'Spain',
    accreditedYear: 2024,
    description: {
      ar: 'مركز بحثي جامعي يعنى بالتوثيق التاريخي، والعلاقات الدبلوماسية، والتبادل الثقافي بين ضفتي البحر المتوسط.',
      en: 'University research institute focused on historical diplomacy and Euro-Mediterranean relations.',
      fr: 'Centre universitaire dédié à l\'histoire diplomatique et aux relations euro-méditerranéennes.',
      es: 'Centro universitario dedicado a la historia diplomática y las relaciones multilaterales.'
    },
    focusArea: 'Diplomatic History & Regional Treaties'
  },
  {
    id: 'part-03',
    name: { ar: 'التحالف الأكاديمي الدولي لأرشيفات فلسطين', en: 'International Academic Consortium for Palestine Archives', fr: 'Consortium Universitaire pour les Archives de Palestine', es: 'Consorcio Académico para los Archivos de Palestina' },
    category: 'university',
    country: 'Ireland / United Kingdom / Palestine',
    accreditedYear: 2025,
    description: {
      ar: 'ائتلاف يضم باحثين من عدة جامعات لرقمنة وفهرسة وثائق الملكية والخرائط التاريخية والمخطوطات.',
      en: 'Inter-university alliance collaborating on preserving and open-sourcing historical manuscripts and cartography.',
      fr: 'Réseau interuniversitaire de numérisation de manuscrits et de cartographie historique.',
      es: 'Alianza interuniversitaria para la digitalización y acceso abierto a fondos cartográficos.'
    },
    focusArea: 'Digital Preservation & Cartography'
  },
  {
    id: 'part-04',
    name: { ar: 'الشبكة العالمية للمحامين والعيادات الحقوقية', en: 'Global Lawyers Network for International Legality', fr: 'Réseau Mondial des Juristes pour la Légalité Internationale', es: 'Red Global de Juristas por la Legalidad Internacional' },
    category: 'legal',
    country: 'South Africa / Netherlands',
    accreditedYear: 2024,
    description: {
      ar: 'شبكة مهنية تضم محامين وباحثين في القانون الجنائي الدولي لتقديم أوراق الموقف القانوني والمذكرات الاستشارية.',
      en: 'Professional network of jurists preparing amicus curiae briefs and academic advisory submissions.',
      fr: 'Réseau professionnel d\'avocats élaborant des mémoires juridiques et des analyses doctrinales.',
      es: 'Red profesional de juristas dedicada a la elaboración de informes y dictámenes jurídicos.'
    },
    focusArea: 'IHL Enforcement & Legal Submissions'
  }
];

export const leadershipData: LeaderProfile[] = [
  {
    id: 'lead-01',
    name: { ar: 'أمانة المؤتمر والمكتب التنفيذي للأمين العام', en: 'Executive Office of the Secretary-General', fr: 'Bureau Exécutif du Secrétaire Général', es: 'Oficina Ejecutiva de la Secretaría General' },
    role: { ar: 'القيادة المؤسسية والتنسيق الدولي العام', en: 'Institutional Leadership & Global Coordination', fr: 'Direction Institutionnelle & Coordination Générale', es: 'Dirección Institucional y Coordinación General' },
    category: 'secretary_general',
    bio: {
      ar: 'هيئة إدارية عليا تضم ممثلين أكاديميين وخبراء في الحوكمة الدبلوماسية والقانونية تسهر على ضمان حيادية ومؤسسية المنصة ورسالتها الدولية.',
      en: 'High collegiate administrative body ensuring the institutional rigor, neutrality, and international compliance of the Secretariat.',
      fr: 'Organe collégial supérieur garantissant l\'indépendance, la rigueur et le rayonnement international du Secrétariat.',
      es: 'Órgano colegiado superior que vela por el rigor institucional y la proyección internacional de la plataforma.'
    },
    jurisdiction: { ar: 'الإشراف العام وتنسيق المبادرات العالمية', en: 'General Oversight & Global Governance', fr: 'Supervision générale et gouvernance', es: 'Supervisión general y gobernanza' },
    appointedDate: '2024'
  },
  {
    id: 'lead-02',
    name: { ar: 'اللجنة الاستشارية للقانون الدولي والمعاهدات', en: 'Advisory Committee on International Law & Treaties', fr: 'Comité Consultatif de Droit International', es: 'Comité Asesor de Derecho Internacional' },
    role: { ar: 'التدقيق القانوني ومراجعة الوثائق المرجعية', en: 'Legal Auditing & Archival Verification', fr: 'Audit Juridique et Vérification Documentaire', es: 'Auditoría Jurídica y Verificación Documental' },
    category: 'committee',
    bio: {
      ar: 'تضم نخبة من أساتذة القانون الدولي الإنساني من مختلف القارات لمراجعة كل وثيقة ومذكرة قبل إيداعها في مركز المعرفة الرسمي.',
      en: 'Comprises distinguished scholars of international humanitarian law overseeing document authenticity and citation standards.',
      fr: 'Composé de professeurs de droit international veillant à l\'authenticité et à la rigueur des pièces archivées.',
      es: 'Integrado por especialistas en derecho internacional humanitario que supervisan la idoneidad documental.'
    },
    jurisdiction: { ar: 'الأرشفة القانونية ومصادقة المذكرات', en: 'Legal Archiving & Advisory Briefs', fr: 'Validation des dossiers juridiques', es: 'Validación de expedientes jurídicos' },
    appointedDate: '2024'
  },
  {
    id: 'lead-03',
    name: { ar: 'لجنة التوثيق التاريخي والأرشيف الرقمي', en: 'Committee on Historical Documentation & Digital Archives', fr: 'Comité de Documentation Historique & Archives', es: 'Comité de Documentación Histórica y Archivos' },
    role: { ar: 'صيانة الوثائق والخرائط التاريخية', en: 'Preservation of Maps & Primary Records', fr: 'Conservation des cartes et sources primaires', es: 'Conservación de fondos cartográficos' },
    category: 'committee',
    bio: {
      ar: 'فريق متخصص في علوم الأرشيف والرقمنة والمصادر التاريخية المعاصرة لضمان دقة المعطيات الجغرافية والديموغرافية التاريخية.',
      en: 'Specialized archivists and historians ensuring forensic preservation and public availability of authentic primary records.',
      fr: 'Équipe d\'archivistes et d\'historiens dédiée à la numérisation certifiée des sources primaires.',
      es: 'Especialistas en archivística e historia dedicados a la preservación técnica de testimonios documentales.'
    },
    jurisdiction: { ar: 'إدارة مركز المعرفة والخرائط', en: 'Knowledge Repository Management', fr: 'Gestion du centre de ressources', es: 'Gestión del centro documental' },
    appointedDate: '2024'
  },
  {
    id: 'lead-04',
    name: { ar: 'مكتب التنسيق المدني وشؤون العضوية العالمية', en: 'Desk for Civic Coordination & Global Membership', fr: 'Pôle de Coordination Civique & Adhésions', es: 'Área de Coordinación Cívica y Membresías' },
    role: { ar: 'إدارة سجل الأعضاء وشبكة المبادرات', en: 'Membership Registry & Civic Partnerships', fr: 'Gestion du registre et des initiatives citoyennes', es: 'Gestión del registro y partenariados' },
    category: 'executive',
    bio: {
      ar: 'مسؤول عن تيسير انضمام الأعضاء وإصدار البطاقات الرقمية، والتنسيق مع الجمعيات والمبادرات المدنية حول العالم.',
      en: 'Manages verified membership issuances, non-governmental credentials, and civic coordination worldwide.',
      fr: 'Assure le suivi des adhésions, l\'attribution des identifiants membres et les relations avec la société civile.',
      es: 'Supervisa el registro de afiliados, la expedición de credenciales y la vinculación cívica.'
    },
    jurisdiction: { ar: 'شؤون المنتسبين والمشاريع المدنية', en: 'Global Member Services & Civic Programs', fr: 'Services aux membres et programmes civiques', es: 'Atención a afiliados y programas cívicos' },
    appointedDate: '2025'
  }
];

export const palestineMilestones = [
  {
    year: '1947',
    title: { ar: 'قرار التقسيم 181 الصادر عن الجمعية العامة للأمم المتحدة', en: 'UN General Assembly Partition Resolution 181', fr: 'Résolution 181 de l\'Assemblée Générale de l\'ONU', es: 'Resolución 181 de la Asamblea General de la ONU' },
    desc: { ar: 'قرار غير ملزم أوصى بتقسيم فلسطين الانتدابية إلى دولتين مع وضع خاص لمدينة القدس الشريف تحت وصاية دولية.', en: 'UN recommendation recommending partition with a special international regime (corpus separatum) for Jerusalem.', fr: 'Recommandation préconisant un régime international spécial pour Jérusalem.', es: 'Recomendación de partición con régimen internacional especial para Jerusalén.' }
  },
  {
    year: '1948',
    title: { ar: 'النكبة الفلسطينية وتهجير أكثر من 750,000 مواطن وقرار 194', en: 'The Nakba & UNGA Resolution 194 on the Right of Return', fr: 'La Nakba et la résolution 194 sur le droit au retour', es: 'La Nakba y la resolución 194 sobre el derecho al retorno' },
    desc: { ar: 'اقتلاع وتهجير غالبية الشعب الفلسطيني وهدم مئات القرى، وصدور القرار 194 المؤكد لحق اللاجئين في العودة إلى ديارهم والتعويض.', en: 'Displacement of over 750,000 Palestinians and adoption of Resolution 194 resolving that refugees wishing to return to their homes should be permitted to do so.', fr: 'Exode forcé et adoption de la résolution 194 consacrant le droit au retour.', es: 'Éxodo forzoso y adopción de la resolución 194 que reconoce el derecho al retorno.' }
  },
  {
    year: '1967',
    title: { ar: 'احتلال الضفة الغربية والقدس الشرقية وقطاع غزة — قرار 242', en: '1967 Military Occupation & UNSC Resolution 242', fr: 'Occupation militaire de 1967 et Résolution 242 du Conseil de Sécurité', es: 'Ocupación militar de 1967 y Resolución 242 del Consejo de Seguridad' },
    desc: { ar: 'احتلال ما تبقى من فلسطين التاريخية، وتأكيد مجلس الأمن على مبدأ عدم جواز الاستيلاء على الأراضي عن طريق الحرب.', en: 'Occupation of the remaining Palestinian territory; UNSC emphasized the inadmissibility of the acquisition of territory by war.', fr: 'Occupation du reste de la Palestine historique ; réaffirmation de l\'inadmissibilité de l\'acquisition de territoire par la guerre.', es: 'Ocupación del territorio restante; reafirmación de la inadmisibilidad de la adquisición de territorio por la fuerza.' }
  },
  {
    year: '1988',
    title: { ar: 'إعلان الاستقلال في الجزائر واعتراف عشرات الدول', en: 'Declaration of Independence in Algiers & Wave of Recognition', fr: 'Déclaration d\'Indépendance à Alger et vague de reconnaissance', es: 'Declaración de Independencia en Argel y reconocimiento internacional' },
    desc: { ar: 'إعلان المجلس الوطني الفلسطيني قيام دولة فلسطين، واعتراف أكثر من 80 دولة خلال الأسابيع الأولى من الإعلان.', en: 'Proclamation of the State of Palestine by the Palestinian National Council, recognized by over 80 nations in following weeks.', fr: 'Proclamation de l\'État de Palestine par le Conseil National Palestinien, reconnu immédiatement par plus de 80 pays.', es: 'Proclamación del Estado de Palestina reconocido de inmediato por más de 80 Estados.' }
  },
  {
    year: '2004',
    title: { ar: 'الرأي الاستشاري لمحكمة العدل الدولية بشأن جدار الفصل', en: 'ICJ Advisory Opinion on the Legal Consequences of the Wall', fr: 'Avis consultatif de la CIJ sur la construction du mur', es: 'Dictamen de la CIJ sobre la construcción del muro' },
    desc: { ar: 'قضت المحكمة بعدم قانونية تشييد الجدار في الأرض الفلسطينية المحتلة بما فيها القدس الشرقية ووجوب إزالته والتعويض عن الأضرار.', en: 'The ICJ ruled the construction of the wall inside occupied Palestinian territory to be contrary to international law.', fr: 'La CIJ juge la construction du mur illégale et ordonne son démantèlement.', es: 'La CIJ declara ilícita la edificación del muro y exige su desmantelamiento.' }
  },
  {
    year: '2012',
    title: { ar: 'ترقية مكانة فلسطين إلى دولة مراقب غير عضو في الأمم المتحدة', en: 'Palestine Elevated to Non-Member Observer State Status at UN', fr: 'Élévation de la Palestine au statut d\'État observateur à l\'ONU', es: 'Elevación de Palestina a Estado observador no miembro en la ONU' },
    desc: { ar: 'تصويت تاريخي في الجمعية العامة (قرار 67/19) بأغلبية 138 صوتاً، فتح الباب للانضمام للمعاهدات الدولية والمحكمة الجنائية.', en: 'Landmark vote in UNGA Res 67/19 opening the path to accession to major multilateral treaties and the ICC.', fr: 'Vote historique ouvrant la voie à la ratification des traités internationaux.', es: 'Voto histórico que habilitó la adhesión a los tratados multilaterales y a la CPI.' }
  },
  {
    year: '2024',
    title: { ar: 'رأي محكمة العدل الدولية التاريخي بشأن عدم شرعية الاحتلال + اعترافات أوروبية', en: 'Historic ICJ Ruling on Illegality of Occupation & Further Diplomatic Recognitions', fr: 'Arrêt historique de la CIJ déclarant l\'occupation illégale et nouvelles reconnaissances', es: 'Sentencia histórica de la CIJ sobre la ilegalidad de la ocupación y nuevos reconocimientos' },
    desc: { ar: 'إعلان محكمة العدل الدولية عدم شرعية استمرار الاحتلال، وتوسيع الاعتراف الدبلوماسي الرسمي من دول أوروبية بارزة (إسبانيا، أيرلندا، النرويج).', en: 'ICJ ruled the prolonged occupation illegal under international law, coupled with formal recognitions from Spain, Ireland, Norway, and others.', fr: 'La CIJ déclare l\'occupation illicite au regard du droit international, suivie de nouvelles reconnaissances étatiques.', es: 'La CIJ dictaminó la ilicitud de la ocupación, sumándose el reconocimiento de varios Estados europeos.' }
  }
];
