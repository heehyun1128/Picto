import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 opacity-50 rounded-[25px]"></div>
      <div className="absolute top-[10%] left-[10%] w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-[#E9FBB2] rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[10%] w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-[#A7F9EC] rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[10%] left-[10%] w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-[#E9FBB2] rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
      
      <div className="relative w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-xl bg-opacity-20 py-8 sm:py-12 md:py-16 rounded-[25px]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-800 text-sm sm:text-sm md:text-base lg:text-lg font-medium mb-3 sm:mb-3">Unleash your creativity with Picto AI</p>
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight mb-3 sm:mb-3">
            Generate 
            <span className="bg-purple-gradient bg-clip-text text-transparent px-2 sm:px-2">Stunning Images</span> 
            <span className="relative">
              with AI
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-gradient"></span>
            </span>
          </h1>
          <p className="text-gray-800 text-base sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto mb-5 sm:mb-6">Transform your ideas into beautiful visuals using our advanced AI image generation technology.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link href="/image" className="bg-purple-gradient hover:opacity-80 text-white font-medium py-3 sm:py-3 px-6 sm:px-6 rounded-[25px] focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300 text-sm sm:text-sm md:text-base">
              Try Image Generator
            </Link>
            <button disabled className="bg-gray-300 text-gray-500 font-medium py-3 sm:py-3 px-6 sm:px-6 rounded-[25px] cursor-not-allowed text-sm sm:text-sm md:text-base">
              Sign Up Free
            </button>
          </div>
          <p className="text-sm sm:text-sm text-gray-600 mt-4">No credit card required * <span className="text-gray-700">Start generating for free</span></p>
        </div>
      </div>
    </div>
  )
}