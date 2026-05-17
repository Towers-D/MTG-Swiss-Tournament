declare module '*.svelte' {
    import type { SvelteComponentTyped } from 'svelte';

    export default class SvelteComponent extends SvelteComponentTyped<
        any,
        any,
        any
    > { }
}