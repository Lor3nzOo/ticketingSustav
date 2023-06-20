<script>
    import {Eye, EyeSlash, Icon} from "svelte-hero-icons";
    import {field, form} from "svelte-forms";
    import {required} from "svelte-forms/validators";
    import axios from "axios";
    import {goto} from "$app/navigation";

    let type = "password";

    const username = field('username', '', [required()]);
    const userPassword = field('password', '', [required()]);

    const loginForm = form(username, userPassword);

    const login = async () => {
        try {
            loginForm.validate
            const created = await axios.post('http://localhost:3000/api/auth/login', $loginForm.summary, { withCredentials: true })
            alert(created.data)
            await goto('/app')
        } catch (e) {
            alert(e.response.data.message)
        }
        $username.value = ''
        $userPassword.value = ''
    }
</script>

<main class="flex flex-col justify-between items-center text-gray-300">
    <div class="flex flex-col justify-center py-48 items-center gap-8">
        <input class="outline-0 w-full focus:ring-white ring-gray-300 ring-2 text-xl py-3 px-5 rounded-md bg-gray-500 transition-all" type="text" placeholder="Username" bind:value={$username.value}>
        <div class="relative">
            {#if type === "password"}
                <input class="outline-0 w-full focus:ring-white ring-gray-300 ring-2 text-xl py-3 px-5 rounded-md bg-gray-500 transition-all" type="password" placeholder="Password" bind:value={$userPassword.value}>
                <span on:click={() => type = "text"}>
                <Icon class="absolute w-7 h-7 top-3 right-5 cursor-pointer" src="{Eye}" />
            </span>
            {:else }
                <input class="outline-0 w-full focus:ring-white ring-gray-300 ring-2 text-xl py-3 px-5 rounded-md bg-gray-500 transition-all" type="text" placeholder="Password" bind:value={$userPassword.value}>
                <span on:click={() => type = "password"}>
                <Icon class="absolute w-7 h-7 top-3 right-5 cursor-pointer" src="{EyeSlash}" />
            </span>
            {/if}
        </div>
        <button class="w-full rounded-md py-3 font-bold text-gray-500 bg-white hover:bg-gray-500 hover:text-white ring-2 ring-white px-10 transition-all" disabled={!$loginForm.valid} on:click={login}>Logiraj se</button>
    </div>
</main>