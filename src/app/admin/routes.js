import controller from './controller';

export function setup(router) {
    router.post('/create', controller.createAdmin);
    router.put('/update', controller.updateAdmin);
    router.get('/get', controller.getAdmin);

}