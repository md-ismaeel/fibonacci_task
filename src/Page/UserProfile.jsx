import React, { useEffect, useState } from "react";

export default function UserProfile() {
    const [userData, setUserData] = useState(() => {
        const savedData = localStorage.getItem("userData");
        return savedData ? JSON.parse(savedData) : []
    });
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [id, setId] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    function handleChange(e) {
        const { name, value } = e.target;
        // console.log(name, value);
        if (name === "fistName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else if (name === "mobileNumber") {
            setMobileNumber(value);
        } else if (name === "id") {
            setId(value);
        }
    }

    function resetForm() {
        setEditingId(null);
        setIsEditing(false);
        setFirstName("");
        setLastName("");
        setMobileNumber("");
        setId("");
    }

    function handleAdd() {
        if (!firstName || !lastName || !mobileNumber || !id) {
            return alert("All field is required!!");
        } else {
            const newData = { firstName, lastName, mobileNumber, id };
            setUserData((prev) => [...prev, newData]);
            resetForm();
        }
    }

    function handleEdit(user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setMobileNumber(user.mobileNumber);
        setId(user.id);
        setEditingId(user.id);
        setIsEditing(true);
    }

    function handleSave() {
        const updatedData = userData.map((user) =>
            user.id === editingId
                ? { ...user, firstName, lastName, mobileNumber, id }
                : user
        );
        setUserData(updatedData);
        resetForm();
    }

    function handleDelete(id) {
        const filteredData = userData && userData.filter((user) => user.id !== id);
        setUserData(filteredData);
    }

    useEffect(() => {
        const url = `https://run.mocky.io/v3/7de65235-2269-4803-b7e2-34d0d6ccfe27`;
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.warn("Error While fetching data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    return (
        <>
            <section className="w-full h-auto">
                <div className="w-full min-h-[100px] p-4 flex justify-center items-center gap-2 border-2 rounded-xl">
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleChange}
                        name="fistName"
                        placeholder="First Name"
                        className="w-[200px] h-[40px] border rounded-md px-4 py-1"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={handleChange}
                        name="lastName"
                        placeholder="Last Name"
                        className="w-[200px] h-[40px] border rounded-md px-4 py-1"
                    />
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={handleChange}
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        className="w-[200px] h-[40px] border rounded-md px-4 py-1"
                    />
                    <input
                        type="number"
                        value={id}
                        onChange={handleChange}
                        name="id"
                        placeholder="Id"
                        className="w-[100px] h-[40px] border rounded-md px-4 py-1"
                    />
                    <button
                        onClick={isEditing ? handleSave : handleAdd}
                        className="w-[100px] h-[40px] border rounded-md px-4 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white font-medium"
                    >
                        {isEditing ? "Save" : "Add"}
                    </button>
                </div>

                <ul className="w-full h-full flex flex-col justify-center items-center gap-5 mt-5 mb-10">
                    {userData && userData.length > 0 ? (
                        userData.map((user) => (
                            <li
                                key={user.id}
                                className="relative w-[65%] min-h-[100px] border-2 rounded-md px-10 py-2 flex justify-between items-start"
                            >
                                <div className="flex flex-col gap-2">
                                    <p>id: {user.id}</p>
                                    <h1>
                                        Name: <span>{`${user.firstName} ${user.lastName}`}</span>
                                    </h1>
                                    <p>Mobile Number: {user.mobileNumber}</p>
                                </div>

                                <div className="absolute right-5 top-[30%]">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="w-[80px] h-[40px] mr-3 rounded-md bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="w-[80px] h-[40px] rounded-md bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="w-full h-[300px] flex justify-center items-center text-teal-600 text-3xl mt-10">
                            User data not found!!
                        </div>
                    )}
                </ul>
            </section>
        </>
    );
}
