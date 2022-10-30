import controller from './controller';

export function setup(router) {
    router.post('/request_money', controller.reqMoney);
}