// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    // interface Locals {}
    // interface Platform {}
    // interface PrivateEnv {}
    interface PublicEnv {
        PUBLIC_WEB_URL: string;
        PUBLIC_DIRECTUS_URL: string;
    }
    // interface Session {}
    // interface Stuff {}
}
