<script>
    import { page } from "$app/stores";
    import Modal from "../../(auth)/master/Modal.svelte";
    import EditModal from "./EditModal.svelte";
    import axios from "axios";
    import moment from "moment";

    let tickets = $page.data.tickets
    let showModal = false
    let showEditModal = false
    let statusi = []
    let selectedStatus = ''
    let selectedStatusId
    let sifraJedinice = ''
    let sifraKampa = ''
    let editId
    let editRecepcioner
    let editRecepcionerId
    let editStatus = ''
    let editStatusId
    let allUsers = []
    let editDatum = ''

    const addTicket = async () => {
        let sifra_smjestajne_jedinice = sifraJedinice.split(",").map(jedinica => {
            return {
                id: Number(jedinica)
            }
        })

        try {
            if (sifraKampa > 0 && selectedStatusId > 0 && sifraJedinice > 0) {
                await axios.post("http://localhost:3000/api/ticket/addTicket", {sifra_smjestajne_jedinice, selectedStatusId, sifraKampa}, { withCredentials: true })
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
        try {
            if (editId > 0 && editDatum.length > 0 && editRecepcionerId > 0 && editStatusId > 0) {
                await axios.post("http://localhost:3000/api/ticket/editTicketDash", {id: editId, editDatum: moment(editDatum).format("YYYY-MM-DDTHH:mm:ssZ"), editStatusId, editRecepcionerId})
                tickets = (await axios.get("http://localhost:3000/api/ticket/allTickets")).data
                alert("Ticket uspješno uređen!")
            } else {
                alert("Ispunite polja!")
            }
        } catch (e) {
            alert(e.response.data.message)
        }
        editDatum = ''
        editId = ''
        editRecepcioner = ''
        editStatus = ''
    }
</script>

<main class="flex w-full flex-col pt-10 justify-between items-center text-gray-300">
    <div></div>
    <div class="flex w-1/3 fixed bg-gray-400 rounded-md text-white h-full self-end flex-col justify-start py-10 gap-10 items-center">
        <div class="flex justify-between w-full px-10 items-center">
            <h1 class="text-2xl sticky">Popis ticketa</h1>
            <button class="rounded-md py-3 font-bold bg-gray-500 ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" on:click={async () => {
            selectedStatus = ''
            sifraJedinice = ''
            sifraKampa = ''
            showModal = true
            statusi = (await axios.get("http://localhost:3000/api/ticket/allStatus")).data
        }}>Novi ticket</button>
        </div>
        <Modal bind:showModal>
            <div class="flex flex-col p-10 justify-center items-center gap-10">
                <div class="flex relative flex-col w-full justify-center items-start gap-5 pt-8">
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
                    <input class="outline-0 bg-white w-full focus:ring-gray-500 ring-gray-300 ring-2 py-3 px-5 rounded-md transition-all" type="text" placeholder="Sifra smještajne jedinice" bind:value={sifraJedinice}>
                    <label class="italic">Odvojiti zarezom</label>
                </div>
                <button class="rounded-md w-full py-3 font-bold bg-gray-500 text-white ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" on:click={addTicket}>Dodaj</button>
            </div>
        </Modal>
        <EditModal bind:showEditModal>
            <div class="flex flex-col p-10 justify-center items-center gap-10">
                <div class="flex relative flex-col w-full justify-center items-start gap-5 pt-8">
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
                <button class="rounded-md w-full py-3 font-bold bg-gray-500 text-white ring-2 ring-gray-500 hover:bg-white hover:text-gray-500 px-10 transition-all" on:click={editTicket}>Potvrdi</button>
            </div>
        </EditModal>
        <div class="flex flex-col w-full items-start justify-center gap-10">
            {#if tickets.length > 0}
                <div class="table-wrp">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-gray-500 sticky uppercase bg-white">
                        <tr>
                            <th class="px-3 py-1">
                                ID
                            </th>
                            <th class="px-3 py-1">
                                Datum
                            </th>
                            <th class="px-3 py-1">
                                Recepcioner
                            </th>
                            <th class="px-3 py-1">
                                Status
                            </th>
                            <th class="px-3 py-1">
                                <span class="sr-only">Edit</span>
                            </th>
                            <th class="px-3 py-1">
                                <span class="sr-only">Delete</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="overflow-y-auto">
                        {#each tickets as {id, datum_vrijeme, recepcioner, status}}
                            <tr class="border-b bg-gray-400 border-white overflow-x-auto">
                                <th scope="row" class="px-3 py-2 font-medium whitespace-nowrap text-white">
                                    {id}
                                </th>
                                <th scope="row" class="px-3 py-2 font-medium whitespace-nowrap text-white">
                                    {moment(datum_vrijeme).format("DD.MM.YYYY")}
                                </th>
                                <th scope="row" class="px-3 py-2 font-medium whitespace-nowrap text-white">
                                    {`${recepcioner.id}-${recepcioner.username.charAt(0).toUpperCase() + recepcioner.username.slice(1)}`}
                                </th>
                                <th scope="row" class="px-3 py-2 font-medium whitespace-nowrap text-white">
                                    {status.naziv}
                                </th>
                                <td class="px-3 flex justify-center items-center gap-3 py-2 text-right">
                                    <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={async () => {
                                       editDatum = ''
                                       editId = ''
                                       editRecepcioner = ''
                                       editStatus = ''
                                       showEditModal = true
                                       statusi = (await axios.get("http://localhost:3000/api/ticket/allStatus")).data
                                       allUsers = (await axios.get("http://localhost:3000/api/auth/allUsers")).data
                                       editId = id
                                    }}>Uredi</button>
                                    <button class="text-white hover:underline ring-2 ring-white p-1 rounded-md" on:click={deleteTicket(id)}>Izbriši</button>
                                </td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                </div>
            {:else }
                <p class="text-xl font-bold ml-10">Nema ticketa!</p>
            {/if}
        </div>
    </div>
</main>