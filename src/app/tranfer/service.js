import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import tranferDao from "./dao";
import empDao from "../employee/dao";
import httpStatus from "../../master/http-status";
import ValidateUtils from "../../utils/validate-utils";


class companyService {
    static async reqMoney(body) {
        let headerData;
        let responseStatus = {};
        let responseRecord = [];
        try {
            if (!ValidateRequest.ValidateRequest(body)) {
                responseStatus = {
                    statusCode: "E",
                    errorCode: httpStatus.PARAMETER_REQUIRE.CODE,
                    errorMessage: httpStatus.PARAMETER_REQUIRE.TEXT_EN,
                };
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            headerData = JsonUtils.getHeaderData(body.headerData);
            let param = body.requestRecord;
            let {
                employeeId,
                year,
                month,
                requestMoney,
                companyId,
                createBy
            } = param;
            let resValid = await validate.validReqMoney(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            companyId = Number(companyId);
            let resTranfer = await tranferDao.getTranfer(employeeId, year, month, companyId);
            let resEmp = await empDao.getEmp(employeeId);
            if (resTranfer && resEmp) {
                let salary = resEmp.rows[0].salary;
                let sumReqMoney = resTranfer.rows[0].sum_req;
                let salaryHalf = salary / 2;
                let status = '';
                // console.log('salary', salary);
                // console.log('sumReqMoney', sumReqMoney)
                // console.log('salaryHalf', salaryHalf)
                // console.log('', parseFloat(sumReqMoney) + parseFloat(requestMoney))
                if (parseFloat(sumReqMoney) + parseFloat(requestMoney) <= salaryHalf) {
                    status = 'SUCCESS'
                } else {
                    status = 'FAIL'
                }

                let resInsert = await tranferDao.insertTranfer(employeeId, year, month, requestMoney, createBy, status);
                if (resInsert) {
                    responseRecord = [
                        {
                            "status": status,
                            "requestMoney": requestMoney,
                            "month": month,
                            "year": year,
                            "employeeId": employeeId,
                            "companyId": companyId,
                            "transactionId": resInsert.rows[0].id

                        }
                    ]
                    responseStatus = {
                        statusCode: 'S',
                        errorCode: httpStatus.CREATED.CODE,
                        errorMessage: httpStatus.CREATED.TEXT_EN,
                    };
                } else {
                    responseStatus = {
                        statusCode: 'E',
                        errorCode: httpStatus.INTERNAL_SERVER_ERROR.CODE,
                        errorMessage: 'Insert Fail',
                    };
                }
            }
        } catch (error) {
            console.log('Error Exception :', error.message);
            responseStatus = {
                statusCode: 'E',
                errorCode: httpStatus.INTERNAL_SERVER_ERROR.CODE,
                errorMessage: error.message,
            };
        } finally {
            return JsonUtils.setJsonOutput(
                headerData,
                responseRecord,
                responseStatus
            );
        }
    }

}

export default companyService