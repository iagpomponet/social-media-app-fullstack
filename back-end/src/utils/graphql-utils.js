function setLoggedHttpOnlyJWTCookie(token, response){
  response.cookie("smAuthCookie", token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });

  return;
}

function clearLoggedHttpOnlyJWTCookie(response){
  response.cookie("smAuthCookie", '', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: Date.now() // 7 days
  });

  return;
}

function setCookieAuth(response){
  response.cookie("userLoggedIn", 'true', {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });

  return;
}

function clearAuthCookie(response){
  response.cookie("userLoggedIn", 'false', {
    maxAge: Date.now() // 7 days
  });

  return;
}

module.exports = {
  setLoggedHttpOnlyJWTCookie,
  setCookieAuth,
  clearAuthCookie,
  clearLoggedHttpOnlyJWTCookie
}