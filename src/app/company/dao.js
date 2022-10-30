import DataBaseUtils from "../../utils/database-utils";

class companyDao {
    static async insertCompany(companyName, createBy, status) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryString = {
                text: `INSERT INTO salaryhero.company
                (company_name, create_time, status, create_by)
                VALUES('${companyName}', 'now()', '${status}', '${createBy}');
                `,
            };
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
    static async updateCompany(companyId, companyName, updateBy, status) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryString = {
                text: `UPDATE salaryhero.company
                SET company_name='${companyName}', update_time='now()', update_by='${updateBy}', status='${status}'
                WHERE company_id='${companyId}'
                ;`,
            };
            console.log('queryString',queryString.text)
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
    static async getCompany(companyId, companyName) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let setField = '';
            if (companyId) {
                setField += `WHERE company_id = ${companyId}`
            } else if (companyName) {
                setField += `WHERE company_name LIKE '%${companyName}%'`
            }
            let queryString = {
                text: `select t1.company_id, t1.company_name, t1.create_time, t1.update_time, t1.update_by, t1.status, t1.create_by,
                jsonb_agg(jsonb_build_object('adminId',t1.admin_id, 'status', status_admin)) as admin_detail
                from 
                (
                    SELECT c.company_id, c.company_name, c.create_time, c.update_time, c,update_by, c.status, c.create_by, cam.admin_id, cam.status as status_admin
                        FROM salaryhero.company c 
                        inner join(
                            select * from salaryhero.company_admin where status = 'ACTIVE')cam on cam.company_id = c.company_id ${setField}
                )t1 group by (t1.company_id, t1.company_name, t1.create_time, t1.update_time, t1.update_by, t1.status, t1.create_by);
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

export default companyDao
