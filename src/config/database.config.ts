import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://prathiksen:prathiksen123@ims-backend.gkplcjy.mongodb.net/?appName=IMS-backend",
}));
