import React from 'react';

const HowItWorksPreview = ({ data }) => {
  return (
    <div className="bg-black p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">How It Works</h2>
      <div className="flex flex-col gap-6 justify-center items-stretch">
        {data.map((item, index) => (
          <div
            key={item._id}
            className="bg-green-900  text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-4 w-full"
          >
            <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
            <div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksPreview;