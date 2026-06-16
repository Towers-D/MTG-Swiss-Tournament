<script>
    import Router from "svelte-spa-router";
    import Console from "./routes/console.svelte";
    import Lobby from "./routes/lobby.svelte";
    import Pairings from "./routes/pairings.svelte";
    import Matches from "./routes/matches.svelte";
    import Standings from "./routes/standings.svelte";    
</script>

<nav>
    <a href="/#/">Home</a>
</nav>

<Router routes = {{
    '/': Console,
    '/lobby': Lobby,
    '/pairings': Pairings,
    '/matches': Matches,
    '/standings': Standings
}}/>
