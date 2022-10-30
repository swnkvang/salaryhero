import CompanyService from "./service";

class CompanyController {
    static addAdmin(req, res) {
        CompanyService.addAdmin(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
}

export default CompanyController;
