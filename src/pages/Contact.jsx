import React from 'react'

function Contact() {
  return (
    <div className="min-h-screen bg-[#fffaf6] py-12">
      <div className="container mx-auto px-6">
        {/* header small box + divider */}
        <div className="flex flex-col items-center">
          <div className="border border-gray-700 rounded-md px-6 py-1 w-48 text-center text-sm">
            Contact
          </div>
          <div className="mt-4 h-2 w-80 bg-gray-200 rounded-full"></div>
        </div>

        {/* main grid: left form, right info cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {/* left: form wireframe card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-4">
              {/* small header box */}
              <div className="h-8 w-48 border rounded-md"></div>

              {/* Name */}
              <div>
                <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-50 border border-gray-200 rounded-md px-3"></div>
              </div>

              {/* Email */}
              <div>
                <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-50 border border-gray-200 rounded-md px-3"></div>
              </div>

              {/* Subject */}
              <div>
                <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-50 border border-gray-200 rounded-md px-3"></div>
              </div>

              {/* Message */}
              <div>
                <div className="h-3 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-28 bg-gray-50 border border-gray-200 rounded-md px-3 py-2"></div>
              </div>

              {/* submit button (dark) */}
              <div>
                <button type="button" className="w-full h-12 bg-[#111827] text-white rounded-md">Send Message</button>
              </div>
            </div>
          </div>

          {/* right: contact info cards */}
          <div className="space-y-4">
            {/* top small search-like box centered on wide screens */}
            <div className="flex justify-end lg:justify-start">
              <div className="h-8 w-48 border rounded-md"></div>
            </div>

            {/* three small info cards */}
            <div className="space-y-4">
              {[1,2,3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-yellow-200 border border-gray-300 flex items-center justify-center"> </div>
                  <div className="flex-1">
                    <div className="h-3 w-36 bg-gray-400 rounded mb-2"></div>
                    <div className="h-3 w-64 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* large card with two columns of lines */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="h-4 w-40 bg-gray-400 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  {Array.from({length:8}).map((_, idx) => (
                    <div key={idx} className="h-3 bg-gray-200 rounded w-5/6"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  {Array.from({length:8}).map((_, idx) => (
                    <div key={idx} className="h-3 bg-gray-200 rounded w-5/6 ml-auto"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* full-width big showcase / map-like card */}
      <div className="container mx-auto px-6 mt-12">
        <div className="bg-white border border-gray-200 rounded-lg p-12 h-56 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border border-gray-300 flex items-center justify-center"></div>
            <div className="mt-4 h-3 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* title + circle indicators section */}
      <div className="mt-12 bg-[#fffaf6] py-12">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="border border-gray-700 rounded-md px-6 py-1 w-48 text-center text-sm">
            Section
          </div>
          <div className="mt-6 flex gap-4">
            {Array.from({length:5}).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full border border-gray-300 bg-white"></div>
            ))}
          </div>
        </div>
      </div>

      {/* yellow background list section */}
      <div className="mt-12 bg-yellow-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {Array.from({length:4}).map((_, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between">
                <div className="h-4 w-64 bg-gray-300 rounded"></div>
                <div className="h-6 w-6 rounded-full border border-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact