

export default {
    OK: {
        CODE: 200,
        TEXT_EN: "OK",
        TEXT_TH: "ดำเนินการเรียบร้อย"
    },
    CREATED: {
        CODE: 201,
        TEXT_EN: "Created",
        TEXT_TH: "สร้างข้อมูลใหม่สำเร็จ"
    },
    NO_CONTENT: {
        CODE: 204,
        TEXT_EN: "No Content",
        TEXT_TH: "ไม่มีข้อมูล"
    },
    BAD_REQUEST: {
        CODE: 400,
        TEXT_EN: "Bad Request",
        TEXT_TH: "การค้นหาไม่ถูกต้อง"
    },
    UNAUTHORIZED: {
        CODE: 401,
        TEXT_EN: "Unauthorized",
        TEXT_TH: "ระบบไม่สามารถทำรายการได้"
    },
    FORBIDDEN: {
        CODE: 403,
        TEXT_EN: "Forbidden",
        TEXT_TH: "ระบบไม่อนุญาตให้ทำรายการได้"
    },
    NOT_FOUND: {
        CODE: 404,
        TEXT_EN: "Not Found",
        TEXT_TH: "ไม่พบข้อมูลที่ต้องการในระบบ"
    },
    TIMEOUT: {
        CODE: 408,
        TEXT_EN: "Request Timeout",
        TEXT_TH: "ใช้เวลาเชื่อมต่อฐานข้อมูลเกินกำหนด"
    },
    CONFLICT: {
        CODE: 409,
        TEXT_EN: "Conflict",
        TEXT_TH: "มีการดำเนินการซ้ำซ้อนในระบบ"
    },
    INTERNAL_SERVER_ERROR: {
        CODE: 500,
        TEXT_EN: "Contact admin",
        TEXT_TH: "ติดต่อผู้ดูแลระบบ"
    },
    PARAMETER_REQUIRE: {
        CODE: 900,
        TEXT_EN: "Parameter Require",
        TEXT_TH: "กรุณาระบุค่าตามเงื่อนไข"
    },
    PARAMETER_LENGTH_INVALID: {
        CODE: 901,
        TEXT_EN: "Parameter Length Invalid",
        TEXT_TH: "กรุณาระบุค่าตัวแปรตามความยาวที่กำหนด",
    },
    PARAMETER_LENGTH_INVALID_POLICY_CASE: {
        CODE: 902,
        TEXT_EN: "Policy or Cert Length Invalid",
        TEXT_TH: "กรุณาระบุค่าตัวแปร PolicyNo หรือ CertNo ตามความยาวที่กำหนด",
    },
    PARAMETER_VALUE_INVALID: {
        CODE: 903,
        TEXT_EN: "Parameter Value Invalid",
        TEXT_TH: "กรุณาระบุขอบเขตให้ถูกต้อง",
    }


}