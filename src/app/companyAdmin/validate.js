import httpStatus from "../../master/http-status";
import ValidateUtils from "../../utils/validate-utils";

class validate {
    static async validReqAddAdmin(param) {
        let {
            companyId,
            listAdmin,
            createBy
        } = param;
        if (!(param.hasOwnProperty('companyId')
            && param.hasOwnProperty('listAdmin')
            && param.hasOwnProperty('createBy')
        )) {
            let resStatusError = { status: 'E', errorCode: httpStatus.BAD_REQUEST.CODE, errorMessage: httpStatus.BAD_REQUEST.TEXT_EN }
            let msgError = { status: 'E', responseStatus: resStatusError }
            return msgError;
        } else {
            if (!(companyId && listAdmin && createBy)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_REQUIRE.CODE, errorMessage: httpStatus.PARAMETER_REQUIRE.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
            if (ValidateUtils.checkLength(createBy, 10)
            ) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_LENGTH_INVALID.CODE, errorMessage: httpStatus.PARAMETER_LENGTH_INVALID.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
            if (!Array.isArray(listAdmin)) {
                let resStatusError = { status: 'E', errorCode: httpStatus.PARAMETER_VALUE_INVALID.CODE, errorMessage: httpStatus.PARAMETER_VALUE_INVALID.TEXT_EN }
                let msgError = { status: 'E', responseStatus: resStatusError }
                return msgError;
            }
        }
        return { status: 'S', responseStatus: {} }
    }
}

export default validate