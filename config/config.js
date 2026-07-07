 const config = {
 env: process.env.NODE_ENV || 'development', 
 port: process.env.PORT || 3000,
 jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
 mongoUri: process.env.MONGODB_URI ||"mongodb://Alan:Alandatabase1224@ac-nuqwyjo-shard-00-00.rgr6kdm.mongodb.net:27017,ac-nuqwyjo-shard-00-01.rgr6kdm.mongodb.net:27017,ac-nuqwyjo-shard-00-02.rgr6kdm.mongodb.net:27017/Portfolio?ssl=true&replicaSet=atlas-8ronjt-shard-0&authSource=admin&appName=Cluster0"||
 process.env.MONGO_HOST ||
 'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
 '/mernproject' 
 }
 export default config
