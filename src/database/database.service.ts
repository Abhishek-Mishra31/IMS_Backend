import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private readonly logger = new Logger(DatabaseService.name);

    constructor(
        @InjectConnection() private readonly connection: Connection,
        private readonly configService: ConfigService,
    ) {
        this.connection.on('connected', () => {
            this.logger.log(' MongoDB connected successfully');
        });

        this.connection.on('disconnected', () => {
            this.logger.warn(' MongoDB disconnected');
        });

        this.connection.on('error', (error) => {
            this.logger.error('MongoDB connection error:', error);
        });
    }

    async onModuleInit() {
        const state = this.connection.readyState;
        if (state === 1) {
            this.logger.log('MongoDB connected successfully');
            this.logger.log(`Database: ${this.connection.db?.databaseName || 'N/A'}`);
        } else {
            this.logger.warn(` MongoDB connection state: ${this.getConnectionState(state)}`);
        }
    }

    private getConnectionState(state: number): string {
        const states = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting',
        };
        return states[state] || 'unknown';
    }

    getConnection(): Connection {
        return this.connection;
    }

    async getDbStats() {
        try {
            if (!this.connection.db) {
                throw new Error('Database connection not available');
            }

            const admin = this.connection.db.admin();
            const dbStats = await this.connection.db.stats();
            return {
                database: this.connection.db.databaseName,
                collections: dbStats.collections,
                dataSize: dbStats.dataSize,
                indexSize: dbStats.indexSize,
                storageSize: dbStats.storageSize,
            };
        } catch (error) {
            this.logger.error('Error fetching database stats:', error);
            throw error;
        }
    }

    async healthCheck(): Promise<boolean> {
        try {
            const state = this.connection.readyState;
            return state === 1;
        } catch (error) {
            this.logger.error('Health check failed:', error);
            return false;
        }
    }
}
