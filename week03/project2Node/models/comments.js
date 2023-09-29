module.exports = (mongoose) => {
  const Comments = mongoose.model(
    "comments",
    mongoose.Schema(
      {
        productId: String,
        content: String,
        createdAt: String,
        rate: String,
        user: {
          image: {
            png: String,
            webp: String,
          },
          username: String,
        },
      },
      { timestamps: false }
    )
  );

  return Comments;
};
