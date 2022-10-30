import DataBaseUtils from "../../utils/database-utils";

class adminDao {
    static async insertAdmin(firstName, lastName, createBy, status) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryString = {
                text: `INSERT INTO salaryhero."admin"
                (first_name, last_name, status, create_by, create_time)
                VALUES('${firstName}', '${lastName}', '${status}', '${createBy}', 'now()');
                ;
                `,
            };
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
    static async updateAdmin(adminId, firstName, lastName, updateBy, status) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryString = {
                text: `UPDATE salaryhero."admin"
                SET first_name='${firstName}', last_name='${lastName}', status='${status}', update_by='${updateBy}', update_time='now()'
                WHERE admin_id='${adminId}'
                ;`,
            };
            console.log('queryString',queryString.text)
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
    static async getAdmin(adminId, firstName, lastName) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let setField = '';
            if (adminId) {
                setField += ` WHERE admin_id = ${adminId}`
            } else {
                if (firstName) {
                    setField += ` WHERE first_name LIKE '%${firstName}%'`
                }
                if (lastName) {
                    if (setField) {
                        setField += ' AND'
                    } else {
                        setField += ' WHERE'
                    }
                    setField +=  ` last_name LIKE '%${lastName}%'`
                }
            }
            let queryString = {
                text: `SELECT admin_id, first_name, last_name, status, create_by, update_by, create_time, update_time
                FROM salaryhero."admin" ${setField}
                ;`,
            };
            console.log('queryString',queryString.text)
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default adminDao
