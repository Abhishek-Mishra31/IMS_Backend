import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    uri: 'we_will_use_live_database_uri_later',
    dbName: process.env.DB_NAME || 'ims_backend',
}));
