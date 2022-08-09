export const messages = new Map<number, string>([
    [ 403, 'Vous n\'avez rien à faire ici, ouste !' ],
    [ 404, 'Eh bah alors, on s\'est perdu ? 😬' ],
]);


export const getErrorMessage = (status: number, error: Error) => messages.has(status)
    ? messages.get(status)
    : error.message;
