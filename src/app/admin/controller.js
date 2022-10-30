import CompanyService from "./service";

class CompanyController {
    static createAdmin(req, res) {
        CompanyService.createAdmin(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static updateAdmin(req, res) {
        CompanyService.updateAdmin(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
    static getAdmin(req, res) {
        CompanyService.getAdmin(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
}

export default CompanyController;
