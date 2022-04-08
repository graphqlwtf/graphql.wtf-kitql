<script context="module" lang="ts">
	import { KQL_GetCartBydId } from '$lib/graphql/_kitql/graphqlStores';

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
	import '../app.css';

	let cart = $KQL_GetCartBydId.data?.cart;
</script>

<div class="max-w-3xl mx-auto p-6">
	<header class="bg-gray-100 px-6 py-3 rounded-md">
		<ul class="space-x-3 flex items-center justify-between">
			<li>
				<a href="/" sveltekit:prefetch>Home</a>
			</li>
			<li><a href="/cart" sveltekit:prefetch>Cart {cart.subTotal.formatted}</a></li>
		</ul>
	</header>
	<main class="pt-12">
		<slot />
	</main>
</div>
