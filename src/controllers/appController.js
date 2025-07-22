import Todo from '../models/Todo.js';
import User from '../models/User.js';


export const getTodo = async (req, res) => {

    const todos = await Todo.find({ user: req.user });
    res.json(todos);
};

export const createTodo = async (req, res) => {

    const { title, description, status } = req.body;
    const todo = await Todo.create({ title, description, status, user: req.user,createdBy: req.user });
     res.json(todo);
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body; 

    const updatedFields = {};
    if (title !== undefined) updatedFields.title = title;
    if (description !== undefined) updatedFields.description = description;
    if (status !== undefined) updatedFields.status = status;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo); 
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteTodo = async (req, res) => {

  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: 'Deleted from todo list' });

};

export const assignTaskToUser = async(req,res)=>{

  try{
    console.log("Assign task called")
    const{title,description,assignedTo}=req.body;
    //console.log("Title got",title)
    const assignedBy = req.user;
    //console.log("assigned by..",assignedBy)

    const toUser = await User.findById(assignedTo);
    console.log("Touser..",toUser)
    if(!toUser){
      return res.status(404).json({message:"user dont exists"})
    }

    const newTodo = Todo.create({
      title,description,createdBy:assignedBy,assignedTo,assignedBy
    })


    res.status(201).json({message:"Todo assigned to the user", todo:newTodo})
  }catch{
    console.log("Error at assigntaskController");
    res.status(500).json({message:"Server error"})
  }
}

export const getAllUsers=async(req,res)=>{
   try{
      const currentUser = req.user.id
      
        const users = await User.find({ _id: { $ne:currentUser } }, "-password");

        res.status(200).json(users)
   }catch{
      
      console.log("Error fetching users");
     res.status(500).json({ message: "server Error" });
   }
}

export const getAssignedTasks = async (req, res) => {
  try {
    const userId = req.user;

    console.log("user getting assinged task",userId)

    const assignedTasks = await Todo.find({ assignedTo: userId })
      .populate("assignedBy", "email")
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks: assignedTasks });
  } catch (error) {
    console.error("Error in getAssignedTasks:", error.message);
    res.status(500).json({ message: "Server error while fetching assigned tasks" });
  }
};

export const getTasksAssignedByMe = async (req, res) => {
  try {
    const userId = req.user;
    //console.log("User getting assigned by me tasks",userId)

    const tasks = await Todo.find({ assignedBy: userId })
      .populate("assignedTo", "email")
      .sort({ createdAt: -1 });

    console.log("Task list assigned by me",tasks)

    res.json(tasks);
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

