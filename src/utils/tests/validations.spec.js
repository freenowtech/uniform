import * as yup from 'yup';

import { validationConstructor, validateValue } from '../validations';

const validationConfig = {
    methods: [
        {
            message: 'Required',
            type: 'required',
        },
    ],
    type: 'string',
};

const validationOneOfConfig = {
    methods: [
        {
            compareValue: ['test'],
            type: 'oneOf',
        },
    ],
    type: 'string',
};

describe('validations', () => {
    describe('validations constructor', () => {
        describe('accepts field name in dot notation', () => {
            it('creates a required validation schema for the field', () => {
                const schema = validationConstructor(
                    'test.field',
                    validationConfig,
                    yup.object(),
                );

                expect(() =>
                    schema.validateSync({ test: { field: '' } }),
                ).toThrowError(yup.ValidationError);
            });

            it('creates a oneOf validation schema for the field', () => {
                const schema = validationConstructor(
                    'test.field',
                    validationOneOfConfig,
                    yup.object(),
                );

                expect(() =>
                    schema.validateSync({ test: { field: 'test' } }),
                ).not.toThrowError(yup.ValidationError);
            });
        });
    });

    describe('validateValue function', () => {
        it('returns true if validation passes', () => {
            const validationResult = validateValue(
                'test.field',
                { test: { field: 'value' } },
                validationConfig,
            );

            expect(validationResult).toBe(true);
        });

        it('returns false if validation throws an error', () => {
            const validationResult = validateValue(
                'test.field',
                { test: { field: '' } },
                validationConfig,
            );

            expect(validationResult).toBe(false);
        });
    });
});
