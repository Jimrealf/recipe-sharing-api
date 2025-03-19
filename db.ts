import { Pool, PoolConfig } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

// Define the configuration type for the pool
interface DbConfig extends PoolConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

// Create the pool with fallback values
const pool = new Pool({
    user: process.env.DB_USER || 'default_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'default_db',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '5432', 10)
} as DbConfig);

export default pool;