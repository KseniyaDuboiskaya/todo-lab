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
});

function App() {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([])

    const handleAddButtonClick = () => {
        setTasks([...tasks, { text: inputValue, id: new Date().getTime() }])
        setInputValue('');
    };

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
                    Add Task
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
                            </ListItem>
                        </React.Fragment>
                    );
                })}
            </List>
        </Container>
    );
}

export default App;
