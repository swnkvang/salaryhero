import ValidateRequest from "../../utils/validate-request-utils";
import JsonUtils from "../../utils/json-utils";
import validate from "./validate";
import companyDao from "./dao";
import httpStatus from "../../master/http-status";

class companyService {
    static async addAdmin(body) {
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
                listAdmin,
                createBy
            } = param;
            let resValid = await validate.validReqAddAdmin(param);
            if (resValid.status == 'E') {
                responseStatus = resValid.responseStatus;
                return JsonUtils.setJsonOutput(
                    headerData,
                    responseRecord,
                    responseStatus
                );
            }
            // ตรวจสอบว่า companyId มีค่าอยู่ใน table company
            let resCompany = await companyDao.getCompanyById(companyId);
            if (resCompany) {
                let countCompany = resCompany.rowCount;
                if (countCompany != 0) {
                    // ตรวจสอบว่า listAdmin มีค่าอยู่ใน table admin ทั้งหมด
                    let mapAdmin = listAdmin.map((el, idx) => el.adminId).filter(Number);
                    let resAdmin = await companyDao.getAdminByList(mapAdmin);
                    if (resAdmin) {
                        let countAdmin = resAdmin.rows[0].count;
                        let listInsert = [];
                        if (countAdmin == listAdmin.length) {
                            listAdmin.forEach((el) => {
                                let admin = el.adminId;
                                let status = el.status;
                                let row = [
                                    companyId,
                                    admin,
                                    'now()',
                                    status
                                ]
                                listInsert.push(row);
                            })
                            let resInsert = await companyDao.insertAddminToCompany(listInsert);
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
                        } else {
                            responseStatus = {
                                statusCode: 'E',
                                errorCode: httpStatus.NO_CONTENT.CODE,
                                errorMessage: 'adminId not found',
                            };
                        }
                    } else {
                        responseStatus = {
                            statusCode: 'E',
                            errorCode: httpStatus.INTERNAL_SERVER_ERROR.CODE,
                            errorMessage: httpStatus.INTERNAL_SERVER_ERROR.TEXT_EN,
                        };
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
}

export default companyService