export const RESTAURANT = {
  name: "Aldeano Restaurante",
  city: "Mexicali, Baja California",
  address: "C. Novena 679, 21376 Mexicali, B.C.",
  // Shown on the site and dialed by tap-to-call.
  phoneDisplay: "+52 686 842 9240",
  phoneTel: "+526868429240",
  // Where reservation messages are sent — deliberately a different line.
  whatsapp: "526865050041",
  mapEmbed:
    "https://www.google.com/maps?q=C.+Novena+679,+21376+Mexicali,+B.C.&output=embed",
} as const;

export const NAV_LINKS = [
  { href: "#historia", label: "Nosotros" },
  { href: "#menu", label: "Menú" },
  { href: "#galeria", label: "Galería" },
  { href: "#info", label: "Ubicación" },
] as const;

/* ---------- horario ---------- */

/** Open range in 24h. `null` = closed. Keyed by JS getDay() (0 = domingo). */
export type HourRange = { start: number; end: number } | null;

export const HOURS: Record<number, HourRange> = {
  1: null,
  2: { start: 13, end: 22 },
  3: { start: 13, end: 22 },
  4: { start: 13, end: 23 },
  5: { start: 13, end: 23 },
  6: { start: 13, end: 23 },
  0: { start: 13, end: 18 },
};

export const DAY_NAMES = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

/** Display order for the hours table: lunes → domingo. */
export const HOURS_TABLE: { day: number; label: string; value: string }[] = [
  { day: 1, label: "Lunes", value: "Cerrado" },
  { day: 2, label: "Martes", value: "1:00 – 10:00 PM" },
  { day: 3, label: "Miércoles", value: "1:00 – 10:00 PM" },
  { day: 4, label: "Jueves", value: "1:00 – 11:00 PM" },
  { day: 5, label: "Viernes", value: "1:00 – 11:00 PM" },
  { day: 6, label: "Sábado", value: "1:00 – 11:00 PM" },
  { day: 0, label: "Domingo", value: "1:00 – 6:00 PM" },
];

export const HOURS_SUMMARY =
  "Martes a sábado 1–10/11 PM · Domingo 1–6 PM · Lunes cerrado";

/* ---------- menú ---------- */

export type Dish = {
  name: string;
  tag?: string;
  /** Omitted for bar and extras items, which the carta lists as name + price. */
  desc?: string;
  /** Italic footnote rendered under the description. */
  note?: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  dishes: Dish[];
};

/**
 * Transcribed from the printed carta. Dishes are ordered to read down the
 * printed menu's left column and then its right, so the two-column layout
 * matches the physical menu.
 */
