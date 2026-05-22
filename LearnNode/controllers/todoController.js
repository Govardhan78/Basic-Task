const Todo = require("../models/todoModel");

exports.createTodo = async (req, res) => {
    try{
        const {title, description} = req.body;

        const todo = await Todo.create({
            title,
            description,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            todo,
        });
        
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to create todo",
            error: error.message
        })
    }
}

exports.getAllTodo = async (req, res) =>{
    try{
        const {search } = req.query;
        let query = {user: req.user._id,};

        if(search){
            query.title = {$regex: search, $options: "i"};
        }

        const todos = await Todo.find(query).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            todos,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to fetch todos",
            error: error.message
        })
    }
}

exports.updateTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, description, isCompleted} = req.body;

        const todo = await Todo.findOne({ _id: id, user: req.user._id });
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            })
        }
        todo.title = title || todo.title;
        todo.description = description || todo.description;
        todo.isCompleted = isCompleted !== undefined ? isCompleted : todo.isCompleted;

        await todo.save();

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo,
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to update todo",
            error: error.message
        })
    }
}

exports.deleteTodo = async(req, res)=>{
    try{
        const {id} = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to delete todo",
            error: error.message
        })
    }
}