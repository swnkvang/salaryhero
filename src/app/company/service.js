import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import companyDao from "./dao";
import httpStatus from "../../master/http-status";

class companyService {
    static async createCompany(body) {
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
                companyName,
                createBy,
            } = param;
            let status = 'ACTIVE';
            let resValid = await validate.validReqCreateCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resInsert = await companyDao.insertCompany(companyName, createBy, status);
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
    static async updateCompany(body) {
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
                companyId,
                companyName,
                updateBy,
                status
            } = param;
            let resValid = await validate.validReqUpdateCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resUpdate = await companyDao.updateCompany(companyId, companyName, updateBy, status);
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
    static async getCompany(body) {
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
                companyId,
                companyName
            } = param;
            let resValid = await validate.validReqGetCompany(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            let resGet = await companyDao.getCompany(companyId, companyName);
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