export const MENU: MenuCategory[] = [
  {
    id: "entradas",
    label: "Entradas",
    dishes: [
      {
        name: "Chimichanga del Beto",
        tag: "¡Las originales!",
        desc: "La receta heredada. Una chimichanga rellena de crema de mantarraya y camarón.",
        price: "$110",
      },
      {
        name: "Chicharrón de Pescado",
        desc: "Deliciosos trozos de filete de pescado frito en aderezo de chipotle y ajonjolí negro.",
        price: "$315",
      },
      {
        name: "Queso Frito al Piloncillo",
        tag: "Reconocido por 5 revistas nacionales como Excelente Platillo",
        desc: "Queso panela frito. Acompañado de una mezcla de cebolla caramelizada y tomates baby; bañado en nuestra deliciosa miel cocida de piloncillo con chile mulato.",
        price: "$310",
      },
      {
        name: "Champiñones al Ajillo",
        desc: "Cebolla, chile pico de pájaro, pimienta, trozo de queso panela y el toque del chef.",
        price: "$315",
      },
      {
        name: "Taco Aldeano",
        desc: "Delicioso taco de tortilla de maíz recién hecha y costra de queso. Puedes elegir entre marlín ahumado o camarón.",
        price: "$140",
      },
      {
        name: "Crema de Tomate",
        tag: "¡Receta de generaciones!",
        desc: "Crema de tomate rostizado con finas hierbas.",
        price: "$190",
      },
      {
        name: "Empanada de Chorizo Español",
        desc: "Nuestra deliciosa empanada de chorizo español, tomate deshidratado y reducción de vino tinto.",
        price: "$110",
      },
      {
        name: "Aguachile Tatemado",
        desc: "Curtido de camarón, en una mezcla de cenizas de habanero, cebolla y cilantro. Con tomate cherry y pepino persa.",
        price: "$350",
      },
      {
        name: "Aguachile al Mezcal",
        desc: "Curtido de camarón, cebolla, cilantro, pepino y ralladura de manzana verde, con un toque de mezcal.",
        price: "$370",
      },
      {
        name: "Ceviche Negro",
        tag: "¡Garantía de sabor, tienes que probarlo!",
        desc: "Delicioso atún en cubos en una mezcla de aguacate y pepino, aderezado con una salsa negra México-Japonesa. Creación de nuestro chef.",
        price: "$340",
      },
    ],
  },
  {
    id: "tostadas",
    label: "Tostadas",
    dishes: [
      {
        name: "Ceviche de Camarón",
        tag: "Receta del abuelo Alberto, desde 1954",
        desc: "Una mezcla de camarón, tomate, cebolla, cilantro y aguacate, con un toque de mayonesa de jalapeño.",
        price: "Tostada $135 / Orden $330",
      },
      {
        name: "Ceviche de Pescado",
        tag: "Receta del abuelo Alberto, desde 1954",
        desc: "Una mezcla de filete de pescado, tomate, cebolla, cilantro y aguacate, con un toque de mayonesa de jalapeño.",
        price: "Tostada $120 / Orden $300",
      },
      {
        name: "Ceviche de Aguacate",
        tag: "¡Tienes que probarlo!",
        desc: "Deliciosa combinación de filete de pescado, cremoso de aguacate, cilantro, toques cítricos y aceite de oliva, montado en won ton.",
        price: "$115",
      },
      {
        name: "Tostadita de Atún",
        tag: "La pionera en Mexicali, como esta ¡ninguna!",
        desc: "Atún bañado en salsa especial, creación del chef; servido sobre un won ton.",
        price: "$140",
      },
    ],
  },
  {
    id: "ensaladas",
    label: "Ensaladas",
    dishes: [
      {
        name: "Monona",
        tag: "¡Nuestra ensalada insignia!",
        desc: "Lechuguillas, manzana caramelizada, nuez garapiñada, vinagreta de jerez y toques de blue cheese.",
        price: "$310",
      },
      {
        name: "Romana a la Parrilla",
        tag: "¡La original! Desde 2006",
        desc: "Sellada al carbón, bañada en nuestro aderezo cremoso de blue cheese y tocino trozeado.",
        price: "$310",
      },
    ],
  },
  {
    id: "carnes",
    label: "Carnes",
    dishes: [
      {
        name: "Arrachera Premium",
        desc: "Corte premium al carbón con una penca de nopal asada y chile california tatemado. Acompañado de papa al horno con crema de brócoli.",
        price: "$525",
      },
      {
        name: "Rib Eye",
        tag: "100% carne mexicalense · ¡pídelo con costra!",
        desc: "Rib Eye asado al carbón, acompañado de vegetales rostizados, papa al horno con crema de brócoli y chorizo argentino.",
        price: "350g $605 / 500g $915",
      },
      {
        name: "Medallones Huastecos",
        desc: "Medallones de res a la parrilla montados sobre una mulita de maíz con queso, bañados de una salsa especial de chiles. Acompañado de papa al horno con crema de brócoli.",
        price: "$560",
      },
      {
        name: "Back Ribs",
        desc: "Costillas de puerco horneadas y bañadas en salsa a elección: ciruela o BBQ (receta del chef). Acompañado de papa al horno con crema de brócoli.",
        price: "$495",
      },
    ],
  },
  {
    id: "aves",
    label: "Aves",
    dishes: [
      {
        name: "Suprema Manzana",
        tag: "Tu opción agridulce",
        desc: "Suprema de pollo rellena de trozos de manzana caramelizada envuelta en tocino, bañada en salsa agridulce. Acompañada de papa al horno con crema de brócoli.",
        price: "$390",
      },
      {
        name: "Suprema de Pollo a los 3 Quesos",
        desc: "Pechuga suprema rellena de espinaca y mozzarella, montada sobre pasta fusilli y vegetales salteados con un toque de parmesano y vino blanco.",
        price: "$390",
      },
    ],
  },
  {
    id: "mariscos",
    label: "Mariscos",
    dishes: [
      {
        name: "Pulpo del Prieto",
        tag: "¡Desde 1969!",
        desc: "Crujiente y sofrito de vegetales con una salsa al estilo Aldeano.",
        price: "$700",
      },
      {
        name: "Camarones Rocky Point",
        desc: "Deliciosos camarones rellenos de marlín ahumado envueltos en tocino, bañados en salsa verde, exquisitamente gratinados, acompañados de arroz tipo risotto de betabel dulce.",
        price: "$430",
      },
      {
        name: "Filete de Salmón",
        desc: "Montado sobre una cama de cous-cous en un espejo de alioli.",
        note: "Elige tu salsa favorita: pistache o mostaza y miel.",
        price: "$550",
      },
      {
        name: "Camarón Thai",
        desc: "Sofrito de cebolla, morrones y camarón con pasta udon en una salsa agridulce, coronado con nuez de la India.",
        price: "$420",
      },
    ],
  },
  {
    id: "pastas",
    label: "Pastas",
    dishes: [
      {
        name: "Penne Mestre",
        tag: "¡Nuestra pasta más famosa!",
        desc: "Cremosa salsa de nuez, vino blanco, cebolla caramelizada y champiñones.",
        note: "Con pollo $120 · camarón $155",
        price: "$310",
      },
      {
        name: "Fettuccine a la Beto",
        desc: "Fettuccine con crema al vino blanco, espinaca, tomate cherry, chile pepper y queso parmesano.",
        note: "Con pollo $120 · camarón $155",
        price: "$320",
      },
    ],
  },
  {
    id: "pizzas",
    label: "Pizzas",
    dishes: [
      {
        name: "Pizzetta de la Casa",
        desc: "Pizzetta bañada con salsa pomodoro (receta secreta del chef), queso mozzarella, champiñón, salami, espinaca, alcachofa y queso feta.",
        price: "$300",
      },
      {
        name: "Pizzetta de Pepperoni",
        desc: "Pizzetta bañada con la salsa pomodoro (receta secreta del chef), queso mozzarella y rodajas de pepperoni.",
        price: "$285",
      },
    ],
  },
  {
    id: "postres",
    label: "Postres",
    dishes: [
      {
        name: "Flan",
        tag: "¡Garantía del chef!",
        desc: "Nuestro magnífico flan napolitano.",
        price: "$180",
      },
      {
        name: "Brownie",
        desc: "Brownie recién salido del horno, crema y coulis de fresa. Acompañado de una bola de nieve.",
        price: "$190",
      },
      {
        name: "Strudel de Manzana",
        desc: "Delicioso hojaldre horneado relleno de manzana caramelizada, acompañado de nieve.",
        price: "$190",
      },
      {
        name: "Plátanos Flameados",
        desc: "Lajas de plátano macho a la mantequilla con una mezcla de licores y trozos de tocino.",
        price: "$250",
      },
    ],
  },
  {
    id: "extras",
    label: "Extras",
    dishes: [
      { name: "Papa al Horno y Crema de Brócoli", price: "$125" },
      { name: "Elote Asado", price: "$80" },
      { name: "Pan Focaccia", price: "$90" },
      { name: "Vegetales Rostizados", price: "$110" },
      { name: "Crema del Día", price: "$140" },
      { name: "Porción Camarón", price: "$155" },
      { name: "Porción Pollo", price: "$120" },
      { name: "Bola de Nieve", price: "$130" },
      { name: "Descorche", price: "$300" },
    ],
  },
  {
    id: "bebidas",
    label: "Sin alcohol",
    dishes: [
      { name: "Coca Cola sin Azúcar", price: "$70" },
      { name: "Soda", price: "$70" },
      { name: "Vaso de Té", price: "$70" },
      { name: "Limonada", price: "$70" },
      { name: "Limonada Cherry", price: "$75" },
      { name: "Limonada Mineral", price: "$75" },
      { name: "Limonada Cherry Mineral", price: "$85" },
      { name: "Agua Mineral", price: "$75" },
      { name: "Agua Natural", price: "$65" },
      { name: "Perrier", price: "$100" },
      { name: "Americano Nespresso", tag: "Café", price: "$70" },
    ],
  },
  {
    id: "cervezas",
    label: "Cervezas",
    dishes: [
      { name: "Corona Extra", price: "$75" },
      { name: "Victoria", price: "$75" },
      { name: "Modelo Especial", price: "$85" },
      { name: "Negra Modelo", price: "$85" },
      { name: "Bud Light", price: "$85" },
      { name: "Stella Artois", price: "$95" },
      { name: "Michelob Ultra", price: "$100" },
      { name: "Budweiser", price: "$85" },
      { name: "Colita Aldeano", price: "$50" },
    ],
  },
  {
    id: "cocteles",
    label: "Classic cocktails",
    dishes: [
      { name: "Sangría", price: "$160" },
      { name: "Clericot", price: "$182" },
      { name: "Mojito Clásico", price: "$190" },
      { name: "Margarita Clásica", price: "$170" },
      { name: "Piña Colada", price: "$170" },
      { name: "Mezcalita Jamaica", price: "$195" },
      { name: "Old Fashion", price: "$195" },
      { name: "Negroni", price: "$190" },
      { name: "Aperol Spritz", price: "$180" },
      { name: "Moscú Mule", price: "$200" },
      { name: "Carajillo", price: "$230" },
    ],
  },
  {
    id: "mixologia",
    label: "Mixología de autor",
    dishes: [
      {
        name: "Yaquesita",
        desc: "Bacanora, licor de chile, miel de agave, mezcla de cítricos y sal de chapulín.",
        price: "$215",
      },
      {
        name: "Rugantino",
        desc: "Mezcal, vermouth rosso, frutos rojos y prosecco.",
        price: "$215",
      },
      {
        name: "Jäger",
        desc: "Licor de hierbas, bacanora, mezcla de cítricos y angostura.",
        price: "$220",
      },
      {
        name: "Lucky Day",
        desc: "Ginebra, hierbabuena, jarabe de kiwi y clara de huevo.",
        price: "$220",
      },
      {
        name: "Maracugin",
        desc: "Ginebra infusionada en flor mariposa con jarabe de maracuyá.",
        price: "$220",
      },
    ],
  },
];

