let express = require(`express`);
const nodemailer = require("nodemailer");
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
})

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'makayla.leuschke3@ethereal.email',
        pass: '8tWXRZ4RKrYf5kWPYA'
    }
});

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/stuffMailer');

//Схема
let mailingSchema = new mongoose.Schema({
    name: String,
    description: String,
    api: String,
    body: String
});

let Mailing = mongoose.model('mailing', mailingSchema);

// Раздача статики
app.use(express.static(`public`));
app.use(express.json())

// Роуты API для рассылок
app.get('/mailings/all', async function(req, res) {
    let mailings = await Mailing.find()
    res.send(mailings)
})

app.post('/mailings/create', async function(req, res) {
    let name = req.body.name
    let description = req.body.description
    let api = req.body.api
    let text = req.body.text
    let mailing = new Mailing({
        name: name,
        description: description,
        api: api,
        body: text
    })

    await mailing.save()
    res.send(mailing)
})

app.post('/mailings/send', async function(req, res) {
    let id = req.body.id
    let mailing = await Mailing.findOne({_id: id})
    let messageText = mailing.body
    const response = await fetch(`${mailing.api}`);
    const data = await response.json();
    let i = 0
    for (var key in data){
        var value = data[key];
        messageText = messageText.replace(`DATA${i}`, value)
        i++
    }
    const info = await transporter.sendMail({
        from: '"Stuff Mailer" <makayla.leuschke3@ethereal.email>',
        to: "test@example.com",
        subject: mailing.name,
        text: messageText,
        html: messageText
    });
    res.send(200)
})

app.post('/mailings/remove', async function(req, res) {
    let id = req.body.id
    await Mailing.deleteOne({_id: id});
    res.send(200)
})

