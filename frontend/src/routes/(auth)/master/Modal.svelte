<script>
    import {Icon, XMark} from "svelte-hero-icons";
    export let showModal

    let dialog

    $: if (dialog && showModal) dialog.showModal()
</script>

<dialog
    class="p-0 rounded-md w-1/3"
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <div class="relative" on:click|stopPropagation>
        <span class="absolute pr-8 pt-6 right-0 cursor-pointer" on:click={() => dialog.close()}><Icon class="h-7 w-7 text-gray-500" src={XMark} /></span>
        <slot />
    </div>
</dialog>

<style>
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>