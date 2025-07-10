import React from 'react';

const HeroPreview = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] text-white p-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="sm:text-4xl text-xl font-bold mb-6 text-white">{data?.title}</h1>
        <p className="sm:text-lg text-lg font-bold mb-6 text-white">{data?.description}</p>
        <h1 className="sm:text-4xl text-xl font-bold mb-6 bg-gradient-to-r from-[#FFC729] via-[#FFE59D] to-[#F3B300] bg-clip-text text-transparent">{data?.gameIntegrityTitle}</h1>
        <p className="sm:text-lg text-lg font-bold mb-6 text-white">{data?.gameIntegrityDescription}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.gameIntegrityImage.map((item) => (
            <div
              key={item._id}
              className="bg-[#111] border border-[#1F1F1F] rounded-xl overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={item}
                  alt={item}
                  className="h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;