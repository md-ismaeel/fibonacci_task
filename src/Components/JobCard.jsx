
const JobCard = ({ item }) => {

    return (
        <li key={item?.id} className="w-[80%] min-h-[100px] px-10 py-2 border-2 rounded-lg">
            <h1>{item?.title}</h1>
            <p>{item?.by}</p>
            <p>{new Date(item?.time * 1000).toLocaleDateString()}</p>
        </li>
    );
};

export default JobCard;
