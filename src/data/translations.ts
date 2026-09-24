import { Language } from '../types';

export const translations: Record<Language, {
  brand: {
    officialName: string;
    englishName: string;
    shortName: string;
    tagline: string;
    description: string;
    digitalNotice: string;
  };
  nav: {
    home: string;
    about: string;
    palestine: string;
    news: string;
    knowledge: string;
    community: string;
    civil: string;
    youth: string;
    legal_status: string;
    more: string;
    membership: string;
    transparency: string;
    leadership: string;
    dashboard: string;
    joinNow: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    exploreBtn: string;
    membershipBtn: string;
    coreConcepts: {
      world: string;
      knowledge: string;
      connection: string;
      palestine: string;
    };
  };
  why: {
    title: string;
    lead: string;
    p1: string;
    p2: string;
    pillars: {
      legal: { title: string; desc: string };
      history: { title: string; desc: string };
      research: { title: string; desc: string };
      media: { title: string; desc: string };
      civil: { title: string; desc: string };
    };
  };
  visionMission: {
    visionTitle: string;
    visionStatement: string;
    missionTitle: string;
    missionLead: string;
    points: string[];
  };
  principles: {
    title: string;
    subtitle: string;
    items: {
      transparency: { title: string; desc: string };
      knowledge: { title: string; desc: string };
      documentation: { title: string; desc: string };
      pluralism: { title: string; desc: string };
      privacy: { title: string; desc: string };
      responsibility: { title: string; desc: string };
    };
  };
  presence: {
    title: string;
    subtitle: string;
    stats: {
      countries: string;
      members: string;
      events: string;
      documents: string;
      languages: string;
    };
    realDataNotice: string;
    selectedCountry: string;
    activeMembers: string;
    activeEvents: string;
    partnerOrgs: string;
    viewRegion: string;
  };
  news: {
    title: string;
    subtitle: string;
    categories: {
      all: string;
      statement: string;
      news: string;
      report: string;
      event: string;
      document: string;
      research: string;
    };
    readMore: string;
    officialStatement: string;
    source: string;
    close: string;
    officialRef: string;
  };
  knowledge: {
    title: string;
    subtitle: string;
    desc: string;
    searchPlaceholder: string;
    categories: {
      all: string;
      international_law: string;
      history: string;
      research: string;
      civil_society: string;
    };
    accession: string;
    source: string;
    date: string;
    type: string;
    officialLink: string;
    downloadBrief: string;
    citation: string;
    copied: string;
  };
  palestine: {
    title: string;
    subtitle: string;
    nav: {
      history: string;
      status: string;
      recognition: string;
      unStatus: string;
      icj: string;
      treaties: string;
      maps: string;
    };
    stats: {
      recognitionCount: string;
      unStatusLabel: string;
      independenceYear: string;
      treatiesCount: string;
    };
  };
  membership: {
    title: string;
    desc: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    fullName: string;
    email: string;
    country: string;
    city: string;
    preferredLanguage: string;
    ageGroup: string;
    interestsTitle: string;
    interestsList: string[];
    prefsTitle: string;
    prefsList: string[];
    submitBtn: string;
    nextBtn: string;
    prevBtn: string;
    alreadyMember: string;
    loginBtn: string;
    successMessage: string;
  };
  dashboard: {
    welcome: string;
    cardBadge: string;
    memberId: string;
    country: string;
    joinedDate: string;
    disclaimer: string;
    downloadCard: string;
    printCard: string;
    savedDocs: string;
    upcomingEvents: string;
    groups: string;
    settings: string;
    logout: string;
    noSavedDocs: string;
    noUpcomingEvents: string;
  };
  civil: {
    title: string;
    eventsTab: string;
    initiativesTab: string;
    resourcesTab: string;
    participateTab: string;
    searchEvents: string;
    filterCountry: string;
    filterLanguage: string;
    filterDate: string;
    filterType: string;
    detailsBtn: string;
    rsvpBtn: string;
    rsvpd: string;
  };
  partners: {
    title: string;
    lead: string;
    categories: {
      all: string;
      university: string;
      research_center: string;
      civil_society: string;
      legal: string;
      media: string;
      international_initiative: string;
    };
    formalNotice: string;
  };
  transparency: {
    title: string;
    lead: string;
    tabs: {
      structure: string;
      annualReports: string;
      financialReports: string;
      funding: string;
      conflictPolicy: string;
      privacyPolicy: string;
      membershipTerms: string;
      codeOfConduct: string;
    };
  };
  leadership: {
    title: string;
    lead: string;
    categories: {
      all: string;
      secretary_general: string;
      executive: string;
      committee: string;
      advisor: string;
    };
  };
  footer: {
    quickLinks: string;
    sections: string;
    legalNotice: string;
    rights: string;
    subscribeNewsletter: string;
    subscribeBtn: string;
    emailPlaceholder: string;
    subscribedSuccess: string;
  };
}> = {
  ar: {
    brand: {
      officialName: "الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين",
      englishName: "General Secretariat of the Global Community for the State of Palestine",
      shortName: "الأمانة العامة — من أجل دولة فلسطين",
      tagline: "من شعوب العالم إلى دولة فلسطين",
      description: "منصة دولية تجمع الأفراد والمؤسسات والمجتمع المدني والباحثين من مختلف دول العالم حول المعرفة والتواصل والمشاركة المدنية المرتبطة بقضية دولة فلسطين.",
      digitalNotice: "عضوية رقمية — غير حكومية وغير رسمية"
    },
    nav: {
      home: "الرئيسية",
      about: "عن الأمانة",
      palestine: "دولة فلسطين",
      news: "الأخبار والبيانات",
      knowledge: "مركز المعرفة",
      community: "المجتمع العالمي",
      civil: "المشاركة المدنية",
      youth: "الشباب والباحثون",
      legal_status: "الوضع القانوني",
      more: "المزيد",
      membership: "الانتساب",
      transparency: "الشفافية",
      leadership: "القيادة",
      dashboard: "لوحة العضو",
      joinNow: "طلب الانتساب"
    },
    hero: {
      tagline: "من شعوب العالم إلى دولة فلسطين",
      title: "الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين",
      description: "منصة دولية للتواصل والمعرفة والتوثيق والمشاركة المدنية حول قضية دولة فلسطين. مساحة مؤسسية موحدة تجمع الشعوب والباحثين والمؤسسات من كل قارات العالم.",
      exploreBtn: "التعرف على الأمانة",
      membershipBtn: "الانتساب إلى المنصة",
      coreConcepts: {
        world: "العالم",
        knowledge: "المعرفة",
        connection: "التواصل",
        palestine: "دولة فلسطين"
      }
    },
    why: {
      title: "لماذا الأمانة العامة؟",
      lead: "توجد حول العالم مجتمعات ومؤسسات وأفراد يتابعون قضية فلسطين من زوايا متعددة: قانونية، تاريخية، أكاديمية، إعلامية، إنسانية ومدنية.",
      p1: "وتأتي الأمانة العامة بوصفها منصة تهدف إلى تنظيم هذا الحضور المتنوع في مساحة رقمية واحدة، توفر المعلومات والوثائق والبيانات، وتتيح التواصل بين المشاركين من دول مختلفة.",
      p2: "لا تقتصر المنصة على الأخبار، بل تسعى إلى إنشاء أرشيف معرفي ومساحة تواصل دولية ومنظومة عضوية وفعاليات ومصادر موثقة يمكن الرجوع إليها بدقة ومسؤولية.",
      pillars: {
        legal: { title: "المسار القانوني والدولي", desc: "توثيق قرارات الأمم المتحدة، وأحكام محكمة العدل الدولية، ومذكرات القانون الدولي الإنساني." },
        history: { title: "الأرشيف والتوثيق التاريخي", desc: "الحفاظ على الوثائق والخرائط والمصادر الأصلية التي توثق الحقوق التاريخية والجغرافية." },
        research: { title: "البحث الأكاديمي الرصين", desc: "دعم ونشر الدراسات المحكمة بالتعاون مع كليات القانون والعلوم السياسية ومراكز الأبحاث." },
        media: { title: "الإعلام المعرفي والموضوعي", desc: "صياغة خطاب إعلامي متعدد اللغات يستند إلى الحقائق والقرارات الصادرة عن المؤسسات الدولية." },
        civil: { title: "المشاركة المدنية الدولية", desc: "تمكين المجتمع المدني والمبادرات التطوعية من التنسيق المشترك عبر الحدود." }
      }
    },
    visionMission: {
      visionTitle: "رؤية واحدة لمساحة عالمية",
      visionStatement: "أن تصبح الأمانة العامة منصة دولية منظمة تجمع المعرفة والتواصل والتوثيق والمشاركة المدنية حول قضية دولة فلسطين، وتتيح للأفراد والمؤسسات من مختلف الدول الوصول إلى المعلومات والمصادر والتواصل ضمن إطار مؤسسي واضح ومسؤول.",
      missionTitle: "الرسالة والأهداف الاستراتيجية",
      missionLead: "تسعى الأمانة العامة إلى إنشاء بنية دولية رقمية ومؤسسية تجمع بين المعرفة والتواصل والتوثيق والمشاركة المدنية عبر المرتكزات التالية:",
      points: [
        "توفير منصة متعددة اللغات للمعلومات والوثائق المتعلقة بدولة فلسطين.",
        "تنظيم البيانات والمصادر الدولية ذات الصلة وإتاحتها للجمهور والباحثين.",
        "إنشاء مساحة للتواصل المنسق بين الأفراد والمؤسسات والمجتمع المدني من مختلف الدول.",
        "دعم البحث والدراسة في القضايا التاريخية والقانونية والسياسية المرتبطة بفلسطين.",
        "نشر البيانات والمواقف الرسمية للأمانة العامة بصورة واضحة وموثقة ومؤرخة.",
        "توثيق المبادرات والفعاليات والأنشطة المدنية المستمرة في مختلف العواصم.",
        "تعزيز الوصول المباشر إلى المصادر الدولية الأصلية والاتفاقيات الدولية.",
        "تطوير شبكة عالمية مستدامة للمعرفة والحوار الدولي البناء."
      ]
    },
    principles: {
      title: "مبادئنا المؤسسية",
      subtitle: "ستة ركائز أخلاقية وإدارية تحكم جميع أعمال المنصة والمجتمع الدولي المرتبط بها",
      items: {
        transparency: { title: "الشفافية", desc: "نشر المعلومات التنظيمية والمالية وإتاحتها للجمهور وفق السياسات المعتمدة والمعايير المهنية." },
        knowledge: { title: "المعرفة", desc: "الاعتماد الحصري على المعلومات والمصادر القابلة للتحقق والبيانات الصادرة عن الجهات المختصة." },
        documentation: { title: "التوثيق", desc: "الرجوع الدائم إلى الوثائق والمصادر الأصلية والمعاهدات المؤرشفة بأرقام إيداع موثقة." },
        pluralism: { title: "التعددية", desc: "إتاحة مساحة رحبة لمشاركين ومؤسسات من خلفيات ثقافية ولغوية وأكاديمية متمايزة." },
        privacy: { title: "الخصوصية", desc: "حماية بيانات المنتسبين وفق أقصى معايير الأمان وسياسة واضحة للخصوصية وحماية البيانات الشخصية." },
        responsibility: { title: "المسؤولية", desc: "التمييز الصارم بين البيانات الرسمية الصادرة، والمحتوى التحريري، والمصادر الخارجية." }
      }
    },
    presence: {
      title: "الحضور العالمي",
      subtitle: "مجتمع عالمي متعدد الدول واللغات يرتبط بقضية واحدة",
      stats: {
        countries: "دولة",
        members: "عضو مسجل",
        events: "فعالية دولية",
        documents: "وثيقة ومصدر",
        languages: "لغات رسمية"
      },
      realDataNotice: "إحصائيات متصلة ومحدثة وفق السجلات المعتمدة للمنصة",
      selectedCountry: "بيانات الدولة",
      activeMembers: "عضو منتسب",
      activeEvents: "فعاليات منظمة",
      partnerOrgs: "مؤسسات وهيئات شريكة",
      viewRegion: "استعراض الأنشطة الإقليمية"
    },
    news: {
      title: "آخر البيانات والأخبار",
      subtitle: "متابعة البيانات الرسمية، التحليلات، وإعلانات الفعاليات الدولية",
      categories: {
        all: "الكل",
        statement: "بيانات الأمانة",
        news: "أخبار",
        report: "تقارير",
        event: "فعاليات",
        document: "وثائق",
        research: "أبحاث"
      },
      readMore: "قراءة النص الكامل",
      officialStatement: "بيان رسمي معتمد",
      source: "المصدر",
      close: "إغلاق",
      officialRef: "المرجع الإداري"
    },
    knowledge: {
      title: "مركز المعرفة والوثائق",
      subtitle: "نعرف من المصادر",
      desc: "مكتبة رقمية متخصصة متعددة اللغات تجمع مصادر ووثائق ومواد معرفية مرتبطة بفلسطين والقانون الدولي والتاريخ والسياسة والعلاقات الدولية.",
      searchPlaceholder: "ابحث في الوثائق، القرارات الأممية، المعاهدات، والدراسات...",
      categories: {
        all: "جميع الوثائق",
        international_law: "القانون الدولي والأمم المتحدة",
        history: "الأرشيف والوثائق التاريخية",
        research: "الأبحاث والدراسات الأكاديمية",
        civil_society: "وثائق المجتمع المدني والمبادرات"
      },
      accession: "رقم الإيداع",
      source: "الجهة المصدرة",
      date: "تاريخ الوثيقة",
      type: "التصنيف",
      officialLink: "الرابط الأصلي للجهة",
      downloadBrief: "تحميل الملخص التوثيقي",
      citation: "نسخ الاقتباس الأكاديمي",
      copied: "تم نسخ الاقتباس"
    },
    palestine: {
      title: "دولة فلسطين — الملف الشامل",
      subtitle: "التوثيق القانوني والتاريخي والدبلوماسي لمكانة دولة فلسطين في المنظومة الدولية",
      nav: {
        history: "نبذة تاريخية",
        status: "الوضع الدولي",
        recognition: "الاعتراف الدولي",
        unStatus: "الأمم المتحدة",
        icj: "محكمة العدل الدولية",
        treaties: "الاتفاقيات والمعاهدات",
        maps: "الخرائط والوثائق"
      },
      stats: {
        recognitionCount: "146+ دولة تعترف رسمياً بدولة فلسطين",
        unStatusLabel: "دولة مراقب غير عضو (قرار الجمعية العامة 19/67)",
        independenceYear: "إعلان الاستقلال: الجزائر 1988",
        treatiesCount: "أكثر من 110 معاهدة واتفاقية دولية تم الانضمام إليها"
      }
    },
    membership: {
      title: "الانتساب إلى المجتمع العالمي",
      desc: "يتيح الانتساب إنشاء حساب رسمي على منصة الأمانة العامة والوصول إلى الخدمات والمحتوى والفعاليات المخصصة للأعضاء والمشاركة في الشبكات الدولية.",
      step1Title: "المرحلة الأولى: المعلومات الأساسية",
      step2Title: "المرحلة الثانية: مجالات الاهتمام والتخصص",
      step3Title: "المرحلة الثالثة: تفضيلات التواصل والاشتراك",
      fullName: "الاسم الكامل (كما يظهر في البطاقة)",
      email: "البريد الإلكتروني المهني / الشخصي",
      country: "دولة الإقامة",
      city: "المدينة",
      preferredLanguage: "اللغة المفضلة للتواصل",
      ageGroup: "الفئة العمرية",
      interestsTitle: "حدد مجالات اهتمامك ومساهمتك (يمكن اختيار أكثر من مجال):",
      interestsList: [
        "القانون الدولي والمحاكم الدولية",
        "التاريخ والتوثيق الأرشيفي",
        "البحث الأكاديمي والسياسات",
        "الإعلام والنشر الرقمي",
        "الترجمة والتعريب اللغوي",
        "التكنولوجيا والمنصات الرقمية",
        "التصميم والمحتوى البصري",
        "التعليم والمناهج",
        "المجتمع المدني وحقوق الإنسان",
        "تنظيم المؤتمرات والفعاليات الدولية",
        "مبادرات التضامن الثقافي"
      ],
      prefsTitle: "المواد والنشرات التي ترغب باستلامها دورياً:",
      prefsList: [
        "البيانات الرسمية للأمانة العامة",
        "الملخصات والتقارير الإخبارية",
        "الدراسات والأوراق القانونية",
        "دعوات الفعاليات والندوات الدولية",
        "النشرة الشهرية للأمانة العامة"
      ],
      submitBtn: "إرسال طلب الانتساب وإصدار البطاقة",
      nextBtn: "المتابعة إلى المرحلة التالية",
      prevBtn: "الرجوع للمرحلة السابقة",
      alreadyMember: "هل أنت منتسب بالفعل؟",
      loginBtn: "الدخول إلى لوحة العضو",
      successMessage: "تم تأكيد طلب الانتساب بنجاح وإصدار بطاقة العضوية الرقمية."
    },
    dashboard: {
      welcome: "مرحباً بك في المجتمع العالمي",
      cardBadge: "بطاقة عضوية رقمية",
      memberId: "رقم العضوية",
      country: "الدولة",
      joinedDate: "تاريخ الانتساب",
      disclaimer: "عضوية رقمية — غير حكومية وغير رسمية، تتبع للأمانة العامة للمجتمع العالمي من أجل دولة فلسطين",
      downloadCard: "تحميل البطاقة الرقمية",
      printCard: "طباعة البطاقة",
      savedDocs: "الوثائق المحفوظة في مفكرتك",
      upcomingEvents: "الفعاليات المسجل بها",
      groups: "مجموعات العمل المتخصصة",
      settings: "إعدادات الحساب والخصوصية",
      logout: "تسجيل الخروج",
      noSavedDocs: "لم تقم بحفظ أي وثائق بعد من مركز المعرفة.",
      noUpcomingEvents: "لم تسجل بعد في أي فعاليات قادمة."
    },
    civil: {
      title: "مركز المشاركة المدنية",
      eventsTab: "الفعاليات والمؤتمرات",
      initiativesTab: "المبادرات المسجلة",
      resourcesTab: "الموارد والأدلة المتاحة",
      participateTab: "أطر المشاركة القانونية",
      searchEvents: "البحث في الندوات والمؤتمرات الدولية...",
      filterCountry: "الدولة",
      filterLanguage: "اللغة",
      filterDate: "التاريخ",
      filterType: "نوع الحضور",
      detailsBtn: "عرض التفاصيل",
      rsvpBtn: "تأكيد الحضور (RSVP)",
      rsvpd: "تم تسجيل الحضور"
    },
    partners: {
      title: "شبكة المؤسسات والشركاء",
      lead: "تتعاون الأمانة العامة، وفق الأطر والسياسات المعتمدة، مع مؤسسات وباحثين ومبادرات ومنظمات من مجالات متعددة.",
      categories: {
        all: "جميع الشركاء",
        university: "الجامعات والكليات",
        research_center: "مراكز الأبحاث والدراسات",
        civil_society: "مؤسسات المجتمع المدني",
        legal: "الهيئات القانونية والمحامين",
        media: "المؤسسات الإعلامية",
        international_initiative: "المبادرات والتحالفات الدولية"
      },
      formalNotice: "ملاحظة التوثيق: لا يتم إدراج أي جهة شريكة على المنصة إلا بعد توقيع بروتوكول تعاون رسمي وموثق وفق لوائح الحوكمة المعتمدة."
    },
    transparency: {
      title: "الشفافية والمساءلة",
      lead: "تؤمن الأمانة العامة بأهمية الوضوح في المعلومات المتعلقة بالهيكل التنظيمي والموارد والسياسات والإدارة. ولذلك تخصص هذه الصفحة لنشر الوثائق والتقارير والمعلومات التي يمكن إتاحتها للجمهور وفق القوانين واللوائح المعمول بها.",
      tabs: {
        structure: "الهيكل التنظيمي",
        annualReports: "التقارير السنوية",
        financialReports: "التقارير المالية والتدقيق",
        funding: "مصادر التمويل والأخلاقيات",
        conflictPolicy: "سياسة تضارب المصالح",
        privacyPolicy: "سياسة الخصوصية وحماية البيانات",
        membershipTerms: "شروط العضوية والانتساب",
        codeOfConduct: "مدونة السلوك المؤسسي"
      }
    },
    leadership: {
      title: "الأمانة العامة والقيادة المؤسسية",
      lead: "يتولى إدارة الأمانة العامة فريق متعدد التخصصات يلتزم بالمعايير المهنية واللوائح التنظيمية المعتمدة.",
      categories: {
        all: "الجميع",
        secretary_general: "الأمين العام",
        executive: "الأمانة التنفيذية",
        committee: "اللجان المتخصصة",
        advisor: "مجلس المستشارين"
      }
    },
    footer: {
      quickLinks: "روابط سريعة",
      sections: "أقسام المنصة",
      legalNotice: "الأمانة العامة للمجتمع العالمي من أجل دولة فلسطين هي منصة مجتمعية ومعرفية دولية مستقلة غير حكومية.",
      rights: "جميع الحقوق محفوظة للمجتمع العالمي — متاح للاستخدام الأكاديمي والمدني وفق شروط النشر.",
      subscribeNewsletter: "اشترك في النشرة الدورية للأمانة العامة",
      subscribeBtn: "اشتراك",
      emailPlaceholder: "أدخل بريدك الإلكتروني...",
      subscribedSuccess: "شكراً لاشتراكك في النشرة الرسمية."
    }
  },

  en: {
    brand: {
      officialName: "General Secretariat of the Global Community for the State of Palestine",
      englishName: "General Secretariat of the Global Community for the State of Palestine",
      shortName: "General Secretariat — For the State of Palestine",
      tagline: "From the peoples of the world to the State of Palestine",
      description: "An international platform connecting individuals, institutions, civil society, and researchers worldwide around knowledge, dialogue, documentation, and civic engagement.",
      digitalNotice: "Digital Membership — Non-Governmental and Non-Official"
    },
    nav: {
      home: "Home",
      about: "About",
      palestine: "State of Palestine",
      news: "Statements & News",
      knowledge: "Knowledge Center",
      community: "Global Community",
      civil: "Civic Engagement",
      youth: "Youth & Scholars",
      legal_status: "Legal Status",
      more: "More",
      membership: "Membership",
      transparency: "Transparency",
      leadership: "Leadership",
      dashboard: "Member Dashboard",
      joinNow: "Apply for Membership"
    },
    hero: {
      tagline: "From the peoples of the world to the State of Palestine",
      title: "General Secretariat of the Global Community for the State of Palestine",
      description: "An international platform for communication, knowledge, documentation, and civic engagement regarding the question of the State of Palestine.",
      exploreBtn: "Explore the Secretariat",
      membershipBtn: "Join the Global Community",
      coreConcepts: {
        world: "The World",
        knowledge: "Knowledge",
        connection: "Dialogue",
        palestine: "State of Palestine"
      }
    },
    why: {
      title: "Why the General Secretariat?",
      lead: "Across the world, diverse communities, institutions, and individuals engage with the question of Palestine through multiple perspectives: legal, historical, academic, journalistic, humanitarian, and civic.",
      p1: "The General Secretariat was established to organize this diverse global presence into a unified digital space, providing credible documentation, open data, and institutional bridges across borders.",
      p2: "It is not merely a news portal, but an authoritative knowledge repository, an international communication network, and an organized civic membership framework grounded in verifiable evidence.",
      pillars: {
        legal: { title: "International Law Framework", desc: "Systematic archival of UN resolutions, ICJ Advisory Opinions, and international humanitarian law treaties." },
        history: { title: "Historical & Cartographic Archive", desc: "Preservation of primary historical records, geopolitical maps, and archival deeds of heritage." },
        research: { title: "Rigorous Academic Research", desc: "Fostering peer-reviewed scholarship in partnership with law faculties and global policy institutes." },
        media: { title: "Fact-Based Global Discourse", desc: "Multilingual institutional communications anchored strictly in international instruments and documented facts." },
        civil: { title: "International Civic Participation", desc: "Empowering lawful grassroots and institutional cooperation across world capitals." }
      }
    },
    visionMission: {
      visionTitle: "One Vision for a Global Space",
      visionStatement: "To become an organized international platform uniting knowledge, communication, documentation, and civic engagement for the State of Palestine, enabling individuals and institutions worldwide to access authoritative information and connect within a transparent institutional framework.",
      missionTitle: "Strategic Mission & Objectives",
      missionLead: "The General Secretariat is dedicated to building a digital and institutional architecture spanning knowledge, communication, documentation, and civic action through these foundational pillars:",
      points: [
        "Provide a multilingual digital hub for documented records concerning the State of Palestine.",
        "Systematize relevant international sources and make them openly accessible to researchers and the public.",
        "Create structured channels of communication between individuals, institutions, and civil society across nations.",
        "Support academic inquiry into the legal, historical, and geopolitical dimensions of Palestine.",
        "Publish official statements and positions of the General Secretariat in an authentic, archived format.",
        "Document continuous civic initiatives, symposia, and global solidarity activities.",
        "Facilitate direct access to primary international treaties, ICJ records, and multilateral conventions.",
        "Cultivate a sustainable global network of knowledge, mutual respect, and civic collaboration."
      ]
    },
    principles: {
      title: "Our Guiding Principles",
      subtitle: "Six institutional and ethical standards governing all activities and operations",
      items: {
        transparency: { title: "Transparency", desc: "Publishing organizational and financial disclosures in compliance with approved institutional policies." },
        knowledge: { title: "Knowledge", desc: "Relying exclusively on verifiable evidence, authenticated scholarship, and competent institutional bodies." },
        documentation: { title: "Documentation", desc: "Referencing primary archival records, verified treaties, and documented international instruments." },
        pluralism: { title: "Pluralism", desc: "Providing a welcoming space for participants across diverse cultures, languages, and disciplinary fields." },
        privacy: { title: "Privacy", desc: "Protecting member data under rigorous security protocols and a transparent data governance policy." },
        responsibility: { title: "Responsibility", desc: "Strict demarcation between official institutional statements, editorial analyses, and external sources." }
      }
    },
    presence: {
      title: "Global Presence",
      subtitle: "A multilingual global community spanning continents and nations",
      stats: {
        countries: "Countries",
        members: "Registered Members",
        events: "International Events",
        documents: "Archived Documents",
        languages: "Official Languages"
      },
      realDataNotice: "Live metrics connected directly to verified community registry records",
      selectedCountry: "Country Profile",
      activeMembers: "Active Members",
      activeEvents: "Convened Events",
      partnerOrgs: "Institutional Partners",
      viewRegion: "Explore Regional Activities"
    },
    news: {
      title: "Latest Statements & News",
      subtitle: "Official communications, analytic briefs, and international event announcements",
      categories: {
        all: "All",
        statement: "Secretariat Statements",
        news: "News",
        report: "Reports",
        event: "Events",
        document: "Documents",
        research: "Research"
      },
      readMore: "Read Full Text",
      officialStatement: "Official Verified Statement",
      source: "Source",
      close: "Close",
      officialRef: "Administrative Ref"
    },
    knowledge: {
      title: "Knowledge & Documentation Center",
      subtitle: "We Know from the Sources",
      desc: "A specialized multilingual digital repository gathering authoritative documents on Palestine, international law, diplomatic history, and global relations.",
      searchPlaceholder: "Search treaties, UN resolutions, ICJ rulings, academic studies...",
      categories: {
        all: "All Documents",
        international_law: "International Law & UN",
        history: "Historical Archives & Treaties",
        research: "Academic Studies & Policy Papers",
        civil_society: "Civil Society & Global Initiatives"
      },
      accession: "Accession No.",
      source: "Issuing Authority",
      date: "Date",
      type: "Classification",
      officialLink: "Official Authority Link",
      downloadBrief: "Download Document Summary",
      citation: "Copy Academic Citation",
      copied: "Citation Copied"
    },
    palestine: {
      title: "State of Palestine — Comprehensive Dossier",
      subtitle: "Legal, historical, and multilateral documentation of Palestine's standing in international law",
      nav: {
        history: "Historical Overview",
        status: "International Status",
        recognition: "Diplomatic Recognition",
        unStatus: "United Nations Standing",
        icj: "International Court of Justice",
        treaties: "Treaties & Conventions",
        maps: "Cartography & Records"
      },
      stats: {
        recognitionCount: "146+ UN Member States Officially Recognize Palestine",
        unStatusLabel: "Non-Member Observer State (UNGA Res 19/67 & ES-10/23)",
        independenceYear: "Declaration of Independence: Algiers 1988",
        treatiesCount: "Over 110 Multilateral Treaties & Conventions Ratified"
      }
    },
    membership: {
      title: "Join the Global Community",
      desc: "Membership grants access to Secretariat resources, document archives, international working groups, and verified participation credentials.",
      step1Title: "Stage 1: Primary Information",
      step2Title: "Stage 2: Fields of Competence & Interest",
      step3Title: "Stage 3: Communication & Subscription Preferences",
      fullName: "Full Name (as displayed on credential)",
      email: "Institutional / Professional Email",
      country: "Country of Residence",
      city: "City",
      preferredLanguage: "Preferred Language",
      ageGroup: "Age Category",
      interestsTitle: "Select your areas of focus and contribution (multiple options allowed):",
      interestsList: [
        "International Law & Tribunals",
        "History & Archival Documentation",
        "Academic Research & Policy Analysis",
        "Journalism & Media Publications",
        "Translation & Linguistic Adaptation",
        "Technology & Digital Infrastructure",
        "Design & Visual Information",
        "Education & Curricula Development",
        "Civil Society & Human Rights Advocacy",
        "International Conference Organizing",
        "Cultural Diplomacy Initiatives"
      ],
      prefsTitle: "Select bulletins and updates you wish to receive:",
      prefsList: [
        "Official Statements of the Secretariat",
        "Periodic News Bulletins & Briefs",
        "Legal Studies & Academic Papers",
        "Invitations to International Symposia",
        "Monthly Institutional Newsletter"
      ],
      submitBtn: "Submit Application & Issue Digital Card",
      nextBtn: "Proceed to Next Stage",
      prevBtn: "Back to Previous Stage",
      alreadyMember: "Already a registered member?",
      loginBtn: "Access Member Dashboard",
      successMessage: "Your membership application has been approved and your digital credential issued."
    },
    dashboard: {
      welcome: "Welcome to the Global Community",
      cardBadge: "Digital Membership Credential",
      memberId: "Membership ID",
      country: "Country",
      joinedDate: "Date of Issue",
      disclaimer: "Digital Membership — Non-Governmental and Non-Official, issued under the charter of the General Secretariat of the Global Community for the State of Palestine.",
      downloadCard: "Download Credential",
      printCard: "Print Card",
      savedDocs: "Saved Document Dossiers",
      upcomingEvents: "Registered Events",
      groups: "Specialized Working Groups",
      settings: "Account & Privacy Settings",
      logout: "Sign Out",
      noSavedDocs: "You haven't saved any documents to your dossier yet.",
      noUpcomingEvents: "No upcoming event registrations."
    },
    civil: {
      title: "Civil Participation Hub",
      eventsTab: "Symposia & Conferences",
      initiativesTab: "Registered Initiatives",
      resourcesTab: "Vetted Public Resources",
      participateTab: "Civic Guidelines & Pathways",
      searchEvents: "Search international seminars and assemblies...",
      filterCountry: "Country",
      filterLanguage: "Language",
      filterDate: "Date",
      filterType: "Format",
      detailsBtn: "View Details",
      rsvpBtn: "Confirm Attendance (RSVP)",
      rsvpd: "RSVP Confirmed"
    },
    partners: {
      title: "Institutions & Partners Network",
      lead: "The General Secretariat collaborates with universities, research centers, legal associations, and civic bodies under established institutional protocols.",
      categories: {
        all: "All Partners",
        university: "Universities & Faculties",
        research_center: "Research Institutes",
        civil_society: "Civil Society Organizations",
        legal: "Legal Associations & Clinics",
        media: "Journalistic & Media Entities",
        international_initiative: "International Coalitions"
      },
      formalNotice: "Documentation Policy: No entity is recognized as an institutional partner without an executed Memorandum of Cooperation and bilateral verification."
    },
    transparency: {
      title: "Transparency & Governance",
      lead: "The Secretariat upholds rigorous public disclosure regarding organizational charts, operational resources, policies, and administrative stewardship.",
      tabs: {
        structure: "Organizational Chart",
        annualReports: "Annual Activity Reports",
        financialReports: "Financial Audits & Statements",
        funding: "Funding Ethics & Sources",
        conflictPolicy: "Conflict of Interest Policy",
        privacyPolicy: "Data Protection & Privacy (GDPR)",
        membershipTerms: "Membership Bylaws",
        codeOfConduct: "Institutional Code of Conduct"
      }
    },
    leadership: {
      title: "General Secretariat & Executive Leadership",
      lead: "Guided by a multidisciplinary council of jurists, scholars, and civil leaders committed to international law and institutional governance.",
      categories: {
        all: "All Leadership",
        secretary_general: "Secretary-General",
        executive: "Executive Secretariat",
        committee: "Standing Committees",
        advisor: "Board of Advisors"
      }
    },
    footer: {
      quickLinks: "Quick Links",
      sections: "Portal Directory",
      legalNotice: "The General Secretariat of the Global Community for the State of Palestine is an independent, non-governmental international civic and knowledge organization.",
      rights: "All rights reserved to the Global Community — Open for academic and civic study under attribution guidelines.",
      subscribeNewsletter: "Subscribe to the Official Secretariat Bulletin",
      subscribeBtn: "Subscribe",
      emailPlaceholder: "Enter your email address...",
      subscribedSuccess: "Thank you for subscribing to our official communications."
    }
  },

  fr: {
    brand: {
      officialName: "Secrétariat Général de la Communauté Mondiale pour l'État de Palestine",
      englishName: "General Secretariat of the Global Community for the State of Palestine",
      shortName: "Secrétariat Général — Pour l'État de Palestine",
      tagline: "Des peuples du monde vers l'État de Palestine",
      description: "Plateforme internationale réunissant citoyens, institutions, société civile et chercheurs autour du savoir, du dialogue et de l'action civique.",
      digitalNotice: "Adhésion Numérique — Non Gouvernementale et Non Officielle"
    },
    nav: {
      home: "Accueil",
      about: "À propos",
      palestine: "État de Palestine",
      news: "Communiqués & Actualités",
      knowledge: "Centre de Documentation",
      community: "Communauté Mondiale",
      civil: "Action Civique",
      youth: "Jeunesse & Recherche",
      legal_status: "Statut Juridique",
      more: "Plus",
      membership: "Adhésion",
      transparency: "Transparence",
      leadership: "Direction",
      dashboard: "Espace Membre",
      joinNow: "Rejoindre"
    },
    hero: {
      tagline: "Des peuples du monde vers l'État de Palestine",
      title: "Secrétariat Général de la Communauté Mondiale pour l'État de Palestine",
      description: "Une plateforme institutionnelle internationale dédiée au savoir, à la documentation juridique et à la participation citoyenne.",
      exploreBtn: "Découvrir le Secrétariat",
      membershipBtn: "Devenir Membre",
      coreConcepts: {
        world: "Le Monde",
        knowledge: "Le Savoir",
        connection: "Le Dialogue",
        palestine: "L'État de Palestine"
      }
    },
    why: {
      title: "Pourquoi le Secrétariat Général ?",
      lead: "Partout dans le monde, des citoyens, universitaires et juristes s'intéressent à la question palestinienne sous des angles multiples.",
      p1: "Le Secrétariat Général a pour mission de fédérer cette présence internationale au sein d'un espace numérique institutionnel structuré.",
      p2: "Ce portail constitue un centre de documentation rigoureux, un réseau de dialogue multilingue et un cadre associatif crédible.",
      pillars: {
        legal: { title: "Cadre Juridique International", desc: "Archivage systématique des résolutions onusiennes et des avis consultatifs de la CIJ." },
        history: { title: "Archives & Cartographie", desc: "Conservation des traités historiques, des cartes et des documents originaux." },
        research: { title: "Recherche Académique", desc: "Partenariats avec des facultés de droit et des centres d'études stratégiques." },
        media: { title: "Information Fondée sur les Faits", desc: "Communication multilingue fondée rigoureusement sur le droit international." },
        civil: { title: "Participation Citoyenne", desc: "Coordination des initiatives de solidarité et de dialogue pacifique." }
      }
    },
    visionMission: {
      visionTitle: "Une vision claire pour un espace mondial",
      visionStatement: "Devenir une plateforme internationale de référence unissant savoir, mémoire, documentation et coopération civique pour l'État de Palestine.",
      missionTitle: "Missions et Objectifs Stratégiques",
      missionLead: "Le Secrétariat Général œuvre à la mise en place d'une infrastructure multilingue solide reposant sur les axes suivants :",
      points: [
        "Fournir un portail multilingue de référence sur les questions juridiques et historiques de la Palestine.",
        "Structurer et rendre accessibles les sources et traités internationaux vérifiés.",
        "Faciliter le dialogue et l'échange entre citoyens et institutions à l'échelle internationale.",
        "Soutenir la recherche scientifique et la publication d'études doctrinales.",
        "Diffuser les déclarations officielles du Secrétariat dans un format authentifié et archivé.",
        "Recenser les initiatives citoyennes et les colloques tenus à travers le monde.",
        "Permettre l'accès direct aux textes fondamentaux de l'ONU et de la CIJ.",
        "Animer un réseau mondial durable de coopération et de respect mutuel."
      ]
    },
    principles: {
      title: "Nos Principes Fondateurs",
      subtitle: "Six exigences éthiques et institutionnelles régissant l'ensemble de nos actions",
      items: {
        transparency: { title: "Transparence", desc: "Publication intégrale des informations structurelles et des rapports d'activité." },
        knowledge: { title: "Rigueur du Savoir", desc: "Recours exclusif à des données vérifiables et à des sources institutionnelles probantes." },
        documentation: { title: "Documentation", desc: "Attachement strict aux instruments internationaux et aux pièces d'archives originales." },
        pluralism: { title: "Pluralisme", desc: "Ouverture bienveillante aux voix et contributions de toutes les nations et disciplines." },
        privacy: { title: "Confidentialité", desc: "Protection rigoureuse des données des adhérents selon les standards internationaux (RGPD)." },
        responsibility: { title: "Responsabilité", desc: "Distinction limpide entre communiqués institutionnels, travaux de recherche et tribunes." }
      }
    },
    presence: {
      title: "Présence Mondiale",
      subtitle: "Une communauté plurilingue répartie sur les cinq continents",
      stats: {
        countries: "Pays",
        members: "Membres Enregistrés",
        events: "Événements Internationaux",
        documents: "Documents Archivés",
        languages: "Langues Officielles"
      },
      realDataNotice: "Données issues directement du registre officiel des membres et partenaires",
      selectedCountry: "Profil National",
      activeMembers: "Membres Actifs",
      activeEvents: "Événements Réalisés",
      partnerOrgs: "Institutions Partenaires",
      viewRegion: "Voir les activités régionales"
    },
    news: {
      title: "Derniers Communiqués & Actualités",
      subtitle: "Notes d'analyse, prises de position et annonces de symposiums internationaux",
      categories: {
        all: "Tous",
        statement: "Communiqués du Secrétariat",
        news: "Actualités",
        report: "Rapports",
        event: "Symposiums",
        document: "Documents",
        research: "Recherches"
      },
      readMore: "Lire le texte complet",
      officialStatement: "Communiqué Officiel",
      source: "Source",
      close: "Fermer",
      officialRef: "Réf. Administrative"
    },
    knowledge: {
      title: "Centre de Connaissance et d'Archives",
      subtitle: "S'instruire aux sources",
      desc: "Bibliothèque numérique multilingue rassemblant les documents fondamentaux du droit international, de l'histoire diplomatique et des résolutions onusiennes.",
      searchPlaceholder: "Rechercher parmi les traités, résolutions de l'ONU, arrêts de la CIJ...",
      categories: {
        all: "Tous les documents",
        international_law: "Droit International & ONU",
        history: "Archives Historiques & Traités",
        research: "Études & Travaux Universitaires",
        civil_society: "Société Civile & Initiatives"
      },
      accession: "N° d'Inventaire",
      source: "Autorité Émettrice",
      date: "Date",
      type: "Classification",
      officialLink: "Lien Officiel",
      downloadBrief: "Télécharger la fiche de synthèse",
      citation: "Copier la référence académique",
      copied: "Référence copiée"
    },
    palestine: {
      title: "L'État de Palestine — Dossier Institutionnel",
      subtitle: "Documentation juridique, historique et diplomatique du statut de l'État de Palestine",
      nav: {
        history: "Aperçu Historique",
        status: "Statut International",
        recognition: "Reconnaissance Diplomatique",
        unStatus: "Statut à l'ONU",
        icj: "Cour Internationale de Justice",
        treaties: "Traités & Conventions",
        maps: "Cartes & Archives"
      },
      stats: {
        recognitionCount: "Plus de 146 États Membres de l'ONU reconnaissent l'État de Palestine",
        unStatusLabel: "État Observateur Non-Membre (Rés. 19/67 & ES-10/23)",
        independenceYear: "Déclaration d'Indépendance : Alger 1988",
        treatiesCount: "Plus de 110 traités multilatéraux ratifiés"
      }
    },
    membership: {
      title: "Adhésion à la Communauté Mondiale",
      desc: "L'adhésion permet d'accéder aux archives spécialisées, de participer aux cercles d'études et de recevoir la carte officielle d'adhérent numérique.",
      step1Title: "Étape 1 : Coordonnées Principales",
      step2Title: "Étape 2 : Domaines de Compétence & d'Intérêt",
      step3Title: "Étape 3 : Préférences de Communication",
      fullName: "Nom Complet",
      email: "Adresse Électronique",
      country: "Pays de Résidence",
      city: "Ville",
      preferredLanguage: "Langue Principale",
      ageGroup: "Tranche d'Âge",
      interestsTitle: "Sélectionnez vos domaines d'engagement :",
      interestsList: [
        "Droit International & Juridictions",
        "Histoire & Archives Diplomatiques",
        "Recherche Universitaire & Politiques",
        "Presse & Médias d'Information",
        "Traduction & Terminologie",
        "Technologies Numériques",
        "Conception Graphique & Cartographie",
        "Pédagogie & Éducation",
        "Droits Humains & Société Civile",
        "Organisation de Conférences",
        "Coopération Culturelle"
      ],
      prefsTitle: "Bulletins d'information souhaités :",
      prefsList: [
        "Communiqués Officiels du Secrétariat",
        "Bulletins d'Analyse Périodiques",
        "Études Juridiques Approfondies",
        "Invitations aux Conférences Mondiales",
        "Lettre d'Information Mensuelle"
      ],
      submitBtn: "Soumettre ma candidature & obtenir ma carte",
      nextBtn: "Étape suivante",
      prevBtn: "Étape précédente",
      alreadyMember: "Déjà membre enregistré ?",
      loginBtn: "Accéder à mon espace membre",
      successMessage: "Votre demande d'adhésion a été enregistrée avec succès."
    },
    dashboard: {
      welcome: "Bienvenue dans la Communauté Mondiale",
      cardBadge: "Carte d'Adhérent Numérique",
      memberId: "Identifiant Membre",
      country: "Pays",
      joinedDate: "Date d'Adhésion",
      disclaimer: "Adhésion numérique — Non gouvernementale et non officielle, délivrée par le Secrétariat Général de la Communauté Mondiale pour l'État de Palestine.",
      downloadCard: "Télécharger la carte",
      printCard: "Imprimer la carte",
      savedDocs: "Dossiers Documentaires Sauvegardés",
      upcomingEvents: "Symposiums Inscrits",
      groups: "Groupes de Travail Spécialisés",
      settings: "Paramètres & Confidentialité",
      logout: "Se déconnecter",
      noSavedDocs: "Aucun document n'est encore enregistré dans votre dossier.",
      noUpcomingEvents: "Aucune inscription à un événement pour le moment."
    },
    civil: {
      title: "Espace de Participation Citoyenne",
      eventsTab: "Symposiums & Débats",
      initiativesTab: "Initiatives Enregistrées",
      resourcesTab: "Ressources & Guides",
      participateTab: "Modalités d'Action",
      searchEvents: "Rechercher un événement international...",
      filterCountry: "Pays",
      filterLanguage: "Langue",
      filterDate: "Date",
      filterType: "Format",
      detailsBtn: "Consulter la fiche",
      rsvpBtn: "Confirmer ma présence (RSVP)",
      rsvpd: "Présence confirmée"
    },
    partners: {
      title: "Réseau Institutionnel & Partenaires",
      lead: "Le Secrétariat Général collabore étroitement avec des universités, des centres de recherche et des associations juridiques reconnues.",
      categories: {
        all: "Tous les partenaires",
        university: "Universités & Facultés",
        research_center: "Centres de Recherche",
        civil_society: "Société Civile",
        legal: "Barreaux & Cliniques Juridiques",
        media: "Organes de Presse",
        international_initiative: "Coalitions Internationales"
      },
      formalNotice: "Clause d'intégrité : Aucune entité n'est mentionnée sans accord bilatéral formel préalablement ratifié."
    },
    transparency: {
      title: "Transparence & Gouvernance",
      lead: "Le Secrétariat Général place la probité et la transparence au cœur de ses principes de gouvernance démocratique.",
      tabs: {
        structure: "Organigramme",
        annualReports: "Rapports Annuels",
        financialReports: "Rapports Financiers & Audits",
        funding: "Éthique du Financement",
        conflictPolicy: "Conflits d'Intérêts",
        privacyPolicy: "Protection des Données (RGPD)",
        membershipTerms: "Statuts des Membres",
        codeOfConduct: "Code de Déontologie"
      }
    },
    leadership: {
      title: "Secrétariat Général & Direction",
      lead: "Une gouvernance internationale collégiale assurée par des juristes, universitaires et figures civiques.",
      categories: {
        all: "Toute la direction",
        secretary_general: "Secrétaire Général",
        executive: "Secrétariat Exécutif",
        committee: "Commissions Thématiques",
        advisor: "Conseil Consultatif"
      }
    },
    footer: {
      quickLinks: "Liens Rapides",
      sections: "Plan du Site",
      legalNotice: "Le Secrétariat Général de la Communauté Mondiale pour l'État de Palestine est une organisation civique et intellectuelle internationale indépendante.",
      rights: "Tous droits réservés à la Communauté Mondiale — Accès ouvert aux travaux académiques sous mention de source.",
      subscribeNewsletter: "S'abonner au bulletin d'information",
      subscribeBtn: "S'inscrire",
      emailPlaceholder: "Votre adresse électronique...",
      subscribedSuccess: "Merci de votre inscription."
    }
  },

  es: {
    brand: {
      officialName: "Secretaría General de la Comunidad Global por el Estado de Palestina",
      englishName: "General Secretariat of the Global Community for the State of Palestine",
      shortName: "Secretaría General — Por el Estado de Palestina",
      tagline: "De los pueblos del mundo al Estado de Palestina",
      description: "Plataforma internacional que reúne a ciudadanos, instituciones, sociedad civil e investigadores en torno al conocimiento, el diálogo y la participación cívica.",
      digitalNotice: "Membresía Digital — No Gubernamental y No Oficial"
    },
    nav: {
      home: "Inicio",
      about: "Acerca de",
      palestine: "Estado de Palestina",
      news: "Declaraciones y Noticias",
      knowledge: "Centro de Conocimiento",
      community: "Comunidad Global",
      civil: "Participación Cívica",
      youth: "Juventud e Investigadores",
      legal_status: "Estatus Jurídico",
      more: "Más",
      membership: "Membresía",
      transparency: "Transparencia",
      leadership: "Liderazgo",
      dashboard: "Panel de Miembro",
      joinNow: "Solicitar Membresía"
    },
    hero: {
      tagline: "De los pueblos del mundo al Estado de Palestina",
      title: "Secretaría General de la Comunidad Global por el Estado de Palestina",
      description: "Plataforma internacional para el conocimiento, la documentación jurídica y el encuentro ciudadano en torno al Estado de Palestina.",
      exploreBtn: "Conocer la Secretaría",
      membershipBtn: "Afiliarse a la Comunidad",
      coreConcepts: {
        world: "El Mundo",
        knowledge: "El Conocimiento",
        connection: "El Encuentro",
        palestine: "El Estado de Palestina"
      }
    },
    why: {
      title: "¿Por qué la Secretaría General?",
      lead: "En todo el mundo existen comunidades, instituciones e individuos que siguen la causa palestina desde enfoques jurídicos, históricos, académicos y civiles.",
      p1: "La Secretaría General nace como una plataforma orientada a articular esta pluralidad en un espacio institucional común y riguroso.",
      p2: "No es un simple canal informativo, sino un archivo documental permanente, una red de intercambio transnacional y un marco cívico de membresía.",
      pillars: {
        legal: { title: "Derecho Internacional", desc: "Compilación sistemática de resoluciones de la ONU y opiniones consultivas de la CIJ." },
        history: { title: "Archivo Histórico y Mapas", desc: "Preservación rigurosa de documentos diplomáticos y cartografía histórica." },
        research: { title: "Investigación Académica", desc: "Fomento de estudios doctrinales en colaboración con facultades de derecho." },
        media: { title: "Comunicación Veraz", desc: "Discurso riguroso fundamentado exclusivamente en el derecho internacional." },
        civil: { title: "Acción Cívica Global", desc: "Articulación de iniciativas pacíficas y de cooperación ciudadana." }
      }
    },
    visionMission: {
      visionTitle: "Una visión integradora para un espacio global",
      visionStatement: "Consolidar una plataforma internacional organizada que aúne conocimiento, memoria, documentación y participación ciudadana respecto al Estado de Palestina.",
      missionTitle: "Misión y Objetivos Fundamentales",
      missionLead: "La Secretaría General desarrolla su labor institucional y digital mediante los siguientes pilares de actuación:",
      points: [
        "Ofrecer un centro documental multilingüe sobre la historia y el estatuto jurídico de Palestina.",
        "Organizar las fuentes y tratados internacionales poniéndolos a libre disposición pública.",
        "Crear un espacio de articulación constructiva entre la sociedad civil y el mundo académico.",
        "Impulsar la investigación jurídica e histórica en universidades y centros de estudio.",
        "Publicar las declaraciones institucionales de la Secretaría con rigor documental.",
        "Registrar y visibilizar las iniciativas solidarias y conferencias a nivel mundial.",
        "Facilitar el acceso directo a los dictámenes de los tribunales internacionales.",
        "Tejer una red global duradera de fraternidad, respeto y conocimiento mutuo."
      ]
    },
    principles: {
      title: "Nuestros Principios Rectores",
      subtitle: "Seis postulados éticos e institucionales que fundamentan todas nuestras actividades",
      items: {
        transparency: { title: "Transparencia", desc: "Publicación periódica de memorias de gestión, organigramas e informes de auditoría." },
        knowledge: { title: "Conocimiento", desc: "Apego estricto a hechos comprobables y a fuentes jurídicas e históricas verificadas." },
        documentation: { title: "Documentación", desc: "Consulta directa de tratados, actas oficiales y registros archivísticos autenticados." },
        pluralism: { title: "Pluralidad", desc: "Recepción equitativa de aportaciones procedentes de diversas culturas y disciplinas." },
        privacy: { title: "Privacidad", desc: "Salvaguarda absoluta de los datos personales con arreglo a los más altos estándares legales." },
        responsibility: { title: "Responsabilidad", desc: "Clara diferenciación entre declaraciones formales, artículos analíticos y opiniones externas." }
      }
    },
    presence: {
      title: "Presencia Global",
      subtitle: "Una comunidad mundial plurilingüe presente en decenas de países",
      stats: {
        countries: "Países",
        members: "Miembros Registrados",
        events: "Encuentros Internacionales",
        documents: "Documentos Archivados",
        languages: "Idiomas Oficiales"
      },
      realDataNotice: "Métricas actualizadas y vinculadas al registro institucional de afiliados",
      selectedCountry: "Perfil del País",
      activeMembers: "Miembros Activos",
      activeEvents: "Eventos Realizados",
      partnerOrgs: "Instituciones Asociadas",
      viewRegion: "Ver actividades regionales"
    },
    news: {
      title: "Últimas Declaraciones y Noticias",
      subtitle: "Comunicados oficiales, informes jurídicos y convocatorias de foros internacionales",
      categories: {
        all: "Todo",
        statement: "Declaraciones de la Secretaría",
        news: "Noticias",
        report: "Informes",
        event: "Eventos",
        document: "Documentos",
        research: "Investigaciones"
      },
      readMore: "Leer texto completo",
      officialStatement: "Declaración Oficial",
      source: "Fuente",
      close: "Cerrar",
      officialRef: "Ref. Administrativa"
    },
    knowledge: {
      title: "Centro de Conocimiento y Documentación",
      subtitle: "Conocemos desde las fuentes",
      desc: "Archivo digital multilingüe con textos fundamentales de derecho internacional, historia diplomática y tratados multilaterales.",
      searchPlaceholder: "Buscar tratados, resoluciones de la ONU, opiniones de la CIJ...",
      categories: {
        all: "Todos los documentos",
        international_law: "Derecho Internacional y ONU",
        history: "Archivos Históricos y Tratados",
        research: "Investigaciones y Estudios",
        civil_society: "Sociedad Civil e Iniciativas"
      },
      accession: "N.º de Registro",
      source: "Organismo Emisor",
      date: "Fecha",
      type: "Clasificación",
      officialLink: "Enlace Oficial",
      downloadBrief: "Descargar síntesis documental",
      citation: "Copiar cita académica",
      copied: "Cita copiada"
    },
    palestine: {
      title: "Estado de Palestina — Expediente Institucional",
      subtitle: "Documentación jurídica, histórica y multilateral de la condición internacional de Palestina",
      nav: {
        history: "Reseña Histórica",
        status: "Estatuto Internacional",
        recognition: "Reconocimiento Diplomático",
        unStatus: "Estatus en las Naciones Unidas",
        icj: "Corte Internacional de Justicia",
        treaties: "Tratados y Convenios",
        maps: "Cartografía y Archivos"
      },
      stats: {
        recognitionCount: "Más de 146 Estados Miembros de la ONU reconocen oficialmente al Estado de Palestina",
        unStatusLabel: "Estado Observador No Miembro (Res. 19/67 y ES-10/23)",
        independenceYear: "Declaración de Independencia: Argel 1988",
        treatiesCount: "Más de 110 tratados multilaterales suscritos"
      }
    },
    membership: {
      title: "Afiliación a la Comunidad Global",
      desc: "La membresía permite participar en comisiones de trabajo, acceder al archivo reservado y portar la credencial digital institucional.",
      step1Title: "Etapa 1: Datos Generales",
      step2Title: "Etapa 2: Áreas de Especialidad e Interés",
      step3Title: "Etapa 3: Preferencias de Notificación",
      fullName: "Nombre Completo",
      email: "Correo Electrónico",
      country: "País de Residencia",
      city: "Ciudad",
      preferredLanguage: "Idioma Preferente",
      ageGroup: "Grupo de Edad",
      interestsTitle: "Seleccione sus campos de interés y colaboración:",
      interestsList: [
        "Derecho Internacional y Tribunales",
        "Historia y Archivo Documental",
        "Investigación Académica y Políticas",
        "Prensa y Comunicación Digital",
        "Traducción e Interpretación",
        "Tecnología y Redes Digitales",
        "Diseño Gráfico y Visualización",
        "Educación y Pedagogía",
        "Sociedad Civil y Derechos Humanos",
        "Organización de Foros y Congresos",
        "Diplomacia Cultural"
      ],
      prefsTitle: "Boletines que desea recibir:",
      prefsList: [
        "Declaraciones Oficiales de la Secretaría",
        "Resúmenes Informativos Periódicos",
        "Estudios Jurídicos y Doctrinales",
        "Convocatorias a Foros Internacionales",
        "Boletín Institucional Mensual"
      ],
      submitBtn: "Enviar solicitud y generar credencial digital",
      nextBtn: "Siguiente etapa",
      prevBtn: "Etapa anterior",
      alreadyMember: "¿Ya dispone de registro activo?",
      loginBtn: "Acceder al panel de miembro",
      successMessage: "Su solicitud ha sido tramitada y su credencial digital expedida con éxito."
    },
    dashboard: {
      welcome: "Bienvenido a la Comunidad Global",
      cardBadge: "Credencial Digital de Membresía",
      memberId: "Identificador de Miembro",
      country: "País",
      joinedDate: "Fecha de Expedición",
      disclaimer: "Membresía digital — No gubernamental y no oficial, emitida bajo la tutela de la Secretaría General de la Comunidad Global por el Estado de Palestina.",
      downloadCard: "Descargar credencial",
      printCard: "Imprimir credencial",
      savedDocs: "Documentos Guardados en su Expediente",
      upcomingEvents: "Eventos Registrados",
      groups: "Grupos de Trabajo Especializados",
      settings: "Ajustes de Cuenta y Privacidad",
      logout: "Cerrar sesión",
      noSavedDocs: "Aún no ha archivado documentos en su expediente personal.",
      noUpcomingEvents: "No tiene inscripciones activas a eventos."
    },
    civil: {
      title: "Centro de Participación Cívica",
      eventsTab: "Congresos y Foros",
      initiativesTab: "Iniciativas Registradas",
      resourcesTab: "Recursos y Guías Públicas",
      participateTab: "Pautas de Participación",
      searchEvents: "Buscar encuentros y seminarios internacionales...",
      filterCountry: "País",
      filterLanguage: "Idioma",
      filterDate: "Fecha",
      filterType: "Modalidad",
      detailsBtn: "Ver detalles",
      rsvpBtn: "Confirmar asistencia (RSVP)",
      rsvpd: "Asistencia confirmada"
    },
    partners: {
      title: "Red de Instituciones y Aliados",
      lead: "La Secretaría General colabora con universidades, centros de pensamiento y entidades jurídicas bajo acuerdos institucionales explícitos.",
      categories: {
        all: "Todos los aliados",
        university: "Universidades y Facultades",
        research_center: "Centros de Pensamiento",
        civil_society: "Organizaciones Civiles",
        legal: "Colegios de Abogados y Clínicas",
        media: "Medios Informativos",
        international_initiative: "Coaliciones Internacionales"
      },
      formalNotice: "Política de acreditación: Ninguna organización figura como aliada sin la previa formalización de un convenio bilateral de colaboración."
    },
    transparency: {
      title: "Transparencia y Rendición de Cuentas",
      lead: "La Secretaría General rige su administración mediante la máxima publicidad de sus estatutos, recursos y auditorías periódicas.",
      tabs: {
        structure: "Estructura Orgánica",
        annualReports: "Memorias Anuales",
        financialReports: "Informes Financieros y Auditorías",
        funding: "Ética de Financiación",
        conflictPolicy: "Conflictos de Interés",
        privacyPolicy: "Protección de Datos (RGPD)",
        membershipTerms: "Reglamento de Miembros",
        codeOfConduct: "Código Deontológico"
      }
    },
    leadership: {
      title: "Secretaría General y Consejo Directivo",
      lead: "Órgano colegiado multidisciplinar de juristas, académicos y líderes civiles comprometidos con la legalidad internacional.",
      categories: {
        all: "Todo el liderazgo",
        secretary_general: "Secretario General",
        executive: "Secretaría Ejecutiva",
        committee: "Comisiones Permanentes",
        advisor: "Consejo Consultivo"
      }
    },
    footer: {
      quickLinks: "Enlaces Rápidos",
      sections: "Directorio del Portal",
      legalNotice: "La Secretaría General de la Comunidad Global por el Estado de Palestina es una institución cívica e intelectual internacional independiente.",
      rights: "Todos los derechos reservados a la Comunidad Global — Uso público y académico autorizado bajo cita de procedencia.",
      subscribeNewsletter: "Suscribirse al boletín informativo",
      subscribeBtn: "Suscribirse",
      emailPlaceholder: "Su correo electrónico...",
      subscribedSuccess: "Gracias por suscribirse a nuestros comunicados."
    }
  }
};
