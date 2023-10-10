import React from 'react'
import {
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    Container,
    makeStyles
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
    appContainer: {
        marginTop: 100,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "60%",
    },
    inputContainer: {
        display: "flex",
        gap: 20,
    },
    input: {
        flexGrow: 1,
    },
    list: {
        display: "flex",
        justifyContent: "space-between",
    },
    listButtons: {
        display: 'flex',
        gap: 20
    }
});

function App() {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([])
    const [editedTask, setEditedTask] = useState(null);

    const handleAddButtonClick = () => {
        if (editedTask) {
            setEditedTask(null)
        }
        setTasks([...tasks, { text: inputValue, id: new Date().getTime() }])
        setInputValue('');
    };

    const handleEditButtonClick = (editedTask) => {
        const updatedTasks = tasks.filter((task) => task.id !== editedTask.id);

        setEditedTask(editedTask)
        setInputValue(editedTask.text);
        setTasks(updatedTasks);
    };

    const handleDeleteButtonClick = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    }

    return (
        <Container component="main" className={classes.appContainer}>
            <Typography variant="h3" component="header" data-selector='app-header'>
                My Tasks
            </Typography>

            <div className={classes.inputContainer} data-selector="input-container">
                <TextField
                    variant="outlined"
                    onChange={(e) => setInputValue(e.target.value)}
                    label="Type your task"
                    value={inputValue}
                    className={classes.input}

                />
                <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    data-selector="add-task"
                    onClick={handleAddButtonClick}
                    disabled={!inputValue}
                >
                    {editedTask ? 'Edit Task': 'Add Task'}
                </Button>
            </div>
            <List>
                {tasks.map((task) => {
                    return (
                        <React.Fragment>
                            <ListItem divider="bool" className={classes.list} data-selector={`task-${task.text}`}>
                                <Typography
                                    className={classes.text}
                                    key={task.id}
                                >
                                    {task.text}
                                </Typography>
                                <div className={classes.listButtons}>
                                    <Button
                                        onClick={() => handleEditButtonClick(task)}
                                        variant="contained"
                                        data-selector="edit-task"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteButtonClick(task.id)}
                                        color="secondary"
                                        variant="contained"
                                        data-selector="delete-task"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </ListItem>
                        </React.Fragment>
                    );
                })}
            </List>
        </Container>
    );
}

export default App;
