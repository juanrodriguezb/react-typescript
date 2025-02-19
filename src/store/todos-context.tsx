import { createContext, FC, useState } from "react";
import { Todo } from "../models/todo";

type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    deleteTodo: (id: string) => void;
}

export const TodosContext = createContext<TodosContextObj>({
    items: [],
    addTodo: () => { },
    deleteTodo: (id: string) => { }
});

const TodosContextProvider: FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = {
            id: Math.random().toString(),
            text: todoText
        }
        setTodos((prevTodo) => {
            return prevTodo.concat(newTodo);
        })
    };

    const deleteTodoHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== todoId)
        });
    };

    const contextValue: TodosContextObj  = {
        items: todos,
        addTodo: addTodoHandler,
        deleteTodo: deleteTodoHandler
    }

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    )
};

export default TodosContextProvider;