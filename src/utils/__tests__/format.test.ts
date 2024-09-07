import { getTimeDifferenceStrUntilUnixTimestamp } from '../format';

describe('getTimeDifferenceStrUntilUnixTimestamp', () => {
	it('should return the correct time difference string', () => {
		// Use a timestamp that represents a time difference of 1 day, 2 hours, 3 minutes, and 4 seconds from now
		const now = Date.now();
		const oneDayInMs = 24 * 60 * 60 * 1000;
		const twoHoursInMs = 2 * 60 * 60 * 1000;
		const threeMinutesInMs = 3 * 60 * 1000;
		const fourSecondsInMs = 4 * 1000;
		const unixTimestamp = now + oneDayInMs + twoHoursInMs + threeMinutesInMs + fourSecondsInMs;

		const expected = 'Je kunt weer berichten sturen over 1 dagen, 2 uren, 3 minuten, 4 seconden';

		const result = getTimeDifferenceStrUntilUnixTimestamp(unixTimestamp);

		expect(result).toEqual(expected);
	});

	it('should adapt the time differene string when certain time units are 0', () => {
		// Use a timestamp that represents a time difference of 2 hours and 30 minutes from now
		const now = Date.now();
		const twoHoursInMs = 2 * 60 * 60 * 1000;
		const thirtyMinutesInMs = 30 * 60 * 1000;
		const unixTimestamp = now + twoHoursInMs + thirtyMinutesInMs;

		const expected = 'Je kunt weer berichten sturen over 2 uren, 30 minuten';

		const result = getTimeDifferenceStrUntilUnixTimestamp(unixTimestamp);

		expect(result).toEqual(expected);
	});

	it('should return null when the time difference is 0', () => {
		// Use a timestamp that represents the current time
		const now = Date.now();
		const unixTimestamp = now;

		const result = getTimeDifferenceStrUntilUnixTimestamp(unixTimestamp);

		expect(result).toEqual(null);
	});

	it('should return null difference string when the timestamp is in the past', () => {
		// Use a timestamp that represents a time difference of 1 day, 2 hours, 3 minutes, and 4 seconds before now

		const now = Date.now();
		const oneDayInMs = 24 * 60 * 60 * 1000;
		const twoHoursInMs = 2 * 60 * 60 * 1000;
		const threeMinutesInMs = 3 * 60 * 1000;
		const fourSecondsInMs = 4 * 1000;

		const unixTimestamp = now - oneDayInMs - twoHoursInMs - threeMinutesInMs - fourSecondsInMs;

		const result = getTimeDifferenceStrUntilUnixTimestamp(unixTimestamp);

		expect(result).toEqual(null);
	});
});
