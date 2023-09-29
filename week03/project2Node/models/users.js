module.exports = (mongoose) => {
  const User = mongoose.model(
    "users",
    mongoose.Schema(
      {
        oauthProvider: String,
        oauthId: String,
        displayName: String,
        email: String,
        username: String,
      },
      { timestamps: false }
    )
  );

  return User;
};
