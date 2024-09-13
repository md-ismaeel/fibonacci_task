import React, { useEffect, useState } from 'react'

export const TodoList = () => {

    const [apiData, setApiData] = useState([])

    const url = `https://dummyjson.com/products`;

    const fetchData = () => {
        fetch(url).then((Response) => Response.json()).then((data) => {
            console.log(data);
            setApiData(data.products)
        })
    }

    useEffect(() => {
        fetchData(url)
    }, [])

    const handleSearch = (e) => {
        console.log(e.target.value);
        let textVal = e.target.value;

        // const 
    }

    return (
        <>
            <div className='w-full min-h-screen'>
                <h1 className='w-full text-3xl font-semibold text-center mt-6 mb-2'>TodoList</h1>
                <div className='px-20 mb-4'>
                    <input type='text' placeholder='Enter Todo' onChange={handleSearch} className='w-[400px] h-[30px] bg-slate-200 px-4' />
                </div>
                <ul className='w-full flex flex-col justify-center items-start px-20 gap-4'>
                    {apiData?.map((item) => {
                        return (
                            <li key={item.id} className='w-full border-2 px-4 py-2 mb-10'>
                                <p>{item.title}</p>
                                <p>{item.description}</p>
                                <p>{item.category}</p>
                                <p>{item.brand}</p>
                                <p>{item.price}</p>
                                <p>{item.rating}</p>
                                <p>{item.price}</p>
                                <img src={item.images[0]} alt={item.brand} height={'150px'} width={'150px'} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
