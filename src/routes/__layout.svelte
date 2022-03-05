<script>
	import 'tailwindcss/tailwind.css';
	import { initClient } from '@urql/svelte';

	initClient({
		url: import.meta.env.VITE_SMASHGG_URL?.toString(),
		fetchOptions: () => {
			const token = import.meta.env.VITE_SMASHGG_TOKEN?.toString();
			return {
				headers: { authorization: token ? `Bearer ${token}` : '' }
			};
		}
	});
</script>

<slot />
