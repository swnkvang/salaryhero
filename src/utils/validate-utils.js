
class ValidateUtils {
    static isFloat(input) {
        if (input.toString().indexOf('.') != -1) {
            input = Number.parseFloat(input).toFixed(2);
            if (isNaN(input)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    static isParsable(input) {
        input = Number(String(input))
        if (isNaN(input)) {
            return false;
        } else {
            return true;
        }
    }

    static validateRequireField(data) {
        if (data === undefined || data === null || data === "") {
            return true;
        } else {
            return false;
        }
    }

    static checkLength(data, length) {
        return data.length > length
    }

    static checkPolicy(policyNo, certNo) {
        if (policyNo.length == 8) { //policy case
            return certNo.length == 0
        } else if (policyNo.length == 4) { //policy+cert case
            return certNo.length == 8
        } else {
            return false
        }
    }

    static convertToString(data) {
        if (data === undefined) {
            return ''
        } else {
            return data != null ? data : ''
        }
    }

    static convertAllToString(data = {}) {
        return Object.keys(data).reduce((acc, item) => {
            if (data[item]) {
                return { ...acc, [item]: `${data[item]}` }
            }
            return { ...acc, [item]: '' }
        }, {})
    }

    static convertToInteger(data) {
        return data != null ? data : 0
    }

    static convertToBoolean(data) {
        return data != null ? data : false
    }
}

export default ValidateUtils;
