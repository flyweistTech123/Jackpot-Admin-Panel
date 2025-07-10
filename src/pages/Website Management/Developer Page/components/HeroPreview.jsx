import React from 'react';

const HeroPreview = ({ data, handleDelete }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] text-white p-8 rounded-lg">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="sm:text-4xl text-xl font-bold mb-6 text-white">{data?.title}</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-4">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.topImage}
              alt="Hero Left"
              className="w-full max-w-[400px] rounded-lg shadow-lg bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.topImageAfterEffect}
              alt="Hero Right"
              className="w-full max-w-[200px] rounded-lg shadow-lg bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.topImageAfterEffect1}
              alt="Hero Right"
              className="w-full max-w-[200px] rounded-lg shadow-lg bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.topImageAfterEffect2}
              alt="Hero Right"
              className="w-full max-w-[200px] rounded-lg shadow-lg bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;