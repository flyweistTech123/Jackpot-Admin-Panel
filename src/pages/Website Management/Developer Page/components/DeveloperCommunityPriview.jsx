import React from 'react';

const DeveloperCommunityPriview = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] text-white p-8 rounded-lg">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="sm:text-4xl text-xl font-bold mb-6 text-white">{data?.developerCommunityTitle}</h1>
        <h1 className="sm:text-xl text-lg font-bold mb-6 text-white">{data?.developerCommunityDescription}</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-4">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.developerCommunityImage}
              alt="Hero Left"
              className="w-full max-w-[400px] rounded-lg shadow-lg bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperCommunityPriview;