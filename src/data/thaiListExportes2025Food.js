import { noPic450x450, fooSpacialize, monty, heirtage, jimGroup } from "../assets";

const thaiDelegationList2025Food = [
  // Snack
  {
    sector: "Snack",
    sectorEs: "Snacks",
    brand: ["VFOODS"],
    logo: noPic450x450,
    url: "https://www.vfoods.co.th",
    catalogUrl: "https://drive.google.com/file/d/13So4yjNmKZts4oYp1V-Yi7r8uF8Dib5a/view?usp=sharing",
    description: "Wafer, Biscuit Sticks",
    descriptionEs: "Obleas y palitos dulces, ideales para picar o acompañar postres."
  },
  {
    sector: "Snack",
    sectorEs: "Snacks",
    brand: ["BUONO", "Green & Sunny"],
    logo: noPic450x450,
    url: "https://buonogroup.com/",
    catalogUrl: "https://drive.google.com/file/d/17uqnG9K4y2qDjABMN8dYAR8nTr3dAdza/view?usp=sharing",
    description: "Ice cream and Frozen Novelties, Ready to Eat Meals, Thai Crispy Rice Noodle Snack",
    descriptionEs: "Helados, comidas listas para comer y snacks de fideos crocantes tailandeses."
  },
  {
    sector: "Snack",
    sectorEs: "Snacks",
    brand: ["Vena", "Sukum"],
    logo: noPic450x450,
    url: "https://www.venathailand.com",
    catalogUrl: "https://drive.google.com/file/d/1dz-hHLxBQ6yH8-5-zEkRTQ_7jqE3MdVI/view?usp=sharing",
    description: "Crispy Chicken Breast Sticks, Coconut Crispy Rolls",
    descriptionEs: "Bastones crocantes de pechuga de pollo y rollos crocantes de coco, perfectos para un snack saludable."
  },
  {
    sector: "Snack",
    sectorEs: "Snacks",
    brand: ["KORIKO"],
    logo: noPic450x450,
    url: "https://www.nbfthailand.com",
    catalogUrl: "https://drive.google.com/file/d/1npEb890kkuBFtg5xkymq823l7fuRR3IQ/view?usp=sharing",
    description: "Seaweed as raw material, seasoned seaweed",
    descriptionEs: "Alga marina como materia prima y alga sazonada, ideal para snacks saludables."
  },
  {
    sector: "Snack",
    sectorEs: "Snacks",
    brand: ["Fruittara Brand"],
    logo: noPic450x450,
    url: "https://www.fruittara.com",
    catalogUrl: "https://drive.google.com/file/d/1-FDZRLJ6C26px3sfGXJ6XXqEbFWiCWpA/view?usp=sharing",
    description: "Dried fruit",
    descriptionEs: "Frutas deshidratadas, ideales para snacks o repostería."
  },
  // Canned Food
  {
    sector: "Canned Food",
    sectorEs: "Conservas",
    brand: ["MAHATTAN PREMIUM QUALITY"],
    logo: noPic450x450,
    url: "https://www.pegasusfood.co.th",
    catalogUrl: "https://drive.google.com/file/d/1umEYdY0-g-HN5QMfdMx-cS7uk1KLruCW/view?usp=sharing",
    description: "Canned Tuna in Oil, Canned Tuna in Water",
    descriptionEs: "Atún enlatado en aceite y en agua, práctico y nutritivo."
  },
  {
    sector: "Canned Food",
    sectorEs: "Conservas",
    brand: ["PAPI"],
    logo: noPic450x450,
    url: "http://starcannery.com",
    catalogUrl: "https://drive.google.com/file/d/1vgJbh-jc9zOSN9oVSSJ-cgwavpcfzAMU/view?usp=sharing",
    description: "Canned Tuna, Canned Sardines, Canned Mackerel, Canned Pineapple",
    descriptionEs: "Atún, sardinas, caballa y ananá enlatados, listos para consumir."
  },
  {
    sector: "Canned Food",
    sectorEs: "Conservas",
    brand: ["KHUN MAE", "OGC"],
    logo: noPic450x450,
    url: "",
    catalogUrl: "https://drive.google.com/file/d/1vJspgYKVI3ETmt6fbJPfi3pIGEOOInx2/view?usp=sharing",
    description: "Canned Sardine",
    descriptionEs: "Sardinas enlatadas, ideales para ensaladas o sandwiches."
  },
  {
    sector: "Canned Food",
    sectorEs: "Conservas",
    brand: ["Lofe"],
    logo: noPic450x450,
    url: "",
    catalogUrl: "https://drive.google.com/file/d/16ExcC6zJys5SFrCZM81_6cyEhMqPGzdt/view?usp=sharing",
    description: "Canned Pineapple, Canned Coconut Water",
    descriptionEs: "Ananá y agua de coco enlatados, frescura y sabor tropical."
  },
  // Drink
  {
    sector: "Drink",
    sectorEs: "Bebidas",
    brand: ["THAI COCO"],
    logo: noPic450x450,
    url: "https://www.thaicoconut.com",
    catalogUrl: "https://drive.google.com/file/d/1-OKdJD9siQxPv5KdJTLSMoV9Xtnf1BNK/view?usp=sharing",
    description: "100% Coconut Water, Coconut milk drink for refreshing and soy free, Canned Coconut Milk for Cooking",
    descriptionEs: "Agua de coco 100%, bebida de leche de coco y leche de coco enlatada para cocinar."
  },
  {
    sector: "Drink",
    sectorEs: "Bebidas",
    brand: ["T&T"],
    logo: noPic450x450,
    url: "http://www.aswforsociety.com/",
    catalogUrl: "https://drive.google.com/file/d/11lFI8ZHtAIRE3dBuYJ3dy9dTbQDPxI6a/view?usp=sharing",
    description: "Maoberry Juice Organic",
    descriptionEs: "Jugo orgánico de maoberry, natural y refrescante."
  },
  {
    sector: "Drink",
    sectorEs: "Bebidas",
    brand: ["Coco royal"],
    logo: noPic450x450,
    url: "https://www.royalplus.co.th",
    catalogUrl: "https://drive.google.com/file/d/13-5C7P1dzZIIdjBGAOD55YT8PYlbaAeX/view?usp=sharing",
    description: "Coconut water100%",
    descriptionEs: "Agua de coco 100%, hidratante y natural."
  },
  {
    sector: "Drink",
    sectorEs: "Bebidas",
    brand: ["POTATO", "MAJIKO", "MJOY", "JMIX"],
    logo: noPic450x450,
    url: "https://www.worldfoodinter.com",
    catalogUrl: "https://drive.google.com/file/d/1tw_oz6Bvv-bmp3njwIrPgo_jC8fFyab8/view?usp=sharing",
    description: "Fruit Juice with Nata De Coco",
    descriptionEs: "Jugos de frutas con nata de coco, una combinación exótica y deliciosa."
  },
  // Sauce
  {
    sector: "Sauce",
    sectorEs: "Salsas",
    brand: ["3 Chef's"],
    logo: noPic450x450,
    url: "https://www.brighttimeintertrade.net",
    catalogUrl: "https://drive.google.com/file/d/1q-tFLpmYeEmFSBkIQsSLZtvEl6NPwG7i/view?usp=sharing",
    description: "Tom Yum Paste, Green Curry Paste, Sweet Chili sauce",
    descriptionEs: "Pasta Tom Yum, pasta de curry verde y salsa de chile dulce, sabores auténticos tailandeses."
  },
  {
    sector: "Sauce",
    sectorEs: "Salsas",
    brand: ["J-Lek"],
    logo: noPic450x450,
    url: "https://www.krsspicyfood.com",
    catalogUrl: "https://drive.google.com/file/d/17SEWpkr_rLglvKQn2OksMC65bw-swQ3G/view?usp=sharing",
    description: "Pastes, Sauces",
    descriptionEs: "Pastas y salsas tailandesas, ideales para realzar tus platos."
  },
  // Ready to eat
  {
    sector: "Ready to eat",
    sectorEs: "Listos para comer",
    brand: ["TAAN THAI"],
    logo: fooSpacialize,
    url: "https://www.taanthaicuisine.com",
    catalogUrl: "https://drive.google.com/file/d/19-9pEqR3rH1nJMrLmAM9GdXpzS_0Bum5/view?usp=sharing",
    description: "Pad Thai is Rice noodles stir-fried with a special blend of seasonings, fragrant with Pad Thai Sauce. Served with eggs, bean sprouts, Chinese chives and Dried Shrimp. Elevate the flavors with a spritz of vibrant lime.",
    descriptionEs: "Pad Thai: fideos de arroz salteados con salsa especial, huevo, brotes de soja, cebollín y camarones secos. Sabor auténtico tailandés."
  },
  {
    sector: "Ready to eat",
    sectorEs: "Listos para comer",
    brand: ["NARA THAI"],
    logo: noPic450x450,
    url: "https://www.asianfoodnetwork.co.th/",
    catalogUrl: "https://drive.google.com/file/d/1GYZBycJnLR71bB8YCg0u3-JwA3S2Y-02/view?usp=sharing",
    description: "Pad Mee Korat is a local dish from Nakornratchasima, a province also known by its nickname 'Korat'. Made from locally grown rice, these soft and chewy noodles come with a ready to cook sauce that offer a perfect balance of sour and sweet, high lighted by a distinctive spiciness. The sweetness comes from coconut sugar while the tangy flavor is from tamarind, maintaining the traditiinal taste of the region.",
    descriptionEs: "Pad Mee Korat: fideos de arroz típicos de la región de Korat, con salsa lista para cocinar, sabor agridulce y toque picante."
  },
  // Rice
  {
    sector: "Rice",
    sectorEs: "Arroz",
    brand: ["Golden Phoenix"],
    logo: monty,
    url: "https://www.bscm.co.th",
    catalogUrl: "https://drive.google.com/file/d/11u2JKHC-6BaF6eRVA4NONh_W1tXoEQhK/view?usp=sharing",
    description: "Thai Hom Mali Rice, Brown Rice",
    descriptionEs: "Arroz Thai Hom Mali y arroz integral, calidad premium para tu mesa."
  },
  // Pet Food
  {
    sector: "Pet Food",
    sectorEs: "Alimentos para mascotas",
    brand: ["BELLOTTA", "MARVO"],
    logo: heirtage,
    url: "https://www.thaiunion.co.th",
    catalogUrl: "https://drive.google.com/file/d/1pd1yxbRJpikdOh4uH9rTO2lojx2l-qhW/view?usp=sharing",
    description: "Premium Wet Cat and Dog Food",
    descriptionEs: "Alimentos húmedos premium para gatos y perros."
  },
  {
    sector: "Pet Food",
    sectorEs: "Alimentos para mascotas",
    brand: ["KELLY & CO'S"],
    logo: jimGroup,
    url: "https://www.kellyandcompanion.com",
    catalogUrl: "https://drive.google.com/file/d/1QL6dKeiZwYFysU7E0SLodzD4LcY2QdBD/view?usp=sharing",
    description: "Freeze-dried pet snacks made from 100% natural ingredients for dogs and cats. No preservatives or additives.",
    descriptionEs: "Snacks liofilizados para mascotas, 100% naturales, sin conservantes ni aditivos."
  }
];

export { thaiDelegationList2025Food }