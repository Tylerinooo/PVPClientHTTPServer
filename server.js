const config = require(`./config/config`);
const express = require(`express`);
const session = require(`express-session`);
let cookieParser = require(`cookie-parser`);
let bodyParser = require(`body-parser`);
let morgan = require(`morgan`);
let app = express();
let port = process.env.PORT || config.port;

let passport = require(`passport`);
let flash = require(`connect-flash`);
let username = require(`username`);
let chalk = require(`chalk`);

require(`./helpers/passport`)(passport);

app.use(morgan(`dev`));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set(`view engine`, `ejs`);

app.use(session({
    secret: `this_is_a_super_secret_session_sescret_._you_should_change_this`,
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(`/static`, express.static(`views/static`));

require(`./app/routes.js`)(app, passport);

app.listen(port);

(async () => {
    console.log(`Welcome user: ` + chalk.cyan(await username()) + `!`);
	console.log(`This was made by ` + chalk.cyan(`Eric Golde`) + ` and modified by ` + chalk.cyan(`Tyler.#0911`) + `!`);
	console.log(`Running ` + chalk.cyan(`Eric's Client Communication System`) + ` v${config.version}`);
    console.log(`The server is on port: ` + chalk.cyan(port));
    console.log(``);
    console.log(`I have removed a lot of // comments so go to the following link if you would like to see what he said:`)
    console.log(chalk.cyan(`https://github.com/egold555/PVPClientHTTPServer`));
    console.log(``);
    console.log(`Eric: ${chalk.cyan(`https://github.com/egold555/`)}`);
    console.log(`Tyler: ${chalk.cyan(`https://github.com/Tylerinooo/`)}`);
})();
