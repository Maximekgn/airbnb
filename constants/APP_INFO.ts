export const APP_INFO = {
    name: 'Airbnb',
    curency: 'FCFA',
    version: '1.0.0',
    description: 'Plateforme de location de logements',
    author: 'Airbnb Inc.',
    environment: process.env.NODE_ENV || 'development',
    apiBaseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    supportEmail: 'support@airbnb.com',
    website: 'https://www.airbnb.com',
} as const;