const setCookie = (res, name, value) => {
  res.cookie(name, value, {
    httpOnly: true,
  });
};

module.exports = setCookie;
