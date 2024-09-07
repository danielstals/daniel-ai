import { cn } from '../cn';

describe('cn', () => {
	it('should return an empty string when no arguments are provided', () => {
		const result = cn();
		expect(result).toEqual('');
	});

	it('should concatenate multiple class names into a single string', () => {
		const result = cn('class1', 'class2', 'class3');
		expect(result).toEqual('class1 class2 class3');
	});

	it('should ignore falsy values', () => {
		const result = cn('class1', null, undefined, 'class2', false, 'class3');
		expect(result).toEqual('class1 class2 class3');
	});

	it('should handle arrays of class names', () => {
		const result = cn(['class1', 'class2'], ['class3', 'class4']);
		expect(result).toEqual('class1 class2 class3 class4');
	});

	it('should handle objects with class names as keys', () => {
		const result = cn({ class1: true, class2: false, class3: true });
		expect(result).toEqual('class1 class3');
	});
});
