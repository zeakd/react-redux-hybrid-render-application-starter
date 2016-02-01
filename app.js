import mongoose from 'mongoose';
import server from './src/server';
import config from './config';

if (!config.db) {
  throw new Error('Configuration to MongoDB required');
}
mongoose.connect(config.db);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

server.listen(server.get("port"), () => {
    console.log(`express is running on ${server.get("port")}`);
})