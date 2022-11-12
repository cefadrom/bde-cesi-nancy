export const messages = new Map<number, string>([
    [ 403, 'Vous n\'avez rien à faire ici, ouste !' ],
    [ 404, 'Eh bah alors, on s\'est perdu ? 😬' ],
]);


export function getErrorMessage(status: number, error: App.Error | null) {
    if (messages.has(status))
        return messages.get(status);

    if (error)
        return error.message;

    return 'Une erreur inconnue est survenue... Hmm, étrange 🤔';
}
