module.exports.validateRegisterInput = (
	username,
	email,
	password,
	confirmPassword,
) => {
	const errors = {};

	console.log('dentro da not a function');

	if (username.trim() === '') {
		errors.username = 'Username must not be empty';
	}

	if (email.trim() === '') {
		errors.email = 'Email must not be empty';
	} else {
		const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

		if (!email.match(regEx)) {
			errors.email = 'Email must be a valid e-mail address';
		}
	}

	if (password.trim() === '') {
		errors.password = 'Password must not be empty';
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'Password must match';
	}

	return {
		errors: errors,
		valid: Object.keys(errors).length == 0,
	};
};
