import CompanyService from "./service";

class CompanyController {
    static upsertEmp(req, res) {
        CompanyService.upsertEmployee(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static getEmp(req, res) {
        CompanyService.getEmp(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
}

export default CompanyController;
