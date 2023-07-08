import nodeFetch from 'node-fetch';


let refreshToken: string;


export function helloAssoAuth(client: string, secret: string, endpoint: string, keyCallback: KeyCallback) {
    login(client, secret, endpoint)
        .then((res) => {
            refreshToken = res.refresh_token;
            keyCallback(res.access_token);

            setInterval(() => {
                refresh(client, endpoint)
                    .then((res) => {
                        refreshToken = res.refresh_token;
                        keyCallback(res.access_token);
                    })
                    .catch(e => console.error(`HelloAsso refresh: ${e}`));
            }, res.expires_in * 1000 - 10_000); // Refresh every given interval minus 10 seconds
        })
        .catch(e => console.error(`HelloAsso login: ${e}`));
}


async function login(client: string, secret: string, endpoint: string) {
    const res = await nodeFetch(`${endpoint}/oauth2/token`, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: client,
            client_secret: secret,
        }).toString(),
        method: 'POST',
    });

    return res.json() as Promise<HelloAssoAuthResponse>;
}


async function refresh(client: string, endpoint: string) {
    const res = await nodeFetch(`${endpoint}/oauth2/token`, {
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: client,
            refresh_token: refreshToken,
        }).toString(),
        method: 'POST',
    });

    return res.json() as Promise<HelloAssoAuthResponse>;
}


export type KeyCallback = (key: string) => void;

export type HelloAssoAuthResponse = {
    access_token: string,
    token_type: string,
    expires_in: number,
    refresh_token: string,
}
