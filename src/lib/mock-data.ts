export type Property = {
  id: string;
  slug: string;
  title: string;
  address: string;
  neighborhood: string;
  city: string;
  price: number;
  condoFee?: number;
  iptu?: number;
  mode: "rent" | "buy";
  type: "apartment" | "house" | "studio" | "penthouse";
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: number;
  images: string[];
  tags: string[];
  lat: number;
  lng: number;
  featured?: boolean;
  virtualTour?: boolean;
  petFriendly?: boolean;
  balcony?: boolean;
  nearSubway?: boolean;
  scores: { walkability: number; safety: number; transit: number };
  description: string;
  broker: { name: string; avatar: string; rating: number };
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const generateSlug = (type: string, bedrooms: number, neighborhood: string, city: string, id: string) => {
  const typeStr = type === "apartment" ? "apartamento" : type === "house" ? "casa" : type === "studio" ? "studio" : "cobertura";
  const str = `${typeStr}-${bedrooms}-quartos-${neighborhood}-${city}-${id}`;
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const properties: Property[] = [
  {
    id: "p1",
    slug: generateSlug("apartment", 2, "Jardins", "São Paulo", "p1"),
    title: "Apartamento moderno com vista para o parque",
    address: "Rua Oscar Freire, 1200",
    neighborhood: "Jardins",
    city: "São Paulo",
    price: 4800,
    condoFee: 780,
    iptu: 210,
    mode: "rent",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    area: 78,
    images: [
      img("photo-1560448204-e02f11c3d0e2"),
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1616486338812-3dadae4b4ace"),
    ],
    tags: ["Tour Virtual", "Pet Friendly", "Perto do metrô"],
    lat: -23.561,
    lng: -46.669,
    featured: true,
    virtualTour: true,
    petFriendly: true,
    balcony: true,
    nearSubway: true,
    scores: { walkability: 94, safety: 82, transit: 91 },
    description:
      "Apartamento reformado com acabamentos premium, cozinha integrada e varanda gourmet. Prédio com portaria 24h, piscina e academia.",
    broker: {
      name: "Marina Ribeiro",
      avatar: img("photo-1494790108377-be9c29b29330"),
      rating: 4.9,
    },
  },
  {
    id: "p2",
    slug: generateSlug("penthouse", 4, "Copacabana", "Rio de Janeiro", "p2"),
    title: "Cobertura duplex com terraço e piscina privativa",
    address: "Av. Atlântica, 2500",
    neighborhood: "Copacabana",
    city: "Rio de Janeiro",
    price: 2350000,
    condoFee: 2400,
    iptu: 890,
    mode: "buy",
    type: "penthouse",
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    area: 320,
    images: [
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1600566753190-17f0baa2a6c3"),
    ],
    tags: ["Tour Virtual", "Vista mar", "Piscina"],
    lat: -22.971,
    lng: -43.182,
    featured: true,
    virtualTour: true,
    balcony: true,
    scores: { walkability: 88, safety: 76, transit: 84 },
    description:
      "Cobertura duplex à beira-mar com terraço panorâmico, churrasqueira e piscina privativa. Vista deslumbrante para o Atlântico.",
    broker: {
      name: "Rafael Costa",
      avatar: img("photo-1472099645785-5658abf4ff4e"),
      rating: 4.8,
    },
  },
  {
    id: "p3",
    slug: generateSlug("studio", 1, "Consolação", "São Paulo", "p3"),
    title: "Studio compacto e bem iluminado no centro",
    address: "Rua da Consolação, 340",
    neighborhood: "Consolação",
    city: "São Paulo",
    price: 2200,
    condoFee: 450,
    iptu: 90,
    mode: "rent",
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    parking: 0,
    area: 32,
    images: [
      img("photo-1522708323590-d24dbb6b0267"),
      img("photo-1493809842364-78817add7ffb"),
    ],
    tags: ["Perto do metrô", "Mobiliado"],
    lat: -23.548,
    lng: -46.647,
    virtualTour: false,
    nearSubway: true,
    scores: { walkability: 97, safety: 71, transit: 96 },
    description:
      "Studio compacto, totalmente mobiliado, ideal para quem trabalha na região central. A 3 minutos da estação de metrô.",
    broker: {
      name: "Camila Souza",
      avatar: img("photo-1438761681033-6461ffad8d80"),
      rating: 4.7,
    },
  },
  {
    id: "p4",
    slug: generateSlug("house", 4, "Alphaville", "Barueri", "p4"),
    title: "Casa de condomínio com jardim e churrasqueira",
    address: "Alameda das Palmeiras, 78",
    neighborhood: "Alphaville",
    city: "Barueri",
    price: 1450000,
    condoFee: 1200,
    iptu: 540,
    mode: "buy",
    type: "house",
    bedrooms: 4,
    bathrooms: 4,
    parking: 4,
    area: 280,
    images: [
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1568605114967-8130f3a36994"),
      img("photo-1600596542815-ffad4c1539a9"),
    ],
    tags: ["Pet Friendly", "Piscina", "Condomínio fechado"],
    lat: -23.502,
    lng: -46.86,
    featured: true,
    petFriendly: true,
    scores: { walkability: 62, safety: 96, transit: 58 },
    description:
      "Casa em condomínio fechado com segurança 24h, área gourmet completa, piscina e amplo jardim. Ideal para famílias.",
    broker: {
      name: "Diego Almeida",
      avatar: img("photo-1500648767791-00dcc994a43e"),
      rating: 4.9,
    },
  },
  {
    id: "p5",
    slug: generateSlug("apartment", 3, "Pinheiros", "São Paulo", "p5"),
    title: "Apartamento com varanda gourmet e 3 dormitórios",
    address: "Rua Fradique Coutinho, 900",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    price: 6200,
    condoFee: 1100,
    iptu: 320,
    mode: "rent",
    type: "apartment",
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: 110,
    images: [
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1493663284031-b7e3aefcae8e"),
    ],
    tags: ["Tour Virtual", "Varanda gourmet", "Pet Friendly"],
    lat: -23.564,
    lng: -46.688,
    virtualTour: true,
    petFriendly: true,
    balcony: true,
    nearSubway: true,
    scores: { walkability: 92, safety: 84, transit: 90 },
    description:
      "Apartamento amplo com varanda gourmet integrada, três dormitórios (uma suíte) e duas vagas de garagem.",
    broker: {
      name: "Juliana Prado",
      avatar: img("photo-1544005313-94ddf0286df2"),
      rating: 4.8,
    },
  },
  {
    id: "p6",
    slug: generateSlug("studio", 1, "República", "São Paulo", "p6"),
    title: "Loft industrial em prédio histórico",
    address: "Rua Aurora, 155",
    neighborhood: "República",
    city: "São Paulo",
    price: 3400,
    condoFee: 620,
    iptu: 140,
    mode: "rent",
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    parking: 1,
    area: 55,
    images: [
      img("photo-1502672023488-70e25813eb80"),
      img("photo-1484154218962-a197022b5858"),
    ],
    tags: ["Perto do metrô", "Design"],
    lat: -23.542,
    lng: -46.641,
    nearSubway: true,
    scores: { walkability: 95, safety: 68, transit: 94 },
    description:
      "Loft com pé-direito alto, tijolinho aparente e janelões. Charme industrial no coração de São Paulo.",
    broker: {
      name: "Bruno Tavares",
      avatar: img("photo-1531427186611-ecfd6d936c79"),
      rating: 4.6,
    },
  },
  {
    id: "p7",
    slug: generateSlug("apartment", 3, "Ipanema", "Rio de Janeiro", "p7"),
    title: "Apartamento pé na areia em Ipanema",
    address: "Rua Vinícius de Moraes, 120",
    neighborhood: "Ipanema",
    city: "Rio de Janeiro",
    price: 8900,
    condoFee: 1500,
    iptu: 480,
    mode: "rent",
    type: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    area: 140,
    images: [
      img("photo-1613977257363-707ba9348227"),
      img("photo-1600585154526-990dced4db0d"),
    ],
    tags: ["Vista mar", "Tour Virtual", "Reformado"],
    lat: -22.984,
    lng: -43.201,
    featured: true,
    virtualTour: true,
    balcony: true,
    scores: { walkability: 96, safety: 79, transit: 82 },
    description:
      "Apartamento totalmente reformado a uma quadra da praia de Ipanema. Vista lateral para o mar.",
    broker: {
      name: "Carla Menezes",
      avatar: img("photo-1487412720507-e7ab37603c6f"),
      rating: 5.0,
    },
  },
  {
    id: "p8",
    slug: "imovel-padrao-p8",
    title: "Apartamento familiar com 4 dormitórios",
    address: "Av. Paulista, 900",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    price: 1180000,
    condoFee: 1650,
    iptu: 420,
    mode: "buy",
    type: "apartment",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    area: 165,
    images: [
      img("photo-1560185007-cde436f6a4d0"),
      img("photo-1560448075-bb485b067938"),
    ],
    tags: ["Perto do metrô", "Escola próxima"],
    lat: -23.561,
    lng: -46.656,
    nearSubway: true,
    scores: { walkability: 93, safety: 80, transit: 95 },
    description:
      "Apartamento amplo, com 4 dormitórios, sendo 2 suítes. Localização privilegiada na Paulista.",
    broker: {
      name: "Felipe Andrade",
      avatar: img("photo-1519085360753-af0119f7cbe7"),
      rating: 4.7,
    },
  },
];

export const collections = [
  {
    id: "balcony",
    slug: "imovel-padrao-balcony",
    title: "Apartamentos com varanda",
    subtitle: "Espaço extra para respirar",
    filter: (p: Property) => !!p.balcony,
    image: img("photo-1502672260266-1c1ef2d93688"),
  },
  {
    id: "subway",
    slug: "imovel-padrao-subway",
    title: "Perto do metrô",
    subtitle: "Mobilidade sem estresse",
    filter: (p: Property) => !!p.nearSubway,
    image: img("photo-1517840901100-8179e982acb7"),
  },
  {
    id: "pet",
    slug: "imovel-padrao-pet",
    title: "Pet friendly",
    subtitle: "Seu bichinho é bem-vindo",
    filter: (p: Property) => !!p.petFriendly,
    image: img("photo-1601758228041-f3b2795255f1"),
  },
  {
    id: "tour",
    slug: "imovel-padrao-tour",
    title: "Com tour virtual",
    subtitle: "Visite de onde estiver",
    filter: (p: Property) => !!p.virtualTour,
    image: img("photo-1600585154340-be6161a56a0c"),
  },
];

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
