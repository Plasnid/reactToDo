import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function TaskForm(props){
    return(
        <form onSubmit={props.taskAddAction}>
            <h2>Add a Task</h2>
            <fieldset>
                <label htmlFor="tName">Task Name:</label>
                <input id="tName" name="tName" type="text" required />
            </fieldset>
            <fieldset>
                <label htmlFor="tDesc">Task Description:</label>
                <input id="tDesc" name="tDesc" type="text" required />
            </fieldset>
            <input type="submit" />
        </form>
    )
}

function Task(props){
    return (
        <li>
            <input type="checkbox" onClick={props.onClick} checked={props.tDone}/>
            {props.tName}: {props.tDesc}
            <button onClick={props.delOnClick}>Delete Task</button>
        </li>
    )
}

class TaskList extends React.Component{
    render(){
        return (
            <ul>
                {
                    this.props.tasks.map((task, i) => 
                    <Task 
                        key={i} 
                        arrPos={i} 
                        delOnClick={() => this.props.delOnClick(i)} 
                        onClick={() => this.props.onClick(i)} 
                        tName={task.taskName} 
                        tDesc={task.taskDesc} 
                        tDone={task.completed} 
                    />)
                }
            </ul>
        )
    }
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[
                {
                    taskName: "task1",
                    taskDesc: "do thing 1",
                    completed: false,
                },
                {
                    taskName: "task2",
                    taskDesc: "do thing 2",
                    completed: false,
                },
                {
                    taskName: "task3",
                    taskDesc: "do thing 3",
                    completed: false,
                },
                {
                    taskName: "task4",
                    taskDesc: "do thing 4",
                    completed: false,
                },
                {
                    taskName: "task5",
                    taskDesc: "do thing 5",
                    completed: false,
                },
                {
                    taskName: "task6",
                    taskDesc: "do thing 6",
                    completed: false,
                },
                {
                    taskName: "task7",
                    taskDesc: "do thing 7",
                    completed: false,
                },
                {
                    taskName: "task8",
                    taskDesc: "do thing 8",
                    completed: false,
                },
                {
                    taskName: "task9",
                    taskDesc: "do thing 9",
                    completed: false,
                },
                {
                    taskName: "task10",
                    taskDesc: "do thing 10",
                    completed: false,
                },
            ]
        }
    }

    toggleCompletion(i){
        let newTasks = [...this.state.tasks];
        newTasks[i].completed = !newTasks[i].completed;
        this.setState({tasks: newTasks});
    }

    removeElement(i){
        let newTasks = [...this.state.tasks];
        newTasks.splice(i,1);
        this.setState({tasks: newTasks});
    }

    addTask(e){
        e.preventDefault();
        let formSource = new FormData(e.target);
        let taskList = [...this.state.tasks, {taskName:formSource.get("tName"), taskDesc:formSource.get("tDesc"), completed:false}];
        this.setState({tasks: taskList});
        e.target.reset();
    }

    checkForCompletion(){
        if(this.state.tasks.length>0){
            let allDone = this.state.tasks.every(task => task.completed===true);
            if(allDone){
                return `You're all done!`
            }
            return `More to do!`;
        }
        return 'No tasks listed!';
    }

    render(){
        return (
            <div id="app_home">
                <h1>Get Stuff Done</h1>
                <TaskForm taskAddAction={(e) => this.addTask(e)}/>
                <p>{this.checkForCompletion()}</p>
                <TaskList tasks={this.state.tasks} delOnClick={(i)=> this.removeElement(i)} onClick={(i)=> this.toggleCompletion(i)}/>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)