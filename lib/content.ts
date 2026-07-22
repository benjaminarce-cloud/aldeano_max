export const RESTAURANT = {
  name: "Aldeano Restaurante",
  city: "Mexicali, Baja California",
  address: "C. Novena 679, 21376 Mexicali, B.C.",
  // Shown on the site and dialed by tap-to-call.
  phoneDisplay: "+52 686 842 9240",
  phoneTel: "+526868429240",
  // Where reservation messages are sent — deliberately a different line.
  whatsapp: "526865050041",
  // The business listing (not just the street address), so the pin carries the
  // Aldeano name. A /maps/place/ URL can't be iframed, so this is the embeddable
  // form of the same place; mapUrl keeps the full listing for the click-through.
  mapEmbed:
    "https://www.google.com/maps?q=ALDEANO+RESTAURANTE,+C.+Novena+679,+21376+Mexicali,+B.C.&output=embed",
  mapUrl:
    "https://www.google.com/maps/place/ALDEANO+RESTAURANTE/@32.6358793,-115.3883538,17z/data=!3m1!4b1!4m6!3m5!1s0x80d771f602d1d98d:0x7bf8aa9f131ef267!8m2!3d32.6358793!4d-115.3857789!16s%2Fg%2F11vbp80tqr?hl=es-MX",
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

/** A separately-priced size or serving: "Tostada $135" vs "Orden $330". */
export type Variant = {
  /** Omitted when the dish has a single price. */
  label?: string;
  /** Whole pesos. IVA included, per the carta's footnote. */
  amount: number;
};

export type Dish = {
  name: string;
  tag?: string;
  /** Omitted for bar and extras items, which the carta lists as name + price. */
  desc?: string;
  /** Italic footnote rendered under the description. */
  note?: string;
  /** One entry, or one per serving the carta prices separately. */
  prices: Variant[];
};

/** Pesos, no cents — every amount on the carta is whole. */
export function money(amount: number) {
  return `$${amount.toLocaleString("es-MX")}`;
}

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
        prices: [{ amount: 110 }],
      },
      {
        name: "Chicharrón de Pescado",
        desc: "Deliciosos trozos de filete de pescado frito en aderezo de chipotle y ajonjolí negro.",
        prices: [{ amount: 315 }],
      },
      {
        name: "Queso Frito al Piloncillo",
        tag: "Reconocido por 5 revistas nacionales como Excelente Platillo",
        desc: "Queso panela frito. Acompañado de una mezcla de cebolla caramelizada y tomates baby; bañado en nuestra deliciosa miel cocida de piloncillo con chile mulato.",
        prices: [{ amount: 310 }],
      },
      {
        name: "Champiñones al Ajillo",
        desc: "Cebolla, chile pico de pájaro, pimienta, trozo de queso panela y el toque del chef.",
        prices: [{ amount: 315 }],
      },
      {
        name: "Taco Aldeano",
        desc: "Delicioso taco de tortilla de maíz recién hecha y costra de queso. Puedes elegir entre marlín ahumado o camarón.",
        prices: [{ amount: 140 }],
      },
      {
        name: "Crema de Tomate",
        tag: "¡Receta de generaciones!",
        desc: "Crema de tomate rostizado con finas hierbas.",
        prices: [{ amount: 190 }],
      },
      {
        name: "Empanada de Chorizo Español",
        desc: "Nuestra deliciosa empanada de chorizo español, tomate deshidratado y reducción de vino tinto.",
        prices: [{ amount: 110 }],
      },
      {
        name: "Aguachile Tatemado",
        desc: "Curtido de camarón, en una mezcla de cenizas de habanero, cebolla y cilantro. Con tomate cherry y pepino persa.",
        prices: [{ amount: 350 }],
      },
      {
        name: "Aguachile al Mezcal",
        desc: "Curtido de camarón, cebolla, cilantro, pepino y ralladura de manzana verde, con un toque de mezcal.",
        prices: [{ amount: 370 }],
      },
      {
        name: "Ceviche Negro",
        tag: "¡Garantía de sabor, tienes que probarlo!",
        desc: "Delicioso atún en cubos en una mezcla de aguacate y pepino, aderezado con una salsa negra México-Japonesa. Creación de nuestro chef.",
        prices: [{ amount: 340 }],
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
        prices: [
          { label: "Tostada", amount: 135 },
          { label: "Orden", amount: 330 },
        ],
      },
      {
        name: "Ceviche de Pescado",
        tag: "Receta del abuelo Alberto, desde 1954",
        desc: "Una mezcla de filete de pescado, tomate, cebolla, cilantro y aguacate, con un toque de mayonesa de jalapeño.",
        prices: [
          { label: "Tostada", amount: 120 },
          { label: "Orden", amount: 300 },
        ],
      },
      {
        name: "Ceviche de Aguacate",
        tag: "¡Tienes que probarlo!",
        desc: "Deliciosa combinación de filete de pescado, cremoso de aguacate, cilantro, toques cítricos y aceite de oliva, montado en won ton.",
        prices: [{ amount: 115 }],
      },
      {
        name: "Tostadita de Atún",
        tag: "La pionera en Mexicali, como esta ¡ninguna!",
        desc: "Atún bañado en salsa especial, creación del chef; servido sobre un won ton.",
        prices: [{ amount: 140 }],
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
        prices: [{ amount: 310 }],
      },
      {
        name: "Romana a la Parrilla",
        tag: "¡La original! Desde 2006",
        desc: "Sellada al carbón, bañada en nuestro aderezo cremoso de blue cheese y tocino trozeado.",
        prices: [{ amount: 310 }],
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
        prices: [{ amount: 525 }],
      },
      {
        name: "Rib Eye",
        tag: "100% carne mexicalense · ¡pídelo con costra!",
        desc: "Rib Eye asado al carbón, acompañado de vegetales rostizados, papa al horno con crema de brócoli y chorizo argentino.",
        prices: [
          { label: "350g", amount: 605 },
          { label: "500g", amount: 915 },
        ],
      },
      {
        name: "Medallones Huastecos",
        desc: "Medallones de res a la parrilla montados sobre una mulita de maíz con queso, bañados de una salsa especial de chiles. Acompañado de papa al horno con crema de brócoli.",
        prices: [{ amount: 560 }],
      },
      {
        name: "Back Ribs",
        desc: "Costillas de puerco horneadas y bañadas en salsa a elección: ciruela o BBQ (receta del chef). Acompañado de papa al horno con crema de brócoli.",
        prices: [{ amount: 495 }],
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
        prices: [{ amount: 390 }],
      },
      {
        name: "Suprema de Pollo a los 3 Quesos",
        desc: "Pechuga suprema rellena de espinaca y mozzarella, montada sobre pasta fusilli y vegetales salteados con un toque de parmesano y vino blanco.",
        prices: [{ amount: 390 }],
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
        prices: [{ amount: 700 }],
      },
      {
        name: "Camarones Rocky Point",
        desc: "Deliciosos camarones rellenos de marlín ahumado envueltos en tocino, bañados en salsa verde, exquisitamente gratinados, acompañados de arroz tipo risotto de betabel dulce.",
        prices: [{ amount: 430 }],
      },
      {
        name: "Filete de Salmón",
        desc: "Montado sobre una cama de cous-cous en un espejo de alioli.",
        note: "Elige tu salsa favorita: pistache o mostaza y miel.",
        prices: [{ amount: 550 }],
      },
      {
        name: "Camarón Thai",
        desc: "Sofrito de cebolla, morrones y camarón con pasta udon en una salsa agridulce, coronado con nuez de la India.",
        prices: [{ amount: 420 }],
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
        prices: [{ amount: 310 }],
      },
      {
        name: "Fettuccine a la Beto",
        desc: "Fettuccine con crema al vino blanco, espinaca, tomate cherry, chile pepper y queso parmesano.",
        note: "Con pollo $120 · camarón $155",
        prices: [{ amount: 320 }],
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
        prices: [{ amount: 300 }],
      },
      {
        name: "Pizzetta de Pepperoni",
        desc: "Pizzetta bañada con la salsa pomodoro (receta secreta del chef), queso mozzarella y rodajas de pepperoni.",
        prices: [{ amount: 285 }],
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
        prices: [{ amount: 180 }],
      },
      {
        name: "Brownie",
        desc: "Brownie recién salido del horno, crema y coulis de fresa. Acompañado de una bola de nieve.",
        prices: [{ amount: 190 }],
      },
      {
        name: "Strudel de Manzana",
        desc: "Delicioso hojaldre horneado relleno de manzana caramelizada, acompañado de nieve.",
        prices: [{ amount: 190 }],
      },
      {
        name: "Plátanos Flameados",
        desc: "Lajas de plátano macho a la mantequilla con una mezcla de licores y trozos de tocino.",
        prices: [{ amount: 250 }],
      },
    ],
  },
  {
    id: "extras",
    label: "Extras",
    dishes: [
      { name: "Papa al Horno y Crema de Brócoli", prices: [{ amount: 125 }] },
      { name: "Elote Asado", prices: [{ amount: 80 }] },
      { name: "Pan Focaccia", prices: [{ amount: 90 }] },
      { name: "Vegetales Rostizados", prices: [{ amount: 110 }] },
      { name: "Crema del Día", prices: [{ amount: 140 }] },
      { name: "Porción Camarón", prices: [{ amount: 155 }] },
      { name: "Porción Pollo", prices: [{ amount: 120 }] },
      { name: "Bola de Nieve", prices: [{ amount: 130 }] },
      { name: "Descorche", prices: [{ amount: 300 }] },
    ],
  },
  {
    id: "bebidas",
    label: "Sin alcohol",
    dishes: [
      { name: "Coca Cola sin Azúcar", prices: [{ amount: 70 }] },
      { name: "Soda", prices: [{ amount: 70 }] },
      { name: "Vaso de Té", prices: [{ amount: 70 }] },
      { name: "Limonada", prices: [{ amount: 70 }] },
      { name: "Limonada Cherry", prices: [{ amount: 75 }] },
      { name: "Limonada Mineral", prices: [{ amount: 75 }] },
      { name: "Limonada Cherry Mineral", prices: [{ amount: 85 }] },
      { name: "Agua Mineral", prices: [{ amount: 75 }] },
      { name: "Agua Natural", prices: [{ amount: 65 }] },
      { name: "Perrier", prices: [{ amount: 100 }] },
      { name: "Americano Nespresso", tag: "Café", prices: [{ amount: 70 }] },
    ],
  },
  {
    id: "cervezas",
    label: "Cervezas",
    dishes: [
      { name: "Corona Extra", prices: [{ amount: 75 }] },
      { name: "Victoria", prices: [{ amount: 75 }] },
      { name: "Modelo Especial", prices: [{ amount: 85 }] },
      { name: "Negra Modelo", prices: [{ amount: 85 }] },
      { name: "Bud Light", prices: [{ amount: 85 }] },
      { name: "Stella Artois", prices: [{ amount: 95 }] },
      { name: "Michelob Ultra", prices: [{ amount: 100 }] },
      { name: "Budweiser", prices: [{ amount: 85 }] },
      { name: "Colita Aldeano", prices: [{ amount: 50 }] },
    ],
  },
  {
    id: "cocteles",
    label: "Classic cocktails",
    dishes: [
      { name: "Sangría", prices: [{ amount: 160 }] },
      { name: "Clericot", prices: [{ amount: 182 }] },
      { name: "Mojito Clásico", prices: [{ amount: 190 }] },
      { name: "Margarita Clásica", prices: [{ amount: 170 }] },
      { name: "Piña Colada", prices: [{ amount: 170 }] },
      { name: "Mezcalita Jamaica", prices: [{ amount: 195 }] },
      { name: "Old Fashion", prices: [{ amount: 195 }] },
      { name: "Negroni", prices: [{ amount: 190 }] },
      { name: "Aperol Spritz", prices: [{ amount: 180 }] },
      { name: "Moscú Mule", prices: [{ amount: 200 }] },
      { name: "Carajillo", prices: [{ amount: 230 }] },
    ],
  },
  {
    id: "mixologia",
    label: "Mixología de autor",
    dishes: [
      {
        name: "Yaquesita",
        desc: "Bacanora, licor de chile, miel de agave, mezcla de cítricos y sal de chapulín.",
        prices: [{ amount: 215 }],
      },
      {
        name: "Rugantino",
        desc: "Mezcal, vermouth rosso, frutos rojos y prosecco.",
        prices: [{ amount: 215 }],
      },
      {
        name: "Jäger",
        desc: "Licor de hierbas, bacanora, mezcla de cítricos y angostura.",
        prices: [{ amount: 220 }],
      },
      {
        name: "Lucky Day",
        desc: "Ginebra, hierbabuena, jarabe de kiwi y clara de huevo.",
        prices: [{ amount: 220 }],
      },
      {
        name: "Maracugin",
        desc: "Ginebra infusionada en flor mariposa con jarabe de maracuyá.",
        prices: [{ amount: 220 }],
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
        prices: [{ amount: 350 }],
      },
      {
        name: "La Mazorca y el Mar",
        tag: "Frescos",
        desc: "Ceviche de atún. Descubre la armonía del mar y la tierra en esta mezcla fresca: atún, aguacate, cacahuate, elote desgranado, pepino, cebolla curtida y cilantro. Con una rica crema de la casa, gorgonzola y salsa macha.",
        prices: [{ amount: 250 }],
      },
      {
        name: "Tostada Bucanera",
        tag: "Frescos",
        desc: "Nuestra exquisita tostada está elaborada con atún, camarón y pulpo fresco, bañada en una salsa especial creada por el Chef Beto González.",
        prices: [{ amount: 350 }],
      },
      {
        name: "Hamburguesa Aldeano",
        desc: "Preparada al carbón con la mejor selección de carne, acompañada de lechuga fresca, tomate, pepinillos y el aderezo especial del Chef Beto González.",
        prices: [{ amount: 310 }],
      },
      {
        name: "Gyozas",
        desc: "Rellenas de carne de puerco, servidas con edamames y salsa ponzu spicy.",
        prices: [{ amount: 220 }],
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
        prices: [{ amount: 499 }],
      },
      {
        name: "Sashimi de Atún o Salmón",
        desc: "Láminas frescas de atún o salmón, servidas con pepino y ajonjolí, bañadas en salsa ponzu, wasabi y jengibre curtido.",
        note: "¿Con antojo de todo un poco? Este combo es para ti.",
        prices: [{ amount: 299 }],
      },
      {
        name: "Camarones Roka",
        desc: "Trocitos de camarón crujientes, bañados en nuestro aderezo cremoso con un toque picante. Son tan adictivos que no vas a querer compartirlos.",
        prices: [{ amount: 410 }],
      },
      {
        name: "Champiñón Mediterráneo",
        desc: "Champiñón sofrito con ajo, albahaca, manzana verde, vino blanco, queso parmesano y camarones, acompañado de una crema de queso gorgonzola y queso de cabra.",
        prices: [{ amount: 410 }],
      },
      {
        name: "Mexicali en la Playa",
        desc: "Experimenta el sabor de una auténtica botana Mexicali en la playa: rica en camarón, pulpo y callo de almeja, preparada con pepino y aguacate frescos, más querreque veracruzano y un delicioso ceviche de atún y almejas al vapor en salsa arrabiata.",
        prices: [{ amount: 320 }],
      },
      {
        name: "Empanada de Rajas con Camarón",
        desc: "Camarón sofrito con rajas, elote y queso menonita. Son absolutamente deliciosos.",
        prices: [{ amount: 120 }],
      },
    ],
  },
];

