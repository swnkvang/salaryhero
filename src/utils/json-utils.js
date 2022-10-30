import { getUUID } from './api-utils'
import dataUtils from './date-utils'

class JsonUtils {
    static renameKey(obj, oldKey, newKey) {
        obj[newKey] = obj[oldKey];
        if (oldKey != newKey) {
            delete obj[oldKey];
        }
        return obj;
    }

    static setJsonOutput(headerData, responseRecord, responseStatus) {
        let data = {
            "headerData": headerData,
            "responseRecord": responseRecord,
            "responseStatus": responseStatus
        }
        return data;
    }

    static setResponseStatus(httpStatus) {
        let responseStatus = {
            statusCode: httpStatus.CODE !== 500 ? "S" : "E",
            errorCode: httpStatus.CODE,
            //errorMessageEN: httpStatus.TEXT_EN,
            errorMessage: httpStatus.TEXT_TH
        }
        return responseStatus
    }

    static getHeaderData(headerData) {

        let messageId
        let sentDateTime
        let responseDateTime
        if (headerData.messageId === undefined || headerData.messageId === "") {
            messageId = getUUID()
        } else {
            messageId = headerData.messageId
        }

        if (headerData.sentDateTime === undefined || headerData.sentDateTime === "") {
            sentDateTime = dataUtils.getDataToISOString(new Date(), 'dd-mm-yyyy HH:MM:ss')
        } else {
            sentDateTime = headerData.sentDateTime
        }

        if (headerData.responseDateTime === undefined || headerData.responseDateTime === "") {
            responseDateTime = dataUtils.getDataToISOString(new Date(), 'dd-mm-yyyy HH:MM:ss')
        } else {
            responseDateTime = headerData.responseDateTime
        }

        const packageJson = require('./../../package.json');
        let data = {
            "messageId": messageId,
            "sentDateTime": sentDateTime,
            "responseDateTime": responseDateTime,
            "version": packageJson.version
        }
        return data
    }

    static isMockup(body) {
        if (body.requestRecord != undefined) {
            if (body.requestRecord.isMock != undefined) {
                return body.requestRecord.isMock == "Y"
            }
        }
        return false
    }

    static setJsonOutputResponseStatus(headerData, responseStatus) {
        let data = {
            "headerData": headerData,
            "responseStatus": responseStatus
        }
        return data
    }

}


  






export default JsonUtils;