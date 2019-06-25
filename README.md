![Uniform](assets/logo.png)
[![Build Status](https://travis-ci.com/mytaxi/uniform.svg?branch=master)](https://travis-ci.com/mytaxi/uniform)

## Description

This library allows you to generate forms based on provided JSON configuration.

## Features

* Use your own components on the Field level (https://jaredpalmer.com/formik/docs/api/field#component).
* Flexible validation in config (using [Yup](https://github.com/jquense/yup)).
* Conditional display logic.
* Custom options in Form level.

## Tutorial

#### Installation

1. Install library.
2. Import package `import formGenerator from '@freenow/uniform';`.
3. Generate form and include in your component: 
    ```
    const Form = formGenerator(formConfig, components);

    ...

    <Form
        onSubmit={/*your submit function*/}
    />
    ```

#### Form configuration

The `formConfig` is an object that contains all field definitions. Let's look at simple example:
```
const formConfig = {
    fields: [
        {
            component: 'TextInput',
            defaultValue: 'default',
            label: 'Text input with default value',
            name: 'default',
        },
    ],
    name: 'test',
};
```
So the config consist of `fields` array and `name` (Unique form name). Each `field` element can have following properties: `component`, `defaultValue`, `label`, `name`, `displayConfigs`, `validationConfig`.

#### Validations

The `validationConfig` is implemented using [Yup](https://github.com/jquense/yup) library. In our case validation checks that the field is string and required. You can chain validation by adding elements in `methods` array.
```
const formConfig = {
    fields: [
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
```

#### Display logic

The `displayConfigs` is implemented using [Yup](https://github.com/jquense/yup) library. In the example below we only show the "display" field when field with the name "default" has value "show". Feel free to depend on multiple fields values by adding additional element to `displayConfig`.
```
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
    ],
    name: 'test',
};
```

#### Component mapping

The `component` property refers to render function of each field and specified in the second paramer in generator. Let's have a look at this:
```
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
```

The `components` object is a mapping between names and the actual components.  `SubmitButton` and `FormContainer` are required to create. And `TextInput` will be linked to `component: 'TextInput'` in the form config. To create custom components for your field please follow [Formik docs on the Field element](https://jaredpalmer.com/formik/docs/api/field#component).

## Tests
By default, mandatory minimum test coverage of the library is set to 80%.

## [Contributing](./CONTRIBUTING.md)

## Authors and acknowledgment

### [Maintainers](./MAINTAINERS)
