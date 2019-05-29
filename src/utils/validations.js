// @flow
import * as yup from 'yup';

import type { FieldDisplayConfig, FieldValidationConfig } from '../types';

export const validationConstructor = (
    name: string,
    config: FieldValidationConfig,
    schema: any,
) => {
    const nameArr = name.split('.');
    if (nameArr.length > 1) {
        return schema.shape({
            [nameArr[0]]: validationConstructor(
                nameArr.splice(1).join('.'),
                config,
                schema,
            ),
        });
    }

    const validationFunction = config.methods.reduce((schema, method) => {
        let args = [];
        if (method.compareValue) {
            args.push(method.compareValue);
        }
        args.push(method.message);

        return schema[method.type](...args);
    }, yup[config.type]());

    return schema.shape({
        [name]: validationFunction,
    });
};

export const validateValue = (
    name: string,
    value: any,
    config: FieldDisplayConfig,
): boolean => {
    const schema = validationConstructor(name, config, yup.object());

    try {
        schema.validateSync(value);
        return true;
    } catch (e) {
        if (e instanceof yup.ValidationError) {
            return false;
        }
        throw e;
    }
};