/**
 * Promo flyers. Like SPECIALS these are temporary — delete the entries and the
 * files in /public/images to pull them.
 *
 * The price and terms are lettered into each image, so they exist only as
 * pixels: `alt` carries the same words for search engines and screen readers,
 * and `terms` repeats the essentials as real text under the flyer, which stays
 * readable even where the artwork is too small to read.
 *
 * Because a price lives in the artwork, changing one means a new file — the
 * card cannot be repriced from here.
 */
export type Promo = {
  src: string;
  alt: string;
  /** Natural size, so the tile reserves its box before the image loads. */
  width: number;
  height: number;
  /** The essentials, as text, under the flyer. */
  terms: string;
};

export const PROMOS: Promo[] = [
  {
    src: "/images/promo-hamburguesa.jpg",
    alt: "Promo hamburguesa más dos cervezas heladas por $300. Sólo Corona y Victoria.",
    width: 1422,
    height: 1422,
    terms: "$300 · Sólo Corona y Victoria",
  },
  {
    src: "/images/promo-verano.jpg",
    alt: "Promoción de verano por $750: entrada de la casa, Mexicali a la playa, queso fundido, 2 tacos a elegir entre lengua o pork belly, 2 cervezas, tés helados o limonadas, 2 almejas al pomodoro y postre del Chef Beto. Válido de 1 a 7 PM, todo el mes de julio y agosto.",
    width: 1424,
    height: 1422,
    terms: "$750 · De 1 a 7 PM · Julio y agosto",
  },
  {
    src: "/images/promo-la-no-1.jpg",
    alt: "La No.1, para 4 o hasta 5 personas, por $1,350: entrada de la casa, pizza de pepperoni, ensalada Monona o Romana a la parrilla, pasta Penne Mestre, pollo campirano, clericot o té helado y postre del día.",
    width: 894,
    height: 1424,
    terms: "$1,350 · Para 4 o 5 personas",
  },
];

/** Legal footnote printed at the foot of every page of the carta. */
export const MENU_NOTE =
  "Todos nuestros platillos están hechos en casa con los mayores estándares de higiene. Los gramajes pueden variar de acuerdo con el tipo de preparación o cocción. En las presentaciones que no tienen ninguna cocción, el consumo es bajo su responsabilidad. Nuestros precios incluyen IVA y son en pesos mexicanos. Todas las modificaciones a los platillos tendrán un costo adicional.";

/* ---------- galería ---------- */

/**
 * Interior photography, shown in the carousel.
 *
 * Kept apart from the dish cards because the two behave differently: these are
 * plain photographs, so they take a caption and keep their native 2:3 rather
 * than being cropped square-ish to fit a grid.
 *
 * To add one: drop the file into /public/images/ and append here.
 */
export type Interior = {
  src: string;
  alt: string;
  caption: string;
};

export const INTERIORS: Interior[] = [
  {
    src: "/images/salon-doble-altura.jpg",
    alt: "Salón principal de Aldeano: mesas de madera bajo lámparas de mimbre y helechos colgantes, con el logo sobre el muro de ladrillo blanco y el entrepiso al fondo.",
    caption: "Salón principal · doble altura",
  },
  {
    src: "/images/muro-doble-altura.jpg",
    alt: "Muro de ladrillo blanco a doble altura con el logo de Aldeano iluminado, entre lámparas de mimbre y cuerdas colgantes.",
    caption: "El muro de la casa",
  },
  {
    src: "/images/barra.jpg",
    alt: "La barra de Aldeano, con el logo en rojo sobre el frente y la estantería dorada retroiluminada detrás.",
    caption: "La barra",
  },
  {
    src: "/images/barra-destilados.jpg",
    alt: "Estantería dorada de la barra con destilados, coctelería y cristalería.",
    caption: "Destilados y cristalería",
  },
  {
    src: "/images/escalera-mural.jpg",
    alt: "Escalera de la casa junto al mural en blanco y negro.",
    caption: "La escalera · mural",
  },
];

