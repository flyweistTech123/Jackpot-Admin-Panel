import React from 'react';

const FooterPreview = ({ data }) => {
  return (
    <div className="bg-gradient-to-b from-black to-[#0A0E15] text-white p-8 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-purple-500">{data.footerBannerTitle}</h2>
         <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.footerBannerImage}
              alt="Hero Left"
              className="w-full max-w-[400px] rounded-lg shadow-lg bg-black"
            />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.footerBannerImageEffect}
              alt="Hero Right"
              className="w-full max-w-[400px] rounded-lg shadow-lg bg-black"
            />
          </div>
        </div>
        <button className="bg-gradient-to-r from-green-600 to-green-400 cursor-pointer text-white font-bold px-8 py-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200">
          {data.footerBannerButton}
        </button>
      </div>
    </div>
  );
};

export default FooterPreview;