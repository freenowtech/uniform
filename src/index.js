// @flow
import React from 'react';
import type { ComponentMapping, DynamicFormConfig, FormProps } from './types';
import { Formik, Field } from 'formik/dist/index';
import type { FormikFormProps } from 'formik/dist/index';
import * as yup from 'yup';
import _ from 'lodash';
import testIdConstructor from './utils/testIdConstructor';
import { validateValue, validationConstructor } from './utils/validations';

function shouldDisplay(field): boolean {
    if (field.displayConfigs) {
        return field.displayConfigs.every(config =>
            validateValue(config.valueKey, this.values, config),
        );
    }
    return true;
}

const formGenerator = (
    config: DynamicFormConfig,
    components: ComponentMapping,
) => {
    const SubmitButton = components['SubmitButton'];
    const FormContainer = config.Form
        ? components[config.Form]
        : components['FormContainer'];
    const Form = (props: FormProps) => {
        const { onSubmit } = props;
        const initialValues = {};
        let validationSchema = yup.object();

        config.fields.forEach(field => {
            if (!_.isNil(field.defaultValue)) {
                _.set(initialValues, field.name, field.defaultValue);
            }
            if (field.validationConfig) {
                validationSchema = validationConstructor(
                    field.name,
                    field.validationConfig,
                    validationSchema,
                );
            }
        });

        const renderForm = ({
            values,
            errors,
            handleSubmit,
            setFieldValue,
        }: FormikFormProps) => {
            return (
                <FormContainer
                    onSubmit={handleSubmit}
                    data-testid={`${config.name}-form`}
                >
                    {config.fields
                        .filter(shouldDisplay, { values })
                        .map(field => {
                            const options =
                                field.optionsPropName &&
                                props[field.optionsPropName];

                            return (
                                <Field
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    component={components[field.component]}
                                    testId={testIdConstructor(
                                        config.name,
                                        field.name,
                                    )}
                                    options={options}
                                    error={errors[field.name]}
                                    setFieldValue={setFieldValue}
                                />
                            );
                        })}
                    <SubmitButton
                        isSubmitting={props.isSubmitting}
                        testId={`${config.name}-form-submit`}
                    />
                </FormContainer>
            );
        };

        return (
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={onSubmit}
                render={renderForm}
            />
        );
    };

    return Form;
};

export default formGenerator;
