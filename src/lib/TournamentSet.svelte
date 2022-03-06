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
	<div class="fixed left-0 right-0 grid justify-items-center text-sx text-center">
		<div>
			<div class="max-w-full bg-white text-4xl  border-2 border-black border-dashed border-b-0">
				<span>{set.event.tournament.name}</span>
				-
				<span>{set.event.name}</span>
				-
				<span>{set.fullRoundText}</span>
			</div>

			<div class="h-16 flex justify-center">
				<img
					class="[height:125%] aspect-square object-cover drop-shadow-2xl rounded-b-xl bg-white border-2 border-black border-dashed"
					src={set.slots[0].entrant.participants[0].user.images?.[0]?.url ?? '/SX Icon Black.webp'}
					alt={set.slots[0].entrant.name}
				/>
				<span
					class="bg-red-700 w-80 p-4 grid justify-center content-center text-white text-4xl font-bold border-2 border-black border-dashed"
				>
					{set.slots[0].entrant.name}</span
				>
				<span
					class="bg-white grid justify-center content-center aspect-square font-bold text-6xl border-2 border-x-0 border-black border-dashed"
				>
					{set.slots[0].standing.stats.score.value ?? 0}
				</span>
				<img
					class="bg-white [height:150%] object-scale-down drop-shadow-2xl rounded-b-2xl border-2 border-black border-dashed"
					src="/SX Icon Black.webp"
					alt="SX Logo"
				/>
				<!-- <span class="bg-white  grid justify-center items-center font-thin text-4xl"> | </span> -->
				<span
					class="bg-white grid justify-center content-center aspect-square font-black text-6xl border-2 border-x-0 border-black border-dashed"
				>
					{set.slots[1].standing.stats.score.value ?? 0}
				</span>
				<span
					class="bg-red-700 w-80 p-4 grid justify-center content-center text-white text-4xl font-bold border-2 border-black border-dashed"
				>
					{set.slots[1].entrant.name}
				</span>
				<img
					class="[height:125%] aspect-square object-cover drop-shadow-2xl rounded-b-xl bg-white border-2 border-black border-dashed"
					src={set.slots[1].entrant.participants[0].user.images?.[0]?.url ?? '/SX Icon Black.webp'}
					alt={set.slots[1].entrant.name}
				/>
			</div>
		</div>
	</div>
{/if}
