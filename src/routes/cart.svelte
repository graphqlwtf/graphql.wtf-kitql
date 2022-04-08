<script context="module" lang="ts">
	import { KQL_GetCartBydId, KQL_RemoveFromCart } from '$lib/graphql/_kitql/graphqlStores';
	import type { RemoveCartItemInput } from '$lib/graphql/_kitql/graphqlTypes';

	export const load = async ({ fetch }) => {
		await KQL_GetCartBydId.queryLoad({
			fetch,
			variables: {
				id: '9fd34599-fecd-4a6f-9d25-e8a16255b612'
			}
		});

		return {};
	};
</script>

<script lang="ts">
	let data = $KQL_GetCartBydId.data?.cart;

	const removeFromCart = async (id: RemoveCartItemInput['id']) => {
		const { data } = await KQL_RemoveFromCart.mutate({
			variables: {
				input: {
					cartId: '9fd34599-fecd-4a6f-9d25-e8a16255b612',
					id
				}
			}
		});

		KQL_GetCartBydId.patch(
			{
				cart: data.removeItem
			},
			{
				id: '9fd34599-fecd-4a6f-9d25-e8a16255b612'
			},
			'cache-and-store'
		);
	};
</script>

<div class="text-center space-y-1.5 mb-12">
	<h1 class="text-5xl font-black text-orange-500 uppercase">Cart</h1>
	<p class="text-xl text-gray-500">{data.totalItems} items: {data.subTotal.formatted}</p>
</div>

<ul class="grid gap-6">
	{#each data.items as item}
		<li
			class="rounded-md shadow p-6 flex items-center justify-center transform hover:-translate-y-1 transition hover:shadow-lg group space-x-6"
		>
			<div class="w-32">
				<img src={item.images[0]} alt={item.name} class="block" />
			</div>
			<div class="flex-1 space-y-3">
				<p class="text-black group-hover:text-black transition text-xl font-bold">
					{item.name}
				</p>
				<button
					class="bg-orange-500 text-white font-medium px-3 py-2.5 rounded-md hover:bg-orange-600 transition"
					on:click={() => removeFromCart(item.id)}>&times; Remove</button
				>
			</div>
		</li>
	{/each}
</ul>
