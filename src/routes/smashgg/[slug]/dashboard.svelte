<script>
	import { override } from '$lib/stores';
</script>

<form class="prose antialiased" on:submit>
	<fieldset>
		<legend>set</legend>
		<label class="block">
			<span>fullRoundText</span>
			<input type="text" bind:value={$override.fullRoundText} />
		</label>
		<fieldset>
			<legend>event</legend>
			<label class="block">
				<span>name</span>
				<input type="text" bind:value={$override.eventName} />
			</label>
			<fieldset>
				<legend>tournament</legend>
				<label class="block">
					<span>name</span>
					<input type="text" bind:value={$override.tournamentName} />
				</label>
			</fieldset>
		</fieldset>
		<fieldset>
			<legend>Entrant 1</legend>
			<label class="inline">
				<span>name</span>
				<input type="text" bind:value={$override.entrant1Name} />
			</label>
			<label class="block">
				<span>score</span>
				<input type="number" bind:value={$override.entrant1Score} />
			</label>
		</fieldset>
		<fieldset>
			<legend>Entrant 2</legend>
			<label class="inline">
				<span>name</span>
				<input type="text" bind:value={$override.entrant2Name} />
			</label>
			<label class="block">
				<span>score</span>
				<input type="number" bind:value={$override.entrant2Score} />
			</label>
		</fieldset>
	</fieldset>
</form>
