const optimizedCallers = new Map([
	[2, (fn, args) => fn(args[0], args[1])],
	[3, (fn, args) => fn(args[0], args[1], args[2])],
	[4, (fn, args) => fn(args[0], args[1], args[2], args[3])],
	[5, (fn, args) => fn(args[0], args[1], args[2], args[3], args[4])]
]);

const multiCaller = (fn, args) => fn(...args);

export const multiple = (fns, args) => {
	const caller = optimizedCallers.get(args.length) || multiCaller;
	for (let idx = 0; idx < fns.length; idx += 1) {
		caller(fns[idx], args);
	}
};

export const single = (fns, arg) => {
	for (let idx = 0; idx < fns.length; idx += 1) {
		fns[idx](arg);
	}
};