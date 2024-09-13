import React, { useEffect, useState } from 'react'
import JobCard from '../Components/JobCard';

export default function Home() {
    const [idArray, setIdArray] = useState([]);
    const [jobData, setJobData] = useState([])
    const [visibleItems, setVisibleItems] = useState(Number(5));
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const idUrl = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
            try {
                setLoading(true);
                const response = await fetch(idUrl);
                const data = await response.json();
                setIdArray(data);
            } catch (err) {
                console.warn("Error while fetching", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, []);

    const handlePaginate = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    };

    useEffect(() => {
        const fetchJobsById = async () => {
            setLoading(true)
            try {
                const promises = idArray.slice(0, visibleItems).map(async (id) => {
                    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
                    const response = await fetch(url);
                    return response.json()
                })
                const responseData = await Promise.all(promises)
                console.log("promises", responseData);
                setJobData([...jobData, ...responseData]);

            } catch (err) {
                console.warn("error-occurred while fetching job");
            } finally {
                setLoading(false)
            }
        }
        fetchJobsById()
    }, [idArray, visibleItems])

    return (
        <>
            <section className='w-full h-auto flex flex-col justify-center items-center mt-10'>
                <ul className="w-full h-auto flex flex-col justify-center items-center gap-5 mb-5">
                    {jobData && jobData.map((item) => (
                        <JobCard item={item} key={item.id} />
                    ))}
                </ul>
                {visibleItems < idArray.length ? (
                    <button
                        onClick={handlePaginate}
                        className='w-[100px] h-[40px] rounded-lg bg-yellow-500 mb-10 text-white font-medium'
                    >
                        {loading ? <span>Loading....</span> : <span>Load more</span>}
                    </button>
                ) : (
                    <h1 className='w-full h-[40px] text-lg font-semibold mb-4'>No more page</h1>
                )}
            </section>
        </>
    );
}
