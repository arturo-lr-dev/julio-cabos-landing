export type Locale = "es" | "en" | "it";

export const locales: Locale[] = ["es", "en", "it"];

export const siteContents = {
  es: {
  hero: {
    title: "Julio Cabos",
    eyebrow: "Aprende · Encarga · Colabora",
    headline: "Pintar con criterio cambia tu forma de ver.",
    subtitle: "Miniaturas pintadas y enseñadas con criterio artístico",
    description:
      "Más de veinte años de experiencia profesional enseñando, creando y dando vida a miniaturas de exposición.",
    cta: "Aprender conmigo",
    ctaHref: "#formacion",
    secondaryCta: "Obras por encargo",
    secondaryHref: "#obras-por-encargo",
    quote:
      "La pintura de miniaturas no es solo técnica. Es entender la luz, el volumen y las decisiones que hacen que una figura funcione.",
    backgroundImage: "/images/hero.webp",
  },
  authority: [
    { value: "30+", label: "Libros publicados" },
    { value: "20+", label: "Años de experiencia" },
    { value: "Director de pintura", label: "Andrea Miniatures · Scale75" },
    { value: "Formador internacional", label: "Europa · EEUU" },
  ],
  pathways: {
    title: "¿Qué estás buscando?",
    subtitle: "Elige tu camino. Te acompañaré según tus objetivos.",
    items: [
      {
        title: "Aprender",
        kicker: "con Julio",
        text:
          "Cursos presenciales y formación online para aprender a pintar miniaturas con criterio.",
        cta: "Ver formación",
        href: "#formacion",
        image: "/images/about.webp",
      },
      {
        title: "Obras",
        kicker: "por encargo",
        text:
          "Piezas únicas pintadas a mano para coleccionistas, marcas y proyectos privados.",
        cta: "Encargar una obra",
        href: "#obras-por-encargo",
        secondaryText: "También hay piezas terminadas disponibles para consulta.",
        secondaryCta: "Piezas disponibles",
        secondaryHref: "/galeria?filtro=disponibles",
        image: "/images/gallery/templario.webp",
      },
      {
        title: "Colaboraciones",
        kicker: "profesionales",
        text:
          "Box art, dirección artística y proyectos editoriales para empresas del sector.",
        cta: "Colaborar conmigo",
        href: "#colaboraciones",
        image: "/images/gallery/arquero.webp",
      },
    ],
  },
  message: {
    text: [
      "No enseño a copiar efectos. Enseño a comprender por qué funcionan.",
      "Un método que te da libertad, seguridad y criterio para enfrentarte a cualquier miniatura.",
      "",
      "Antes de coger el pincel, aprendemos a mirar: luz, color, volumen y decisiones.",
    ],
  },
  training: {
    title: "Formación",
    text: "No se trata de memorizar recetas. Se trata de aprender a analizar una figura antes de pintar: dónde está la luz, qué volumen manda y qué decisiones hacen que una miniatura funcione.",
    primaryCta: "Solicitar información",
    primaryHref: "#consulta-cursos",
    secondaryCta: "Próximamente online",
    secondaryHref: "#",
  },
  commissions: {
    title: "Obras por encargo",
    text:
      "Trabajo con un número reducido de proyectos al año para garantizar dedicación, criterio y acabado profesional. Si buscas una pieza realizada específicamente para tu colección o marca, estudiaré tu proyecto con detalle.",
    items: [
      "Piezas únicas para colecciones privadas",
      "Box art y miniaturas de exposición",
      "Proyectos especiales para marcas y editoriales",
    ],
    cta: "Solicitar una obra",
    href: "#consulta-encargo",
  },
  collaborations: {
    title: "Colaboraciones profesionales",
    text:
      "Experiencia en dirección de pintura, publicaciones especializadas, box art y desarrollo visual para empresas del sector.",
    items: [
      "Fabricantes de miniaturas y marcas de pintura",
      "Editoriales, publicaciones y material didáctico",
      "Asesoramiento artístico y proyectos a medida",
    ],
    cta: "Proponer colaboración",
    href: "#consulta-colaboracion",
  },
  about: {
    title: "Sobre Julio",
    image: "/hoy.png",
    text: [
      "Julio Cabos no ha construido su trayectoria alrededor de una técnica aislada, sino de una forma de mirar la miniatura antes de pintarla.",
      "Más de dos décadas de trabajo profesional, dirección artística, publicaciones y formación internacional sostienen un método basado en comprender la luz, el color, el volumen y las decisiones que hacen funcionar una figura.",
      "Hoy combina obra por encargo, colaboraciones profesionales y formación para alumnos que quieren pintar con más seguridad, criterio y libertad.",
    ],
    cta: "Ver trayectoria",
    ctaHref: "/files/CV-Julio-Cabos.pdf",
  },
  contact: {
    title: "Contacto",
    text: "Cuéntame si quieres aprender, encargar una pieza o proponer una colaboración profesional. Responderé personalmente para valorar el mejor camino.",
    email: "Juliocabosg@gmail.com",
    cta: "Enviar email",
  },
  footer: {
    name: "Julio Cabos",
    instagram: "https://www.instagram.com/juliocabos",
    facebook: "https://www.facebook.com/julio.cabos",
  },
  ui: {
    language: "Idioma",
    currentLanguage: "ES",
    alternateLanguage: "EN",
    alternateHref: "/en",
    nav: [
      { label: "Inicio", href: "#" },
      { label: "Aprender", href: "#formacion" },
      { label: "Obras por encargo", href: "#obras-por-encargo" },
      { label: "Colaboraciones", href: "#colaboraciones" },
      { label: "Galería", href: "#galeria" },
      { label: "Biblioteca", href: "/biblioteca" },
      { label: "Sobre Julio", href: "#sobre-mi" },
      { label: "Contacto", href: "#contacto" },
    ],
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    atelier: "ATELIER · MADRID",
    heroImageAlt: "Miniatura pintada por Julio Cabos",
    sections: {
      training: "Aprender con Julio",
      commissions: "Obras por encargo",
      gallery: "Así es el resultado",
      manifesto: "Manifiesto",
      waitlist: "No te pierdas nada",
      contact: "Contacto",
    },
    training: {
      heading: ["Aprende a mirar", "antes de pintar"],
      inPersonTitle: "Cursos presenciales",
      inPersonText:
        "Sesiones intensivas y plazas limitadas. Trabajo directo sobre luz, color, volumen y toma de decisiones.",
      onlineTitle: "Cursos online",
      onlineText:
        "En desarrollo. Material grabado, ejercicios pautados y una forma clara de aplicar el método desde casa.",
      datePending: "Fecha por confirmar",
      locale: "es-ES",
      seats: "plazas disponibles",
      book: "Reservar",
    },
    commissions: {
      heading: ["Piezas únicas", "para proyectos especiales"],
    },
    gallery: {
      heading: ["Obras", "seleccionadas"],
      text:
        "Piezas que muestran el nivel, el detalle y la dedicación de cada proyecto.",
      full: "Ver galería completa",
      href: "/galeria",
      metaSeparator: " · ",
      number: "Nº",
    },
    about: {
      heading: ["La trayectoria", "como relato de oficio"],
      imageAlt: "Julio Cabos en su taller",
      caption: "Taller · Madrid · España",
      closing: "Más que un currículum, una forma de trabajar.",
      pdfSuffix: "profesional (PDF)",
      story: [
        {
          label: "El oficio",
          title: "Antes del efecto, la mirada.",
          text:
            "La pintura empieza antes de coger el pincel: analizar la luz, entender el volumen y decidir qué necesita la figura para funcionar.",
          image: "/oficio.JPG",
          alt: "Julio Cabos pintando una miniatura en su mesa de trabajo",
        },
        {
          label: "Obra y reconocimiento",
          title: "Una trayectoria construida pieza a pieza.",
          text:
            "Premios, publicaciones y proyectos profesionales acompañan una carrera dedicada a la miniatura de exposición y al trabajo de alto nivel.",
          image: "/hoy_old.JPG",
          alt: "Julio Cabos con un reconocimiento profesional junto a vitrinas de miniaturas",
        },
        {
          label: "Formación",
          title: "Enseñar a comprender, no a copiar.",
          text:
            "Sus cursos no se centran en repetir recetas, sino en dar al alumno criterio para resolver cualquier figura con más seguridad.",
          image: "/formacion.jpeg",
          alt: "Julio Cabos en una sesión de formación con alumnos",
        },
        {
          label: "Hoy",
          title: "Obra, formación y colaboraciones.",
          text:
            "Julio trabaja con coleccionistas, marcas y alumnos desde una misma idea: pintar miniaturas entendiendo por qué funcionan.",
          image: "/Julio_pintando.jpeg",
          alt: "Julio Cabos pintando durante una demostración de miniaturas",
        },
      ],
    },
    waitlist: {
      heading: ["Cursos, plazas", "y proyectos"],
      text:
        "Recibe novedades sobre cursos presenciales, formación online, disponibilidad para obras por encargo y proyectos especiales.",
      note: "Sin spam. Solo información relevante cuando haya algo importante que contar.",
      successTitle: "¡Listo!",
      successTextBefore: "Te has añadido a la lista de espera. Te escribiremos a",
      successTextAfter: "en cuanto abramos las inscripciones.",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      level: "Tu nivel",
      levels: [
        { value: "principiante", label: "Principiante" },
        { value: "intermedio", label: "Intermedio" },
        { value: "avanzado", label: "Avanzado" },
      ],
      sending: "Enviando...",
      submit: "Unirme a la lista de espera",
      privacy: "Solo comunicaciones relevantes sobre formación y proyectos.",
      subject: "Lista de espera",
      message:
        "Quiere recibir novedades sobre cursos presenciales, formacion online, encargos y proyectos especiales.",
      error: "Error al enviar el formulario",
    },
    contact: {
      heading: ["Hablemos", "de tu proyecto"],
      direct: "O escribir directamente a",
    },
    form: {
      source: "Tipo de consulta",
      sources: {
        commission: "Obras por encargo",
        collaboration: "Colaboración profesional",
        training: "Formación",
        course: "Curso publicado",
        general: "Consulta general",
      },
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      phone: "Teléfono",
      phonePlaceholder: "Opcional",
      message: "Mensaje",
      messagePlaceholder:
        "Cuéntanos qué necesitas, fechas, tipo de pieza o curso que te interesa...",
      sending: "Enviando...",
      submit: "Enviar consulta",
      successTitle: "Consulta enviada",
      successText:
        "Gracias. Tu mensaje ha quedado registrado y Julio podrá responderte desde su correo.",
      sendAnother: "Enviar otra consulta",
      sendError: "No se ha podido enviar.",
    },
    footer: {
      index: "ÍNDICE",
      social: "REDES",
      rights: "TODOS LOS DERECHOS RESERVADOS",
      credits: "DISEÑO & CÓDIGO",
    },
  },
  },
  en: {
    hero: {
      title: "Julio Cabos",
      eyebrow: "Learn · Commission · Collaborate",
      headline: "Painting with judgement changes the way you see.",
      subtitle: "Miniatures painted and taught with artistic judgement",
      description:
        "More than twenty years of professional experience teaching, creating and bringing exhibition miniatures to life.",
      cta: "Learn with me",
      ctaHref: "#formacion",
      secondaryCta: "Commission work",
      secondaryHref: "#obras-por-encargo",
      quote:
        "Miniature painting is not just technique. It is understanding light, volume and the decisions that make a figure work.",
      backgroundImage: "/images/hero.webp",
    },
    authority: [
      { value: "30+", label: "Published books" },
      { value: "20+", label: "Years of experience" },
      { value: "Painting director", label: "Andrea Miniatures · Scale75" },
      { value: "International tutor", label: "Europe · USA" },
    ],
    pathways: {
      title: "What are you looking for?",
      subtitle: "Choose your path. I will guide you according to your goals.",
      items: [
        {
          title: "Learn",
          kicker: "with Julio",
          text:
            "In-person courses and online training to learn miniature painting with artistic judgement.",
          cta: "View training",
          href: "#formacion",
          image: "/images/about.webp",
        },
        {
          title: "Works",
          kicker: "by commission",
          text:
            "Unique hand-painted pieces for collectors, brands and private projects.",
          cta: "Commission a piece",
          href: "#obras-por-encargo",
          secondaryText: "Finished pieces are also available for enquiry.",
          secondaryCta: "Available pieces",
          secondaryHref: "/en/galeria?filtro=disponibles",
          image: "/images/gallery/templario.webp",
        },
        {
          title: "Collaborations",
          kicker: "professional",
          text:
            "Box art, art direction and editorial projects for companies in the miniature sector.",
          cta: "Collaborate with me",
          href: "#colaboraciones",
          image: "/images/gallery/arquero.webp",
        },
      ],
    },
    message: {
      text: [
        "I do not teach people to copy effects. I teach them to understand why they work.",
        "A method that gives you freedom, confidence and judgement when facing any miniature.",
        "",
        "Before picking up the brush, we learn how to look: light, colour, volume and decisions.",
      ],
    },
    training: {
      title: "Training",
      text:
        "It is not about memorising recipes. It is about learning how to analyse a figure before painting: where the light is, which volume leads, and which decisions make a miniature work.",
      primaryCta: "Request information",
      primaryHref: "#consulta-cursos",
      secondaryCta: "Online soon",
      secondaryHref: "#",
    },
    commissions: {
      title: "Commissioned works",
      text:
        "I work on a limited number of projects each year to ensure dedication, judgement and a professional finish. If you are looking for a piece created specifically for your collection or brand, I will study your project carefully.",
      items: [
        "Unique pieces for private collections",
        "Box art and exhibition miniatures",
        "Special projects for brands and publishers",
      ],
      cta: "Request a piece",
      href: "#consulta-encargo",
    },
    collaborations: {
      title: "Professional collaborations",
      text:
        "Experience in painting direction, specialist publications, box art and visual development for companies in the sector.",
      items: [
        "Miniature manufacturers and paint brands",
        "Publishers, publications and educational material",
        "Artistic consulting and bespoke projects",
      ],
      cta: "Propose a collaboration",
      href: "#consulta-colaboracion",
    },
    about: {
      title: "About Julio",
      image: "/hoy.png",
      text: [
        "Julio Cabos has not built his career around an isolated technique, but around a way of looking at a miniature before painting it.",
        "More than two decades of professional work, art direction, publications and international teaching support a method based on understanding light, colour, volume and the decisions that make a figure work.",
        "Today he combines commissioned work, professional collaborations and training for students who want to paint with greater confidence, judgement and freedom.",
      ],
      cta: "View career",
      ctaHref: "/files/CV-Julio-Cabos.pdf",
    },
    contact: {
      title: "Contact",
      text:
        "Tell me whether you want to learn, commission a piece or propose a professional collaboration. I will reply personally to assess the best path.",
      email: "Juliocabosg@gmail.com",
      cta: "Send email",
    },
    footer: {
      name: "Julio Cabos",
      instagram: "https://www.instagram.com/juliocabos",
      facebook: "https://www.facebook.com/julio.cabos",
    },
    ui: {
      language: "Language",
      currentLanguage: "EN",
      alternateLanguage: "ES",
      alternateHref: "/",
      nav: [
        { label: "Home", href: "#" },
        { label: "Learn", href: "#formacion" },
        { label: "Commissions", href: "#obras-por-encargo" },
        { label: "Collaborations", href: "#colaboraciones" },
        { label: "Gallery", href: "#galeria" },
        { label: "Library", href: "/en/biblioteca" },
        { label: "About Julio", href: "#sobre-mi" },
        { label: "Contact", href: "#contacto" },
      ],
      menuOpen: "Open menu",
      menuClose: "Close menu",
      atelier: "ATELIER · MADRID",
      heroImageAlt: "Miniature painted by Julio Cabos",
      sections: {
        training: "Learn with Julio",
        commissions: "Commissioned works",
        gallery: "The result",
        manifesto: "Manifesto",
        waitlist: "Stay updated",
        contact: "Contact",
      },
      training: {
        heading: ["Learn to look", "before painting"],
        inPersonTitle: "In-person courses",
        inPersonText:
          "Intensive sessions with limited seats. Direct work on light, colour, volume and decision-making.",
        onlineTitle: "Online courses",
        onlineText:
          "In development. Recorded material, guided exercises and a clear way to apply the method from home.",
        datePending: "Date to be confirmed",
        locale: "en-GB",
        seats: "seats available",
        book: "Book",
      },
      commissions: {
        heading: ["Unique pieces", "for special projects"],
      },
      gallery: {
        heading: ["Selected", "works"],
        text:
          "Pieces that show the level, detail and dedication behind each project.",
        full: "View full gallery",
        href: "/en/galeria",
        metaSeparator: " · ",
        number: "No.",
      },
      about: {
        heading: ["A career", "built as a craft story"],
        imageAlt: "Julio Cabos in his studio",
        caption: "Studio · Madrid · Spain",
        closing: "More than a CV, a way of working.",
        pdfSuffix: "professional (PDF)",
        story: [
          {
            label: "The craft",
            title: "Before the effect, the eye.",
            text:
              "Painting begins before the brush is picked up: analysing light, understanding volume and deciding what the figure needs to work.",
            image: "/oficio.JPG",
            alt: "Julio Cabos painting a miniature at his work table",
          },
          {
            label: "Work and recognition",
            title: "A career built piece by piece.",
            text:
              "Awards, publications and professional projects accompany a career devoted to exhibition miniatures and high-level work.",
            image: "/hoy_old.JPG",
            alt: "Julio Cabos with a professional recognition beside miniature display cabinets",
          },
          {
            label: "Training",
            title: "Teaching understanding, not copying.",
            text:
              "His courses are not about repeating recipes, but about giving students the judgement to solve any figure with greater confidence.",
            image: "/formacion.jpeg",
            alt: "Julio Cabos during a training session with students",
          },
          {
            label: "Today",
            title: "Works, training and collaborations.",
            text:
              "Julio works with collectors, brands and students from the same idea: painting miniatures by understanding why they work.",
            image: "/Julio_pintando.jpeg",
            alt: "Julio Cabos painting during a miniature demonstration",
          },
        ],
      },
      waitlist: {
        heading: ["Courses, seats", "and projects"],
        text:
          "Receive updates about in-person courses, online training, availability for commissioned works and special projects.",
        note: "No spam. Only relevant information when there is something important to share.",
        successTitle: "Done",
        successTextBefore: "You have joined the waitlist. We will write to",
        successTextAfter: "as soon as registration opens.",
        name: "Name",
        namePlaceholder: "Your name",
        level: "Your level",
        levels: [
          { value: "principiante", label: "Beginner" },
          { value: "intermedio", label: "Intermediate" },
          { value: "avanzado", label: "Advanced" },
        ],
        sending: "Sending...",
        submit: "Join the waitlist",
        privacy: "Only relevant messages about training and projects.",
        subject: "Waitlist",
        message:
          "Wants to receive updates about in-person courses, online training, commissions and special projects.",
        error: "Error sending the form",
      },
      contact: {
        heading: ["Let's talk", "about your project"],
        direct: "Or write directly to",
      },
      form: {
        source: "Inquiry type",
        sources: {
          commission: "Commissioned works",
          collaboration: "Professional collaboration",
          training: "Training",
          course: "Published course",
          general: "General inquiry",
        },
        name: "Name",
        namePlaceholder: "Your name",
        phone: "Phone",
        phonePlaceholder: "Optional",
        message: "Message",
        messagePlaceholder:
          "Tell us what you need, dates, type of piece or course you are interested in...",
        sending: "Sending...",
        submit: "Send inquiry",
        successTitle: "Inquiry sent",
        successText:
          "Thank you. Your message has been registered and Julio will be able to reply from his email.",
        sendAnother: "Send another inquiry",
        sendError: "Could not send the inquiry.",
      },
      footer: {
        index: "INDEX",
        social: "SOCIAL",
        rights: "ALL RIGHTS RESERVED",
        credits: "DESIGN & CODE",
      },
    },
  },
};

