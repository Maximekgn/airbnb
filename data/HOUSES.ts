export const HOUSES = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
    price: "10,000",
    rating: 4.5,
    name: "Maison Georgie",
    location: "Kochi, Kerala",
    coordinates: { lat: 9.9312, lng: 76.2673 },
    isSelected: true,
    description:
      "Maison moderne et chaleureuse au cœur de Kochi avec des pièces lumineuses et un accès facile aux cafés et aux transports locaux.",
    owner: {
      name: "Georgie Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      phone: "+91 98765 43210",
      email: "georgie@example.com",
    },
    features: {
      bedrooms: 2,
      bathrooms: 1,
      garage: true,
      parking: 1,
      wifi: true,
      kitchen: "Équipée",
    },
    gallery: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
    ],
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    price: "12,000",
    rating: 4.5,
    name: "Maison Max",
    location: "Edappally, Kerala",
    coordinates: { lat: 10.0099, lng: 76.3577 },
    isSelected: true,
    description:
      "Maison familiale confortable proche des boutiques et restaurants, avec une grande cuisine et un balcon privé.",
    owner: {
      name: "Max Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      phone: "+91 98765 43211",
      email: "max@example.com",
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      garage: true,
      parking: 2,
      wifi: true,
      kitchen: "Entièrement équipée",
    },
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
    ],
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?w=400",
    price: "15,500",
    rating: 4.8,
    name: "Villa Brume Marine",
    location: "Varkala, Kerala",
    coordinates: { lat: 8.7379, lng: 76.7163 },
    isSelected: false,
    description:
      "Villa lumineuse avec vue sur la mer, idéale pour des séjours calmes à deux pas des falaises de Varkala.",
    owner: {
      name: "Aisha Patel",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100",
      phone: "+91 98765 43212",
      email: "aisha@example.com",
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      garage: false,
      parking: 1,
      wifi: true,
      kitchen: "Cuisine ouverte",
    },
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&auto=format",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&fit=crop",
    ],
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&sat=-50",
    price: "9,800",
    rating: 4.3,
    name: "Bungalow des Palmiers",
    location: "Fort Kochi, Kerala",
    coordinates: { lat: 9.9669, lng: 76.2425 },
    isSelected: false,
    description:
      "Bungalow ventilé entouré de palmiers, parfait pour découvrir les ruelles historiques de Fort Kochi.",
    owner: {
      name: "Ravi Menon",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      phone: "+91 98765 43213",
      email: "ravi@example.com",
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      garage: false,
      parking: 1,
      wifi: true,
      kitchen: "Coin cuisine",
    },
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&sat=-20",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=400",
    ],
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1484156818044-c040038b0710?w=400",
    price: "18,200",
    rating: 4.9,
    name: "Loft Backwaters",
    location: "Alleppey, Kerala",
    coordinates: { lat: 9.4981, lng: 76.3388 },
    isSelected: false,
    description:
      "Loft design avec grandes baies vitrées donnant sur les backwaters, équipé pour le travail et le repos.",
    owner: {
      name: "Neha Varghese",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&sat=-20",
      phone: "+91 98765 43214",
      email: "neha@example.com",
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      garage: true,
      parking: 2,
      wifi: true,
      kitchen: "Cuisine haut de gamme",
    },
    gallery: [
      "https://images.unsplash.com/photo-1484156818044-c040038b0710?w=400&auto=format",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&blur=50",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&crop=faces",
    ],
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&warm=50",
    price: "11,500",
    rating: 4.6,
    name: "Maison des Mangues",
    location: "Thrissur, Kerala",
    coordinates: { lat: 10.5276, lng: 76.2144 },
    isSelected: false,
    description:
      "Maison familiale entourée de manguiers, avec une terrasse ombragée et un salon ouvert sur le jardin.",
    owner: {
      name: "Lena Thomas",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&fit=crop",
      phone: "+91 98765 43215",
      email: "lena@example.com",
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      garage: true,
      parking: 2,
      wifi: true,
      kitchen: "Cuisine familiale",
    },
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&fit=crop",
      "https://images.unsplash.com/photo-1484156818044-c040038b0710?w=400&sat=10",
    ],
  },
];
