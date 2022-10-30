import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import empDao from "./dao";
import companyAdminDao from "../companyAdmin/dao";
import httpStatus from "../../master/http-status";
import ValidateUtils from "../../utils/validate-utils";


class companyService {
    static async upsertEmployee(body) {
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
                empList,
            } = param;
            let resValid = await validate.validReqUpsertEmp(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            // ตรวจสอบว่า companyId มีค่าอยู่ใน table company
            let listCompany = empList.map((el,idx) => el.companyId ? el.companyId : '').filter(String);
            let resCompany = await companyAdminDao.getCompanyById('', listCompany);
            if (resCompany) {
                let countCompany = resCompany.rowCount;
                if (countCompany > 0) {
                    let listInsert = [];
                    let companyDB = resCompany.rows.map((el, idx) => el.company_id ? (el.company_id) : '').filter(String)
                    empList.forEach((el, idx) => {
                        let emp = el.employeeId;
                        let fname = el.firstName;
                        let lname = el.lastName;
                        let salary = el.salary;
                        let companyId = el.companyId;
                        let updateBy = el.updateBy;
                        let status = el.status
                        if ((ValidateUtils.checkLength(fname, 100)
                            || ValidateUtils.checkLength(lname, 100)
                        )) {
                            responseStatus = {
                                statusCode: 'E',
                                errorCode: httpStatus.PARAMETER_LENGTH_INVALID.CODE,
                                errorMessage: httpStatus.PARAMETER_LENGTH_INVALID.TEXT_EN,
                            };
                            return;
                        }
                        if (!(ValidateUtils.isFloat(salary))) {
                            responseStatus = {
                                statusCode: 'E',
                                errorCode: httpStatus.PARAMETER_VALUE_INVALID.CODE,
                                errorMessage: httpStatus.PARAMETER_VALUE_INVALID.TEXT_EN,
                            };
                            return;
                        }
                        console.log(companyDB,companyDB.includes(companyId))
                        if (!companyDB.includes(companyId)) {

                            responseStatus = {
                                statusCode: 'E',
                                errorCode: httpStatus.PARAMETER_VALUE_INVALID.CODE,
                                errorMessage: httpStatus.PARAMETER_VALUE_INVALID.TEXT_EN,
                            };
                            return;
                        }
                        let row = [
                            emp,
                            companyId,
                            fname,
                            lname,
                            status,
                            'now()',
                            salary,
                            updateBy
                        ]
                        listInsert.push(row);
                    })
                    if (listInsert.length > 0) {
                        console.log('listInsert',listInsert)
                        let resInsert = await empDao.upsertEmp(listInsert);
                        if (resInsert) {
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

                } else {
                    responseStatus = {
                        statusCode: 'E',
                        errorCode: httpStatus.NO_CONTENT.CODE,
                        errorMessage: 'companyId not found',
                    };
                }


            } else {
                responseStatus = {
                    statusCode: 'E',
                    errorCode: httpStatus.INTERNAL_SERVER_ERROR.CODE,
                    errorMessage: httpStatus.INTERNAL_SERVER_ERROR.TEXT_EN,
                };
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
    static async getEmp(body) {
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
                firstName,
                lastName,
                companyId
            } = param;
            let resValid = await validate.validReqGetEmp(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resGet = await empDao.getEmp(employeeId, firstName, lastName, companyId);
            if (resGet) {
                if (resGet.rowCount > 0) {
                    responseRecord = resGet.rows;
                    responseStatus = {
                        statusCode: 'S',
                        errorCode: httpStatus.OK.CODE,
                        errorMessage: httpStatus.OK.TEXT_EN,
                    };
                } else {
                    responseStatus = {
                        statusCode: 'E',
                        errorCode: httpStatus.NO_CONTENT.CODE,
                        errorMessage: httpStatus.NO_CONTENT.TEXT_EN,
                    };
                }
                
            } else {
                responseStatus = {
                    statusCode: 'E',
                    errorCode: httpStatus.INTERNAL_SERVER_ERROR.CODE,
                    errorMessage: 'Get Fail',
                };
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