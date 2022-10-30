const format = require("pg-format");
import DataBaseUtils from "../../utils/database-utils";

class tranferDao {
    static async getTranfer(employeeId, year, month) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let queryString = {
                text: `SELECT employee_id, "month", "year", sum(request_money) as sum_req
                FROM salaryhero.tranfer_request_money
                WHERE employee_id = '${employeeId}' and year = '${year}' and month = '${month}' and status = 'SUCCESS'
                group by employee_id, "month", "year"
                ;`,
            };
            console.log('queryString', queryString.text)
            let data = await DataBaseUtils.execute(client, queryString);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    }
    static async insertTranfer(employeeId, year, month, requestMoney, createBy, status) {
        try {
            let client = await DataBaseUtils.getConnectionsInformation();
            let query;
            query = `INSERT INTO salaryhero.tranfer_request_money
                (employee_id, "month", "year", request_money, status, create_time, create_by)
                VALUES('${employeeId}', '${month}', '${year}', ${requestMoney}, '${status}', 'now()', '${createBy}') returning id;
                `
            ;

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

export default tranferDao
