import { Fragment, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Page/Home'
import JobCard from './Components/JobCard'
import UserProfile from './Page/UserProfile'
// import { TodoList } from './Components/TodoList/TodoList'
// import { TimerContDown } from './Components/TimerContDown'

function App() {
  const routers = createBrowserRouter([
    // {
    //   path: "/",
    //   // element: <TodoList />
    //   element: < Home />
    // },
    // {
    //   path: "jobCard",
    //   element: <JobCard />
    // }
    {
      path: "/",
      element: <UserProfile />
    }
  ])


  return (
    <Fragment>
      <RouterProvider router={routers} />
    </Fragment>
  )
}

export default App
