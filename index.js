import express from 'express';
import bodyParser from 'body-parser';
const app = express()
const port = 3000;
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


let posts = [
    {
        bookID: 1,
        title: "Arcane",
        content: "Arcane is an animated series set in the League of Legends universe, exploring the contrasting cities of Piltover and Zaun.",
        author: "Matt Ziegler",
        date: "2021-08-30",
        publisher: "Riot Games",
    },
    {
        bookID: 2,
        title: "Ionia",
        content: "Ionia is a peaceful, mystical region in the League of Legends universe, known for its beautiful landscapes, ancient traditions, and deep connection to nature and magic.",
        author: "Kirsten Kiomall",
        date: "2012-12-25",
        publisher: "Riot Games",
    },
    {
        bookID: 3,
        title: "Yordle",
        content: "Yordles are a small, magical species in the League of Legends universe, known for their quirky personalities, vibrant appearances, and immense resilience. They originate from Bandle City, a hidden, mystical place that exists in the spirit realm. ",
        author: "David Gort",
        date: "2009-05-12",
        publisher: "Riot Games",
    },
    {
        bookID: 4,
        title: "Bilgewater",
        content: "Bilgewater is a bustling, chaotic port city in the League of Legends universe, located on the western coast of Runeterra. Known for its rough-and-tumble atmosphere, it’s a hub for pirates, smugglers, and mercenaries, where danger and opportunity are around every corner.",
        author: "John Bryan",
        date: "2010-07-28",
        publisher: "Riot Games",
    },
    {
        bookID: 5,
        title: "Noxus",
        content: "Noxus is a powerful and militaristic empire in the League of Legends universe, known for its expansionist ambitions and ruthless pursuit of power. Driven by the belief that strength, both physical and political, is the key to survival, Noxus values strength, ambition, and merit above all else",
        author: "Ashley Cornejo",
        date: "2009-03-12",
        publisher: "Riot Games",

    }]

//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

app.get('/posts', (req, res) => {
    res.json(posts);

});

app.get('/posts/:bookID', (req, res) => {
    const bookID = parseInt(req.params.bookID);
    console.log(bookID);

    const index = posts.findIndex((element) => element.bookID === bookID);
    console.log(index);

    res.json(posts[index]);
});

app.patch('/edit/:bookID', (req, res) => {
    const bookID = parseInt(req.params.bookID);
    const index = posts.findIndex((element) => element.bookID === bookID);
    console.log(posts[index]);

    const updatedData = {
        "bookID": posts[index].bookID,
        "title": req.body.title || posts[index].title,
        "content": req.body.content || posts[index].content,
        "author": req.body.author || posts[index].author,
        "date": req.body.date || posts[index].date,
        "publisher": req.body.publisher || posts[index].publisher,
    }

    posts[index] = updatedData;
    res.json(updatedData);
});

app.post('/upload', (req, res) => {
    const body = req.body;
    const title = req.body.title;
    const content = req.body.content;
    const author = req.body.author;
    const date = req.body.date;
    const publisher = req.body.publisher;

    if (title == "")
        res.json({ message: "Missing Title" })
    else {

        const newData = {
            bookID: posts.length + 1,
            title: title,
            content: content,
            author: author,
            date: date,
            publisher: publisher,
        }

        posts.push(newData);
    }
    res.json({ message: "Successful" });

});



app.delete('/delete/:bookID', (req, res) => {
    const bookID = parseInt(req.params.bookID);
    posts = posts.filter(p => p.bookID !== bookID);

    res.json({ message: "Successful" });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;



    if (username === 'admin' && password === 'admin123') {
        return res.json({ message: 'Login success!' });
    }

});




app.listen(port, () => {
    console.log("Running in port" + port);
    console.log("Server is running on http://localhost:3000");
});
