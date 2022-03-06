<script>
	import { page } from '$app/stores';
	import SmashggOverlay from '$lib/SmashggOverlay.svelte';
	import { gql, operationStore, query } from '@urql/svelte';

	const streamQueueQuery = gql`
		query StreamQueueOnTournament($tourneySlug: String!) {
			tournament(slug: $tourneySlug) {
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
									prefix
									gamerTag
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

	const { tourneySlug } = $page.params;

	const streamQueue = operationStore(streamQueueQuery, { tourneySlug });
	query(streamQueue);

	let tournament;

	$: if (!$streamQueue?.fetching && !$streamQueue?.error) ({ tournament } = $streamQueue.data);

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

	let ms = 2000;
	let interval;

	$: {
		clearInterval(interval);

		interval = setInterval(() => {
			streamQueue.reexecute({ requestPolicy: 'network-only' });
		}, ms);
	}
</script>

{#if set}
	<SmashggOverlay {set} />
{/if}
