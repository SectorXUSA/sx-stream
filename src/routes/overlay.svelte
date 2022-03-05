<script>
	// urql initialization
	import TournamentSet from '$lib/TournamentSet.svelte';
	import { gql, operationStore, query } from '@urql/svelte';

	const streamQueueQuery = gql`
		query StreamQueueOnTournament($tourneySlug: String!) {
			tournament(slug: $tourneySlug) {
				id
				streamQueue {
					sets {
						stream {
							streamSource
							streamName
						}
						event {
							name
							tournament {
								name
							}
							videogame {
								name
							}
						}
						fullRoundText
						state
						slots {
							entrant {
								name
							}

							standing {
								stats {
									score {
										value
									}
								}
							}
						}
					}
				}
			}
		}
	`;

	export let tourneySlug = 'sx-stream-test';

	const streamQueue = operationStore(streamQueueQuery, { tourneySlug });

	query(streamQueue);
</script>

{#if $streamQueue.fetching}
	<p>Loading...</p>
{:else if $streamQueue.error}
	<p>Error: {$streamQueue.error.message}</p>
{:else}
	<TournamentSet tournament={$streamQueue.data.tournament} />
{/if}
