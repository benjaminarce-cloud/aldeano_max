export const RESTAURANT = {
  name: "Aldeano Restaurante",
  city: "Mexicali, Baja California",
  address: "C. Novena 679, 21376 Mexicali, B.C.",
  phoneDisplay: "+52 686 842 9240",
  phoneTel: "+526868429240",
  whatsapp: "526868429240",
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
  desc: string;
  /** Italic footnote rendered under the description. */
  note?: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  dishes: Dish[];
};

export const MENU: MenuCategory[] = [
  {
    id: "entradas",
    label: "Entradas",
    dishes: [
      {
        name: "Chimichanga del Beto",
        tag: "¡Las originales!",
        desc: "La receta heredada. Una chimichanga rellena de crema de mantarraya y camarón.",
        price: "$99",
      },
      {
        name: "Crema de Tomate",
        tag: "Receta de generaciones",
        desc: "Crema de tomate rostizado con finas hierbas.",
        price: "$180",
      },
      {
        name: "Chicharrón de Pescado",
        desc: "Deliciosos trozos de filete de pescado frito en aderezo de chipotle y ajonjolí negro.",
        price: "$280",
      },
      {
        name: "Empanada de Chorizo Español",
        desc: "Chorizo español, tomate deshidratado y reducción de vino tinto.",
        price: "$99",
      },
      {
        name: "Queso Frito al Piloncillo",
        tag: "Reconocido por 5 revistas nacionales",
        desc: "Queso panela frito con cebolla caramelizada y tomates baby, bañado en miel de piloncillo con chile mulato.",
        price: "$265",
      },
      {
        name: "Aguachile Tatemado",
        desc: "Curtido de camarón en cenizas de habanero, cebolla y cilantro, con tomate cherry y pepino persa.",
        price: "$300",
      },
      {
        name: "Aguachile al Mezcal",
        desc: "Curtido de camarón, cebolla, cilantro, pepino y ralladura de manzana verde, con un toque de mezcal.",
        price: "$300",
      },
      {
        name: "Champiñones al Ajillo",
        desc: "Cebolla, chile pico de pájaro, pimienta, trozos de queso panela y el toque del chef.",
        price: "$270",
      },
      {
        name: "Taco Aldeano",
        desc: "Tortilla de maíz recién hecha con costra de queso. Elige Marlín ahumado o camarón.",
        price: "$115",
      },
      {
        name: "Ceviche Negro",
        tag: "Creación del chef",
        desc: "Atún en cubos con aguacate y pepino, aderezado con salsa negra México-Japonesa.",
        price: "$290",
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
        desc: "Camarón, tomate, cebolla, cilantro y aguacate, con un toque de mayonesa de jalapeño.",
        price: "Tostada $95 / Orden $280",
      },
      {
        name: "Ceviche de Pescado",
        tag: "Receta del abuelo Alberto, desde 1954",
        desc: "Filete de pescado, tomate, cebolla, cilantro y aguacate, con un toque de mayonesa de jalapeño.",
        price: "Tostada $85 / Orden $250",
      },
      {
        name: "Ceviche de Aguacate",
        desc: "Filete de pescado, cremoso de aguacate, cilantro y toques cítricos, montado en won ton.",
        price: "$95",
      },
      {
        name: "Tostadita de Atún",
        tag: "La pionera en Mexicali",
        desc: "Atún bañado en salsa especial, creación del chef, servido sobre un won ton.",
        price: "$115",
      },
    ],
  },
  {
    id: "ensaladas",
    label: "Ensaladas",
    dishes: [
      {
        name: "Monona",
        tag: "Nuestra ensalada insignia",
        desc: "Lechuguillas, manzana caramelizada, nuez garapiñada, vinagre de jeréz y toques de blue cheese.",
        price: "$280",
      },
      {
        name: "Romana a la Parrilla",
        tag: "La original, desde 2006",
        desc: "Sellada al carbón, bañada en aderezo cremoso de blue cheese y tocino horneado.",
        price: "$270",
      },
    ],
  },
  {
    id: "carnes",
    label: "Carnes",
    dishes: [
      {
        name: "Arrachera Premium",
        desc: "Corte premium al carbón con penca de nopal asada y chile california tatemado. Papa al horno con crema de brócoli.",
        price: "$450",
      },
      {
        name: "Rib Eye",
        tag: "100% carne mexicalense · pídelo con costra",
        desc: "Asado al carbón, con vegetales rostizados, papa al horno con crema de brócoli y chorizo argentino.",
        price: "350g $540 / 500g $850",
      },
      {
        name: "Medallones Huastecos",
        desc: "Medallones de res a la parrilla sobre una mulita de maíz con queso, bañados en salsa especial de chiles.",
        price: "$490",
      },
      {
        name: "Back Ribs",
        desc: "Costillas de puerco horneadas, salsa a elección: ciruela o BBQ (receta del chef).",
        price: "$420",
      },
    ],
  },
  {
    id: "aves",
    label: "Aves",
    dishes: [
      {
        name: "Suprema Manzana",
        tag: "Opción agridulce",
        desc: "Suprema de pollo rellena de manzana caramelizada envuelta en tocino, bañada en salsa agridulce.",
        price: "$340",
      },
      {
        name: "Suprema de Pollo a los 3 Quesos",
        desc: "Rellena de espinaca y mozzarella, sobre pasta fusilli y vegetales salteados con parmesano y vino blanco.",
        price: "$340",
      },
    ],
  },
  {
    id: "mariscos",
    label: "Mariscos",
    dishes: [
      {
        name: 'Pulpo "El Prieto"',
        tag: "Desde 1969",
        desc: "Crujiente y sofrito de vegetales con salsa al estilo Aldeano.",
        price: "$640",
      },
      {
        name: "Filete de Salmón",
        desc: "Sobre cama de cous-cous en espejo de alioli. Elige salsa de pistache o mostaza y miel.",
        price: "$458",
      },
      {
        name: "Camarones Rocky Point",
        desc: "Rellenos de Marlín ahumado envueltos en tocino, salsa verde gratinada, arroz risotto de betabel dulce.",
        price: "$395",
      },
      {
        name: "Atún con Sofrito de Betabel",
        desc: "Sellado con sofrito de verduras, salsa oriental de betabel, arroz perfumado.",
        price: "$377",
      },
    ],
  },
  {
    id: "pastas",
    label: "Pastas",
    dishes: [
      {
        name: "Penne Mestre",
        tag: "Nuestra pasta más famosa",
        desc: "Cremosa salsa de nuez, vino blanco, cebolla caramelizada y champiñones.",
        price: "$270",
      },
      {
        name: "Fettuccine a la Beto",
        desc: "Crema al vino blanco, espinaca, tomate cherry, chile pepper y queso parmesano.",
        note: "*Agrega tu proteína preferida con costo adicional.",
        price: "$265",
      },
    ],
  },
  {
    id: "pizzas",
    label: "Pizzas",
    dishes: [
      {
        name: "Pizzeta de la Casa",
        desc: "Salsa pomodoro (receta secreta del chef), mozzarella, champiñón, salami, espinaca y alcachofa.",
        price: "$250",
      },
      {
        name: "Pizzeta de Pepperoni",
        desc: "Salsa pomodoro (receta secreta del chef), mozzarella y rodajas de pepperoni.",
        price: "$195",
      },
    ],
  },
  {
    id: "postres",
    label: "Postres",
    dishes: [
      {
        name: "Flan",
        tag: "Garantía del chef",
        desc: "Nuestro magnífico flan napolitano.",
        price: "$110",
      },
      {
        name: "Brownie",
        tag: "El favorito de la casa",
        desc: "Recién salido del horno, crema y coulis de fresa. Acompañado de una bola de nieve.",
        price: "$135",
      },
      {
        name: "Strudel de Manzana",
        desc: "Hojaldre horneado relleno de manzana caramelizada, acompañado de nieve.",
        price: "$150",
      },
      {
        name: "Plátanos Flameados",
        desc: "Lajas de plátano macho a la mantequilla con una mezcla de licores y trozos de tocino.",
        price: "$185",
      },
    ],
  },
];

