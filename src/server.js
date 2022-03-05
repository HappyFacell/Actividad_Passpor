const app = require("./app");
const port = process.env.PORT || 3000;
const auth = require("./routes/auth.route");
app.use("/auth", auth);
app.listen(port, () => console.log(`Listening on localhost:${port}/`));
