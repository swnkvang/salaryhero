export default {
    port: 3006,
    secretKey: 'secret',
    postgreSQL: {
        dev: {
            host: 'localhost',
            database: 'datasalaryhero',
            user: 'postgres',
            password: 'postgres',
            port: 5432,
            schemas: {
                // dashboard: 'salary_hero',
                catalog: 'salaryhero',
                // infinite: 'infinite',
            },
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },

        }
    }
}