/* ---------- carta temporal ---------- */

/**
 * The temporary specials sheet, kept apart from MENU so the promotion can be
 * pulled in one piece: delete this block and drop <Especiales /> from
 * app/page.tsx. Nothing else reads it.
 */
export const SPECIALS: MenuCategory[] = [
  {
    id: "recomendaciones",
    label: "Recomendaciones",
    dishes: [
      {
        name: "Aguachiles Tatemados",
        tag: "Frescos",
        desc: "Para los amantes del aguachile de camarón tenemos la versión del Chef Beto González, con una salsa tatemada hecha en casa.",
        price: "$350",
      },
      {
        name: "La Mazorca y el Mar",
        tag: "Frescos",
        desc: "Ceviche de atún. Descubre la armonía del mar y la tierra en esta mezcla fresca: atún, aguacate, cacahuate, elote desgranado, pepino, cebolla curtida y cilantro. Con una rica crema de la casa, gorgonzola y salsa macha.",
        price: "$250",
      },
      {
        name: "Tostada Bucanera",
        tag: "Frescos",
        desc: "Nuestra exquisita tostada está elaborada con atún, camarón y pulpo fresco, bañada en una salsa especial creada por el Chef Beto González.",
        price: "$350",
      },
      {
        name: "Hamburguesa Aldeano",
        desc: "Preparada al carbón con la mejor selección de carne, acompañada de lechuga fresca, tomate, pepinillos y el aderezo especial del Chef Beto González.",
        price: "$310",
      },
      {
        name: "Gyozas",
        desc: "Rellenas de carne de puerco, servidas con edamames y salsa ponzu spicy.",
        price: "$220",
      },
    ],
  },
  {
    id: "lo-nuevo",
    label: "Lo nuevo",
    dishes: [
      {
        name: "Salmón al Pesto",
        desc: "Un buen trozo de salmón doradito por fuera y jugoso por dentro, servido sobre una pasta penne con nuestro pesto especial de pistache: cremosito y con un sabor único.",
        price: "$499",
      },
      {
        name: "Sashimi de Atún o Salmón",
        desc: "Láminas frescas de atún o salmón, servidas con pepino y ajonjolí, bañadas en salsa ponzu, wasabi y jengibre curtido.",
        note: "¿Con antojo de todo un poco? Este combo es para ti.",
        price: "$299",
      },
      {
        name: "Camarones Roka",
        desc: "Trocitos de camarón crujientes, bañados en nuestro aderezo cremoso con un toque picante. Son tan adictivos que no vas a querer compartirlos.",
        price: "$410",
      },
      {
        name: "Champiñón Mediterráneo",
        desc: "Champiñón sofrito con ajo, albahaca, manzana verde, vino blanco, queso parmesano y camarones, acompañado de una crema de queso gorgonzola y queso de cabra.",
        price: "$410",
      },
      {
        name: "Mexicali en la Playa",
        desc: "Experimenta el sabor de una auténtica botana Mexicali en la playa: rica en camarón, pulpo y callo de almeja, preparada con pepino y aguacate frescos, más querreque veracruzano y un delicioso ceviche de atún y almejas al vapor en salsa arrabiata.",
        price: "$320",
      },
      {
        name: "Empanada de Rajas con Camarón",
        desc: "Camarón sofrito con rajas, elote y queso menonita. Son absolutamente deliciosos.",
        price: "$120",
      },
    ],
  },
];

