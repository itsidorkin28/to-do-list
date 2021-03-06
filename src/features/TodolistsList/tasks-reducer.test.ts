import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';
import {
	addTask,
	changeTask,
	changeTaskEntityStatus, fetchTasksTC, removeTaskTC,
	tasksReducer,
	TasksStateType,
} from './tasks-reducer'
import {addTodolist, removeTodolist, setTodolists} from './todolists-reducer';

let startState: TasksStateType;

beforeEach(() => {
	startState = {
		todolistId1: [
			{
				id: '1',
				title: 'CSS',
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId1',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
			{
				id: '3',
				title: 'React',
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
		],
		todolistId2: [
			{
				id: '1',
				title: 'bread',
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
			{
				id: '2',
				title: 'milk',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId2',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
			{
				id: '3',
				title: 'tea',
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
		],
	};
});

test('correct task should be deleted from correct array', () => {
	const param = {taskId: '2', todolistId: 'todolistId2'}
	const action = removeTaskTC.fulfilled(param, 'requestId', param);
	const endState = tasksReducer(startState, action);

	expect(endState).toEqual({
		todolistId1: [
			{
				id: '1',
				title: 'CSS',
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId1',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
			{
				id: '3',
				title: 'React',
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
		],
		todolistId2: [
			{
				id: '1',
				title: 'bread',
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
			{
				id: '3',
				title: 'tea',
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low,
				description: '',
				taskEntityStatus: 'idle',
			},
		],
	});
});

test('correct task should be added to correct array', () => {
	const task = {
		id: '0',
		title: 'juce',
		status: TaskStatuses.New,
		todoListId: 'todolistId2',
		startDate: '',
		deadline: '',
		addedDate: '',
		order: 0,
		priority: TaskPriorities.Low,
		description: '',
	};
	const action = addTask({task});
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(4);
	expect(endState['todolistId2'][0].id).toBeDefined();
	expect(endState['todolistId2'][0].title).toBe('juce');
	expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
	const action = changeTask({taskId: '2', model: {status: TaskStatuses.New}, todolistId: 'todolistId2'});
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId2'].length).toBe(3);
	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
	const action = changeTask({taskId: '1', model: {title: 'Vue'}, todolistId: 'todolistId1'});
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(3);
	expect(endState['todolistId1'][0].title).toBe('Vue');
});

test('new array should be added when new todolist is added', () => {
	const todolist = {
		id: 'todolistId3',
		title: 'New todolist',
		filter: 'all',
		addedDate: '',
		order: 0,
	};
	const action = addTodolist({todolist});
	const endState = tasksReducer(startState, action);

	const keys = Object.keys(endState);
	const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
	if (!newKey) {
		throw Error('new key should be added');
	}

	expect(keys.length).toBe(3);
	expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
	const action = removeTodolist({todolistId: 'todolistId2'});
	const endState = tasksReducer(startState, action);
	const keys = Object.keys(endState);

	expect(keys.length).toBe(1);
	expect(endState['todolistId2']).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
	const action = setTodolists({
		todolists: [
			{id: '1', title: 'title 1', addedDate: '', order: 0},
			{id: '2', title: 'title 2', addedDate: '', order: 0},
		]
	});

	const endState = tasksReducer({}, action);

	const keys = Object.keys(endState);
	expect(keys.length).toBe(2);
	expect(endState['1']).toStrictEqual([]);
	expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todolists', () => {
	const action = fetchTasksTC.fulfilled({todolistId: 'todolistId1', tasks: startState['todolistId1']}, '', 'todolistId1');

	const endState = tasksReducer(
		{
			todolistId2: [],
			todolistId1: [],
		},
		action
	);

	expect(endState['todolistId1'].length).toBe(3);
	expect(endState['todolistId2'].length).toBe(0);
});

test('tasks entity status should be changed', () => {
	const action = changeTaskEntityStatus({taskId: '1', todolistId: 'todolistId1', entityStatus: 'loading'});
	const endState = tasksReducer(startState, action);

	expect(endState['todolistId1'][0].taskEntityStatus).toBe('loading');
});
