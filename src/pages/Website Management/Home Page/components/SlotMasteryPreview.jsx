import React from 'react';

const SlotMasteryPreview = ({ data }) => {
  return (
    <div className="bg-black p-8 rounded-lg">
      <div className="max-w-6xl mx-auto">
        {data.map((item, index) => (
          <div key={item._id} className={`mb-8 ${index > 0 ? 'border-t border-white/20 pt-8' : ''}`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-white/90 leading-relaxed">{item.description}</p>
              </div>
              <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotMasteryPreview;