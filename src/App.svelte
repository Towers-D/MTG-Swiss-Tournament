<script>
    import Router from "svelte-spa-router";
    import Lobby from "./routes/lobby.svelte";
    import Create from "./routes/create.svelte";
    import Standings from "./routes/standings.svelte";
    import Console from "./routes/console.svelte";
    import Round from "./routes/round.svelte";
</script>

<nav>
    <a href="/#/">Home</a>
</nav>

<Router routes = {{
    '/': Console,
    '/lobby': Lobby,
    '/create': Create,
    '/round': Round,
    '/standings': Standings
}}/>
