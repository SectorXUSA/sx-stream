import { writable } from 'svelte-local-storage-store';

// First param `preferences` is the local storage key.
// Second param is the initial value.
export const override = writable('override', {
	fullRoundText: '',
	eventName: '',
	tournamentName: '',
	entrant1Name: '',
	entrant1Seed: 0,
	entrant1Score: 0,
	entrant2Name: '',
	entrant2Seed: 0,
	entrant2Score: 0
});
