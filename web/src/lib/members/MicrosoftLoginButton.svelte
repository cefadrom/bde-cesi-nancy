<script lang="ts">
    import { env } from '$env/dynamic/public';

    const loginURL = `${env.PUBLIC_DIRECTUS_URL}/auth/login/microsoft?redirect=${env.PUBLIC_WEB_URL}/login`;
</script>


<style>
    img {
        width: 100%;
        height: 100%;
    }
</style>


<a href={loginURL}>
    <img src="microsoft/signin-large.svg" alt="Se connecter avec Microsoft" height="41"/>
</a>
