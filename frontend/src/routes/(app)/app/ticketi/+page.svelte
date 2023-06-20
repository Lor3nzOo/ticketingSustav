<script>
    import {page} from "$app/stores";
    import Modal from "../../../(auth)/master/Modal.svelte";
    import EditModal from "../EditModal.svelte";
    import axios from "axios";
    import moment from "moment/moment.js";

    let tickets = $page.data.tickets
    let showModal = false
    let showEditModal = false
    let type = "password"

    let sifraJedinice = ''
    let sifraKampa = ''
    let editId
    let selectedStatus = ''
    let editSifraJedinice = ''
    let sifra_recepcionera
    let selectedStatusId
    let editDatum
    let editStatusId
    let editRecepcionerId
    let editRecepcioner
    let editStatus
    let editSifraKampa = ''
    let datum
    let statusi = []
    let allUsers = []

    const addTicket = async () => {
        let sifra_smjestajne_jedinice = sifraJedinice.split(",").map(jedinica => {
            return {
                id: Number(jedinica)
            }
        })

        try {
            if (sifra_recepcionera > 0 && sifraJedinice.length > 0 && selectedStatusId > 0 && sifraKampa > 0 && datum.length > 0) {
                await axios.post("http://localhost:3000/api/ticket/addTicketRecepcioner", {sifra_recepcionera, sifra_smjestajne_jedinice, selectedStatusId, sifraKampa, datum: moment(datum).format("YYYY-MM-DDTHH:mm:ssZ")}, { withCredentials: true })
                alert("Ticket uspješno kreiran!")
                tickets = (await axios.get("http://localhost:3000/api/ticket/allTickets")).data
                showModal = false
            } else {
                alert("Ispunite polja!")
            }
        } catch (e) {
            alert(e.response.data.message)
        }
        selectedStatus = ''
        sifraJedinice = ''
        sifraKampa = ''
        sifra_recepcionera = ''
        datum = ''
    }

    const deleteTicket = async (id) => {
        try {
            await axios.post("http://localhost:3000/api/ticket/deleteTicket", {id})
            alert("Ticket uspješno izbrisan!")
            tickets = (await axios.get("http://localhost:3000/api/ticket/allTickets")).data
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const editTicket = async () => {
        let sifra_smjestajne_jedinice = editSifraJedinice.split(",").map(jedinica => {
            return {
                id: Number(jedinica)
            }
        })

        try {
            if (editId > 0 && editDatum.length > 0 && editStatusId > 0 && editRecepcionerId > 0 && editSifraKampa > 0 && editSifraJedinice > 0) {
                await axios.post("http://localhost:3000/api/ticket/editTicket", {id: editId, editDatum: moment(editDatum).format("YYYY-MM-DDTHH:mm:ssZ"), editStatusId, editRecepcionerId, editSifraKampa, sifra_smjestajne_jedinice})
                tickets = (await axios.get("http://localhost:3000/api/ticket/allTickets")).data
                alert("Ticket uspješno uređen!")
            } else {
                alert("Ispunite polja!")
            }
        } catch (e) {
            alert(e.response.data.message)
        }
        editId = 0
        editDatum = ''
        editId = ''
        editRecepcioner = ''
        editStatus = ''
        editSifraJedinice = ''
        editSifraKampa = ''
    }
</script>
<main class="flex flex-col justify-between items-center text-gray-300">
    <div class="flex flex-col justify-center w-full p-20 gap-20 items-center">
        <div class="flex justify-between items-center w-full">
            <h1 class="text-4xl">Evidencija ticketa</h1>
            <button class="rounded-md py-3 font-bold text-gray-500 bg-white hover:bg-gray-500 hover:text-white ring-2 ring-white px-10 transition-all" on:click={async () => {
                selectedStatus = ''
                sifraJedinice = ''
                sifraKampa = ''
                datum = ''
                sifra_recepcionera = ''
                showModal = true
                statusi = (await axios.get("http://localhost:3000/api/ticket/allStatus")).data
            }}>Dodaj ticket</button>
        </div>
        <Modal bind:showModal>
            <div class="flex flex-col p-10 justify-center items-center gap-10">
                <div class="flex flex-col w-full justify-center items-center gap-5 pt-8">
                    <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="number" placeholder="Sifra recepcionera" bind:value={sifra_recepcionera}>
                    <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all cursor-pointer" type="date" placeholder="Datum" bind:value={datum}>
                    <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="number" placeholder="Sifra kampa" bind:value={sifraKampa}>
                    <div class="flex w-full gap-4 justify-start items-center">
                        <p>Status: </p>
                        <div class="flex justify-center gap-2 items-center">
                            {#if statusi.length > 0}
                                {#each statusi as {naziv, id}}
                                    <button class:hover:underline={selectedStatus !== naziv} class:font-bold={selectedStatus === naziv} class="cursor-pointer" on:click={() => {
                                        selectedStatus = naziv
                                        selectedStatusId = id
                                    }}>{naziv}</button>
                                {/each}
                            {:else }
                                <p>Nema statusa</p>
                            {/if}
                        </div>
                    </div>
                </div>
                <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="text" placeholder="Sifra smještajne jedinice" bind:value={sifraJedinice}>
                <button class="rounded-md w-full py-3 font-bold bg-gray-500 text-white ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" on:click={addTicket}>Dodaj</button>
            </div>
        </Modal>
        <EditModal bind:showEditModal>
            <div class="flex flex-col p-10 justify-center items-start gap-10">
                <div class="flex relative flex-col w-full justify-center items-start gap-5 pt-8">
                    <div class="flex w-full gap-4 justify-start items-center">
                        <p>Recepcioner: </p>
                        <div class="flex justify-center gap-2 items-center">
                            {#if allUsers.length > 0}
                                {#each allUsers as {username, id}}
                                    <button class:hover:underline={editRecepcioner !== username} class:font-bold={editRecepcioner === username} class="cursor-pointer" on:click={() => {
                                        editRecepcioner = username
                                        editRecepcionerId = id
                                    }}>{username}</button>
                                {/each}
                            {:else }
                                <p>Nema recepcionera</p>
                            {/if}
                        </div>
                    </div>
                </div>
                <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all cursor-pointer" type="date" placeholder="Novi datum" bind:value={editDatum}>
                <div class="flex w-full gap-4 justify-start items-center">
                    <p>Status: </p>
                    <div class="flex justify-center gap-2 items-center">
                        {#if statusi.length > 0}
                            {#each statusi as {naziv, id}}
                                <button class:hover:underline={editStatus !== naziv} class:font-bold={editStatus === naziv} class="cursor-pointer" on:click={() => {
                                    editStatus = naziv
                                    editStatusId = id
                                }}>{naziv}</button>
                            {/each}
                        {:else }
                            <p>Nema statusa</p>
                        {/if}
                    </div>
                </div>
                <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="number" placeholder="Nova sifra kampa" bind:value={editSifraKampa}>
                <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="text" placeholder="Nova sifra smještajne jedinice" bind:value={editSifraJedinice}>
                <label class="italic">Odvojiti zarezom</label>
                <button class="rounded-md w-full py-3 font-bold bg-gray-500 text-white ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" on:click={editTicket}>Potvrdi</button>
            </div>
        </EditModal>
        {#if tickets.length > 0}
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-gray-500 uppercase bg-white">
                <tr>
                    <th class="px-3 py-1">
                        id_ticketa
                    </th>
                    <th class="px-3 py-1">
                        sifra_recepcionera
                    </th>
                    <th class="px-3 py-1">
                        datum_vrijeme
                    </th>
                    <th class="px-3 py-1">
                        sifra_kampa
                    </th>
                    <th class="px-3 py-1">
                        status_ticketa
                    </th>
                    <th class="px-3 py-1">
                        n_sifra_smjestajne_jedinice
                    </th>
                    <th class="px-3 py-1">
                        <span class="sr-only">Delete</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {#each tickets as {id, sifra_recepcionera, datum_vrijeme, sifra_kampa, status_ticketa, n_sifra_smjestajne_jedinice}}
                    <tr class="border-b bg-gray-400 border-white">
                        <th class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {id}
                        </th>
                        <th class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {sifra_recepcionera}
                        </th>
                        <th class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {moment(datum_vrijeme).format("DD.MM.YYYY.")}
                        </th>
                        <th class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {sifra_kampa}
                        </th>
                        <th class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {status_ticketa}
                        </th>
                        <th class="px-6 py-4 font-medium whitespace-nowrap text-white">
                            {#each n_sifra_smjestajne_jedinice as {id}}
                                {`${id} `}
                            {/each}
                        </th>
                        <td class="px-6 space-x-6 py-4 text-right">
                            <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={async () => {
                                editDatum = ''
                                editId = ''
                                editRecepcioner = ''
                                editStatus = ''
                                editSifraJedinice = ''
                                editSifraKampa = ''
                                showEditModal = true
                                allUsers = (await axios.get("http://localhost:3000/api/auth/allUsers")).data
                                statusi = (await axios.get("http://localhost:3000/api/ticket/allStatus")).data
                                editId = id
                            }}>Edit</button>
                            <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={deleteTicket(id)}>Izbriši</button>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {:else }
            <p class="text-xl font-bold">Nema ticketa!</p>
        {/if}
    </div>
</main>