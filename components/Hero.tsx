"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

// Import slick styles in your root layout or _app.js
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const slides = [
  {
    title: "TRENDING STREETWEAR 2025",
    description:
      "Discover the latest streetwear styles that define modern fashion. From oversized fits to bold graphics — stand out every day.",
    image: "/slide1.jpg", // Replace with your actual image
  },
  {
    title: "SUMMER COLLECTION IS HERE",
    description:
      "Beat the heat with our breathable and lightweight summer wear. Perfect for beach days, city walks, and everything in between.",
    image: "/slide2.jpg",
  },
  {
    title: "PREMIUM COMFORT & STYLE",
    description:
      "Crafted with care, our fabrics offer unmatched comfort and elegance. Elevate your wardrobe with versatile pieces.",
    image: "/slide3.jpg",
  },
  {
    title: "LIMITED TIME OFFERS",
    description:
      "Shop exclusive deals and save big on your favorite outfits. Hurry, styles are selling out fast!",
    image: "/slide4.jpg",
  },
];


  return (
    <div className="w-full bg-gray-200 p-8">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="h-[400px] w-full max-lg:h-[900px] max-md:h-[750px]">
              <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
                <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2 text-center lg:text-left">
                  <h1 className="text-5xl text-gray-900 font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
                    {slide.title}
                  </h1>
                  <p className="text-gray-800 max-sm:text-sm">
                    {slide.description}
                  </p>
                  {/* Optional buttons */}
                  {/* <div className="flex gap-x-2 justify-center lg:justify-start">
                    <button className="bg-blue-600 text-white font-bold px-8 py-3 hover:bg-blue-700">
                      BUY NOW
                    </button>
                    <button className="bg-blue-500 text-white font-bold px-8 py-3 hover:bg-blue-600">
                      LEARN MORE
                    </button>
                  </div> */}
                </div>

                <div className="max-w-[400px] max-md:max-w-[300px] max-sm:max-w-[250px]">
                  <Image
                    src={slide.image}
                    width={400}
                    height={400}
                    alt={`slide-image-${index}`}
                    className="w-auto h-auto max-md:w-[300px] max-md:h-[300px] max-sm:h-[250px] max-sm:w-[250px]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;



// import Image from "next/image";
// import React from "react";

// const Hero = () => {
//   return (
//     <div className="h-[700px] w-full bg-gray-200 max-lg:h-[900px] max-md:h-[750px]">
//       <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
//         <div className="flex flex-col gap-y-5 max-lg:order-last col-span-2">
//           <h1 className="text-6xl text-gray-900 font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
//             THE PRODUCT OF THE FUTURE
//           </h1>
//           <p className="text-gray-800 max-sm:text-sm">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor modi
//             iure laudantium necessitatibus ab, voluptates vitae ullam. Officia
//             ipsam iusto beatae nesciunt, consequatur deserunt minima maiores
//             earum obcaecati. Optio, nam!
//           </p>
//           {/* <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
//             <button className="bg-blue-600 text-white font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-blue-700">
//               BUY NOW
//             </button>
//             <button className="bg-blue-600 text-white font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg hover:bg-blue-700">
//               LEARN MORE
//             </button>
//           </div> */}
//         </div>
//         <Image
//           src="/jeans.jpg"
//           width={400}
//           height={400}
//           alt="smart watch"
//           className="max-md:w-[300px] max-md:h-[300px] max-sm:h-[250px] max-sm:w-[250px] w-auto h-auto"
//         />
//       </div>
//     </div>
//   );
// };

// export default Hero;
