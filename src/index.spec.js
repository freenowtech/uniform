import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme/build';

import formGenerator from './index';

const formConfig = {
    fields: [
        {
            component: 'TextInput',
            defaultValue: 'default',
            label: 'Text input with default value',
            name: 'default',
        },
        {
            component: 'TextInput',
            displayConfigs: [
                {
                    methods: [
                        {
                            compareValue: ['show'],
                            type: 'oneOf',
                        },
                    ],
                    type: 'string',
                    valueKey: 'default',
                },
            ],
            label: 'Text input with display logic',
            name: 'display',
        },
        {
            component: 'TextInput',
            label: 'Text input with validation logic',
            name: 'validation',
            validationConfig: {
                methods: [
                    {
                        message: 'Required',
                        type: 'required',
                    },
                ],
                type: 'string',
            },
        },
    ],
    name: 'test',
};

const FormContainer = ({ children, ...rest }) => (
    <form {...rest}>{children}</form>
);
FormContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const TextInput = ({ field, setFieldValue }) => (
    <input
        {...field}
        onChange={e => setFieldValue(field.name, e.target.value)}
        id={field && field.name}
    />
);
TextInput.propTypes = {
    field: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

const SubmitButton = props => <button {...props} type='submit' />;

const components = {
    FormContainer,
    SubmitButton,
    TextInput,
};

describe('formGenerator', () => {
    const Form = formGenerator(formConfig, components);
    const submitCall = jest.fn();
    const wrapper = mount(<Form onSubmit={submitCall} />);

    it('creates two inputs from config', () => {
        expect(wrapper.find('input').length).toBe(2);
    });

    test('default values are passing', () => {
        expect(wrapper.find('input[name="default"]').instance().value).toBe(
            'default',
        );
    });

    it('renders inputs from the config', () => {
        wrapper
            .find('input[name="default"]')
            .props()
            .onChange({ target: { value: 'show' } });

        wrapper.update();

        expect(wrapper.find('input').length).toBe(3);
    });

    it('does not submit if there is any validation errors', done => {
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        // Formik does the submit asyncronous
        setTimeout(() => {
            expect(submitCall).not.toHaveBeenCalled();
            done();
        }, 0);
    });

    it('submits if validations pass', done => {
        wrapper
            .find('input[name="validation"]')
            .props()
            .onChange({ target: { value: 'show' } });

        wrapper.find('form').simulate('submit', { preventDefault: () => {} });

        setTimeout(() => {
            expect(submitCall).toHaveBeenCalled();
            done();
        }, 0);
    });
});
