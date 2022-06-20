import { server } from './index.js';

describe('Given a http server', () => {
    test('The server has been instantiated', () => {
        expect(server).toBeTruthy();
    });
});
