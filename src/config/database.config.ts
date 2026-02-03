import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    MONGODB_URI: 'mongodb+srv://freestylewinds777_db_user:i1ycqBvOp4lC3p3E@ims-backend.gkplcjy.mongodb.net/',
    dbName: 'IMS-backend',
}));