import {AppRootStateType} from "./store";
import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "./app-reducer";
import thunkMiddleware from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const todoId1 = v1()
const todoId2 = v1()

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: todoId1, title: "What to learn", filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todoId2, title: "What to buy", filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ],
    tasks: {
        [todoId1]: [
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                todoListId: todoId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                taskEntityStatus: 'idle'
            },
        ],
        [todoId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.New,
                todoListId: todoId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                taskEntityStatus: 'idle'
            },
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider
    store={storyBookStore}>{storyFn()}</Provider>


