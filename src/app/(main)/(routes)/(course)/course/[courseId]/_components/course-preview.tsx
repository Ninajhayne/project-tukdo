"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Course, Chapter } from "@prisma/client";

import { Button } from "@/components/ui/button";

import {
    AiFillPlayCircle,
    AiOutlineHeart,
    AiOutlineTrophy,
} from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { IoIosInfinite } from "react-icons/io";
import { BiMobileAlt } from "react-icons/bi";

interface CoursePreviewProps {
    course: Course & {
        chapters: (Chapter)[];
    };
};

const Coursepreview = ({
    course,
}: CoursePreviewProps) => {
    const [cartCourseExists, setCartCourseExists] = useState<boolean>(false);
    const [coursePurchased, setCoursePurchased] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isPreviewFixed, setIsPreviewFixed] = useState<boolean>(false);
    const [isCollidedFooter, setIsCollidedFooter] = useState<boolean>(false);
  
  
    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("scroll", listenToScroll);
        return () => window.removeEventListener("scroll", listenToScroll);
    }, []);
  
    const listenToScroll = () => {
        let heightToSetFixed = 300;
        let heightToUnsetFixed = document.documentElement.scrollHeight - 1200;
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
    
        if (winScroll > heightToUnsetFixed) {
            setIsCollidedFooter(true);
        } else {
            setIsCollidedFooter(false);
        }
    
        if (winScroll > heightToSetFixed && winScroll < heightToUnsetFixed) {
            setIsPreviewFixed(true);
        } else {
            setIsPreviewFixed(false);
        }
    };
  
    const copyToClipBoard = async (copyMe: string) => {
      try {
        await navigator.clipboard.writeText(copyMe);
        toast("📋 Link copied to clipboard!");
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
    return (
        <>
            <div
                className={`block ${
                    isPreviewFixed
                    ? `lg:fixed z-50 top-20 lg:animate-fadeIn`
                    : `lg:absolute z-40 ${
                        isCollidedFooter ? "bottom-96 mb-96" : "top-28"
                        }`
                } right-20 bg-primaryblack lg:bg-white text-white lg:text-primaryblack w-full lg:w-3/12 h-auto lg:h-72 border-none lg:border lg:border-white lg:drop-shadow-md`}
            >
            {!coursePurchased ? (
                <img
                    alt="img"
                    className={`${
                        isPreviewFixed || isCollidedFooter ? "hidden" : ""
                } border border-white w-full`}
                src={course.imageUrl || ""}
                />
            ) : (
                <div>

                </div>
            )}
            <div className="p-6 bg-primaryblack lg:bg-white">
                {!coursePurchased ? (
                <>
                    <div className="flex flex-row justify-start items-center space-x-2">
                        <h1 className="text-4xl font-bold mb-4">₹{course.price}</h1>
                    </div>
                    <div className="w-full flex flex-row space-x-2">
                        <button
                            disabled={cartCourseExists}
                            className={`${
                                cartCourseExists && "cursor-not-allowed opacity-70"
                            } p-2 bg-findemypurple hover:opacity-90 w-11/12 text-white font-semibold text-lg`}
                        >
                                {cartCourseExists ? (
                                <span className="flex flex-row text-center w-full items-center justify-center">
                                    ✓ Added to cart!
                                </span>
                            ) : (
                            <>
                                Add to cart
                            </>
                            )}
                        </button>
        
                        <button
                            onClick={() => toast.success("Moved to your wishlist! ❤️ ")}
                            className="border border-white lg:border-primaryblack w-12 flex items-center justify-center hover:bg-[#F5F5F5]"
                        >
                            <AiOutlineHeart className="h-6 w-6" />
                        </button>
                    </div>
                    {!cartCourseExists && (
                    <button
                        //onClick={() => handleBuyNow()}
                        className="border border-white lg:border-primaryblack text-lg h-10 font-bold w-full mt-2 hover:bg-[#F5F5F5]"
                    >
                        Buy now
                    </button>
                    )}
                    <p className="text-xs font-light w-full text-center my-3">
                        {" "}
                        30-Day Money-Back Guarantee
                    </p>
                </>
                ) : (
                <>
                    <div>
                        <div className="flex items-center justify-center w-full">
                            <Link href={`/course/${course.id}/chapters/${course.chapters[0].id}`}>
                                <Button>
                                    Nice
                                </Button>
                            </Link>
                        </div>
                    </div>
                </>
                )}
    
                <div className="flex flex-col mt-2">
                <p>This course includes:</p>
                <div className="flex flex-col mb-2">
                    <div className="flex flex-row space-x-3 my-1">
                    <MdOndemandVideo size={20} />
                    <p className="text-sm font-light">5.5 hours on-demand video</p>
                    </div>
                    <div className="flex flex-row space-x-3 my-1">
                    <HiOutlineFolderDownload size={20} />
                    <p className="text-sm font-light">70 downloadable resources</p>
                    </div>
                    <div className="flex flex-row space-x-3 my-1">
                    <IoIosInfinite size={20} />
                    <p className="text-sm font-light">Full lifetime access</p>
                    </div>
                    <div className="flex flex-row space-x-3 my-1">
                    <BiMobileAlt size={20} />
                    <p className="text-sm font-light">Access on mobile and TV</p>
                    </div>
                    <div className="flex flex-row space-x-3 my-1">
                    <AiOutlineTrophy size={20} />
                    <p className="text-sm font-light">Certificate of completion</p>
                    </div>
                </div>
                </div>
                <div className="flex flex-row w-full justify-around">
                    <p
                        onClick={() =>
                            copyToClipBoard(`${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}`)
                        }
                        className="underline hover:text-findemypurple cursor-pointer"
                    >
                        Share
                    </p>
                </div>
            </div>
            </div>
            <div className="fixed z-50 lg:hidden bottom-0 w-full flex p-3 flex-row items-center justify-between h-16 bg-white shadow-inner">
                <h1 className="text-lg font-bold w-1/5 flex items-center justify-center">
                    {course.price}
                </h1>
                {coursePurchased ? (
                <>
                    <div className="flex items-center justify-center w-full">
                    <Link href={`/course/${course.id}/chapter/${course.chapters[0].id}`}>
                        <button className="flex flex-row items-center p-3 bg-findemypurple hover:opacity-90 w-full my-3 text-white font-semibold text-sm">
                        <AiFillPlayCircle className="mx-1" size={20} />
                        Start streaming!
                        </button>
                    </Link>
                    </div>
                </>
                ) : (
                <>
                    <button
                        //onClick={() => addCourseToCart()}
                        disabled={cartCourseExists}
                        className={`${
                            cartCourseExists && "cursor-not-allowed opacity-70"
                        } p-2 bg-findemypurple hover:opacity-90 w-11/12 text-white font-semibold text-lg`}
                    >
                    {cartCourseExists ? (
                        <span className="flex flex-row text-center w-full items-center justify-center">
                        ✓ Added to cart!
                        </span>
                    ) : (
                        <>
                            Add to cart
                        </>
                    )}
                    </button>
                </>
                )}
            </div>
        </>
    );
  };
  
  export default Coursepreview;
  