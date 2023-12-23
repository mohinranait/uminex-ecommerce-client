

const ColorRows = ({color, refetch,handleGetColorId,index}) => {
    const {name, slug,_id,status,colorCode} = color || {}

    const handleDeleteColor = () => {
        console.log('');
    }
    return (
        <>
            <tr>
                <td className="text-gray-400 py-2">{index+1}</td>
                <td className="text-gray-400 py-2">
                    <p className="text-gray-700">{name}</p>
                    <p className="text-xs text-gray-400">{slug}</p>
                </td>
               
                <td className="text-gray-400 py-2">
                    <span className="w-8 h-8 rounded inline-block border border-gray-200" style={{backgroundColor:colorCode}}></span>
                </td>
                <td className="text-gray-400 py-2">{status ? "Public" : "Unpublic" }</td>
                <td className="text-gray-400 py-2 w-[200px]">
                    <div className="flex justify-end gap-3">
                        <button onClick={() => handleGetColorId(_id)} className="px-3 py-1 inline-block bg-green-50 text-green-700">Edit</button>
                        <button onClick={handleDeleteColor} className="px-3 py-1 inline-block bg-red-50 text-red-700">Delete</button>
                    </div>
                </td>
            </tr>   
        </>
    );
};

export default ColorRows;