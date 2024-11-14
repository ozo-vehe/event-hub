import Recommend from "./Recommend";
import OtherEvents from "./OtherEvents";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaSliders } from "react-icons/fa6";
import SeaarchHeader from "./seaarchHeader";
import { useState } from "react";
import EventCard from "../cards/EventCard";
import Filter from "./Filter";
import toast from "react-hot-toast";
import { END_POINT } from "../../config/environment";


export default function SearchResults() {
  const loaderData = useLoaderData()
  const [event,setEvent] = useState(loaderData)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false);
  const [eventNumm,setEventNum ] = useState(25)
  let placeholder = new Array(15).fill(0)

  function searchHandler(data) {
    setEvent(data)
  }
  async function getMoreEventHandle() {
    setIsLoading(true)
    setIsLoading((num)=> num +10)
    try{
        const response = await fetch(`${END_POINT.BASE_URL}/event/all?limit=${eventNumm+10}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json(); 
        setIsLoading(false)
        setEvent(data)
        console.log(data)
        return data// The fetched data will be available in the component
    }catch(error){
      setIsLoading(false)
      toast.error("Failed to fetch more event please try again")
    }   
 
}
  //const {events} = useSelector((state) => state.events);

  // const filterHandler=()=>{
  //   setShowFilter(prev=>!prev)
  // }
  return (
    <>
    <div className="">
      <SeaarchHeader searchHandler={searchHandler}/>
      <>
      {/* <div className="px-[1.5rem] mt-[2rem] text-[#2D2C3C]">    
        <h1 className="text-[1.3rem] flex items-center gap-[0.5rem]">Filter <FaSliders className="text-[1.3rem] md:hidden" onClick={filterHandler}/></h1>
      </div> */}
      <div className="md:px-12 flex gap-[2rem]">
        {/* <Filter showFilter={showFilter}/> */}
        {/* <div className="h-[130vh] border-[0.1px] border-[#d1d5db] md:hidden"></div> */}
        
         <div className="mt-[2rem] flex flex-wrap justify-center gap-[2rem] md:gap-[1rem] sm:gap-0 mx-auto">
         {isLoading && <div className="mt-[2rem] flex flex-wrap justify-center gap-[2rem] md:gap-[1rem] sm:gap-0">
       {placeholder.map((_,index)=>{
        return  <Skeleton variant="rectangular" width={380} height={200} key={index} />
       })}
      </div>}
            {event.events.map((data, index) => {
              return (
                <EventCard event={data} key={index} />
              );
            })}
          </div>
      </div>
      </>
      {event.currentPage !== event.totalPages && <button disabled={isLoading} className="bg-[#3557c2] rounded w-[90%] sm:w-4/5 mx-auto grid py-2 text-white my-10 capitalize md:py-4 text-center disabled:cursor-not-allowed" onClick={getMoreEventHandle}>see more</button> }
    </div>
    <div>
    </div>
    </>
  );
}
