<script context="module" lang="ts">
  export async function load({ fetch, session }) {
    await KQL_GetCartBydId.queryLoad({
      fetch,
      variables: { id: session.kitqlCartId },
    });
    return {};
  }
</script>

<script lang="ts">
  import { KQL_GetCartBydId } from "$lib/graphql/_kitql/graphqlStores";
  // import { KitQLInfo } from "@kitql/all-in";
  import "../app.css";

  $: cart = $KQL_GetCartBydId.data?.cart;
</script>

<!-- Could nice to show it -->
<!-- <KitQLInfo store={KQL_GetCartBydId} /> -->

<div class="max-w-3xl mx-auto p-6">
  <header class="bg-gray-100 px-6 py-3 rounded-md">
    <ul class="space-x-3 flex items-center justify-between">
      <li>
        <a href="/" sveltekit:prefetch>Home</a>
      </li>
      <li>
        <a href="/cart" sveltekit:prefetch
          >Cart {cart?.subTotal?.formatted ?? 0}</a
        >
      </li>
    </ul>
  </header>
  <main class="pt-12">
    <slot />
  </main>
</div>
