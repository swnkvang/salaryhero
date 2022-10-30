import httpStatus from "../../master/http-status";
import ValidateUtils from "../../utils/validate-utils";

class validate {
    static async validReqUpsertEmp(param) {
        let {
            companyId,
            empList,
            createBy
        } = param;
        if (!(param.hasOwnProperty('empList')
        )) {
            let resStatusError = { status: 'E', errorCode: httpStatus.BAD_REQUEST.CODE, errorMessage: httpStatus.BAD_REQUEST.TEXT_EN }
            let msgError = { status: 'E', responseStatus: resStatusError }
            return msgError;
        }
        else {
            if (!Array.isArray(empList)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_VALUE_INVALID.CODE, errorMessage: httpStatus.PARAMETER_VALUE_INVALID.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
    static async validReqGetEmp(param) {
        if (!(param.hasOwnProperty('employeeId')
            && param.hasOwnProperty('firstName')
            && param.hasOwnProperty('lastName')
            && param.hasOwnProperty('companyId')
        )) {
            let resStatusError = { status: 'E', errorCode: httpStatus.BAD_REQUEST.CODE, errorMessage: httpStatus.BAD_REQUEST.TEXT_EN }
            let msgError = { status: 'E', responseStatus: resStatusError }
            return msgError;
        }
        return { status: 'S', responseStatus: {} }
    }

}

export default validate