export const siteContent = siteContents.es;

const italianSiteContent: typeof siteContents.es = {
  ...siteContents.es,
  hero: {
    ...siteContents.es.hero,
    eyebrow: "Impara · Commissiona · Collabora",
    headline: "Dipingere con consapevolezza cambia il tuo modo di vedere.",
    subtitle: "Miniature dipinte e insegnate con sensibilità artistica",
    description:
      "Più di vent'anni di esperienza professionale nell'insegnamento, nella creazione e nel dare vita a miniature da esposizione.",
    cta: "Impara con me",
    secondaryCta: "Opere su commissione",
    quote:
      "La pittura di miniature non è solo tecnica. È comprendere la luce, il volume e le decisioni che fanno funzionare una figura.",
  },
  authority: [
    { value: "30+", label: "Libri pubblicati" },
    { value: "20+", label: "Anni di esperienza" },
    { value: "Direttore della pittura", label: "Andrea Miniatures · Scale75" },
    { value: "Formatore internazionale", label: "Europa · USA" },
  ],
  pathways: {
    ...siteContents.es.pathways,
    title: "Cosa stai cercando?",
    subtitle: "Scegli il tuo percorso. Ti accompagnerò in base ai tuoi obiettivi.",
    items: [
      {
        ...siteContents.es.pathways.items[0],
        title: "Imparare",
        kicker: "con Julio",
        text:
          "Corsi in presenza e formazione online per imparare a dipingere miniature con consapevolezza.",
        cta: "Vedi la formazione",
      },
      {
        ...siteContents.es.pathways.items[1],
        title: "Opere",
        kicker: "su commissione",
        text:
          "Pezzi unici dipinti a mano per collezionisti, marchi e progetti privati.",
        cta: "Commissiona un'opera",
        secondaryText: "Sono disponibili anche opere finite su richiesta.",
        secondaryCta: "Opere disponibili",
        secondaryHref: "/it/galeria?filtro=disponibles",
      },
      {
        ...siteContents.es.pathways.items[2],
        title: "Collaborazioni",
        kicker: "professionali",
        text:
          "Box art, direzione artistica e progetti editoriali per aziende del settore.",
        cta: "Collabora con me",
      },
    ],
  },
  message: {
    text: [
      "Non insegno a copiare gli effetti. Insegno a capire perché funzionano.",
      "Un metodo che offre libertà, sicurezza e consapevolezza per affrontare qualsiasi miniatura.",
      "",
      "Prima di prendere il pennello, impariamo a osservare: luce, colore, volume e decisioni.",
    ],
  },
  training: {
    ...siteContents.es.training,
    title: "Formazione",
    text:
      "Non si tratta di memorizzare ricette. Si tratta di imparare ad analizzare una figura prima di dipingerla: dove si trova la luce, quale volume domina e quali decisioni fanno funzionare una miniatura.",
    primaryCta: "Richiedi informazioni",
    secondaryCta: "Prossimamente online",
  },
  commissions: {
    ...siteContents.es.commissions,
    title: "Opere su commissione",
    text:
      "Lavoro ogni anno su un numero limitato di progetti per garantire dedizione, criterio e una finitura professionale. Se cerchi un pezzo realizzato appositamente per la tua collezione o il tuo marchio, valuterò il progetto con attenzione.",
    items: [
      "Pezzi unici per collezioni private",
      "Box art e miniature da esposizione",
      "Progetti speciali per marchi ed editori",
    ],
    cta: "Richiedi un'opera",
  },
  collaborations: {
    ...siteContents.es.collaborations,
    title: "Collaborazioni professionali",
    text:
      "Esperienza nella direzione della pittura, nelle pubblicazioni specialistiche, nel box art e nello sviluppo visivo per aziende del settore.",
    items: [
      "Produttori di miniature e marchi di colori",
      "Editori, pubblicazioni e materiale didattico",
      "Consulenza artistica e progetti su misura",
    ],
    cta: "Proponi una collaborazione",
  },
  about: {
    ...siteContents.es.about,
    title: "Su Julio",
    text: [
      "Julio Cabos non ha costruito il proprio percorso intorno a una tecnica isolata, ma a un modo di osservare la miniatura prima di dipingerla.",
      "Più di due decenni di lavoro professionale, direzione artistica, pubblicazioni e formazione internazionale sostengono un metodo basato sulla comprensione della luce, del colore, del volume e delle decisioni che fanno funzionare una figura.",
      "Oggi unisce opere su commissione, collaborazioni professionali e formazione per allievi che desiderano dipingere con maggiore sicurezza, consapevolezza e libertà.",
    ],
    cta: "Vedi il percorso",
  },
  contact: {
    ...siteContents.es.contact,
    title: "Contatti",
    text:
      "Raccontami se vuoi imparare, commissionare un pezzo o proporre una collaborazione professionale. Ti risponderò personalmente per valutare il percorso migliore.",
    cta: "Invia un'email",
  },
  ui: {
    ...siteContents.es.ui,
    language: "Lingua",
    currentLanguage: "IT",
    alternateLanguage: "ES",
    alternateHref: "/",
    nav: [
      { label: "Home", href: "#" },
      { label: "Imparare", href: "#formacion" },
      { label: "Opere su commissione", href: "#obras-por-encargo" },
      { label: "Collaborazioni", href: "#colaboraciones" },
      { label: "Galleria", href: "#galeria" },
      { label: "Biblioteca", href: "/it/biblioteca" },
      { label: "Su Julio", href: "#sobre-mi" },
      { label: "Contatti", href: "#contacto" },
    ],
    menuOpen: "Apri menu",
    menuClose: "Chiudi menu",
    atelier: "ATELIER · MADRID",
    heroImageAlt: "Miniatura dipinta da Julio Cabos",
    sections: {
      training: "Impara con Julio",
      commissions: "Opere su commissione",
      gallery: "Il risultato",
      manifesto: "Manifesto",
      waitlist: "Rimani aggiornato",
      contact: "Contatti",
    },
    training: {
      ...siteContents.es.ui.training,
      heading: ["Impara a osservare", "prima di dipingere"],
      inPersonTitle: "Corsi in presenza",
      inPersonText:
        "Sessioni intensive e posti limitati. Lavoro diretto su luce, colore, volume e processo decisionale.",
      onlineTitle: "Corsi online",
      onlineText:
        "In preparazione. Materiale registrato, esercizi guidati e un metodo chiaro da applicare a casa.",
      datePending: "Data da confermare",
      locale: "it-IT",
      seats: "posti disponibili",
      book: "Prenota",
    },
    commissions: {
      heading: ["Pezzi unici", "per progetti speciali"],
    },
    gallery: {
      ...siteContents.es.ui.gallery,
      heading: ["Opere", "selezionate"],
      text:
        "Pezzi che mostrano il livello, il dettaglio e la dedizione di ogni progetto.",
      full: "Vedi la galleria completa",
      href: "/it/galeria",
      number: "N.",
    },
    about: {
      ...siteContents.es.ui.about,
      heading: ["Il percorso", "come racconto di un mestiere"],
      imageAlt: "Julio Cabos nel suo atelier",
      caption: "Atelier · Madrid · Spagna",
      closing: "Più di un curriculum, un modo di lavorare.",
      pdfSuffix: "professionale (PDF)",
      story: [
        {
          ...siteContents.es.ui.about.story[0],
          label: "Il mestiere",
          title: "Prima dell'effetto, lo sguardo.",
          text:
            "La pittura inizia prima di prendere il pennello: analizzare la luce, comprendere il volume e decidere ciò di cui la figura ha bisogno per funzionare.",
          alt: "Julio Cabos dipinge una miniatura al tavolo di lavoro",
        },
        {
          ...siteContents.es.ui.about.story[1],
          label: "Opera e riconoscimenti",
          title: "Un percorso costruito pezzo dopo pezzo.",
          text:
            "Premi, pubblicazioni e progetti professionali accompagnano una carriera dedicata alle miniature da esposizione e al lavoro di alto livello.",
          alt: "Julio Cabos con un riconoscimento professionale accanto alle vetrine di miniature",
        },
        {
          ...siteContents.es.ui.about.story[2],
          label: "Formazione",
          title: "Insegnare a comprendere, non a copiare.",
          text:
            "I suoi corsi non si concentrano sulla ripetizione di ricette, ma sul dare all'allievo gli strumenti per risolvere qualsiasi figura con maggiore sicurezza.",
          alt: "Julio Cabos durante una sessione di formazione con gli allievi",
        },
        {
          ...siteContents.es.ui.about.story[3],
          label: "Oggi",
          title: "Opere, formazione e collaborazioni.",
          text:
            "Julio lavora con collezionisti, marchi e allievi partendo dalla stessa idea: dipingere miniature comprendendo perché funzionano.",
          alt: "Julio Cabos dipinge durante una dimostrazione di miniature",
        },
      ],
    },
    waitlist: {
      ...siteContents.es.ui.waitlist,
      heading: ["Corsi, posti", "e progetti"],
      text:
        "Ricevi aggiornamenti sui corsi in presenza, la formazione online, la disponibilità per opere su commissione e i progetti speciali.",
      note: "Niente spam. Solo informazioni rilevanti quando ci sarà qualcosa di importante da raccontare.",
      successTitle: "Fatto!",
      successTextBefore: "Ti sei iscritto alla lista d'attesa. Scriveremo a",
      successTextAfter: "non appena apriranno le iscrizioni.",
      name: "Nome",
      namePlaceholder: "Il tuo nome",
      level: "Il tuo livello",
      levels: [
        { value: "principiante", label: "Principiante" },
        { value: "intermedio", label: "Intermedio" },
        { value: "avanzado", label: "Avanzato" },
      ],
      sending: "Invio...",
      submit: "Iscriviti alla lista d'attesa",
      privacy: "Solo comunicazioni rilevanti su formazione e progetti.",
      subject: "Lista d'attesa",
      message:
        "Desidera ricevere aggiornamenti su corsi in presenza, formazione online, commissioni e progetti speciali.",
      error: "Errore durante l'invio del modulo",
    },
    contact: {
      heading: ["Parliamo", "del tuo progetto"],
      direct: "Oppure scrivi direttamente a",
    },
    form: {
      ...siteContents.es.ui.form,
      source: "Tipo di richiesta",
      sources: {
        commission: "Opere su commissione",
        collaboration: "Collaborazione professionale",
        training: "Formazione",
        course: "Corso pubblicato",
        general: "Richiesta generale",
      },
      name: "Nome",
      namePlaceholder: "Il tuo nome",
      phone: "Telefono",
      phonePlaceholder: "Facoltativo",
      message: "Messaggio",
      messagePlaceholder:
        "Raccontaci cosa ti serve, le date, il tipo di pezzo o il corso che ti interessa...",
      sending: "Invio...",
      submit: "Invia richiesta",
      successTitle: "Richiesta inviata",
      successText:
        "Grazie. Il tuo messaggio è stato registrato e Julio potrà risponderti via email.",
      sendAnother: "Invia un'altra richiesta",
      sendError: "Non è stato possibile inviare la richiesta.",
    },
    footer: {
      index: "INDICE",
      social: "SOCIAL",
      rights: "TUTTI I DIRITTI RISERVATI",
      credits: "DESIGN & CODICE",
    },
  },
};

export function getSiteContent(locale: Locale = "es") {
  if (locale === "it") return italianSiteContent;
  return siteContents[locale];
}
