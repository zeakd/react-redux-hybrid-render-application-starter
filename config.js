var config = {
    port: process.env.PORT || 3000,
    devPort: process.env.PORT + 1 || 3001,
    host: process.env.HOST || 'localhost',
    db: process.env.MONGO_URI || 'mongodb://localhost/home'
}

export default config;