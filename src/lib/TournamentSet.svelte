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

	$: sets = streams[0]?.sets.filter((set) => {
		const { streamSource, streamName } = set.stream;
		const { state } = set;
		return streamSource === 'TWITCH' && streamName === 'SectorXGaming' && state === 2;
	});

	$: set = sets[0];
</script>

{#if set}
	<div class="fixed inset-0 hidden" style="background-image: url('/screenshot.jpg');" />

	<div class="fixed left-0 top-0 m-8">
		{set.fullRoundText}
	</div>

	<div class="fixed left-0 right-0 m-8 flex justify-center items-center">
		<div class="bg-green-500 flex justify-center items-center">
			<div class="bg-red-500">
				<span>{set.slots[0].standing.stats.score.value}</span>
				<span>{set.slots[0].entrant.name}</span>
			</div>
			<img src="/SX Icon White circle.webp" alt="SX Icon" />
			<div class="bg-blue-500">
				<span>{set.slots[1].entrant.name}</span>
				<span>{set.slots[1].standing.stats.score.value}</span>
			</div>
		</div>
	</div>

	<div class="fixed left-0 right-0 bottom-0 flex flex-col justify-center items-center">
		<div>
			{set.event.name}
		</div>
		<div>
			{set.event.tournament.name}
		</div>
	</div>
{/if}
