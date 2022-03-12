<script>
	import { createClient } from '@supabase/supabase-js';
	import { initClient } from '@urql/svelte';

	// Supabase
	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.toString();
	const supabaseKey = import.meta.env.VITE_SUPABASE_KEY?.toString();
	const supabase = createClient(supabaseUrl, supabaseKey);

	// Urql
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

<style lang="postcss">
	@import 'tailwindcss/tailwind.css';
	@import '$lib/tailwindcss/utilities/font-sx/font-sx.css';
</style>
