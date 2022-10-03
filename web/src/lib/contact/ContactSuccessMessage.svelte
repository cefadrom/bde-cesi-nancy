<style>
    .form-success {
        background-color: var(--light-gray);
        border-radius: 2rem;
        padding: 4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 30rem;
        text-align: center;
        color: var(--green);
    }

    @media all and (max-width: 850px) {
        .form-success {
            padding: 2rem;
        }
    }

    @media all and (max-width: 500px) {
        .form-success {
            padding: 0;
            background-color: inherit;
        }
    }
</style>


<div class="bold form-success">
    <p>
        Votre demande de contact à été transmise, nous vous répondrons dans les plus brefs
        <span class="no-br">délais !</span>
    </p>
    <p>
        Assurez-vous de consulter vos mails régulièrement.
    </p>
</div>
