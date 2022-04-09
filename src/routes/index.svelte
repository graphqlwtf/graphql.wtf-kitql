<script context="module" lang="ts">
  import {
    KQL_AddToCart,
    KQL_GetCartBydId,
  } from "$lib/graphql/_kitql/graphqlStores";
  import type { AddToCartInput } from "$lib/graphql/_kitql/graphqlTypes";
  import productJson from "../products.json";

  export async function load({ session }) {
    return {
      props: {
        kitqlCartId: session.kitqlCartId,
        products: productJson,
      },
    };
  }
</script>

<script lang="ts">
  export let kitqlCartId: string;
  export let products: any;

  const addToCart = async (input: AddToCartInput) => {
    // patch with optimistic data
    const optiData = $KQL_GetCartBydId.data;
    optiData.cart.subTotal.formatted = `Adding $${input.price}...`;
    KQL_GetCartBydId.patch(optiData, { id: kitqlCartId }, "store-only");

    // send mutation
    const { data } = await KQL_AddToCart.mutate({
      variables: {
        input,
      },
    });

    // patch with real data
    KQL_GetCartBydId.patch(
      { cart: data.addItem },
      { id: kitqlCartId },
      "cache-and-store"
    );
  };
</script>

<div class="text-center space-y-1.5 mb-12">
  <h1 class="text-5xl font-black text-orange-500 uppercase">Store Now Open</h1>
  <p class="text-xl text-gray-500">Buy swag with Svelte &amp; KitQL</p>
</div>

<ul class="grid gap-6 md:grid-cols-3">
  {#each products as product}
    <li
      class="rounded-md shadow p-6 flex flex-col items-center justify-center transform hover:-translate-y-1 transition hover:shadow-lg group space-y-6 text-center"
    >
      <img src={product.image.url} alt={product.name} class="block" />
      <p class="text-gray-500 group-hover:text-black transition">
        {product.name}
      </p>
      <button
        disabled={$KQL_AddToCart.isFetching}
        class="bg-orange-500 disabled:bg-slate-400 text-white font-medium px-3 py-2.5 rounded-md w-full hover:bg-orange-600 transition"
        on:click={() =>
          addToCart({
            cartId: kitqlCartId,
            id: product.id,
            name: product.name,
            price: product.price,
            images: [product.image.url],
          })}>Add to Cart</button
      >
    </li>
  {/each}
</ul>
