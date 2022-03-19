//TODO: make this redirect to setId instead of serving text

import { gql, createClient } from '@urql/core';

export async function get({ params: { slug } }) {
	const client = createClient({
		url: import.meta.env.VITE_SMASHGG_URL?.toString(),
		fetchOptions: () => {
			const token = import.meta.env.VITE_SMASHGG_TOKEN?.toString();
			return {
				headers: { authorization: token ? `Bearer ${token}` : '' }
			};
		}
	});

	const QUERY = gql`
		query StreamQueueOnTournament($slug: String!) {
			tournament(slug: $slug) {
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

	const result = await client.query(QUERY, { slug }).toPromise();

	const { tournament } = result.data;

	const set = tournament?.streamQueue
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

	if (set) {
		const { name: tournamentName } = set.event.tournament;
		const { name: eventName } = set.event;
		const { fullRoundText } = set;
		const { name: p1Name } = set.slots[0].entrant;
		const { name: p2Name } = set.slots[1].entrant;

		return {
			body: `${tournamentName} ${fullRoundText} ➤ ${p1Name} vs ${p2Name} 【${eventName}】`
		};
	}

	return {
		status: 404
	};
}
