import DataBaseUtils from "../../utils/database-utils";
const format = require("pg-format");

class empDao {
    static async upsertEmp(arrayData) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let query;
            query = format(
                `INSERT INTO salaryhero.employee
                (employee_id, company_id, first_name, last_name, status, update_time, salary, update_by)
                VALUES
                %L ON CONFLICT (employee_id,company_id) do update 
                set first_name = EXCLUDED.first_name ,last_name = EXCLUDED.last_name ,status = EXCLUDED.status ,
                    update_time = EXCLUDED.update_time, salary = EXCLUDED.salary, update_by = EXCLUDED.update_by
                ;`,
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
    static async getEmp(employeeId, firstName, lastName, companyId) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let setField = '';
            if (employeeId) {
                setField += ` WHERE employee_id = '${employeeId}'`
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
                if (companyId) {
                    if (setField) {
                        setField += ' AND'
                    } else {
                        setField += ' WHERE'
                    }
                    setField +=  ` emp.company_id = ${companyId}`
                }
            }
            let queryString = {
                text: `SELECT emp.company_id, emp.first_name, emp.last_name, emp.status, emp.update_time, emp.update_by, emp.salary, emp.employee_id, com.company_name
                FROM salaryhero.employee emp
                INNER JOIN salaryhero.company com ON com.company_id = emp.company_id
                ${setField}
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

export default empDao
