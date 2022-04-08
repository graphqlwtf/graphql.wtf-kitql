<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { KQL_GetCartBydId } from "$lib/graphql/_kitql/graphqlStores";
  import { cartId } from "$lib/stores/cart-id";

  onMount(async () => {
    await KQL_GetCartBydId.query({
      fetch,
      variables: {
        id: $cartId,
      },
    });
  });

  $: cart = $KQL_GetCartBydId.data?.cart;
</script>

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