/**
 * Dish and drink cards, shown as a stacked masonry grid under the carousel.
 *
 * Plain food photographs at their native crop — unlike the carousel photos
 * they carry no caption, and unlike a uniform grid each keeps its own height
 * so the columns stack like a Pinterest-style mosaic. width/height are the
 * source pixel dimensions, used to reserve the right aspect ratio per card.
 */
export type DishCard = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const GALLERY: DishCard[] = [
  {
    src: "/images/rib-eye-brasa.jpg",
    alt: "Rib Eye a la brasa sobre tabla de madera, con espárragos asados, papa al horno, rodajas de chorizo argentino y tomates cherry, junto a una ensalada.",
    width: 794,
    height: 1192,
  },
  {
    src: "/images/mariscos-michelada.jpg",
    alt: "Coctel de camarón, tacos dorados con costra y tostada de ceviche, con una michelada escarchada y una cerveza Negra Modelo.",
    width: 790,
    height: 1202,
  },
  {
    src: "/images/almejas-vapor.jpg",
    alt: "Almejas al vapor en caldillo, servidas en plato triangular con pan tostado y una cerveza Stella Artois.",
    width: 798,
    height: 1194,
  },
  {
    src: "/images/cocteleria-autor.jpg",
    alt: "Tres cocteles de autor escarchados en la terraza, decorados con frutos rojos y hierbas, a contraluz del atardecer.",
    width: 796,
    height: 1192,
  },
  {
    src: "/images/tamal-costra-flor.jpg",
    alt: "Tamal con costra crujiente sobre hoja de maíz, bañado en salsa de achiote, acompañado de totopos y flor comestible.",
    width: 733,
    height: 1280,
  },
  {
    src: "/images/tartar-costra.jpg",
    alt: "Tartar de mariscos con costra crujiente, bañado en aderezo especiado sobre hoja de plátano.",
    width: 909,
    height: 1280,
  },
  {
    src: "/images/ceviches-tostadas.jpg",
    alt: "Copa de camarones al estilo Sinaloa con aguacate, taco gratinado y tostada de atún, servidos en la barra.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/ensalada-parrilla-tocino.jpg",
    alt: "Lechugas romanas a la parrilla bañadas en aderezo cremoso con tocino tronado.",
    width: 731,
    height: 1280,
  },
  {
    src: "/images/coctel-sandia.jpg",
    alt: "Coctel de sandía escarchado con chile-sal, decorado con una paleta de sandía y hierbabuena.",
    width: 960,
    height: 1280,
  },
  {
    src: "/images/coctel-kiwi.jpg",
    alt: "Coctel verde con espuma y una rodaja de kiwi sobre una mesa de madera.",
    width: 1024,
    height: 1280,
  },
];
