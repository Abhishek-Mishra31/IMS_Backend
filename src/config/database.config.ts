import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    MONGODB_URI:
        process.env.MONGODB_URI ||
        'mongodb+srv://Abhishek:abhi3108@ims-backend.gkplcjy.mongodb.net/?appName=IMS-backend',
    DB_NAME: 'IMS-backend',
}));
