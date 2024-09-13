import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = (props) => {
    const [state, setState] = useState(10);
    return (
        <UserContext.Provider value={{ state, setState }}>
            {props.children}
        </UserContext.Provider>
    )
}