import controller from './controller';

export function setup(router) {
    router.post('/addAdmin', controller.addAdmin);

}