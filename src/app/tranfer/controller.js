import CompanyService from "./service";

class CompanyController {
    static reqMoney(req, res) {
        CompanyService.reqMoney(req.body).then(
            (data) => {
                res.send(data);
            }
        )
    }
}

export default CompanyController;
