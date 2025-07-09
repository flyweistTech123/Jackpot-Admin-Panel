import React from 'react';

const HeroPreview = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] text-white p-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">{data?.title}</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-4">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.image}
              alt="Hero Left"
              className="w-full max-w-[400px] rounded-lg shadow-lg bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.upperImage}
              alt="Hero Right"
              className="w-full max-w-[400px] rounded-lg shadow-lg bg-white"
            />
          </div>
        </div>

        <button class="home-skills-demo-button"><span class="home-skills-demo-button-text"> {data.subTitleButton}</span></button>
      </div>
    </div>
  );
};

export default HeroPreview;