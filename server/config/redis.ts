// export interface IRedisClient {
//   client: object
// }
//
// const redisClient: IRedisClient = {
//   client: {
//     get host(){
//       return '192.168.11.1'
//     },
//     get port(){
//       return 6379
//     }
//   }
// };
//
// export default redisClient;

import Redis from "ioredis";

const redisClient = {
  port: 6379,          // Redis port
  host: '192.168.11.1'    // Redis host
}

const redisConfig = new Redis(redisClient);

export default redisConfig;
