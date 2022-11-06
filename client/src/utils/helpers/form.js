export const isButtonDisabled = (inputs, errors) => {
    return Object.values(inputs).some((x) => !x) || errors.some((x) => x);
}