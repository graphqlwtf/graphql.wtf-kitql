<script context="module" lang="ts">
  import {
    KQL_GetCartBydId,
    KQL_RemoveFromCart,
  } from "$lib/graphql/_kitql/graphqlStores";
  import type { RemoveCartItemInput } from "$lib/graphql/_kitql/graphqlTypes";

  export async function load({ session }) {
    return {
      props: {
        kitqlCartId: session.kitqlCartId,
      },
    };
  }
</script>

<script lang="ts">
  export let kitqlCartId: string;

  const removeFromCart = async (input: RemoveCartItemInput) => {
    // patch with optimistic data
    const optiData = $KQL_GetCartBydId.data;
    optiData.cart.subTotal.formatted = `Removing items...`;
    KQL_GetCartBydId.patch(optiData, { id: kitqlCartId }, "store-only");

    // send mutation
    const { data } = await KQL_RemoveFromCart.mutate({
      variables: {
        input,
      },
    });

    // patch with real data
    KQL_GetCartBydId.patch(
      { cart: data.removeItem },
      { id: kitqlCartId },
      "cache-and-store"
    );
  };

  $: cart = $KQL_GetCartBydId.data?.cart;
</script>

<div class="text-center space-y-1.5 mb-12">
  <h1 class="text-5xl font-black text-orange-500 uppercase">Cart</h1>
  <p class="text-xl text-gray-500">
    {cart?.totalItems ?? 0} items &mdash; {cart?.subTotal?.formatted ?? ""}
  </p>
</div>

{#if (cart?.totalItems || 0) >= 1}
  <ul class="grid gap-6">
    {#each cart.items as item}
      <li
        class="rounded-md shadow p-6 flex items-center justify-center transform hover:-translate-y-1 transition hover:shadow-lg group space-x-6"
      >
        <div class="w-32">
          <img src={item.images[0]} alt={item.name} class="block" />
        </div>
        <div class="flex-1 space-y-3">
          <p
            class="text-black group-hover:text-black transition text-xl font-bold"
          >
            {item.name}
          </p>
          <button
            disabled={$KQL_RemoveFromCart.isFetching}
            class="bg-orange-500 disabled:bg-slate-400 text-white font-medium px-3 py-2.5 rounded-md hover:bg-orange-600 transition"
            on:click={() =>
              removeFromCart({ cartId: kitqlCartId, id: item.id })}
            >&times; Remove</button
          >
        </div>
      </li>
    {/each}
  </ul>
{/if}
