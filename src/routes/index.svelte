<script context="module" lang="ts">
  import products from "../products.json";

  export const load = async () => {
    return {
      props: {
        products,
      },
    };
  };
</script>

<script lang="ts">
  import {
    KQL_AddToCart,
    KQL_GetCartBydId,
  } from "$lib/graphql/_kitql/graphqlStores";
  import type { AddToCartInput } from "$lib/graphql/_kitql/graphqlTypes";
  import { cartId } from "$lib/stores/cart-id";

  type CartItem = Pick<AddToCartInput, "id" | "name" | "price" | "images">;

  const addToCart = async (input: CartItem) => {
    const { data } = await KQL_AddToCart.mutate({
      variables: {
        input: {
          cartId: $cartId,
          ...input,
        },
      },
    });

    KQL_GetCartBydId.patch(
      {
        cart: data.addItem,
      },
      {
        id: $cartId,
      },
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
        class="bg-orange-500 text-white font-medium px-3 py-2.5 rounded-md w-full hover:bg-orange-600 transition"
        on:click={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            images: [product.image.url],
          })}>Add to Cart</button
      >
    </li>
  {/each}
</ul>
