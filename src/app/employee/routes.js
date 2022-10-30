import controller from './controller';

export function setup(router) {
    router.post('/upsert', controller.upsertEmp);
    router.get('/get', controller.getEmp);

}