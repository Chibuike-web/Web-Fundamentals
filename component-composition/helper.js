const html = (strings, ...values) =>
	strings.reduce((result, str, i) => result + str + (values[i] ?? ""), "");
