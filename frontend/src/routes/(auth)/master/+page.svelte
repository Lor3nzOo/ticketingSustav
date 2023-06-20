<script>
    import { Icon, Eye, EyeSlash } from "svelte-hero-icons";
    import { form, field } from 'svelte-forms';
    import { required } from 'svelte-forms/validators';
    import axios from 'axios'
    import Modal from "./Modal.svelte";
    let masterPassword = ''
    let secret = '12345678'
    let loggedIn = false
    let allUsers
    let showModal = false;

    let type = "password";
    let type2 = "password";

    const username = field('username', '', [required()]);
    const userPassword = field('password', '', [required()]);

    const registerForm = form(username, userPassword);

    const loginAsMaster = async () => {
        if (masterPassword === secret) {
            loggedIn = true
            allUsers = await axios.get("http://localhost:3000/api/auth/allUsers")
        } else {
            alert("Kriva Master lozinka!")
            masterPassword = ''
        }
    }

    const addUser = async () => {
        try {
            registerForm.validate
            await axios.post("http://localhost:3000/api/auth/register", $registerForm.summary)
            alert("Recepcioner uspjesno kreiran!")
            allUsers = await axios.get("http://localhost:3000/api/auth/allUsers")
            showModal = false
        } catch (e) {
            alert(e.response.data.message)
        }
        $username.value = ''
        $userPassword.value = ''
    }

    const deleteUser = async (username) => {
        try {
            await axios.post("http://localhost:3000/api/auth/deleteUser", {username})
            alert("Recepcioner uspjesno izbrisan!")
            allUsers = await axios.get("http://localhost:3000/api/auth/allUsers")
        } catch (e) {
            alert(e.response.data.message)
        }
    }
</script>

<main class="flex flex-col justify-between items-center text-gray-300">
    {#if !loggedIn}
        <div class="flex flex-col justify-center py-48 items-center gap-8">
            <div class="relative">
                {#if type === "password"}
                    <input class="outline-0 w-full focus:ring-white ring-gray-300 ring-2 text-xl py-3 px-5 rounded-md bg-gray-500 transition-all" type="password" placeholder="Master password" bind:value={masterPassword}>
                    <span on:click={() => type = "text"}>
                <Icon class="absolute w-7 h-7 top-3 right-5 cursor-pointer" src="{Eye}" />
            </span>
                {:else }
                    <input class="outline-0 w-full focus:ring-white ring-gray-300 ring-2 text-xl py-3 px-5 rounded-md bg-gray-500 transition-all" type="text" placeholder="Master password" bind:value={masterPassword}>
                    <span on:click={() => type = "password"}>
                <Icon class="absolute w-7 h-7 top-3 right-5 cursor-pointer" src="{EyeSlash}" />
            </span>
                {/if}
            </div>
            <button class="w-full rounded-md py-3 font-bold text-gray-500 bg-white hover:bg-gray-500 hover:text-white ring-2 ring-white px-10 transition-all" on:click={loginAsMaster}>Logiraj se kao Master</button>
        </div>
        {:else }
        <div class="flex flex-col justify-center w-full p-20 gap-20 items-center">
            <div class="flex justify-between items-center w-full">
                <h1 class="text-4xl">Recepcioneri</h1>
                <button class="rounded-md py-3 font-bold text-gray-500 bg-white hover:bg-gray-500 hover:text-white ring-2 ring-white px-10 transition-all" on:click={() => (showModal = true)}>Dodaj recepcionera</button>
            </div>
            <Modal bind:showModal>
                <div class="flex flex-col p-10 justify-center items-center gap-10">
                    <div class="flex flex-col w-full justify-center items-center gap-5 pt-8">
                        <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="text" placeholder="Username" bind:value={$username.value}>
                        <div class="relative w-full">
                            {#if type2 === "password"}
                                <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="password" placeholder="Password" bind:value={$userPassword.value}>
                                <span on:click={() => type2 = "text"}>
                                <Icon class="absolute w-7 h-7 top-2.5 right-5 cursor-pointer" src="{Eye}" />
                                </span>
                            {:else }
                                <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="text" placeholder="Password" bind:value={$userPassword.value}>
                                <span on:click={() => type2 = "password"}>
                                <Icon class="absolute w-7 h-7 top-2.5 right-5 cursor-pointer" src="{EyeSlash}" />
                                </span>
                            {/if}
                        </div>
                    </div>
                    <button class="rounded-md w-full py-3 font-bold bg-gray-500 text-white ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" disabled={!$registerForm.valid} on:click={addUser}>Dodaj</button>
                </div>
            </Modal>
            {#if allUsers?.data.length > 0}
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-gray-500 uppercase bg-white">
                    <tr>
                        <th class="px-6 py-3">
                            Username
                        </th>
                        <th class="px-6 py-3">
                            <span class="sr-only">Delete</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each allUsers.data as {username}}
                        <tr class="border-b bg-gray-400 border-white">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {username}
                            </th>
                            <td class="px-6 py-4 text-right">
                                <button class="text-white hover:underline" on:click={deleteUser(username)}>Izbriši</button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {:else }
                <p class="text-xl font-bold">Nema recepcionera!</p>
            {/if}
        </div>
    {/if}
</main>