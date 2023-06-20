<script>
    import {page} from "$app/stores";
    import Modal from "../../../(auth)/master/Modal.svelte";
    import axios from "axios";

    let kampovi = $page.data.kampovi
    let showModal = false
    let type = "password"

    let nazivKampa = ''
    let editNazivKampa = ''
    let editId

    const addKamp = async () => {
        try {
            await axios.post("http://localhost:3000/api/ticket/addKamp", {naziv: nazivKampa}, { withCredentials: true })
            alert("Kamp uspješno kreiran!")
            kampovi = (await axios.get("http://localhost:3000/api/ticket/allKampovi")).data
            showModal = false
        } catch (e) {
            alert(e.response.data.message)
        }
        nazivKampa = ''
    }

    const deleteKamp = async (id) => {
        try {
            await axios.post("http://localhost:3000/api/ticket/deleteKamp", {id})
            alert("Kamp uspjesno izbrisan!")
            kampovi = (await axios.get("http://localhost:3000/api/ticket/allKampovi")).data
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const editKamp = async () => {
        try {
            await axios.post("http://localhost:3000/api/ticket/editKamp", {naziv: editNazivKampa, id: editId})
            alert("Kamp uspjesno uređen!")
            kampovi = (await axios.get("http://localhost:3000/api/ticket/allKampovi")).data
        } catch (e) {
            alert(e.response.data.message)
        }
        editId = 0
        editNazivKampa = ''
    }
</script>
<main class="flex flex-col justify-between items-center text-gray-300">
    <div class="flex flex-col justify-center w-full p-20 gap-20 items-center">
        <div class="flex justify-between items-center w-full">
            <h1 class="text-4xl">Evidencija kampova</h1>
            <button class="rounded-md py-3 font-bold text-gray-500 bg-white hover:bg-gray-500 hover:text-white ring-2 ring-white px-10 transition-all" on:click={() => {
            showModal = true
            nazivKampa = ''
            }}>Dodaj kamp</button>
        </div>
        <Modal bind:showModal>
            <div class="flex flex-col p-10 justify-center items-center gap-10">
                <div class="flex flex-col w-full justify-center items-center gap-5 pt-8">
                    <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="text" placeholder="Ime kampa" bind:value={nazivKampa}>
                </div>
                <button class="rounded-md w-full py-3 font-bold bg-gray-500 text-white ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" disabled={!nazivKampa.length > 0} on:click={addKamp}>Dodaj</button>
            </div>
        </Modal>
        {#if kampovi.length > 0}
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-gray-500 uppercase bg-white">
                <tr>
                    <th class="px-6 py-3">
                        Id kampa
                    </th>
                    <th class="px-6 py-3">
                        Naziv kampa
                    </th>
                    <th class="px-6 py-3">
                        <span class="sr-only">Delete</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {#each kampovi as {naziv, id}}
                    <tr class="border-b bg-gray-400 border-white">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {id}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {#if editId === id}
                                <input class="outline-0 py-3 px-5 text-gray-400 rounded-md mr-4" type="text" placeholder="Novi naziv kampa" bind:value={editNazivKampa}>
                                <button disabled={!editNazivKampa.length > 0} class="hover:underline" on:click={editKamp}>Potvrdi</button>
                                {:else }
                                {naziv}
                            {/if}
                        </th>
                        <td class="px-6 space-x-6 py-4 text-right">
                            <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={() => {
                                if (editId === id) {
                                    editId = 0
                                } else {
                                    editId = id
                                }
                            }}>
                            {#if editId === id}
                                Odustani
                                {:else}
                                Edit
                            {/if}
                            </button>
                            <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={deleteKamp(id)}>Izbriši</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {:else }
            <p class="text-xl font-bold">Nema kampova!</p>
        {/if}
    </div>
</main>