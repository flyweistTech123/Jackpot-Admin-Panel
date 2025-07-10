import { Trash2 } from 'lucide-react';

const HowItWorksPreview = ({ data, handleDelete }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">How It Works</h2>
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center items-stretch">
        {data?.map((item) => (
          <div
            key={item?._id}
            className="bg-green-900 text-white rounded-lg p-2 flex itmes-center gap-5"
          >
            <h3 className="text-lg font-bold">{item.title}</h3>

            {/* Delete button */}
            {handleDelete && (
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 cursor-pointer rounded-full hover:bg-red-700 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} className="text-white" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksPreview;
