import * as redis from 'redis';
import config from '../config/config';

export default class RedisCaching {
    connected: boolean = false;
    client: any = null;
    db: any = null;

    constructor(db?: any) {
        this.db = db;
    }

    Connection = async () => {
        try {
            const client = redis.createClient(
                {
                    port: config.redis.port,
                    host: config.redis.host,
                    no_ready_check: true,
                    //// auth_pass: config.redis.pass
                }
            );

            return new Promise((resolve: any, reject: any) => {
                client.on('connect', () => {
                    this.connected = true;
                    this.client = client;
                    resolve({
                        connected: true,
                        client
                    });
                    console.log('>>>> Redis Connected Successfully', this.connected);
                });

                client.on('error', (err: any) => {
                    console.log(`>>>> Redis Connection Failed, ${err.message}`);
                    reject({
                        connected: false,
                        client: null
                    });
                });
            });
        } catch (err: any) {
            console.log(`>>>> Redis Connection Failed, ${err.message}`);

        }
    }
} 