const express =require("express")
const mongoose =require("mongoose")
const cors=require("cors")
const usercrt=require("./model/user")
const createTodoModel = require("./model/todomodel");
const passch=require("./model/passchecker")

const app = express()
app.use(cors({
    origin: 'https://app-front-seven.vercel.app', // Specify allowed origin
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'], // Include OPTIONS
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
    credentials: true, // Allow cookies/auth headers
}));
app.use(express.json())


mongoose.connect("mongodb+srv://Enba:<Enba1221>@enba.y7rni.mongodb.net/TODOAPPUSERS?retryWrites=true&w=majority&appName=Enba")

app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    usercrt.findOne({email:email})
    .then(user=>{
        const nam=user.name;
        if(user){
            if(user.password===password){
                res.json({message:"login success",nam})
            }
            else{
                res.json({message:"Wrong Password",nam})
            }
        }
        else{
            res.json({message:"User not found"})
        }
    })
    .catch(err=>res.json(err))
})

app.post("/reg",(req,res)=>{
    const {name,email,password}=req.body;
    if (!passch(password)) {
        return res.json({ message: "Password must be at least 8 characters and have both uppercase & lowercase letters" });
    }

    usercrt.create({
        name:name,
        email:email,
        password:password
    })

    .then(result => res.json(result))
    .catch(err=> res.json(err))

})

app.get('/get/:username', (req,res) => {
    const {username}=req.params
    console.log(username)
    const TodoModel=createTodoModel(username)
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { username } = req.body; 
    const TodoModel=createTodoModel(username)
    TodoModel.findByIdAndUpdate({ _id : id },{done : "yes"})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/todoo/:id',(req,res) => {
    const { id } = req.params;
    const { username } = req.body; 
    const TodoModel=createTodoModel(username)
    TodoModel.findByIdAndUpdate({ _id : id },{done : "no"},{delete : false})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/done/:id',(req,res) => {
    const { id } = req.params;
    const { username } = req.body; 
    console.log(username)
    const TodoModel=createTodoModel(username)
    TodoModel.findByIdAndUpdate({ _id : id },{done : "dusted"},{delete : true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.put('/del/:id',(req,res) => {
    const { id } = req.params;
    const { username } = req.body; 
    console.log(username)
    const TodoModel=createTodoModel(username)
    TodoModel.findByIdAndDelete({ _id : id },{done : "dusted"},{delete : true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

app.post("/add",(req,res) =>{
    const task = req.body.task ;
    const tag = req.body.tag ;
    const name=req.body.name;
    console.log(name)
    const TodoModel = createTodoModel(name); 
    const newTodo = TodoModel.create({ task, tag })
    .then(result=> res.join(newTodo))
    .catch (err => res.json(err))
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
