export const useValidators = (): {
    required: (v) => string | boolean,
    isEmail: (v) => string | boolean,
    valueLength: (v, length) => string | boolean,
} => {
    const required = (v) => !v ? 'required field' : true;

    const isEmail = (v) => {
        if (/^[0-9a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) return true

        return 'invalid email.'
    }

    const valueLength = (v: string, length: number): boolean | string => {
        if (v && v.length >= length) return true;

        return `Password length must be ${length} characters or more`
    }

    return {
        required,
        isEmail,
        valueLength,
    }
}