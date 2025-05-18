"use client";
import React, { useEffect, useState } from "react";
import { useWishlistStore } from "../_zustand/wishlistStore";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const WishlistPage = () => {
  const { data: session } = useSession();
  const { wishlist, setWishlist } = useWishlistStore();

  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`http://localhost:3001/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlistData = await response.json();

    const productArray = wishlistData.map((item: any) => ({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock,
    }));

    setWishlist(productArray);
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      const response = await fetch(
        `http://localhost:3001/api/users/email/${session.user.email}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      getWishlistByUserId(data?.id);
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center p-2 border-b-2 border-blue-200 text-gray-800 mb-8">
          My Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No items found in the wishlist.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={nanoid()}
                className="border bg-white rounded-lg shadow hover:shadow-md transition duration-300 p-4 flex flex-col"
              >
                <Link href={`/product/${item.slug}`} className="mb-4">
                  <Image
                    src={
                      item.image.startsWith("/")
                        ? item.image
                        : `/${item.image}` // fallback fix
                    }
                    alt={item.title}
                    width={400}
                    height={400}
                    className="object-contain rounded w-full h-60"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-medium mb-2">
                      ₹{item.price}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        item.stockAvailabillity > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.stockAvailabillity > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </p>
                  </div>

                  <Link
                    href={`/product/${item.slug}`}
                    className="mt-4 inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;



// "use client";
// import { SectionTitle, WishItem } from "@/components";
// import React, { useEffect, useState } from "react";
// import { useWishlistStore } from "../_zustand/wishlistStore";
// import { nanoid } from "nanoid";
// import { useSession } from "next-auth/react";



// const WishlistPage = () => {
//   const { data: session, status } = useSession();
//   const {wishlist, setWishlist}= useWishlistStore();

//   const getWishlistByUserId = async (id: string) => {
//     const response = await fetch(`http://localhost:3001/api/wishlist/${id}`, {
//       cache: "no-store",
//     });
//     const wishlist = await response.json();

//     const productArray: {
//       id: string;
//       title: string;
//       price: number;
//       image: string;
//       slug:string
//       stockAvailabillity: number;
//     }[] = [];
    
//     wishlist.map((item:any) => productArray.push({id: item?.product?.id, title: item?.product?.title, price: item?.product?.price, image: item?.product?.mainImage, slug: item?.product?.slug, stockAvailabillity: item?.product?.inStock}));
    
//     setWishlist(productArray);
//   };

//   const getUserByEmail = async () => {
//     if (session?.user?.email) {
//       fetch(`http://localhost:3001/api/users/email/${session?.user?.email}`, {
//         cache: "no-store",
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           getWishlistByUserId(data?.id);
//         });
//     }
//   };

//   useEffect(() => {
//     getUserByEmail();
//   }, [session?.user?.email, wishlist.length]);
//   return (
//     <div className="bg-white">
//       {wishlist && wishlist.length === 0 ? (
//         <h3 className="text-center text-4xl py-10 text-black max-lg:text-3xl max-sm:text-2xl max-sm:pt-5 max-[400px]:text-xl">
//           No items found in the wishlist
//         </h3>
//       ) : (
//         <div className="max-w-screen-2xl mx-auto">
//           <div className="overflow-x-auto">
//             <table className="table text-center">
//               <thead>
//                 <tr>
//                   <th></th>
//                   <th className="text-accent-content">Image</th>
//                   <th className="text-accent-content">Name</th>
//                   <th className="text-accent-content">Stock Status</th>
//                   <th className="text-accent-content">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {wishlist &&
//                   wishlist?.map((item) => (
//                     <WishItem
//                       id={item?.id}
//                       title={item?.title}
//                       price={item?.price}
//                       image={item?.image}
//                       slug={item?.slug}
//                       stockAvailabillity={item?.stockAvailabillity}
//                       key={nanoid()}
//                     />
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;
