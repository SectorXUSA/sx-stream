<script>
	import { fade, fly } from 'svelte/transition';

	export let tournament;

	// TODO: Get a real solution instead of running the same filter twice
	$: streams = tournament?.streamQueue?.filter((stream) =>
		stream.sets.filter((set) => {
			const { streamSource, streamName } = set.stream;
			const { state } = set;
			return streamSource === 'TWITCH' && streamName === 'SectorXGaming' && state === 2;
		})
	);

	$: sets = streams?.[0]?.sets.filter((set) => {
		const { streamSource, streamName } = set.stream;
		const { state } = set;
		return streamSource === 'TWITCH' && streamName === 'SectorXGaming' && state === 2;
	});

	$: set = sets?.[0];

	let top;
</script>

{#if set}
	<div
		class="justify-items-center text-sx fixed left-0 right-0 grid text-center"
		bind:this={top}
		in:fly={{ y: -window?.innerHeight / 2, duration: 1000 }}
		out:fade
	>
		<div>
			<div class="max-w-full text-4xl bg-white border-2 border-b-0 border-black">
				<span>{set.event.tournament.name}</span>
				-
				<span>{set.event.name}</span>
				-
				<span>{set.fullRoundText}</span>
			</div>

			<div class="flex justify-center h-16">
				<img
					class="aspect-square drop-shadow-2xl object-cover bg-black border-2 border-black"
					src={set.slots[0].entrant.participants[0].user.images?.[0]?.url ?? '/SX Icon White.webp'}
					alt={set.slots[0].entrant.name}
				/>

				<span
					class="bg-primary w-80 grid content-center justify-center p-4 text-4xl font-bold text-white border-2 border-black"
				>
					{set.slots[0].entrant.name}</span
				>
				<div
					class="aspect-square border-x-0 flex justify-center h-full text-6xl font-bold bg-white border-2 border-black"
				>
					{#key set.slots[0].standing.stats.score.value}
						<span class="absolute" transition:fade>
							{set.slots[0].standing.stats.score.value ?? 0}</span
						>
					{/key}
				</div>
				<img
					class="bg-white [height:150%] object-scale-down drop-shadow-2xl rounded-b-2xl border-2 border-black"
					src="/SX Icon Black.webp"
					alt="SX Logo"
				/>
				<!-- <span class="grid items-center justify-center text-4xl font-thin bg-white"> | </span> -->
				<div
					class="aspect-square border-x-0 flex justify-center h-full text-6xl font-bold bg-white border-2 border-black"
				>
					{#key set.slots[1].standing.stats.score.value}
						<span class="absolute" transition:fade>
							{set.slots[1].standing.stats.score.value ?? 0}</span
						>
					{/key}
				</div>
				<span
					class="bg-primary w-80 grid content-center justify-center p-4 text-4xl font-bold text-white border-2 border-black"
				>
					{set.slots[1].entrant.name}
				</span>
				<img
					class="aspect-square drop-shadow-2xl object-cover bg-black border-2 border-black"
					src={set.slots[1].entrant.participants[0].user.images?.[0]?.url ?? '/SX Icon White.webp'}
					alt={set.slots[1].entrant.name}
				/>
			</div>
		</div>
	</div>
{/if}
