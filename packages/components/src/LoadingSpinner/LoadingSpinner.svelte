<style>
    .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .spinner {
        height: 3rem;
        width: 3rem;
        border-radius: 100%;
        animation: spin .75s linear infinite;
        border: .5rem solid var(--black);
        border-top-color: transparent;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>


<div class="spinner-container">
    <div class="spinner"/>
</div>
