import httpStatus from "../../master/http-status";
import ValidateUtils from "../../utils/validate-utils";

class validate {
    static async validReqCreateAdmin(param) {
        let {
            firstName,
            lastName,
            createBy
        } = param;
        if (!(param.hasOwnProperty('firstName')
            && param.hasOwnProperty('lastName')
            && param.hasOwnProperty('createBy')
        )) {
            let resStatusError = { status: 'E', errorCode: httpStatus.BAD_REQUEST.CODE, errorMessage: httpStatus.BAD_REQUEST.TEXT_EN }
            let msgError = { status: 'E', responseStatus: resStatusError }
            return msgError;
        } else {
            if (!(firstName && lastName && createBy)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_REQUIRE.CODE, errorMessage: httpStatus.PARAMETER_REQUIRE.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
            if (ValidateUtils.checkLength(firstName, 100)
                || ValidateUtils.checkLength(lastName, 100)
                || ValidateUtils.checkLength(createBy, 10)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_LENGTH_INVALID.CODE, errorMessage: httpStatus.PARAMETER_LENGTH_INVALID.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validReqUpdateAdmin(param) {
        let {
            adminId,
            firstName,
            lastName,
            updateBy,
            status
        } = param;
        const valueOfStatus = ['ACTIVE', 'INACTIVE']
        if (!(param.hasOwnProperty('adminId')
            && param.hasOwnProperty('firstName')
            && param.hasOwnProperty('lastName')
            && param.hasOwnProperty('updateBy')
            && param.hasOwnProperty('status')
        )) {
            let resStatusError = { status: 'E', errorCode: httpStatus.BAD_REQUEST.CODE, errorMessage: httpStatus.BAD_REQUEST.TEXT_EN }
            let msgError = { status: 'E', responseStatus: resStatusError }
            return msgError;
        } else {
            if (!(adminId && firstName && lastName && updateBy && status)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_REQUIRE.CODE, errorMessage: httpStatus.PARAMETER_REQUIRE.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
            if (ValidateUtils.checkLength(firstName, 100)
                || ValidateUtils.checkLength(lastName, 100)
                || ValidateUtils.checkLength(updateBy, 10)
                || ValidateUtils.checkLength(status, 8)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_LENGTH_INVALID.CODE, errorMessage: httpStatus.PARAMETER_LENGTH_INVALID.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
            if (!(valueOfStatus.includes(status))) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_VALUE_INVALID.CODE, errorMessage: httpStatus.PARAMETER_VALUE_INVALID.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validReqGetAdmin(param) {
        if (!(param.hasOwnProperty('adminId')
            && param.hasOwnProperty('firstName')
            && param.hasOwnProperty('lastName')
        )) {
            let resStatusError = { status: 'E', errorCode: httpStatus.BAD_REQUEST.CODE, errorMessage: httpStatus.BAD_REQUEST.TEXT_EN }
            let msgError = { status: 'E', responseStatus: resStatusError }
            return msgError;
        }
        return { status: 'S', responseStatus: {} }
    }
}

export default validate