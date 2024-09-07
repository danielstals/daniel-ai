import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export function getTimeDifferenceStrUntilUnixTimestamp(unixTimestamp: number): string | null {
	// Convert the Unix timestamp from milliseconds to a JavaScript Date object
	const date = new Date(unixTimestamp);

	// Get the current time
	const now = new Date();

	// Return null if the timestamp is in the past
	if (date < now) return null;

	// Calculate the absolute difference in time units
	const days = Math.abs(differenceInDays(date, now));
	const hours = Math.abs(differenceInHours(date, now) % 24);
	const minutes = Math.abs(differenceInMinutes(date, now) % 60);
	const seconds = Math.abs(differenceInSeconds(date, now) % 60);

	// Return null if the time difference is 0
	if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) return null;

	// Construct the time difference string
	let timeDifference = 'Je kunt weer berichten sturen over ';

	if (days > 0) timeDifference += `${days} dagen, `;
	if (hours > 0) timeDifference += `${hours} uren, `;
	if (minutes > 0) timeDifference += `${minutes} minuten, `;
	if (seconds > 0) timeDifference += `${seconds} seconden`;

	// Remove trailing comma and space
	timeDifference = timeDifference.trim().replace(/,$/, '');

	// Return the local time and the time difference
	return timeDifference;
}
