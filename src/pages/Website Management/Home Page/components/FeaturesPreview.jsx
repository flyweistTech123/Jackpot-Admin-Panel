import React from 'react';

const FeaturesPreview = ({ data, title }) => {
  return (
    <div className="bg-white p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item._id} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <img src={item.image} alt={item.title} className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPreview;