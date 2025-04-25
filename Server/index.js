const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userModel = require('./routes/users');
const postModel = require('./routes/posts');
const upload = require('./routes/multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true, }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.post('/register', upload.single('image'), async (req, res) => {
    const { username, email, password } = req.body;
    const imagefile = req.file ? req.file.filename : null;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const CU = await userModel.create({ username, email, password: hash, image: imagefile })
            const token = jwt.sign({ email: email, userid: CU._id }, "shhh")
            res.cookie('token', token)
            res.json()
            console.log("User Created SuccessFully", { CU })
        })
    })
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email })
    if (!user) return res.json('no user found')
    bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
            const token = jwt.sign({ email: email, userid: user._id }, "shhh")
            res.cookie('token', token)
            res.json()
            console.log("User Login SuccessFully", { user })
        }
    })
})

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login')
    const { userid, email } = jwt.verify(token, "shhh")
    req.user = { _id: userid, email }
    next()
}

app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate('posts')
    res.json(user)
})

app.get('/logout', (req, res) => {
    res.cookie('token', "")
    res.json()
})

// --------- Crud operations for posts -----------
app.post('/create', isLoggedIn, upload.single('image'), async (req, res) => {
    const imagefile = req.file ? req.file.filename : null;
    const post = await postModel.create({ ...req.body, image: imagefile, user: req.user._id })
    await userModel.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
    res.json()
    console.log("post BAN GAYA HAI ", { post })
});


app.delete('/deletepost/:id', isLoggedIn, async (req, res) => {
    const post = await postModel.findByIdAndDelete(req.params.id)
    if (post) await userModel.findByIdAndUpdate(req.user._id, { $pull: { posts: post._id } })
    res.json()
})

app.get('/getpost/:id', async (req, res) => {
    const post = await postModel.findById(req.params.id)
    res.json(post)
})

app.put('/update/:id', upload.single('image'), async (req, res) => {
    const imagefile = req.file ? req.file.filename : null;
    const post = await postModel.findByIdAndUpdate(req.params.id, { ...req.body, image: imagefile, }, { new: true })
    res.json(post)
})

app.listen(3000, () => console.log(`Server running on 3000`));