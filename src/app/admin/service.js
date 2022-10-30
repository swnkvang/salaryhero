import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import adminDao from "./dao";
import httpStatus from "../../master/http-status";

class companyService {
    static async createAdmin(body) {
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
                firstName,
                lastName,
                createBy
            } = param;
            let status = 'ACTIVE';
            let resValid = await validate.validReqCreateAdmin(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resInsert = await adminDao.insertAdmin(firstName, lastName, createBy, status);
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
    static async updateAdmin(body) {
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
                adminId,
                firstName,
                lastName,
                updateBy,
                status
            } = param;
            let resValid = await validate.validReqUpdateAdmin(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resUpdate = await adminDao.updateAdmin(adminId, firstName, lastName, updateBy, status);
            if (resUpdate) {
                if (resUpdate.rowCount > 0) {
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
                    errorMessage: 'Update Fail',
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
    static async getAdmin(body) {
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
                adminId,
                firstName,
                lastName
            } = param;
            let resValid = await validate.validReqGetAdmin(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resGet = await adminDao.getAdmin(adminId, firstName, lastName);
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