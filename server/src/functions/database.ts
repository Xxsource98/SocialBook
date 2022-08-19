import knex, { Knex } from 'knex'
import config from 'config'

type MySQLConfigType = {
    port: number
    host: string
    login: string
    password: string
    database: string
}

const MySQLConfig = (): MySQLConfigType => {
    return {
        port: config.get('Database.port') as number,
        host: config.get('Database.host') as string,
        login: config.get('Database.login') as string,
        password: config.get('Database.pass') as string,
        database: config.get('Database.dbname') as string,
    }
}

const InitConnection = (): Knex => {
    const sqlConfig = MySQLConfig()

    const connection = knex({
        client: 'mysql',
        connection: {
            host: sqlConfig.host,
            port: sqlConfig.port,
            user: sqlConfig.login,
            password: sqlConfig.password,
            database: sqlConfig.database
        },
    })

    console.info(`Connecting to: ${sqlConfig.host}:${sqlConfig.port} (${sqlConfig.database})`);

    connection
        .raw('select 1+1 as result')
        .then(() => {
            console.info('Server is connected to database')
        })
        .catch(() => {
            throw new Error('Failed to Connect to Database!')
        })

    return connection
}

export default InitConnection
