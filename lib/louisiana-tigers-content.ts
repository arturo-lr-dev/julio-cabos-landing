import type { Locale } from "@/lib/site-content";

export type LouisianaCarousel = {
  label: string;
  slides: Array<[string, string]>;
  note?: string;
};

export type LouisianaSection = {
  index: string;
  title: string;
  paragraphs: string[];
  advice?: { label: string; text: string };
  carousel?: LouisianaCarousel;
  secondTitle?: string;
  secondCarousel?: LouisianaCarousel;
};

export type LouisianaTigersCopy = {
  eyebrow: string;
  titleLineOne: string;
  titleLineTwo: string;
  subtitle: string;
  metaFirstLine: string;
  metaSecondLine: string;
  back: string;
  previous: string;
  next: string;
  choosePhoto: string;
  showPhoto: string;
  imageAlt: string;
  sections: LouisianaSection[];
};

const image = (file: string, captions: string[], label: string, note?: string): LouisianaCarousel => ({
  label,
  slides: captions.map((caption, index) => [file.replace("{n}", String(index + 1).padStart(2, "0")), caption]),
  note,
});

export const louisianaTigersCopy: Record<Locale, LouisianaTigersCopy> = {
  es: {
    eyebrow: "OBRA · PROCESO DE PINTURA",
    titleLineOne: "LOUISIANA",
    titleLineTwo: "TIGERS",
    subtitle: "SPECIAL BATTALION 1862",
    metaFirstLine: "Odyssey Collectibles · 75 mm",
    metaSecondLine: "Julio Cabos",
    back: "← Volver a Biblioteca",
    previous: "Fotografía anterior",
    next: "Fotografía siguiente",
    choosePhoto: "Elegir fotografía",
    showPhoto: "Mostrar fotografía",
    imageAlt: "Louisiana Tigers, obra terminada",
    sections: [
      {
        index: "01 / LOUISIANA TIGERS",
        title: "RESEÑA HISTÓRICA",
        paragraphs: [
          "Los Tigres de Louisiana eran varias unidades de infantería del Ejército de los Estados Confederados de Louisiana durante la guerra civil americana. Originalmente, se llamó así a una compañía específica; el apodo se extendió a un batallón y más tarde a una brigada y finalmente a todas las tropas Louisiana del Ejército de Virginia del Norte.",
          "Un gran número de hombres eran voluntarios extranjeros, en particular estadounidenses de origen irlandés.",
          "Un acaudalado empresario de Nueva Orleans, A. Keene Richards, decidió equipar a la compañía de chaquetas de Zuavos de lana azul oscuro con ribetes rojos, camisas de franela rojas con cuello mao y pintorescos pantalones de barco de algodón con rayas verticales azul y crema wedgwood, así como medias blancas con rayas azules horizontales con calzas de lona blanca. Esta vestimenta fue su firma de identidad.",
        ],
      },
      {
        index: "02 / LOUISIANA TIGERS",
        title: "LA FIGURA Y LA PINTURA",
        paragraphs: [
          "La figura pertenece a la marca Odyssey Collectibles, modelada por Eduard Pérez y producida en resina a escala de 75 mm.",
          "Para ambientar la pintura de esta figura, me he inspirado en las láminas del ilustrador americano Don Troiani, una verdadera guía para la elección de colores.",
          "Como en todos los trabajos de pintura, la planificación es fundamental y, sobre todo, como es en mi caso, al utilizar el aerógrafo para pintar ciertas partes de la figura.",
          "Comencé por las calzas, las medias y los pantalones, pintando con aerógrafo, ya que todas son de un tono blanco roto.",
          "He utilizado para todos los procesos, tanto con aerógrafo como a pincel, la gama Artist Dense Acrylic Colors (AKAD) y las 3GEN de AK Interactive, ambas perfectamente compatibles para el uso de ambas técnicas.",
          "Variando las sombras y las luces en las distintas partes que van en el mismo tono de blanco roto, conseguí diferenciar los distintos elementos, pero sin perder la armonía general. Para las sombras del pantalón y las medias usé un tono de gris violeta y para las calzas un tono de sombra tostada.",
          "Finalizada esta primera fase de aerógrafo, repasé algunas de las arrugas principales del pantalón y las medias, sin llegar a un acabado definitivo de detalles, ya que ambas van a tener que combinarse con diferentes rayas.",
        ],
        carousel: image("proceso-01-{n}.jpg", ["Base de pantalón, medias y calzas", "Primeras sombras de los pliegues", "Base vista posterior", "Volúmenes antes de las rayas"], "PRIMERAS BASES · BLANCOS Y VOLÚMENES"),
      },
      {
        index: "03 / LOUISIANA TIGERS",
        title: "LAS RAYAS",
        paragraphs: [
          "Comencé el desarrollo de las rayas horizontales de las medias, que son algo más sencillas, y seguí con el tejido del pantalón, conocido también como tela de colchón.",
          "En las luces, el color Ivory de 3GEN, combinado con blanco y beige.",
          "El grosor de las rayas verticales no era lo suficientemente finas para poder trazar una línea de una sola vez con el pincel; debía hacer dos líneas paralelas y luego rellenar el espacio entre ambas para formar una raya.",
          "Además, la clave no era hacer tiras continuas, ya que las arrugas interrumpen las formas y la trayectoria del rayado. Sin duda, la pintura de esta parte era una de las claves de esta figura para conseguir un resultado realista.",
          "Seguramente para muchos pintores de miniaturas este tipo de trabajos suele ser un reto; yo no fui una excepción.",
        ],
        advice: {
          label: "CONSEJO DE JULIO",
          text: "Un consejo que puede ser de gran utilidad es mezclar el color base de las rayas con un poco de retardante acrílico. Esto nos permitirá hacer correcciones inmediatamente, pasando solo el pincel con agua limpia sobre la pincelada fallida y borrarlo fácilmente sin dejar restos del color sobre el fondo blanco.",
        },
        carousel: image("proceso-02-{n}.jpg", ["Inicio del trazado de las rayas", "Rayas verticales en desarrollo", "Trazado desde otro ángulo", "Rayas y arrugas del tejido", "Detalle lateral del patrón", "Rayas sobre el volumen del pantalón"], "EVOLUCIÓN DE LAS RAYAS", "Secuencia de imágenes de trabajo sobre las rayas; el orden es editorial y no acredita cada paso exacto de ejecución."),
      },
      {
        index: "04 / LOUISIANA TIGERS",
        title: "CHAQUETA Y EQUIPO",
        paragraphs: [
          "Lo siguiente fue la chaqueta que originalmente era azul pero a partir de 1862, era también común verlas en marrón. Si bien estuve dudando en pintarla de este color, me decanté por el azul, no solo porque era más emblemático el uniforme en ese color, sino que otros detalles como la manta que la rodea, me encajaba mejor en el esquema de colores de la figura.",
          "Seguí pintando el resto detalles como la manta, las partes de cuero y el cinturón, así como la cantimplora, dejando para el final las partes de la piel, cara y manos.",
        ],
        carousel: image("proceso-03-{n}.jpg", ["Primera aplicación de azul en la chaqueta", "Trabajo con aerógrafo en la manga", "Desarrollo de las sombras azules", "Chaqueta y pantalón ensamblados", "Incorporación de las partes rojas", "Progreso de chaqueta y equipo", "Uniforme desde la vista posterior"], "CHAQUETA, MANTA Y EQUIPO"),
      },
      {
        index: "05 / LOUISIANA TIGERS",
        title: "PINTURA DE LA PIEL",
        paragraphs: [
          "No sigo siempre un mismo patrón de trabajo, ni tampoco tengo una mezcla establecida para pintar todas estas partes.",
          "En esta ocasión busqué un tono de piel tanto para el color base ligeramente tostado (cálido), y en las luces, contrarrestando la calidez de las sombras, usé tonos más fríos, sobre todo al final del proceso.",
          "El color base de la piel ha sido una mezcla de:",
          "Basic Flesh AKAD013 + Earth Brown AKAD017 + Oxido Red AKAD015.",
          "Pasamos a las primeras luces con una mezcla del Color Base + Sunny Skin Tone 3GEN.",
          "En las últimas luces hacemos una mezcla más fría con:",
          "Basic Skin Tone 3GEN + Wine Red 3GEN + Cyan AKAD004.",
          "Los tonos intermedios fueron múltiples mezclas de microtonos muy sutiles con violeta, Cyan, Basic Flesh, Verde y Azul Ultramarine, todos de la gama Artist Dense Acrylic, de AK.",
        ],
        carousel: image("proceso-04-{n}.jpg", ["Primer plano del rostro", "Figura en una fase avanzada", "Rostro y hombros vistos de cerca", "Figura con el fusil", "Escala de la miniatura en la mano"], "ROSTRO Y ÚLTIMOS DETALLES"),
      },
      {
        index: "06 / LOUISIANA TIGERS",
        title: "EL ESCENARIO",
        paragraphs: [
          "El escenario era otro de los elementos fundamentales para generar esa atmósfera de los bosques en otoño, colocando una serie de árboles con ramas muy finas y poco pobladas de hojas, que dieran dicha sensación.",
          "Los troncos finos que imitan a un roble son raíces de gramínea a las que se fue pegando hoja a hoja, sobre otras raíces más finas que formaban las ramas. Las hojas de papel troquelado son de la marca Plus Model.",
          "Para integrar la figura al terreno y que constituyera una escena de combate, era necesario manchar parte del uniforme; para ello usé una mezcla de retardante acrílico y Earth Brown AKAD017 para las manchas más oscuras y Off White AKAD002 + Siena AKAD016 para otras más claras.",
          "Si bien he pintado muchísimos Box Art a lo largo de mi carrera profesional, esta figura ha resultado para mí una de mis favoritas.",
          "Os animo a pintarla; hay otras opciones que pueden resultar más o menos sencillas, aunque nadie se librará de pintar las rayas azules del pantalón…",
        ],
        carousel: image("proceso-05-{n}.jpg", ["Árboles y terreno antes de colocar la figura", "Estructura vegetal desde el frente", "Árboles vistos en tres cuartos", "Figura incorporada al escenario", "Integración del uniforme en el terreno"], "CONSTRUCCIÓN DEL ESCENARIO"),
        secondTitle: "La obra terminada",
        secondCarousel: image("proceso-06-{n}.jpg", ["Vista frontal del conjunto", "Vista frontal alternativa", "Composición en tres cuartos", "Vista posterior", "Vista lateral con el bosque", "Vista de perfil del conjunto"], "LA OBRA TERMINADA · DIFERENTES ÁNGULOS"),
      },
      {
        index: "07 / LOUISIANA TIGERS",
        title: "EL BATALLÓN ESPECIAL DE LOS TIGRES DE LUISIANA",
        paragraphs: [
          "El Batallón Especial de los Tigres de Luisiana (los Tigres de Wheat), conocido por su ferocidad en batallas como la de First Manassas, se disolvió en agosto de 1862 después de que su comandante, el mayor Chatham Wheat, muriera en Gaines’ Mill. Sus hombres fueron reasignados a otras unidades de Luisiana a pesar de su temible reputación y su distintivo atuendo similar al de los zuavos.",
          "Formación e identidad (1861)",
          "Creador: el mayor Chatham Roberdeau Wheat, una figura legendaria con una dilatada experiencia militar.",
          "Reclutas: principalmente gente ruda, a menudo de origen extranjero, estibadores y «gentuza» de Nueva Orleans, incluidos inmigrantes irlandeses.",
          "Nombre oficial: 1.er Batallón Especial, Infantería de Luisiana (también llamado 2.º Batallón de Luisiana).",
          "Origen del apodo: proviene de la compañía «Tiger Rifles» del capitán Robert Harris dentro del batallón, un nombre que ellos adoptaron.",
          "Apariencia: conocidos por sus distintivos y llamativos uniformes de estilo zuavo (camisas rojas, pantalones a rayas, fez) y grandes cuchillos Bowie.",
        ],
      },
      {
        index: "08 / LOUISIANA TIGERS",
        title: "ORÍGENES",
        paragraphs: [
          "El famoso filibustero Roberdeau Wheat, que regresó de Italia en la primavera de 1861, tenía la intención de formar una compañía de tropas de Nueva Orleans y luego un regimiento completo para el servicio confederado.",
          "El 18 de abril de 1861, pocos días después de que Fort Sumter fuera atacado por las fuerzas confederadas, el New Orleans Daily Crescent publicó el siguiente anuncio:",
          "«Tenemos entendido que nuestro amigo, el general C. R. Wheat, está a punto de formar una compañía de voluntarios para servir en el Ejército de Luisiana. Su cuartel general se encuentra en el número 64 de la calle Saint Charles, donde aconsejamos a todos los amigos de una causa gloriosa que acudan y se alisten».",
          "Wheat llamó a su compañía «Old Dominion Guards» (Guardias del Viejo Dominio) para conmemorar la reciente secesión de su estado natal (Virginia) de los Estados Unidos para unirse a la Confederación del Sur.",
          "Con la ayuda de Obedia Plummer Miller, un prestigioso abogado de Nueva Orleans, Wheat reclutó rápidamente a unos cincuenta hombres para su compañía, en su mayoría expatriados de Virginia, como Bruce Putnam, un hombre imponente que se convirtió en el intimidante sargento mayor de Wheat.",
        ],
      },
      {
        index: "09 / LOUISIANA TIGERS",
        title: "ACCIONES CLAVE Y DESTINO (1862)",
        paragraphs: [
          "Primera batalla de Manassas (1861):\nAdquirió fama temprana por su valentía y sus peleas.",
          "Campaña del valle de Jackson y batallas de los siete días (verano de 1862): luchó ferozmente junto a las tropas de Stonewall Jackson.",
          "Muerte de Wheat: En la batalla de Gaines’ Mill, el 27 de junio de 1862, Wheat murió al frente de una carga.",
          "Disolución: Sin Wheat para controlarlos, la disciplina de la unidad se desmoronó; fueron disueltos oficialmente por orden especial el 21 de agosto de 1862, y los soldados restantes fueron enviados a otros regimientos.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "WORK · PAINTING PROCESS",
    titleLineOne: "LOUISIANA",
    titleLineTwo: "TIGERS",
    subtitle: "SPECIAL BATTALION 1862",
    metaFirstLine: "Odyssey Collectibles · 75 mm",
    metaSecondLine: "Julio Cabos",
    back: "← Back to Library",
    previous: "Previous photograph",
    next: "Next photograph",
    choosePhoto: "Choose photograph",
    showPhoto: "Show photograph",
    imageAlt: "Louisiana Tigers, finished work",
    sections: [
      {
        index: "01 / LOUISIANA TIGERS",
        title: "HISTORICAL OVERVIEW",
        paragraphs: [
          "The Louisiana Tigers were several infantry units of the Confederate States Army of Louisiana during the American Civil War. Originally, the name referred to a specific company; the nickname spread to a battalion and later to a brigade, and eventually to all Louisiana troops in the Army of Northern Virginia.",
          "A large number of the men were foreign volunteers, particularly Americans of Irish descent.",
          "A wealthy New Orleans businessman, A. Keene Richards, decided to equip the company with dark blue wool zouave jackets with red trim, red flannel shirts with mandarin collars, and picturesque cotton sailor trousers with vertical blue and Wedgewood cream stripes, along with white stockings with horizontal blue stripes and white canvas gaiters. This clothing became their identifying signature.",
        ],
      },
      {
        index: "02 / LOUISIANA TIGERS",
        title: "THE FIGURE AND THE PAINTING",
        paragraphs: [
          "The figure is from Odyssey Collectibles, sculpted by Eduard Pérez and produced in resin at a scale of 75 mm.",
          "To set the direction for painting this figure, I drew inspiration from the plates by the American illustrator Don Troiani, a true guide for the choice of colours.",
          "As with every painting project, planning is essential, especially in my case when using the airbrush to paint certain parts of the figure.",
          "I began with the gaiters, stockings and trousers, using the airbrush because they are all an off-white tone.",
          "For every stage, both with the airbrush and the brush, I used Artist Dense Acrylic Colors (AKAD) and AK Interactive 3GEN, both of which are perfectly compatible with the two techniques.",
          "By varying the shadows and highlights across the different parts painted in the same off-white tone, I was able to distinguish the separate elements without losing overall harmony. For the shadows on the trousers and stockings I used a violet-grey tone, and for the gaiters a burnt umber shade.",
          "Once this first airbrush stage was complete, I went back over some of the main folds in the trousers and stockings without finishing all the details, as both areas would still need to be combined with different stripes.",
        ],
        carousel: image("proceso-01-{n}.jpg", ["Base coat on trousers, stockings and gaiters", "First shadows in the folds", "Base coat from the rear", "Volumes before the stripes"], "FIRST BASES · WHITES AND VOLUMES"),
      },
      {
        index: "03 / LOUISIANA TIGERS",
        title: "THE STRIPES",
        paragraphs: [
          "I began developing the horizontal stripes on the stockings, which are somewhat simpler, and then continued with the trouser fabric, also known as mattress ticking.",
          "For the highlights, Ivory from 3GEN, combined with white and beige.",
          "The vertical stripes were not thin enough to draw in a single brushstroke; I had to make two parallel lines and then fill the space between them to form a stripe.",
          "The key was also not to paint continuous bands, since the folds interrupt the shapes and the direction of the pattern. Without a doubt, painting this part was one of the keys to achieving a realistic result on the figure.",
          "This kind of work is probably a challenge for many miniature painters; I was no exception.",
        ],
        advice: {
          label: "JULIO'S TIP",
          text: "A very useful tip is to mix the base stripe colour with a little acrylic retarder. This allows us to make corrections immediately by passing only a brush with clean water over a failed stroke and removing it easily without leaving any colour behind on the white background.",
        },
        carousel: image("proceso-02-{n}.jpg", ["Beginning the stripe pattern", "Vertical stripes in progress", "Pattern viewed from another angle", "Stripes and folds in the fabric", "Side detail of the pattern", "Stripes across the trouser volume"], "DEVELOPMENT OF THE STRIPES", "A sequence of work-in-progress images; the order is editorial and does not document every exact execution step."),
      },
      {
        index: "04 / LOUISIANA TIGERS",
        title: "JACKET AND EQUIPMENT",
        paragraphs: [
          "Next came the jacket, which was originally blue, although from 1862 onwards brown jackets were also commonly seen. Although I considered painting it brown, I chose blue, not only because the uniform was more emblematic in that colour, but also because details such as the blanket around it fitted the figure's colour scheme better.",
          "I continued painting the remaining details, such as the blanket, leather parts and belt, as well as the canteen, leaving the skin, face and hands until the end.",
        ],
        carousel: image("proceso-03-{n}.jpg", ["First application of blue on the jacket", "Airbrush work on the sleeve", "Development of the blue shadows", "Jacket and trousers assembled", "Adding the red parts", "Progress on jacket and equipment", "Uniform from the rear"], "JACKET, BLANKET AND EQUIPMENT"),
      },
      {
        index: "05 / LOUISIANA TIGERS",
        title: "PAINTING THE SKIN",
        paragraphs: [
          "I do not always follow the same working pattern, nor do I have one fixed mix for painting all of these areas.",
          "On this occasion I looked for a skin tone with a slightly burnt, warm base colour, while in the highlights, countering the warmth of the shadows, I used cooler tones, especially towards the end of the process.",
          "The base skin colour was a mix of:",
          "Basic Flesh AKAD013 + Earth Brown AKAD017 + Oxido Red AKAD015.",
          "We move on to the first highlights with a mix of the Base Colour + Sunny Skin Tone 3GEN.",
          "For the final highlights we make a cooler mix with:",
          "Basic Skin Tone 3GEN + Wine Red 3GEN + Cyan AKAD004.",
          "The mid-tones were multiple, very subtle micro-tone mixes with violet, Cyan, Basic Flesh, Green and Ultramarine Blue, all from AK's Artist Dense Acrylic range.",
        ],
        carousel: image("proceso-04-{n}.jpg", ["Close-up of the face", "Figure at an advanced stage", "Face and shoulders in close view", "Figure with the rifle", "The scale of the miniature in hand"], "FACE AND FINAL DETAILS"),
      },
      {
        index: "06 / LOUISIANA TIGERS",
        title: "THE SETTING",
        paragraphs: [
          "The setting was another fundamental element in creating the atmosphere of an autumn forest, placing a series of trees with very fine branches and sparse leaves to convey that feeling.",
          "The slender trunks that imitate an oak are grass roots to which leaves were attached one by one, over other finer roots that formed the branches. The die-cut paper leaves are from Plus Model.",
          "To integrate the figure into the ground and make it a combat scene, it was necessary to stain part of the uniform; for this I used a mix of acrylic retarder and Earth Brown AKAD017 for the darker stains, and Off White AKAD002 + Siena AKAD016 for the lighter ones.",
          "Although I have painted many Box Arts throughout my professional career, this figure has become one of my favourites.",
          "I encourage you to paint it; there are other options that may be more or less straightforward, although nobody will escape painting the blue stripes on the trousers…",
        ],
        carousel: image("proceso-05-{n}.jpg", ["Trees and ground before placing the figure", "Vegetation structure from the front", "Trees viewed in three-quarter view", "Figure added to the setting", "Integrating the uniform into the ground"], "CONSTRUCTION OF THE SETTING"),
        secondTitle: "The finished work",
        secondCarousel: image("proceso-06-{n}.jpg", ["Front view of the whole scene", "Alternative front view", "Three-quarter composition", "Rear view", "Side view with the forest", "Profile view of the whole scene"], "THE FINISHED WORK · DIFFERENT ANGLES"),
      },
      {
        index: "07 / LOUISIANA TIGERS",
        title: "THE LOUISIANA TIGERS SPECIAL BATTALION",
        paragraphs: [
          "The Louisiana Tigers Special Battalion (Wheat's Tigers), known for its ferocity in battles such as First Manassas, was disbanded in August 1862 after its commander, Major Chatham Wheat, was killed at Gaines' Mill. Its men were reassigned to other Louisiana units despite their fearsome reputation and distinctive zouave-like dress.",
          "Formation and identity (1861)",
          "Founder: Major Chatham Roberdeau Wheat, a legendary figure with extensive military experience.",
          "Recruits: mainly rough men, often of foreign origin, dockworkers and 'riff-raff' from New Orleans, including Irish immigrants.",
          "Official name: 1st Special Battalion, Louisiana Infantry (also called the 2nd Louisiana Battalion).",
          "Origin of the nickname: it came from Captain Robert Harris's 'Tiger Rifles' company within the battalion, a name they adopted.",
          "Appearance: known for their distinctive and striking zouave-style uniforms (red shirts, striped trousers, fez) and large Bowie knives.",
        ],
      },
      {
        index: "08 / LOUISIANA TIGERS",
        title: "ORIGINS",
        paragraphs: [
          "The famous filibuster Roberdeau Wheat, who returned from Italy in the spring of 1861, intended to form a company of New Orleans troops and then a complete regiment for Confederate service.",
          "On 18 April 1861, a few days after Fort Sumter was attacked by Confederate forces, the New Orleans Daily Crescent published the following announcement:",
          "'We understand that our friend, General C. R. Wheat, is about to form a company of volunteers to serve in the Louisiana Army. His headquarters are at 64 St. Charles Street, where we advise all friends of a glorious cause to come and enlist.'",
          "Wheat called his company the Old Dominion Guards to commemorate the recent secession of his home state (Virginia) from the United States to join the Confederacy of the South.",
          "With the help of Obedia Plummer Miller, a respected New Orleans lawyer, Wheat quickly recruited around fifty men for his company, mostly expatriates from Virginia, such as Bruce Putnam, an imposing man who became Wheat's intimidating sergeant major.",
        ],
      },
      {
        index: "09 / LOUISIANA TIGERS",
        title: "KEY ACTIONS AND FATE (1862)",
        paragraphs: [
          "First Battle of Manassas (1861):\nIt gained an early reputation for bravery and fighting.",
          "Jackson's Valley Campaign and the Seven Days Battles (summer 1862): fought fiercely alongside Stonewall Jackson's troops.",
          "Wheat's death: At the Battle of Gaines' Mill, on 27 June 1862, Wheat was killed leading a charge.",
          "Disbandment: Without Wheat to control them, the unit's discipline collapsed; they were officially disbanded by special order on 21 August 1862, and the remaining soldiers were sent to other regiments.",
        ],
      },
    ],
  },
  it: {
    eyebrow: "OPERA · PROCESSO DI PITTURA",
    titleLineOne: "LOUISIANA",
    titleLineTwo: "TIGERS",
    subtitle: "SPECIAL BATTALION 1862",
    metaFirstLine: "Odyssey Collectibles · 75 mm",
    metaSecondLine: "Julio Cabos",
    back: "← Torna alla Biblioteca",
    previous: "Fotografia precedente",
    next: "Fotografia successiva",
    choosePhoto: "Scegli fotografia",
    showPhoto: "Mostra fotografia",
    imageAlt: "Louisiana Tigers, opera terminata",
    sections: [
      {
        index: "01 / LOUISIANA TIGERS",
        title: "PANORAMICA STORICA",
        paragraphs: [
          "I Louisiana Tigers erano diverse unità di fanteria dell'Esercito degli Stati Confederati della Louisiana durante la guerra civile americana. In origine il nome indicava una compagnia specifica; il soprannome si estese a un battaglione, poi a una brigata e infine a tutte le truppe della Louisiana dell'Armata della Virginia Settentrionale.",
          "Un gran numero di uomini erano volontari stranieri, in particolare americani di origine irlandese.",
          "Un facoltoso imprenditore di New Orleans, A. Keene Richards, decise di equipaggiare la compagnia con giacche da zuavo in lana blu scuro con bordi rossi, camicie di flanella rossa con collo alla coreana e pittoreschi pantaloni da marinaio in cotone con strisce verticali blu e crema Wedgewood, oltre a calze bianche con strisce orizzontali blu e ghette di tela bianca. Questo abbigliamento divenne il loro segno distintivo.",
        ],
      },
      {
        index: "02 / LOUISIANA TIGERS",
        title: "LA FIGURA E LA PITTURA",
        paragraphs: [
          "La figura appartiene al marchio Odyssey Collectibles, è stata scolpita da Eduard Pérez e prodotta in resina in scala 75 mm.",
          "Per definire l'ambientazione della pittura di questa figura mi sono ispirato alle tavole dell'illustratore americano Don Troiani, una vera guida per la scelta dei colori.",
          "Come in ogni lavoro di pittura, la pianificazione è fondamentale, soprattutto nel mio caso quando utilizzo l'aerografo per dipingere alcune parti della figura.",
          "Ho iniziato dalle ghette, dalle calze e dai pantaloni, dipingendo con l'aerografo perché sono tutti di una tonalità bianco sporco.",
          "Per tutti i processi, sia con l'aerografo sia a pennello, ho utilizzato la gamma Artist Dense Acrylic Colors (AKAD) e i colori 3GEN di AK Interactive, perfettamente compatibili con entrambe le tecniche.",
          "Variando ombre e luci nelle diverse parti dipinte con la stessa tonalità di bianco sporco, sono riuscito a distinguere i vari elementi senza perdere l'armonia generale. Per le ombre dei pantaloni e delle calze ho usato una tonalità grigio-violacea e per le ghette una tonalità di terra d'ombra bruciata.",
          "Terminata questa prima fase ad aerografo, ho ripassato alcune delle pieghe principali dei pantaloni e delle calze senza arrivare a una finitura definitiva dei dettagli, perché entrambe le parti avrebbero dovuto essere abbinate a strisce diverse.",
        ],
        carousel: image("proceso-01-{n}.jpg", ["Base di pantaloni, calze e ghette", "Prime ombre nelle pieghe", "Base vista dal retro", "Volumi prima delle strisce"], "PRIME BASI · BIANCHI E VOLUMI"),
      },
      {
        index: "03 / LOUISIANA TIGERS",
        title: "LE STRISCE",
        paragraphs: [
          "Ho iniziato a sviluppare le strisce orizzontali delle calze, leggermente più semplici, e ho proseguito con il tessuto dei pantaloni, noto anche come tela da materasso.",
          "Per le luci, il colore Ivory di 3GEN, combinato con bianco e beige.",
          "Lo spessore delle strisce verticali non era abbastanza sottile da poter tracciare una linea in una sola pennellata; dovevo realizzare due linee parallele e poi riempire lo spazio tra loro per formare una striscia.",
          "Inoltre, la chiave non era dipingere fasce continue, perché le pieghe interrompono le forme e l'andamento del disegno. Senza dubbio, la pittura di questa parte era una delle chiavi della figura per ottenere un risultato realistico.",
          "Probabilmente per molti pittori di miniature questo tipo di lavoro è una sfida; io non ho fatto eccezione.",
        ],
        advice: {
          label: "IL CONSIGLIO DI JULIO",
          text: "Un consiglio molto utile è mescolare il colore di base delle strisce con un po' di ritardante acrilico. Questo permette di fare subito delle correzioni, passando soltanto un pennello con acqua pulita sulla pennellata sbagliata e cancellandola facilmente senza lasciare residui di colore sul fondo bianco.",
        },
        carousel: image("proceso-02-{n}.jpg", ["Inizio del tracciato delle strisce", "Strisce verticali in sviluppo", "Tracciato visto da un'altra angolazione", "Strisce e pieghe del tessuto", "Dettaglio laterale del motivo", "Strisce sul volume dei pantaloni"], "SVILUPPO DELLE STRISCE", "Sequenza di immagini di lavoro; l'ordine è editoriale e non documenta ogni passaggio esatto dell'esecuzione."),
      },
      {
        index: "04 / LOUISIANA TIGERS",
        title: "GIACCA ED EQUIPAGGIAMENTO",
        paragraphs: [
          "Il passo successivo è stata la giacca, che in origine era blu, anche se dal 1862 era comune vederle anche marroni. Sebbene avessi pensato di dipingerla di marrone, ho scelto il blu, non solo perché l'uniforme era più emblematica in quel colore, ma anche perché dettagli come la coperta che la circonda si adattavano meglio allo schema cromatico della figura.",
          "Ho continuato dipingendo gli altri dettagli, come la coperta, le parti in cuoio e la cintura, oltre alla borraccia, lasciando per ultime la pelle, il viso e le mani.",
        ],
        carousel: image("proceso-03-{n}.jpg", ["Prima applicazione del blu sulla giacca", "Lavoro ad aerografo sulla manica", "Sviluppo delle ombre blu", "Giacca e pantaloni assemblati", "Inserimento delle parti rosse", "Avanzamento di giacca ed equipaggiamento", "Uniforme vista dal retro"], "GIACCA, COPERTA ED EQUIPAGGIAMENTO"),
      },
      {
        index: "05 / LOUISIANA TIGERS",
        title: "PITTURA DELLA PELLE",
        paragraphs: [
          "Non seguo sempre lo stesso schema di lavoro e non ho nemmeno una miscela fissa per dipingere tutte queste parti.",
          "In questa occasione ho cercato un tono di pelle con una base leggermente abbronzata e calda; nelle luci, contrastando il calore delle ombre, ho usato toni più freddi, soprattutto alla fine del processo.",
          "Il colore di base della pelle è stato ottenuto con una miscela di:",
          "Basic Flesh AKAD013 + Earth Brown AKAD017 + Oxido Red AKAD015.",
          "Passiamo alle prime luci con una miscela del Colore Base + Sunny Skin Tone 3GEN.",
          "Per le ultime luci prepariamo una miscela più fredda con:",
          "Basic Skin Tone 3GEN + Wine Red 3GEN + Cyan AKAD004.",
          "I toni intermedi sono stati ottenuti con molteplici miscele di microtoni molto sottili con viola, Cyan, Basic Flesh, Verde e Blu oltremare, tutti della gamma Artist Dense Acrylic di AK.",
        ],
        carousel: image("proceso-04-{n}.jpg", ["Primo piano del volto", "Figura in una fase avanzata", "Volto e spalle in primo piano", "Figura con il fucile", "La scala della miniatura nella mano"], "VOLTO E ULTIMI DETTAGLI"),
      },
      {
        index: "06 / LOUISIANA TIGERS",
        title: "L'AMBIENTAZIONE",
        paragraphs: [
          "L'ambientazione era un altro elemento fondamentale per creare l'atmosfera dei boschi in autunno, collocando una serie di alberi con rami molto sottili e poco ricchi di foglie, capaci di trasmettere quella sensazione.",
          "I tronchi sottili che imitano una quercia sono radici di graminacea alle quali sono state incollate le foglie una a una, sopra altre radici più sottili che formavano i rami. Le foglie di carta fustellata sono del marchio Plus Model.",
          "Per integrare la figura nel terreno e trasformarla in una scena di combattimento, era necessario sporcare parte dell'uniforme; per questo ho usato una miscela di ritardante acrilico ed Earth Brown AKAD017 per le macchie più scure e Off White AKAD002 + Siena AKAD016 per quelle più chiare.",
          "Sebbene abbia dipinto moltissimi Box Art nel corso della mia carriera professionale, questa figura è diventata una delle mie preferite.",
          "Vi invito a dipingerla; ci sono altre opzioni che possono risultare più o meno semplici, anche se nessuno sfuggirà alla pittura delle strisce blu dei pantaloni…",
        ],
        carousel: image("proceso-05-{n}.jpg", ["Alberi e terreno prima di collocare la figura", "Struttura vegetale vista dal fronte", "Alberi visti di tre quarti", "Figura inserita nell'ambientazione", "Integrazione dell'uniforme nel terreno"], "COSTRUZIONE DELL'AMBIENTAZIONE"),
        secondTitle: "L'opera terminata",
        secondCarousel: image("proceso-06-{n}.jpg", ["Vista frontale dell'insieme", "Vista frontale alternativa", "Composizione di tre quarti", "Vista posteriore", "Vista laterale con il bosco", "Vista di profilo dell'insieme"], "L'OPERA TERMINATA · DIVERSE ANGOLAZIONI"),
      },
      {
        index: "07 / LOUISIANA TIGERS",
        title: "IL BATTAGLIONE SPECIALE DEI TIGRI DELLA LOUISIANA",
        paragraphs: [
          "Il Battaglione Speciale dei Tigri della Louisiana (i Tigri di Wheat), noto per la sua ferocia in battaglie come First Manassas, fu sciolto nell'agosto del 1862 dopo che il suo comandante, il maggiore Chatham Wheat, morì a Gaines' Mill. I suoi uomini furono riassegnati ad altre unità della Louisiana nonostante la loro temibile reputazione e il caratteristico abbigliamento simile a quello degli zuavi.",
          "Formazione e identità (1861)",
          "Creatore: il maggiore Chatham Roberdeau Wheat, una figura leggendaria con una lunga esperienza militare.",
          "Reclute: principalmente uomini duri, spesso di origine straniera, scaricatori del porto e 'gentaglia' di New Orleans, compresi immigrati irlandesi.",
          "Nome ufficiale: 1º Battaglione Speciale, Fanteria della Louisiana (chiamato anche 2º Battaglione della Louisiana).",
          "Origine del soprannome: deriva dalla compagnia 'Tiger Rifles' del capitano Robert Harris all'interno del battaglione, un nome che adottarono.",
          "Aspetto: noti per le loro uniformi distintive e vistose in stile zuavo (camicie rosse, pantaloni a strisce, fez) e i grandi coltelli Bowie.",
        ],
      },
      {
        index: "08 / LOUISIANA TIGERS",
        title: "ORIGINI",
        paragraphs: [
          "Il famoso filibustiere Roberdeau Wheat, tornato dall'Italia nella primavera del 1861, intendeva formare una compagnia di truppe di New Orleans e poi un reggimento completo per il servizio confederato.",
          "Il 18 aprile 1861, pochi giorni dopo che Fort Sumter era stato attaccato dalle forze confederate, il New Orleans Daily Crescent pubblicò il seguente annuncio:",
          "'Abbiamo inteso che il nostro amico, il generale C. R. Wheat, sta per formare una compagnia di volontari per servire nell'Esercito della Louisiana. Il suo quartier generale si trova al numero 64 di Saint Charles Street, dove consigliamo a tutti gli amici di una causa gloriosa di venire ad arruolarsi.'",
          "Wheat chiamò la sua compagnia Old Dominion Guards per commemorare la recente secessione del suo Stato natale (la Virginia) dagli Stati Uniti per unirsi alla Confederazione del Sud.",
          "Con l'aiuto di Obedia Plummer Miller, un importante avvocato di New Orleans, Wheat reclutò rapidamente circa cinquanta uomini per la sua compagnia, per lo più espatriati della Virginia, come Bruce Putnam, un uomo imponente che divenne l'intimidatorio sergente maggiore di Wheat.",
        ],
      },
      {
        index: "09 / LOUISIANA TIGERS",
        title: "AZIONI CHIAVE E DESTINO (1862)",
        paragraphs: [
          "Prima battaglia di Manassas (1861):\nAcquisì presto fama per il suo coraggio e per i suoi combattimenti.",
          "Campagna della valle di Jackson e battaglie dei sette giorni (estate del 1862): combatté ferocemente al fianco delle truppe di Stonewall Jackson.",
          "Morte di Wheat: nella battaglia di Gaines' Mill, il 27 giugno 1862, Wheat morì alla testa di una carica.",
          "Scioglimento: senza Wheat a controllarli, la disciplina dell'unità crollò; furono ufficialmente sciolti per ordine speciale il 21 agosto 1862 e i soldati rimasti furono inviati ad altri reggimenti.",
        ],
      },
    ],
  },
};
