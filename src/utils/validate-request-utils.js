class validateUtils {
    static ValidateRequest(request) {
        if (!request) {
            return false;
        } else {
            if (!(request.hasOwnProperty("headerData") &&
                request.hasOwnProperty("requestRecord")
            )) {
                return false;
            } else {
                return true;
            }
        }
    }
}

export default validateUtils;