import Todo from '../models/Todo.js';


export const getTodo = async (req, res) => {

    const todos = await Todo.find({ user: req.user });
    res.json(todos);
};

export const createTodo = async (req, res) => {

    const { title, description, status } = req.body;
    const todo = await Todo.create({ title, description, status, user: req.user });
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