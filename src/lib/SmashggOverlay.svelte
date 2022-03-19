<script>
	import { fade, fly } from 'svelte/transition';

	export let set;
</script>

<!-- TODO: {#key} all reactive values -->

{#if set}
	<div
		class="justify-items-center text-sx drop-shadow-sm fixed left-0 right-0 grid m-2"
		in:fly={{ y: -window?.innerHeight / 2, duration: 1000 }}
		out:fade
	>
		<div>
			<div
				class="max-w-full text-4xl text-center bg-white border-2 border-b-0 border-black rounded-t-lg"
			>
				<span>{set.event.tournament.name}</span>
				<span>•</span>
				<span>{set.event.name}</span>
				<span>•</span>
				<span>{set.fullRoundText}</span>
			</div>

			<div class="flex justify-center h-16">
				<div class="aspect-square overflow-hidden bg-black border-2 border-black rounded-bl-lg">
					{#if set?.slots?.[0]?.entrant?.participants?.[0]?.user?.images?.[0]?.url}
						<img
							class="drop-shadow-2xl object-cover w-full h-full"
							src={set.slots[0].entrant.participants[0].user?.images?.[0]?.url}
							alt={set.slots[0].entrant.participants[0].gamerTag}
						/>
					{/if}
				</div>

				<div
					class="bg-primary border-x-0 grid content-center justify-center w-64 p-4 text-4xl font-bold text-white border-2 border-black"
				>
					<span>{set.slots[0].entrant.name}</span>
				</div>

				<div class="aspect-square overflow-hidden bg-white border-2 border-black">
					{#if set.slots[0].entrant.participants[0].prefix}
						<!-- TODO: use css for images and use real fallback extensions -->
						<img
							class="drop-shadow-2xl object-cover w-full h-full"
							src="/logos/{set.slots[0].entrant.participants[0].prefix}.png"
							alt={set.slots[0].entrant.name}
							on:error={(e) => {
								e.target.src = '/logos/_fallback.png';
								e.target.onerror = null;
							}}
						/>
					{/if}
				</div>

				<div
					class="aspect-square border-x-0 flex justify-center h-full text-6xl font-bold bg-white border-2 border-black"
				>
					{#key set.slots[0].standing.stats.score.value}
						<span class="absolute" transition:fade>
							{set.slots[0].standing.stats.score.value ?? 0}
						</span>
					{/key}
				</div>

				<img
					class="bg-white [height:150%] object-scale-down drop-shadow-2xl rounded-b-2xl border-2 border-black"
					src="/brand/SX Icon Black.webp"
					alt="SX Logo"
				/>

				<div
					class="aspect-square border-x-0 flex justify-center h-full text-6xl font-bold bg-white border-2 border-black"
				>
					{#key set.slots[1].standing.stats.score.value}
						<span class="absolute" transition:fade>
							{set.slots[1].standing.stats.score.value ?? 0}
						</span>
					{/key}
				</div>

				<div class="aspect-square overflow-hidden bg-white border-2 border-black">
					{#if set.slots[1].entrant.participants[0].prefix}
						<img
							class="drop-shadow-2xl object-cover w-full h-full"
							src="/logos/{set.slots[1].entrant.participants[0].prefix}.png"
							alt={set.slots[1].entrant.participants[0].prefix}
							on:error={(e) => {
								e.target.src = '/logos/_fallback.png';
								e.target.onerror = null;
							}}
						/>
					{/if}
				</div>

				<div
					class="bg-primary border-x-0 grid content-center justify-center w-64 p-4 text-4xl font-bold text-white border-2 border-black"
				>
					<span>{set.slots[1].entrant.name} </span>
				</div>

				<div class="aspect-square overflow-hidden bg-black border-2 border-black rounded-br-lg">
					{#if set.slots[1].entrant.participants[0].user?.images?.[0]?.url}
						<img
							class="drop-shadow-2xl object-cover w-full h-full"
							src={set.slots[1].entrant.participants[0].user?.images?.[0]?.url ??
								'/logos/_fallback.png'}
							alt={set.slots[1].entrant.participants[0].gamerTag}
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
