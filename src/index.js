import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function TaskForm(props){
    //below we have the form, with props.taskAddAction as our submit action
    return(
        <form onSubmit={props.taskAddAction}>
            <h2>Add a Task</h2>
            <fieldset>
                <label htmlFor="tName">Task Name:</label>
                &nbsp;<input id="tName" name="tName" type="text" required />
            </fieldset>
            <fieldset>
                <label htmlFor="tDesc">Task Description:</label>
                &nbsp;<input id="tDesc" name="tDesc" type="text" required />
            </fieldset>
            <input type="submit" />
        </form>
    )
}

function Task(props){
    /*
        Task is a functional component
        -it has a checkbox which responds to onClick by calling props.onClick, it has a checked status of props.tDone
        -it has a button which responds to props.delOnClick
    */
    return (
        <li>
            <input type="checkbox" onClick={props.onClick} checked={props.tDone}/>
            {props.tName}: {props.tDesc}
            &nbsp;<button onClick={props.delOnClick}>Delete Task</button>
        </li>
    )
}

class TaskList extends React.Component{
    /*
        -TaskList returns a <ul></ul>
        -TaskList gets a list of tasks and for each task returns a <Task/>
        -it gives each task:
            -a number(i) which is used as a key and an array position
            -delOnClick(i) which will delete the task
            -onClick(i) which will register a click on a task
            -tName:  the name of the the task
            -tDesc:  the task description
            -tDone:  the status of the task(true or false)
    */
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
    //we add the constructor so the state can live in the App component
    constructor(props){
        super(props);
        this.state = {
            tasks:[
                {
                    taskName: "eat lunch",
                    taskDesc: "a nice bullet ant sandwich",
                    completed: false,
                },
                {
                    taskName: "defend self",
                    taskDesc: "fart lungs onto attacker",
                    completed: false,
                },
                {
                    taskName: "mow ceiling",
                    taskDesc: "mow  the indoor grass",
                    completed: false,
                },
                {
                    taskName: "baking",
                    taskDesc: "bake some bread",
                    completed: false,
                },
                {
                    taskName: "get coal",
                    taskDesc: "visit the coal mine",
                    completed: false,
                },
                {
                    taskName: "feign insanity",
                    taskDesc: "make loud borking sounds in public",
                    completed: false,
                },
                {
                    taskName: "perfect hooping",
                    taskDesc: "attempt hula hooping with a lead hula hoop",
                    completed: false,
                },
                {
                    taskName: "swim the dog",
                    taskDesc: "put the dog in scuba gear and walk them underwater",
                    completed: false,
                },
                {
                    taskName: "walk the fish",
                    taskDesc: "give the fish SCABA gear and fake legs",
                    completed: false,
                },
                {
                    taskName: "create hat",
                    taskDesc: "make many tin foil hats to keep the aliens away",
                    completed: false,
                },
            ]
        }
    }

    //makes a copy of the tasks, swaps the completed status of the task clicked, then saves out the tasks
    toggleCompletion(i){
        let newTasks = [...this.state.tasks];
        newTasks[i].completed = !newTasks[i].completed;
        this.setState({tasks: newTasks});
    }
    //makes a copy of the tasks, removes the task being deleted, then saves out the tasks
    removeElement(i){
        let newTasks = [...this.state.tasks];
        newTasks.splice(i,1);
        this.setState({tasks: newTasks});
    }

    //prevents reload, takes in the formData, makes a new list of tasks, and adds the formData, saves tasks
    addTask(e){
        e.preventDefault();
        let formSource = new FormData(e.target);
        let taskList = [...this.state.tasks, {taskName:formSource.get("tName"), taskDesc:formSource.get("tDesc"), completed:false}];
        this.setState({tasks: taskList});
        e.target.reset();
    }

    //if there are tasks, it uses array function every, checks if all tasks are done
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

    /*renders the app to the screen, puts app in a div, adds Form and TaskList
        -TaskForm gets
            -a function for adding tasks(addTask), and names its prop "Task Addition"
        -TaskList gets
            -tasks: a list of tasks
            -a couple of functions for dealing with tasks
            -delOnClick: a function(removeElement) for removing an element
            -onClick: a function(toggleCompletion) for toggling task completion
    */
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