// import dotenv from 'dotenv';

// dotenv.config();

const ENV = process.env;
// function must(envName: string): string {
//   if (ENV[envName]) return `${ENV[envName]}`;
//   else throw new Error(`environment.variable.missing ${envName}`);
// }

export default {
  port: parseInt(ENV.PORT || '3000', 10),
  serviceMongoDB: 'mongodb://localhost:27018/workflow'
};