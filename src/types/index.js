// @flow
import type { ComponentType } from 'react';
import type { FormikActions, FormikValues } from 'formik';

//TODO check at runtime if the component is matching the required interface
export type ComponentMapping = {
    SubmitButton: ComponentType<any>,
    FormContainer: ComponentType<any>,
    [key: string]: ComponentType<any>,
};

export type DynamicFieldConfig = {
    component: string,
    label: string,
    name: string,
    optionsPropName?: string,
    validationConfig?: FieldValidationConfig,
    displayConfigs?: Array<FieldDisplayConfig>,
    defaultValue?: any,
};

export type FieldValidationConfig = {
    type: string,
    methods: Array<ValidationMethodConfig>,
};

export type ValidationMethodConfig = {
    type: string,
    compareValue?: any,
    message?: string,
};

export type FieldDisplayConfig = {
    type: string,
    valueKey: string,
    methods: Array<ValidationMethodConfig>,
};

export type DynamicFormConfig = {
    name: string,
    fields: Array<DynamicFieldConfig>,
    Form: ?string,
};

export type FormProps = {
    onSubmit: (FormikValues, FormikActions) => void,
    isSubmitting?: boolean,
};

export type SubmitButtonProps = {
    isSubmitting: boolean,
    testId: string,
};
