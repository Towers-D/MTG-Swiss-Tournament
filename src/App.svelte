<script>
    import Router from "svelte-spa-router";
    import Lobby from "./routes/lobby.svelte";
    import Round from "./routes/round.svelte";
    import Standings from "./routes/standings.svelte";
    import Console from "./routes/console.svelte";
</script>

<nav>
    <a href="/#/">Home</a>
</nav>

<Router routes = {{
    '/': Console,
    '/lobby': Lobby,
    '/round': Round,
    '/standings': Standings
}}/>
