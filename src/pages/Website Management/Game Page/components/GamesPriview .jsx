import { Trash2 } from 'lucide-react';

const GamesPriview  = ({ data, title, handleDelete }) => {
    return (
        <div className="bg-gradient-to-b from-black to-[#0A0E15] p-8 rounded-lg">
            <h2 className="text-4xl font-bold mb-8 text-white text-center">
                {title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="bg-[#111] border border-[#1F1F1F] rounded-xl overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl transition duration-300"
                    >
                        <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-black">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex flex-col flex-grow justify-between">
                            <h3 className="text-green-400 text-lg font-semibold flex items-center justify-between">
                                {item.title}
                                {handleDelete && (
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 cursor-pointer rounded-full hover:bg-red-700 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} className="text-white" />
                                    </button>
                                )}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamesPriview ;
