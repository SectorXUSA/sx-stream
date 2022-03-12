<script>
	import { page } from '$app/stores';
	import SmashggOverlay from '$lib/SmashggOverlay.svelte';
	import { gql, operationStore, query } from '@urql/svelte';

	const OPERATION = gql`
		query StreamQueueBySlug($slug: String!) {
			tournament(slug: $slug) {
				streamQueue {
					...sets
				}
			}
		}

		fragment sets on StreamQueue {
			sets {
				state
				fullRoundText

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

				slots {
					entrant {
						name
						initialSeedNum

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
	`;

	const { slug } = $page.params;
	const operation = operationStore(OPERATION, { slug });
	query(operation);

	let tournament;
	$: if (!$operation?.fetching && !$operation?.error) ({ tournament } = $operation?.data);

	$: set = tournament?.streamQueue
		?.find((_streamQueue) => _streamQueue)
		.sets?.find(
			(_set) =>
				_set.stream?.streamSource?.localeCompare(
					import.meta.env.VITE_STREAM_SOURCE?.toString(),
					undefined,
					{ sensitivity: 'accent' }
				) === 0 &&
				_set.stream?.streamName?.localeCompare(
					import.meta.env.VITE_STREAM_NAME?.toString(),
					undefined,
					{ sensitivity: 'accent' }
				) === 0 &&
				_set.state === 2
		);

	let ms = 1000;
	let interval;

	$: {
		clearInterval(interval);

		interval = setInterval(() => {
			operation.reexecute({ requestPolicy: 'network-only' });
		}, ms);
	}
</script>

{#if set}
	<SmashggOverlay {set} />
{/if}