/* ---------- galería ---------- */

/**
 * To swap a gradient placeholder for a real photo: drop the file into
 * /public/images/ and add `src: "/images/your-photo.png"` to that item.
 * Items without `src` render their `gradient` instead.
 */
export type GalleryItem = {
  caption: string;
  src?: string;
  gradient: string;
  /** Tailwind span classes for the asymmetric grid. */
  span: string;
};

export const GALLERY: GalleryItem[] = [
  {
    caption: "Planta alta · salón principal",
    src: "/images/interior-1.png",
    gradient: "radial-gradient(circle at 30% 30%, #7a4326, #2c1a10 75%)",
    span: "col-span-2 row-span-2",
  },
  {
    caption: "Detalles y texturas",
    gradient: "radial-gradient(circle at 70% 40%, #5c6b41, #23281b 75%)",
    span: "col-span-1 row-span-1",
  },
  {
    caption: "Planta baja · barra y doble altura",
    src: "/images/interior-2.png",
    gradient: "radial-gradient(circle at 40% 60%, #a8652f, #331e0f 75%)",
    span: "col-span-1 row-span-1",
  },
  {
    caption: "Terraza",
    gradient: "radial-gradient(circle at 60% 30%, #8f3a22, #2c130b 75%)",
    span: "col-span-1 row-span-1",
  },
  {
    caption: "Rincones de la casa",
    gradient: "radial-gradient(circle at 50% 60%, #b98b3e, #34260f 75%)",
    span: "col-span-1 row-span-1",
  },
];
