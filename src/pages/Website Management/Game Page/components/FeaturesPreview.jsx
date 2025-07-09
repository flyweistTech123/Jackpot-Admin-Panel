import { Trash2 } from 'lucide-react';

const FeaturesPreview = ({ data, title, handleDelete }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] p-8 rounded-lg">
      <h2 className="text-4xl font-bold mb-6 text-white text-center">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
            {handleDelete && (
              <div className='flex items-center justify-end'>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="group  ml-4 p-1.5 cursor-pointer rounded-full hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} className="text-black group-hover:text-white" />
                </button>
              </div>
            )}
            <div className="w-30 h-30 mx-auto mb-4 bg-black  rounded-full flex items-center justify-center">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-cover" />
            </div>
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPreview;