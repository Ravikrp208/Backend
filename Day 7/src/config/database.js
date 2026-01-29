function connect() {
  mongoose
    .connectTodb(process.env.MONGOURL)
    .then(() => {
      console.log("connnected to db");
    });
}
connectTodb();
