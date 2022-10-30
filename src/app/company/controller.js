import CompanyService from "./service";

class CompanyController {
    static createCompany(req, res) {
        CompanyService.createCompany(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static updateCompany(req, res) {
        CompanyService.updateCompany(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static getCompany(req, res) {
        CompanyService.getCompany(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
}

export default CompanyController;
