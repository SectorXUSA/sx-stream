<script>
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
</script>

{#if set}
	<div class="fixed left-0 right-0 grid justify-center text-sx">
		<div class="bg-white text-center  text-5xl">
			<span>{set.event.tournament.name}</span>
			-
			<span>{set.event.name}</span>
			-
			<span>{set.fullRoundText}</span>
		</div>
		<div class="h-20 flex justify-center">
			{#if set.slots[0].entrant.participants[0].user.images?.[0]?.url}
				<img
					class="[height:125%] aspect-square object-cover drop-shadow-2xl rounded-b-xl"
					src={set.slots[0].entrant.participants[0].user.images?.[0]?.url}
					alt={set.slots[0].entrant.name}
				/>
			{/if}

			<span
				class="bg-red-500 w-80 p-4 grid justify-center items-center text-white text-4xl font-bold"
			>
				{set.slots[0].entrant.name}</span
			>

			<span class="bg-white grid justify-center items-center aspect-square font-bold text-6xl">
				{set.slots[0].standing.stats.score.value ?? 0}
			</span>

			<img
				class="bg-white [height:150%] object-scale-down drop-shadow-2xl rounded-b-2xl"
				src="/SX Icon Black.webp"
				alt="SX Logo"
			/>
			<!-- <span class="bg-white  grid justify-center items-center font-thin text-4xl"> | </span> -->
			<span class="bg-white grid justify-center items-center aspect-square font-black text-6xl">
				{set.slots[1].standing.stats.score.value ?? 0}
			</span>

			<span
				class="bg-blue-500 w-80 p-4 grid justify-center items-center text-white text-4xl font-bold"
			>
				{set.slots[1].entrant.name}
			</span>

			{#if set.slots[1].entrant.participants[0].user.images?.[0]?.url}
				<img
					class="[height:125%] aspect-square object-cover drop-shadow-2xl rounded-b-xl"
					src={set.slots[1].entrant.participants[0].user.images?.[0]?.url}
					alt={set.slots[1].entrant.name}
				/>
			{/if}
		</div>
	</div>

	<div class="fixed left-0 right-0 bottom-0 flex flex-col justify-center items-center">
		<div class="grid">
			<div />
			<div />
		</div>
		<!-- <img
				class="h-20 object-scale-down drop-shadow-2xl bg-white rounded-xl"
				src="/SX Type Black.webp"
				alt="SX Logo"
			/> -->
	</div>
{/if}
