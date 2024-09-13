import React, { useState } from "react";
import { data } from "../Page/Data.js";

export const ShowData = () => {
    const [dataObj, setDataObj] = useState([]);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setId] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    React.useEffect(() => {
        async function fetchData() {
            const url = `https://run.mocky.io/v3/7de65235-2269-4803-b7e2-34d0d6ccfe27`;
            setLoading(true);
            try {
                const response = await fetch(url);
                const data = await response.json();
                setDataObj(data);
            } catch (err) {
                console.error("Error occurred while fetching api");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    function handleAdd() {

        if (!firstName || !lastName || !mobileNo || !id) {
            return alert("Please fill in all fields.");
        } else {
            const newData = { firstName, lastName, id, mobileNumber: mobileNo };
            setDataObj((prev) => [...prev, newData]);
            resetForm();
        }
    }

    function resetForm() {
        setFirstName("");
        setLastName("");
        setId("");
        setMobileNo("");
        setIsEditing(false);
        setEditingId(null);
    }

    function DeleteHandler(id) {
        const filteredData = dataObj.filter((data) => data.id !== id);
        setDataObj(filteredData);
    }

    function handleEdit(data) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setId(data.id);
        setMobileNo(data.mobileNumber);
        setEditingId(data.id);
        setIsEditing(true);
    }

    function handleSave() {
        const updatedData = dataObj.map((data) => {
            if (data.id === editingId) {
                return { ...data, id, firstName, lastName, mobileNumber: mobileNo };
            }
            return data;
        });
        setDataObj(updatedData);
        resetForm();
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <div className="container min-h-[100px] w-full flex justify-center items-center border gap-2">

                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-[200px] h-[35px] border mt-3 rounded-md px-4"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-[200px] h-[35px] border mt-3 rounded-md px-4"
                />
                <input
                    type="number"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-[200px] h-[35px] border mt-3 rounded-md px-4"
                />
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ID"
                    className="w-[200px] h-[35px] border mt-3 rounded-md px-4"
                />
                <button
                    onClick={isEditing ? handleSave : handleAdd}
                    className="w-[100px] h-[35px] border mt-3 rounded-md px-4 bg-blue-500 text-white"
                >
                    {isEditing ? "Save" : "Add"}
                </button>
            </div>
            <ul className="w-[60%] h-auto flex flex-col justify-center items-center gap-4 mb-10 mt-2">
                {dataObj.length > 0 ? (
                    dataObj.map((data, index) => (
                        <li
                            key={index}
                            className="w-full border-2 p-6 flex justify-between items-center rounded-lg"
                        >
                            <div className="w-[70%]">
                                <p>id: {data.id}</p>
                                <h1>{`Name: ${data.firstName} ${data.lastName}`}</h1>
                                <div className="relative flex justify-between mt-3 items-center w-[100%]">
                                    <p>Mobile No: {data.mobileNumber}</p>
                                </div>
                            </div>
                            <div className="">
                                <button
                                    onClick={() => handleEdit(data)}
                                    className="px-2 py-1 bg-slate-700 text-white rounded-md"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => DeleteHandler(data.id)}
                                    className="px-6 py-1 bg-blue-500 text-white font-medium rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="w-full h-[200px] text-center text-teal-600 text-3xl mt-20"></div>
                )}
            </ul>
        </div>
    );
};
