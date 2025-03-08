import Image from "next/image";
import Link from "next/link";
import { PiStudentLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { RiEmotionHappyLine } from "react-icons/ri";
import { PiTarget } from "react-icons/pi";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-center gap-4">
        <div className="flex-2/3">
          <h1 className="text-5xl mb-4 font-bold text-sky-900">StudyVerse</h1>
          <p className="text-justify text-sky-600">An AI-powered smart learning platform that helps students stay focused, manage their study time effectively, and develop critical thinking skills. Additionally, StudyVerse detects students&lsquo; emotions and stress levels, providing personalized break recommendations and wellness tips to ensure a healthy study-life balance.</p>
          <p className="text-lg font-semibold mt-4">Try now</p>
          <div className="flex gap-4 mt-2">
            <Link href="/student" className="bg-sky-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-sky-700 transition duration-300 flex gap-2 items-center"><span>As Student</span> <PiStudentLight className='text-xl' /></Link>
            <Link href="/parent" className="border-2 border-sky-600 text-sky-600 cursor-pointer py-2 px-4 rounded-lg hover:bg-sky-100 transition duration-300 flex gap-2 items-center"><span>As Parent</span> <BsPerson className='text-xl'/> </Link>
          </div>
        </div>
        <Image src="/bot.png" width={784} height={198} alt="StudyVerse" className="h-auto w-1/3 flex-1/3" />
      </div>
      <div className="mt-8 border-t-2 border-sky-200 pt-4">
        <h1 className="text-5xl mb-4 font-bold text-sky-900 text-center">Problems</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="bg-sky-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-sky-900">Overreliance on AI</h2>
            <Image src="/overliance.png" width={700} height={700} alt="Overreliance on AI" className="h-auto w-full" />
          </div>
          <div className="bg-sky-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-sky-900">Emotions Overlooked</h2>
            <Image src="/overlooked.png" width={700} height={700} alt="Emotions Overlooked" className="h-auto w-full" />
          </div>
          <div className="bg-sky-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-sky-900">Lack of Focus</h2>
            <Image src="/focus.png" width={700} height={700} alt="Emotions Overlooked" className="h-auto w-full" />
          </div>
          <div className="bg-sky-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-sky-900">Poor Time Management</h2>
            <Image src="/time.png" width={700} height={700} alt="Poor Time Management" className="h-auto w-full" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8 border-t-2 border-sky-200 pt-4">
        <div className="flex-1/2">
          <h1 className="text-5xl mb-8 font-bold text-sky-900">Objective</h1>
          <h2 className="text-2xl font-semibold text-sky-800 flex gap-2 items-center"><LuBrain /><span>Promote Critical Thinking</span></h2>
          <p className="text-justify text-lg mb-4 text-sky-600">Guide students with step-by-step AI hints instead of providing direct answers.</p>
          <h2 className="text-2xl font-semibold text-sky-800 flex gap-2 items-center"><RiEmotionHappyLine /><span>Support Emotional Well-being</span></h2>
          <p className="text-justify text-lg mb-4 text-sky-600">Detect stress and motivation levels to suggest timely breaks and support mental health.</p>
          <h2 className="text-2xl font-semibold text-sky-800 flex gap-2 items-center"><PiTarget/><span>Enhance Active Focus</span></h2>
          <p className="text-justify text-lg text-sky-600">Guide students with step-by-step AI hints instead of providing direct answers.</p>
        </div>
        <Image src="/objective.png" width={784} height={198} alt="StudyVerse" className="h-auto w-1/2 flex-1/2" />
      </div>
      <div className="mt-8 border-t-2 border-sky-200 pt-4">
        <h1 className="text-5xl mb-4 font-bold text-sky-900 text-center">Target customers</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-sky-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-sky-900">Students</h2>
            <Image src="/student.png" width={700} height={700} alt="Students" className="h-auto w-full" />
          </div>
          <div className="bg-sky-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-sky-900">Parents</h2>
            <Image src="/parent.png" width={700} height={700} alt="Parents" className="h-auto w-full" />
          </div>
          <div className="bg-sky-100 p-4 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-sky-900">Schools</h2>
            <Image src="/school.png" width={700} height={700} alt="Emotions Overlooked" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 
