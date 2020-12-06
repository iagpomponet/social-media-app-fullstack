module.exports.validateCreatePostInput = (body, email, token) => {
	const errors = {};

	if (body.trim() === '') {
		errors.body = 'Post must not be empty';
	}

	if (token.trim() === '') {
		errors.token = 'Token must not be empty';
	}

	if (email.trim() === '') {
		errors.email = "User's email must not be empty";
	}

	return {
		errors,
		valid: Object.keys(errors).length == 0,
	};
};
