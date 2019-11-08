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
  host: '119.28.234.85'    // Redis host
}

const redisConfig = new Redis(redisClient);

export default redisConfig;
