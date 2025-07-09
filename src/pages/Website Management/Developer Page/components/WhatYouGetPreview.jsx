import { Trash2 } from 'lucide-react';

const WhatYouGetPreview = ({ data, title, handleDelete }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] p-8 rounded-lg text-center">
      <h2 className="text-4xl font-bold mb-8 text-white">{title}</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-[#10210E] border border-green-500 rounded-xl p-6 w-full sm:w-64 text-white"
          >
            {handleDelete && (
              <div className='flex items-end justify-end'>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 cursor-pointer rounded-full hover:bg-red-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} className="text-white" />
                </button>
              </div>
            )}
            <h6 className="font-semibold">{item.title}</h6>

          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatYouGetPreview;
