var config = {
    port: process.env.PORT || 3000,
    devPort: process.env.PORT + 1 || 3001,
    host: process.env.HOST || 'localhost'
}

export default config;