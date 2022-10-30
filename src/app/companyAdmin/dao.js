const format = require("pg-format");
import DataBaseUtils from "../../utils/database-utils";

class companyDao {
    static async getAdminByList(listAdmin) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryString = {
                text: `SELECT COUNT(admin_id)
                FROM salaryhero."admin" WHERE  admin_id in (${listAdmin})  AND status = 'ACTIVE'    
                ;`,
            };
            console.log('queryString', queryString.text)
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
    static async getCompanyById(companyId, listCompany) {
        try {
            let whereSql = '';
            if (listCompany) {
                whereSql = `WHERE company_id in (${listCompany})`
            } else {
                if (companyId) {
                    whereSql = `WHERE company_id = '${companyId}'`
                }
            }
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryString = {
                text: `SELECT company_id
                FROM salaryhero.company ${whereSql} AND status = 'ACTIVE';                      
                ;`,
            };
            console.log('queryString', queryString.text)
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
    static async insertAddminToCompany(arrayData) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let query;
            query = format(
                `INSERT INTO salaryhero.company_admin
                (company_id, admin_id, create_time, status)
                VALUES
                %L ON CONFLICT (company_id, admin_id) do update set status = EXCLUDED.status;`,
                arrayData
            );

            let queryString = {
                text: `${query}`,
            };
            console.log("Query ", queryString.text);
            let data = await DataBaseUtils.execute(client, queryString);
            // console.log('data',data)
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default companyDao
