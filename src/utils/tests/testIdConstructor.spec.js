//Unit
import testIdConstructor from '../testIdConstructor';

describe('testIdConstructor', () => {
    describe('returns a constructed test id', () => {
        it('when the name does not contain dot notation', () => {
            const form = 'office';
            const name = 'name';
            expect(testIdConstructor(form, name)).toEqual('office-form-name');
        });

        it('when the name contains dot notation', () => {
            const form = 'office';
            const name = 'name.test';
            expect(testIdConstructor(form, name)).toEqual(
                'office-form-name-test',
            );
        });
    });
});
