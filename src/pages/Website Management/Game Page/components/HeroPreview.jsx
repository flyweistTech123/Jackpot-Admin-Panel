import React from 'react';

const HeroPreview = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] text-white p-8 rounded-lg">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="sm:text-4xl text-xl font-bold mb-6 text-white">{data?.title}</h1>
      </div>
    </div>
  );
};

export default HeroPreview;