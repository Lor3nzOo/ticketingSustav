<script>
    import "../app.css";
    import { page } from "$app/stores";
</script>

<nav class="w-full flex items-baseline justify-between bg-gray-500 text-gray-300 px-20 pt-10">
    <a href={$page.data.user ? "/app" : "/"}>
        <h2 class="text-2xl tracking-wide">Ticketing Sustav</h2>
    </a>
    {#if $page.data.user}
        <div class="flex items-baseline text-white justify-center gap-10">
            <a href="/app/ticketi" class="hover:underline">Evidencija ticketa</a>
            <a href="/app/smjestajneJedinice" class="hover:underline">Evidencija smještajnih jedinica</a>
            <a href="/app/statusi" class="hover:underline">Evidencija statusa ticketa</a>
            <a href="/app/kampovi" class="hover:underline">Evidencija kampova</a>
            <form action="/odjava" method="POST">
                <button class="hover:underline transition-all font-bold uppercase">Odjava</button>
            </form>
        </div>
        {:else }
        <a href="/login" class="hover:underline transition-all font-bold uppercase">Login</a>
    {/if}
</nav>
<slot />