
export const baseUrl = process.env.NODE_ENV ===   "production" ? 'http://localhost:5000': 'http://localhost:4000';
console.log("baseUrl", baseUrl);

