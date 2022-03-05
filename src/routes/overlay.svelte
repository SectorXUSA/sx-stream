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
								participants {
									user {
										images {
											url
										}
									}
								}
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

	let tournament;
	$: if (!$streamQueue?.fetching && !$streamQueue?.error) ({ tournament } = $streamQueue.data);

	let ms = 2000;
	let interval;

	$: {
		clearInterval(interval);

		interval = setInterval(() => {
			streamQueue.reexecute({ requestPolicy: 'network-only' });
		}, ms);
	}
</script>

{#if tournament}
	<TournamentSet {tournament} />
{/if}
