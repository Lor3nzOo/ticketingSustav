<script>
    import {page} from "$app/stores";
    import Modal from "../../../(auth)/master/Modal.svelte";
    import axios from "axios";

    let statusi = $page.data.statusi
    let showModal = false
    let type = "password"

    let nazivStatusa = ''
    let editStatusNaziv = ''
    let editId

    const addStatus = async () => {
        try {
            await axios.post("http://localhost:3000/api/ticket/addStatus", {naziv: nazivStatusa}, { withCredentials: true })
            alert("Status uspješno kreiran!")
            statusi = (await axios.get("http://localhost:3000/api/ticket/allStatus")).data
            showModal = false
        } catch (e) {
            alert(e.response.data.message)
        }
        nazivStatusa = ''
    }

    const deleteStatus = async (naziv) => {
        try {
            await axios.post("http://localhost:3000/api/ticket/deleteStatus", {naziv})
            alert("Status uspješno izbrisan!")
            statusi = (await axios.get("http://localhost:3000/api/ticket/allStatus")).data
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const editStatus = async () => {
        try {
            await axios.post("http://localhost:3000/api/ticket/editStatus", {naziv: editStatusNaziv, id: editId})
            alert("Status uspješno uređen!")
            statusi = (await axios.get("http://localhost:3000/api/ticket/allStatus")).data
        } catch (e) {
            alert(e.response.data.message)
        }
        editId = 0
    }
</script>
<main class="flex flex-col justify-between items-center text-gray-300">
    <div class="flex flex-col justify-center w-full p-20 gap-20 items-center">
        <div class="flex justify-between items-center w-full">
            <h1 class="text-4xl">Evidencija statusa ticketa</h1>
            <button class="rounded-md py-3 font-bold text-gray-500 bg-white hover:bg-gray-500 hover:text-white ring-2 ring-white px-10 transition-all" on:click={() => {
                showModal = true
                nazivStatusa = ''
            }}>Dodaj status ticketa</button>
        </div>
        <Modal bind:showModal>
            <div class="flex flex-col p-10 justify-center items-center gap-10">
                <div class="flex flex-col w-full justify-center items-center gap-5 pt-8">
                    <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="text" placeholder="Ime statusa ticketa" bind:value={nazivStatusa}>
                </div>
                <button class="rounded-md w-full py-3 font-bold bg-gray-500 text-white ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" disabled={!nazivStatusa.length > 0} on:click={addStatus}>Dodaj</button>
            </div>
        </Modal>
        {#if statusi.length > 0}
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-gray-500 uppercase bg-white">
                <tr>
                    <th class="px-6 py-3">
                        Id statusa ticketa
                    </th>
                    <th class="px-6 py-3">
                        Naziv statusa ticketa
                    </th>
                    <th class="px-6 py-3">
                        <span class="sr-only">Delete</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {#each statusi as {naziv, id}}
                    <tr class="border-b bg-gray-400 border-white">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {id}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {#if editId === id}
                                <input class="outline-0 py-3 px-5 text-gray-400 rounded-md mr-4" type="text" placeholder="Novi naziv statusa" bind:value={editStatusNaziv}>
                                <button disabled={!editStatusNaziv.length > 0} class="hover:underline" on:click={editStatus}>Potvrdi</button>
                            {:else }
                                {naziv}
                            {/if}
                        </th>
                        <td class="px-6 space-x-6 py-4 text-right">
                            <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={() => {
                                editStatusNaziv = ''
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
                            <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={deleteStatus(naziv)}>Izbriši</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {:else }
            <p class="text-xl font-bold">Nema statusa ticketa!</p>
        {/if}
    </div>
</main>