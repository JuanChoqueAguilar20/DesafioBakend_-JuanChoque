export const createError = (status, messages) => {
    const err = new Error();
    err.status = status;
    err.message = messages;

    return err;
}