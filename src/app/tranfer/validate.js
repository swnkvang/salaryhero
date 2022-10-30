import httpStatus from "../../master/http-status";
import ValidateUtils from "../../utils/validate-utils";

class validate {
    static async validReqMoney(param) {
        let {
            employeeId,
            year,
            month,
            requestMoney,
            companyId,
            createBy
        } = param;
        if (!(param.hasOwnProperty('employeeId')
            && param.hasOwnProperty('year')
            && param.hasOwnProperty('month')
            && param.hasOwnProperty('requestMoney')
            && param.hasOwnProperty('companyId')
            && param.hasOwnProperty('createBy')
        )) {
            let resStatusError = { status: 'E', errorCode: httpStatus.BAD_REQUEST.CODE, errorMessage: httpStatus.BAD_REQUEST.TEXT_EN }
            let msgError = { status: 'E', responseStatus: resStatusError }
            return msgError;
        }
        else {
            if (!(employeeId && year && month && requestMoney && companyId && createBy)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_REQUIRE.CODE, errorMessage: httpStatus.PARAMETER_REQUIRE.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
            if (ValidateUtils.checkLength(createBy, 10)
                || ValidateUtils.checkLength(year, 4)
                || ValidateUtils.checkLength(month, 2)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_LENGTH_INVALID.CODE, errorMessage: httpStatus.PARAMETER_LENGTH_INVALID.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }

}

export default validate