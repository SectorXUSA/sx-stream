import { gql, createClient } from '@urql/core';

export async function get({ params: { tourneySlug } }) {
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

	const result = await client.query(QUERY, { tourneySlug }).toPromise();

	const { tournament } = result.data;

	const streams = tournament?.streamQueue?.filter((stream) =>
		stream.sets.filter((set) => {
			const { streamSource, streamName } = set.stream;
			const { state } = set;
			return streamSource === 'TWITCH' && streamName === 'SectorXGaming' && state === 2;
		})
	);

	const sets = streams?.[0]?.sets.filter((set) => {
		const { streamSource, streamName } = set.stream;
		const { state } = set;
		return streamSource === 'TWITCH' && streamName === 'SectorXGaming' && state === 2;
	});

	const set = sets?.[0];

	if (set) {
		const tournamentName = set.event.tournament.name;
		const eventName = set.event.name;
		const fullRoundText = set.fullRoundText;
		const player1Name = set.slots[0].entrant.name;
		const player2Name = set.slots[1].entrant.name;

		return {
			body: `${tournamentName} ${fullRoundText} ➤ ${player1Name} vs ${player2Name} 【${eventName}】`
		};
	}

	return {
		status: 404
	};
}
