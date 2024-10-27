import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.jsx";
import TimedTasks from "./pages/TimedTasks.jsx";
import AppLayout from "./components/AppLayout.jsx";
import ConfirmedTasks from "./components/ConfirmedTasks.jsx";
import { useEffect, useState } from "react";
import API_URL from "./helpers.js";
import CancelledTasks from "./components/CancelledTasks.jsx";
import SearchTasks from "./components/SearchTasks.jsx";

function App() {
    const fallbackData = [
        {
            "isOptionsVisible": false,
            "isCommentsVisible": false,
            "isConnectedTasksVisible": false,
            "isEditingTasksVisible": false,
            "isEditingComment": false,
            "isTaskCompleted": false,
            "isTaskDeleted": true,
            "taskPriority": "Main",
            "taskDescription": "Prepare for the meeting",
            "taskComments": [
                "Gather materials",
                "Confirm attendance",
                "Review agenda"
            ],
            "taskID": 7816
        },
        {
            "isOptionsVisible": false,
            "isCommentsVisible": false,
            "isConnectedTasksVisible": false,
            "isEditingTasksVisible": false,
            "isEditingComment": false,
            "isTaskCompleted": true,
            "isTaskDeleted": false,
            "taskPriority": "Secondary",
            "taskDescription": "Complete the project report",
            "taskComments": [
                "Draft initial outline",
                "Add data analysis",
                "Finalize conclusions"
            ],
            "taskID": 3304
        },
        {
            "isOptionsVisible": false,
            "isCommentsVisible": false,
            "isConnectedTasksVisible": false,
            "isEditingTasksVisible": false,
            "isEditingComment": false,
            "isTaskCompleted": false,
            "isTaskDeleted": false,
            "taskPriority": "Optional",
            "taskDescription": "Plan the team outing",
            "taskComments": [
                "Choose a location",
                "Set a date",
                "Send out invitations"
            ],
            "taskID": 6507
        }
    ];

    const [tasks, setTasks] = useState(fallbackData);

    const getData = async () => {
        try {
            const storedData = sessionStorage.getItem('tasks');
            if (!storedData) {
                const res = await fetch(`${API_URL}tasks`);
                const data = await res.json();
                console.log(data);


                sessionStorage.setItem('tasks', JSON.stringify(data));
            } else {
                console.log('Data already in sessionStorage');
            }
        } catch (e) {
            sessionStorage.setItem('tasks', JSON.stringify(fallbackData));
            console.error("Error fetching data:", e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppLayout />}>
                    <Route index path='timed-tasks' element={<TimedTasks />} />
                    <Route path='confirmed-tasks' element={<ConfirmedTasks />} />
                    <Route path='cancelled-tasks' element={<CancelledTasks />} />
                    <Route path='search-tasks' element={<SearchTasks />} />
                </Route>
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
