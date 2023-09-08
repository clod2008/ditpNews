import { faFacebook, faInstagramSquare, faLinkedinIn, faWhatsappSquare, faWhatsapp, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons"

import { tcp, muangthong, solex, plolawat, aas, acv, bannerHomeBM, bannerHomeJurin, bannerHomeTradeMinister, bosny, carpets, cjGroup, explorar, heirtage, logoAsiaOriental, logoKhaosan, logoKoLanta, logoNewGarden, monty, ctyFarm, noPic450x450, smileHart, vegaNatural, thaiPresidentFood, fooSpacialize, goldenGrain, jimGroup, tsy, pcProducts, ayPOrchard, siamProduce, paulianCocina, gordoCocina } from "../assets"

const paths ={
    home: `/home`,
    bussinesWeel: `business`,    
    credentials: `credentials`,
    foodPage: `food`,
    constructionPage: `construction`,
    autoPartsPage: `autoparts`,
    heroVideoPage: `herovideo`,
    campaigns: `campaigns` 
}

// Home Page

const navBarData =[
    {
        text: `Home`,
        textEs: `Inicio`,
        link: `${paths.home}`,
    },
    {
        text: `Business Matching 2023`,
        textEs: `Ronda de negocios 2023`,
        link: `${paths.bussinesWeel}`,
    },
    {
        text: `Campaigns`,
        textEs: `Campañas`,
        link: `${paths.campaigns}`,
    },
]

const textHero=[
    {
        text: `International Trade Promotion Department, Ministry of Commerce, Thailand`,
        textEs: `Departamento de Promoción del Comercio Internacional, Ministerio de Comercio, Tailandia`
    },
]

const carouselHome=[
    // {
    //     text: {
    //         body: `We invite you to our next business roundtable. Expand your network of business contacts and establish successful business relationships with the best suppliers in the market. Register now so you don't miss this unique opportunity.`,
    //         title:`The Ministry of Commerce`,
    //     },
    //     textEs: {
    //         body: `Los invitamos a nuestra próxima rueda de negocios. Amplíen su red de contactos comerciales y establezcan relaciones de negocios exitosas con los mejores proveedores del mercado. Regístrense ahora para no perder esta oportunidad única.`,
    //         title: `El Ministerio de Comercio`,
    //     },
    //     img: bannerHomeBM,
    //     cta:{
    //         to: paths.bussinesWeel,
    //         text: `Sign Up`,
    //         textEs: `Regístrense`, 
    //     }
    // },
    {
        text: {
            body: `The Ministry of Commerce builds confidence in the safety of Thai food for buyers and consumers around the world`,
            title:`The Ministry of Commerce`,
        },
        textEs: {
            body: `El Ministerio de Comercio genera confianza en cuanto a la seguridad de la comida tailandesa para compradores y consumidores de todo el mundo`,
            title: `El Ministerio de Comercio`,
        },
        img: bannerHomeTradeMinister,
        cta: {
            url: `https://www.instagram.com/p/CSwnAlxLBwn/`,
            text: `Learn More`,
            textEs: `Saber más`,
        },
        interval: 5000,
    },
    {
        text: {
            body: `Hom Mali from Thailand won the World's Best Rice Award for the second year in a row. Trade Minister "Jurin" expects Thailand to export 6 million tons of rice this year`,
            title:`Jurin`,
        },
        textEs: {
            body: `Hom Mali de Tailandia ganó el premio al mejor arroz del mundo por segundo año consecutivo. El ministro de Comercio "Jurin" espera que Tailandia exporte 6 millones de toneladas de arroz este año`,
            title: `Jurin`,
        },
        img: bannerHomeJurin,
        cta: {
            url: `https://www.instagram.com/p/CXgRSOnloTf/`,
            text: `Learn More`,
            textEs: `Saber más`,
        },
        interval: 5000,
    },
]

const distThaiProducts = [
    {
        tag: 'market',
        img: logoAsiaOriental,
        title: 'Asia Oriental',
        titleEs: 'Asia Oriental',
        subTitle: 'Supermarket | Importers of oriental products',
        subTitleEs: 'Supermercado | Importadores de productos orientales',
        body: 'East Asia: in this market you will find all kinds of fresh products such as vegetables (pak choi, nira, yam potatoes, chili peppers, and turnips) and exotic fruits. In addition, a wide variety of mushrooms, ginger and aromatic herbs in bundles (green and purple basil, thyme, chives, mint, coriander, curly and common parsley, sage, rosemary, bay leaf, lemongrass).',
        bodyEs: 'Asia Oriental: en este mercado vas a encontrar todo tipo de productos frescos como verduras (pak choi, nira, papa ñame, ajíes chili, y nabos) y frutas exóticas. Además, una gran variedad de hongos, jengibre y hierbas aromáticas en ataditos (albahaca verde y morada, tomillo, ciboulette, menta, cilantro, perejil crespo y común, salvia, romero, laurel, lemongrass).',
        contact: [
            
            {
                name: 'BARRIO CHINO DE BUENOS AIRES',
                address: 'Mendoza 1661, C1428DJO',
                phone: ['+54 9 11 4706-3980',' +54 9 11 4785-8155'],
                url: 'https://asiaoriental.mercadoshops.com.ar/tailandia',
                gTagId: 'asiaOrientalClick',
            }   
            
        ],
        socialMedia:[
            {
                net: 'Instagram',
                faIcon: faInstagramSquare,
                url: 'https://www.instagram.com/asiabaires/?hl=es',
            },
            {
                net: 'Faceboock',
                faIcon: faFacebook,
                url: 'https://www.facebook.com/asiaorientalbsas/',
                
            },
            {
                net: 'WhatsApp',
                faIcon: faWhatsappSquare,
                url: 'https://wa.me/541160104368',
                
            },
        ]
    },
    {
        tag: 'market',
        img: logoNewGarden,
        title: 'New Garden',
        titleEs: 'New Garden',
        subTitle: 'Dried fruits, natural foods, pastries',
        subTitleEs: 'Frutas secas, alimentos naturales, repostería',
        body: 'We are the main natural and gourmet food chain in Argentina. We sell products such as dried and dried fruits, flours, cereals, legumes, spices, seeds, whole and artisanal baked goods, gluten-free and organic products, natural cosmetics, dietary supplements and for athletes.',
        bodyEs: 'Somos la principal cadena de alimentos naturales y gourmet de Argentina. Comercializamos productos como frutas secas, desecadas, harinas, cereales, legumbres, especias, semillas, panificados integrales y artesanales, productos sin gluten, orgánicos, cosmética natural, suplementos dietarios y para deportistas.',
        contact: [

            {
                name: ' Capital Federal, Buenos Aires, Mar del Plata',
                address: 'Gorriti 4647, C1414BJI',
                phone: ['+54 11 4831-0440', '+54 11 3855-45755'],
                url: 'https://newgarden.com.ar/catalogsearch/result/?q=tailandia',
                gTagId: 'newGardenClick',
            }

        ],
        socialMedia: [
            {
                net: 'Instagram',
                faIcon: faInstagramSquare,
                url: 'https://www.instagram.com/newgarden.dietetica/',
            },
            {
                net: 'Faceboock',
                faIcon: faFacebook,
                url: 'https://www.facebook.com/NewGarden.arg',
            },
            {
                net: 'LinkedIn',
                faIcon: faLinkedinIn,
                url: 'https://www.linkedin.com/company/new-garden-villares/',
            },
        ]
    },

    

]

const restThai =[
    {
        tag: 'resto',
        img: logoKhaosan,
        title: 'Khaosan Thai Food',
        titleEs: 'Khaosan Thai Food',
        subTitle: 'To taste Thai dishes and imagine yourself in Khaosan street',
        subTitleEs: 'Para degustar platos Thai e imaginarse en la calle Khaosan',
        body: 'Khao-san means raw rice and gives its name to a street in Bangkok where restaurants, bars, hotels and traditional food vendors are located. Its wide color and its intense nightlife made it one of the main tourist attractions of this capital. Khaosan is the gateway to the great taste experience of Thailand, which is why we import directly.',
        bodyEs: 'Khao-san significa arroz crudo y da su nombre a una calle de Bangkok donde se encuentran restaurantes, bares, hoteles y vendedores ambulantes de comida tradicional. Su amplio color y su intensa vida nocturna la convirtieron en uno de los principales atractivos turísticos de esta capital. El Khaosan es la puerta de entrada a la gran experiencia de sabor de Tailandia por esto importamos directamente.',
        contact: [

            {
                name: 'Córdoba Capital',
                address: 'Belgrano 867 local 9',
                url: 'https://linktr.ee/Khaosanthaifood.cba',
                gTagId: 'kaosanCorClick',
            },
            {
                name: 'Mendoza Capital',
                address: 'Peatonal Sarmiento 65',
                url: 'https://linktr.ee/Khaosanthaifood.mdz',
                gTagId: 'kaosanManClick',
            },


        ],
        socialMedia: [
            {
                net: 'Instagram',
                faIcon: faInstagramSquare,
                url: 'https://www.instagram.com/khaosan.thaifood/',
            },
        ]
    },
    // {
    //     tag: 'resto',
    //     img: logoKoLanta,
    //     title: 'Koh Lanta',
    //     titleEs: 'Koh Lanta',
    //     subTitle: 'Thai cuisine and signature drinks',
    //     subTitleEs: 'Cocina Tailandesa y tragos de autor',
    //     body: 'Thai cuisine and signature drinks Koh Lanta is a restaurant located in Palermo Soho that serves Thai cuisine. It stands out for a wide variety of dishes that each time offer a different experience. As main, pad thai, based on rice noodles, tofu, eggs and bean sprouts, with prawns and dessert to crown the tasting of banana, coconut and honey donuts.',
    //     bodyEs: 'Cocina Tailandesa y tragos de autor Koh Lanta es un restaurante situado en Palermo Soho que sirve cocina tailandesa. Destaca por una gran variedad de platos que en cada ocasión ofrecen una experiencia diferente. Como principal, pad thai, a base de fideos de arroz, tofu, huevos y brotes de judías, con gambas y postre para coronar la degustación de plátano, coco y rosquillas de miel.',
    //     contact: [

    //         {
    //             name: 'PALERMO SOHO, BUENOS AIRES',
    //             address: 'Gorriti 4647, C1414BJI',
    //             phone: ['+54 11 4831-0440', '+54 11 3855-45755'],
    //             gTagId: 'kolantaClick',
    //         }

    //     ],
    //     socialMedia: [
    //         {
    //             net: 'Instagram',
    //             faIcon: faInstagramSquare,
    //             url: 'https://www.instagram.com/kohlantaresto/?hl=es/',
    //         },
    //         {
    //             net: 'Faceboock',
    //             faIcon: faFacebook,
    //             url: 'https://www.facebook.com/Koh-Lanta-Resto-Bar-127094600708309/',

    //         }
    //     ]
    // },
]

// Fin Home Page

// Business Wheel

const businessWheelHeaderText ={
    en: `We invite you to our next business roundtable. Expand your network of business contacts and establish successful business relationships with the best suppliers in the market. Register now so you don't miss this unique opportunity.`,
    es: `Los invitamos a nuestra próxima rueda de negocios. Amplíen su red de contactos comerciales y establezcan relaciones de negocios exitosas con los mejores proveedores del mercado. Regístrense ahora para no perder esta oportunidad única.`
}

// nombre de los rubros
const rubros={
    autoParts:{
        en:'Auto Parts',
        es:'Auto Partes',
    },
    construction:{
        en:'Construction',
        es:'Construcción',
    },
    foodAndBeverage:{
        en:'Food & Beverage',
        es:'Alimentos y bebidas',
    }
}

const thaiDelegationList2 =[
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
    // { 
    //     sector: `${rubros.foodAndBeverage.en}`,
    //     sectorEs: `${rubros.foodAndBeverage.es}`,
    //     brand: ['CITY FRESH', 'SUPREME','COOL ISLAND'],
    //     logo: ctyFarm,
    //     url: 'https://cityfarminterfood.com/2022/'
    // },
    // { 
    //     sector: `${rubros.foodAndBeverage.en}`,
    //     sectorEs: `${rubros.foodAndBeverage.es}`,
    //     brand: ['A - ROY MARK', 'SEA SMILE', 'LAY - YIM AND UMI AJI'],
    //     logo: smileHart,
    //     url: 'https://smileheart.co.th/'
    // },
    // { 
    //     sector: `${rubros.foodAndBeverage.en}`,
    //     sectorEs: `${rubros.foodAndBeverage.es}`,
    //     brand: ['Life Coffee'],
    //     logo: vegaNatural,
    //     url: 'http://www.vega-natural.com/'
    // },
    { 
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['THAI DANCER'],
        logo: fooSpacialize,
        url: 'http://www.foodspecialize.com/'
    },
    // { 
    //     sector: `${rubros.foodAndBeverage.en}`,
    //     sectorEs: `${rubros.foodAndBeverage.es}`,
    //     brand: ['ASANEE', 'IYORY',' ASANEE FLOWER',' MAE - U - BON'],
    //     logo: goldenGrain,
    //     url: 'https://www.goldengrain.co.th/EN/home.html'
    // },
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
    // {
    //     sector: `${rubros.foodAndBeverage.en}`,
    //     sectorEs: `${rubros.foodAndBeverage.es}`,
    //     brand: ['SB SIAM PRODUCE'],
    //     logo: siamProduce,
    //     url: 'https://www.sbsiamproduce.co.th'
    // },
    {
        sector: `${rubros.foodAndBeverage.en}`,
        sectorEs: `${rubros.foodAndBeverage.es}`,
        brand: ['MAMA'],
        logo: thaiPresidentFood,
        url: 'https://www.mama.co.th'
    },
    //End of Food
]
// Fin Business Wheel
// Campaigns Page
const campaign = [
    {
        title: {En: 'Campaign 2020', Es: 'Campaña 2020'},
        actor: 'Paulina Cocina',
        img: paulianCocina,
        decription: 
        { 
            En:`Paulina Cocina is an expert in the handling of digital tools and has managed to position herself as one of the authors most followed and valued by the management of their YouTube and Instagram profiles. It started as a game and today, many videos, posts and recipes later gathers 2 million followers. In their networks you can find all kinds of recipes, which anyone can do at home, tricks and tips to make you better and stop giving excuses when cooking and eating real food.`,
            Es:`Paulina Cocina es una experta en el manejo de las herramientas digitales y ha conseguido posicionarse como una de las autoras más seguidas y valoradas por la gestión de sus perfiles de YouTube e Instagram. Empezó como un juego y hoy, muchos vídeos, posteos y recetas después reúne 2 millones de seguidores. En sus redes podrás encontrar recetas de todo tipo, que cualquiera puede hacer en su casa, trucos y consejos para que te salgan mejor y dejes de dar excusas a la hora de cocinar y comer comida de verdad.`
        },
        videos:[
            {
                icon: faYoutube,
                title: { En: 'Meat with basil', Es:'Ternera con albahaca'},
                iframeUrl: 'https://www.youtube.com/embed/Z9v0yU7Pt4Q?si=6tF_bZNpYEKdRWsi',
                socialNet: 'youTube',
            },
            {
                icon: faYoutube,
                title: { En: 'Marinated pork skewers', Es:'Pinchos de cerdo marinados'},
                iframeUrl: 'https://www.youtube.com/embed/-aQifTROFBg?si=9_L8jAh8d_bQ9Q3D',
                socialNet: 'youTube',
            },
            {
                icon: faYoutube,
                title: { En: 'Pad Thai Step by step', Es:'Pad Thai PASO A PASO'},
                iframeUrl: 'https://www.youtube.com/embed/OcV2agmtTk4?si=-b9gUQ2K7NEkyE33',
                socialNet: 'youTube',
            },
        ]
    },
    {
        title: {En: 'Campaign 2022', Es: 'Campaña 2022'},
        actor: 'El Gordo Cocina',
        img: gordoCocina,
        decription: 
        { 
            En:`She always liked to cook. Guided by his desire and the insistence of his friends, in June 2015 he opened an account on the social network dedicated to pleasure and image "to share what he did". From 10,000, followers were growing and, after a year, he left his position in marketing a multinational to dedicate himself every day to cooking, photographing and publishing the final product.`,
            Es:`Según cuenta, siempre le gustó cocinar. Guiado por su deseo y la insistencia de sus amigos, en junio de 2015 abrió una cuenta en la red social dedicada al placer y a la imagen "para compartir lo que hacía". De a 10.000, los seguidores aumentaban y, al cabo de un año, dejó su puesto en marketing de una multinacional para dedicarse todos los días a cocinar, fotografiarlo y publicar el producto final.`
        },
        videos:[
            {
                icon: faInstagram,
                title: {En: 'Pumpkin Curry', Es:'Curry de calabaza'},
                iframeUrl: 'CidocC5AliB',
                socialNet: 'ig',
            },
            {
                icon: faInstagram,
                title:{En: 'Pad Thai', Es:'Pad Thai'},
                iframeUrl: 'CivyndPAWgP',
                socialNet: 'ig',
            },
            {
                icon: faInstagram,
                title: { En: 'Thai Food 03', Es:'Arroz salteado con ananá'},
                iframeUrl: 'Ci72-C2AXMt',
                socialNet: 'ig',
            },
        ]
    },
]
// end of Campaigns Page

export{
    paths,
    navBarData,
    textHero,
    carouselHome,
    distThaiProducts,
    restThai,
    businessWheelHeaderText,
    thaiDelegationList2,
    campaign,
}
