// @flow

const testIdConstructor = (form: string, name: string) =>
    `${form}-form-${name.split('.').join('-')}`;

export default testIdConstructor;
