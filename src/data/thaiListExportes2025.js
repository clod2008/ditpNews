import { tcp, muangthong, solex, plolawat, aas, acv, carpets, cjGroup, explorar, heirtage, monty, fooSpacialize, jimGroup, tsy, pcProducts, ayPOrchard, thaiPresidentFood, bosny, noPic450x450 } from "../assets";

const rubros = {
    autoParts: {
        en: 'Auto Parts',
        es: 'Auto Partes',
    },
    construction: {
        en: 'Construction',
        es: 'Construcción',
    },
    foodAndBeverage: {
        en: 'Food & Beverage',
        es: 'Alimentos y bebidas',
    },
    boxing: {
        en: 'Boxing',
        es: 'Boxing',
    }
}

const thaiDelegationList2025 = [
    {
        sector: "Food & Beverage",
        sectorEs: "Alimentos y bebidas",
        brand: ["VFOODS"],
        logo: noPic450x450,
        url: "https://www.vfoods.co.th",
        catalogUrl: "https://drive.google.com/file/d/13So4yjNmKZts4oYp1V-Yi7r8uF8Dib5a/view?usp=sharing",
        description: "Wafer, Biscuit Sticks",
        descriptionEs: "Obleas y palitos dulces, ideales para snacks o postres"
    },
    {
        sector: "Food & Beverage",
        sectorEs: "Alimentos y bebidas",
        brand: ["BUONO", "Green & Sunny"],
        logo: noPic450x450,
        url: "https://buonogroup.com/",
        catalogUrl: "https://drive.google.com/file/d/17uqnG9K4y2qDjABMN8dYAR8nTr3dAdza/view?usp=sharing",
        description: "Ice cream and Frozen Novelties, Ready to Eat Meals, Thai Crispy Rice Noodle Snack",
        descriptionEs: "Helados, comidas listas para comer y snacks de fideos crocantes tailandeses"
    },
    {
        sector: "Food & Beverage",
        sectorEs: "Alimentos y bebidas",
        brand: ["Vena", "Sukum"],
        logo: noPic450x450,
        url: "www.venathailand.com",
        catalogUrl: "https://drive.google.com/file/d/1dz-hHLxBQ6yH8-5-zEkRTQ_7jqE3MdVI/view?usp=sharing",
        description: "Crispy Chicken Breast Sticks, Coconut Crispy Rolls",
        descriptionEs: "Bastones crocantes de pechuga de pollo y rollos crocantes de coco"
    },
    {
        sector: "Food & Beverage",
        sectorEs: "Alimentos y bebidas",
        brand: ["KORIKO"],
        logo: noPic450x450,
        url: "www.nbfthailand.com",
        catalogUrl: "https://drive.google.com/file/d/1npEb890kkuBFtg5xkymq823l7fuRR3IQ/view?usp=sharing",
        description: "Seaweed as raw material, seasoned seaweed",
        descriptionEs: "Alga marina como materia prima y alga sazonada, ideal para snacks saludables"
    },
    {
        sector: "Food & Beverage",
        sectorEs: "Alimentos y bebidas",
        brand: ["Fruittara Brand"],
        logo: noPic450x450,
        url: "www.fruittara.com",
        catalogUrl: "https://drive.google.com/file/d/1-FDZRLJ6C26px3sfGXJ6XXqEbFWiCWpA/view?usp=sharing",
        description: "Dried fruit",
        descriptionEs: "Frutas deshidratadas, ideales para snacks o repostería"
    },
    //Auto Parts
    {
        sector: `${rubros.autoParts.en}`,
        sectorEs: `${rubros.autoParts.es}`,
        brand: ['ACV RICH COMPANY LIMITED'],
        logo: acv,
        url: 'http://www.acvrich.com'
    },
    {
        sector: `${rubros.autoParts.en}`,
        sectorEs: `${rubros.autoParts.es}`,
        brand: ['CJ MANUFACTURING COMPANY LIMITED'],
        logo: cjGroup,
        url: 'https://www.cjmanufacturing.co.th'
    },
    {
        sector: `${rubros.autoParts.en}`,
        sectorEs: `${rubros.autoParts.es}`,
        brand: ['ADVANCE AUTO SUPPLY COMPANY LIMITED'],
        logo: aas,
        url: 'https://www.advance-autosupply.com'
    },
    {
        sector: `${rubros.autoParts.en}`,
        sectorEs: `${rubros.autoParts.es}`,
        brand: ['EXPLORAR'],
        logo: explorar,
        url: 'https://www.explorershox.com'
    },
    {
        sector: `${rubros.autoParts.en}`,
        sectorEs: `${rubros.autoParts.es}`,
        brand: ['KAWAMA'],
        logo: plolawat,
        url: 'https://www.polawatengine.co.th'
    },
    {
        sector: `${rubros.autoParts.en}`,
        sectorEs: `${rubros.autoParts.es}`,
        brand: ['PC'],
        logo: pcProducts,
        url: 'https://www.pcproductsinter.com'
    },
    {
        sector: `${rubros.autoParts.en}`,
        sectorEs: `${rubros.autoParts.es}`,
        brand: ['SOLEX'],
        logo: solex,
        url: 'http://www.solextoplock.com'
    },
    // End of Auto Parts
    // Construction
    {
        sector: `${rubros.construction.en}`,
        sectorEs: `${rubros.construction.es}`,
        brand: ['CARPETS INTERNATIONAL THAILAND PUBLIC COMPANY LIMITED'],
        logo: carpets,
        url: 'https://www.carpetsinter.com',
    },
    {
        sector: `${rubros.construction.en}`,
        sectorEs: `${rubros.construction.es}`,
        brand: ['BOSNY'],
        logo: bosny,
        url: 'https://www.bosny.com'
    },
    {
        sector: `${rubros.construction.en}`,
        sectorEs: `${rubros.construction.es}`,
        brand: ['MUANGTHONG'],
        logo: muangthong,
        url: 'https://www.mtaluminium.com/'
    },
    {
        sector: `${rubros.construction.en}`,
        sectorEs: `${rubros.construction.es}`,
        brand: ['TCP'],
        logo: tcp,
        url: 'https://www.tcpthaicast.co.th/'
    },
    // End of Construction
    // Food
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['NUT WALKER', 'SUNKIST', `NATURE'S SENSATION`, 'HERILAGE'],
        logo: heirtage,
        url: 'https://www.heritagethailand.com/corp/'
    },
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['THAI CHOICE'],
        logo: monty,
        url: 'http://www.thai-choice.com/application/'
    },
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['THAI DANCER'],
        logo: fooSpacialize,
        url: 'http://www.foodspecialize.com/'
    },
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: [`Jim's coffee`, 'Lady anna', 'Panwa', 'Panwa C'],
        logo: jimGroup,
        url: 'https://www.jimsgroup.co.th/'
    },
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['TSY'],
        logo: tsy,
        url: 'https://www.thaishingye.com/'
    },
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['A&P Orchard Since 1959'],
        logo: ayPOrchard,
        url: 'https://www.aporchard.com'
    },
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['MAMA'],
        logo: thaiPresidentFood,
        url: 'https://www.mama.co.th'
    },
    //End of Food
]

export { thaiDelegationList2025 }