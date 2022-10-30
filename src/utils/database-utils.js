import config from '../config/database-config'
const Sequelize = require('sequelize');
let { Pool, Client } = require('pg')

class DatabaseUtils {
    static async getConnectionsInformation() {
        const databaseDev = config.postgreSQL.dev
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port,
            schema: databaseDev.schemas.catalog
        })

        return client
    }

    static async execute(client, queryString) {
        let data
        try {
            client.connect()
            await client.query('BEGIN')
            data = await client.query(queryString)
            await client.query('COMMIT')
        } catch (e) {
            console.log(e.message)
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.end()
            return data
        }
    }

    static async executeThrow(client, queryString) {
        let data;
        try {
            client.connect();
            await client.query('BEGIN');
            data = await client.query(queryString);
            await client.query('COMMIT');
            return data;
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.end()
        }
    }

    static async startTransaction(client) {
        client.connect();
        await client.query("BEGIN");
        return;
    }

    static async commitTransaction(client) {
        await client.query("COMMIT");
        client.end();
        return;
    }

    static async rollbackTransaction(client) {
        await client.query("ROLLBACK");
        client.end();
        return;
    }

    static async statementTransaction(client, queryString) {
        let data = null;
        try {
            data = await client.query(queryString);
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        finally {
            return data;
        }
    }
}

export default DatabaseUtils;