/** Legal footnote printed at the foot of every page of the carta. */
export const MENU_NOTE =
  "Todos nuestros platillos están hechos en casa con los mayores estándares de higiene. Los gramajes pueden variar de acuerdo con el tipo de preparación o cocción. En las presentaciones que no tienen ninguna cocción, el consumo es bajo su responsabilidad. Nuestros precios incluyen IVA y son en pesos mexicanos. Todas las modificaciones a los platillos tendrán un costo adicional.";

/* ---------- galería ---------- */

/**
 * To add a photo: drop the file into /public/images/ and append an item here.
 * The grid derives its spans from `portrait`, so there is nothing to keep in
 * sync by hand.
 */
export type GalleryItem = {
  src: string;
  /** Alt text. Required even when no caption is drawn over the tile. */
  alt: string;
  /** Drawn over the photo. Omit when the photo already carries its own name. */
  caption?: string;
  /** Keeps the photo's 4:5 shape instead of the wide interior crop. */
  portrait?: boolean;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/interior-1.png",
    alt: "Planta alta · salón principal",
    caption: "Planta alta · salón principal",
  },
  {
    src: "/images/interior-2.png",
    alt: "Planta baja · barra y doble altura",
    caption: "Planta baja · barra y doble altura",
  },
  // The dish photos are shot as cards with the name and description already
  // lettered on them, so they take no caption of their own.
  {
    src: "/images/maracugin.jpg",
    alt: "Maracugin: ginebra infusionada en flor mariposa con jarabe de maracuyá, servida con hojas de pandano.",
    portrait: true,
  },
  {
    src: "/images/camaron-thai.jpg",
    alt: "Camarón Thai: camarón con pasta udon, morrones y nuez de la India, servido sobre hoja de plátano.",
    portrait: true,
  },
  {
    src: "/images/rugantino.jpg",
    alt: "Rugantino: mezcal, vermouth rosso, frutos rojos y prosecco, con romero y naranja.",
    portrait: true,
  },
  {
    src: "/images/yaquesita.jpg",
    alt: "Yaquesita: bacanora, licor de chile, miel de agave y mezcla de cítricos, con escarchado de sal de chapulín.",
    portrait: true,
  },
];
