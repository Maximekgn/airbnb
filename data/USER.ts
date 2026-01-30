export const USER = {
    first_name: "Maxime",
    last_name: "KOGON",
    avatar: 'assets/images/avatar.jpg',
    email: "kogonmaxime@gmail.com",
    tel: "22870426625",
    properties: [
        {
            id: "1",
            image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400",
            price: "10,000",
            rating: 4.5,
            name: "Maison Georgie",
            location: "Kochi, Kerala",
            category: "Rental House",
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
            category: "Apartment",
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
            category: "Villas",
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
          }
    ],
}