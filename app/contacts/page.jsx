import * as React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-6xl bg-white rounded-lg p-8 shadow-md border-4 border-[#096773]">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#096773]">
          Contact Us
        </h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Team Members */}
          <div className="col-span-3 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-[#096773]">
              ReWisely Team
            </h2>
            <div className="border border-4 border-[#096773] rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Khadija Khedr</h3>
                  <p className="text-gray-600">kk1902086@qu.edu.qa</p>
                </div>
              </div>
              {/* Add more team members similarly */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Asma Bahabarah</h3>
                  <p className="text-gray-600">ab1905217@qu.edu.qa</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Amani Mamiche</h3>
                  <p className="text-gray-600">am1907994@qu.edu.qa</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Taqwa Ellabad</h3>
                  <p className="text-gray-600">te1901992@qu.edu.qa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Supervisor */}
          <div className="col-span-3 md:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-[#096773]">
              Supervisor
            </h2>
            <div className="border border-4 border-[#096773] rounded-lg p-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-semibold">Moutaz Saleh</h3>
                  <p className="text-gray-600">moutaz.saleh@qu.edu.qa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email */}

        <div className="border border-4 border-[#096773] rounded-lg p-4 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-[#096773]">
            Website Email
          </h2>
          <p className="text-gray-600">Rewisely.g33@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
