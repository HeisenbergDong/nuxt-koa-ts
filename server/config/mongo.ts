export interface IMongooseConfig {
  dbs: string
}

const mongooseConfig: IMongooseConfig = {
  dbs:'mongodb://127.0.0.1:27017/student'
};

export default mongooseConfig;
