import controller from './controller';

export function setup(router) {
    router.post('/create', controller.createCompany);
    router.put('/update', controller.updateCompany);
    router.get('/get', controller.getCompany);

}