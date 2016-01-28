import server from './src/server';

server.listen(server.get("port"), () => {
    console.log(`express is running on ${server.get("port")}`);
})