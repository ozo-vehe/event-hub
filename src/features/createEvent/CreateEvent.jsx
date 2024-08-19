import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Progress from "./Progress";
import { useState } from "react";
import CreateEventForm from "./CreateEventForm";
import CreateEventBanner from "./CreateEventBanner";
import TicketType from "./TicketType";
import Review from "./Preview";
import useEvent from "../../hooks/useEvent";

export default function CreateEvent() {
  const [route, setRoute] = useState(0)
  const navigate = useNavigate();
  const eventDetails = useEvent()
  // navigate a step back to the previous route/create form component
  function oneClickBack() {
    // navigate a step back to the previous route
    if(route===0){
      navigate(-1); 
      return
    }
    // navigate a step back to the previous create form component
    setRoute(num => num - 1)
    
  }

  // navigate a step back to the next form component
  function navigateToNextForm() {
    if(route===3) return
    setRoute(num => num + 1)
  }
  return (
    <>
      <section className="px-5 font-openSans max-w-7xl m-auto py-5">
        <div className="inline-flex items-center gap-2 text-xl lg:text-2xl text-[##2D2C3C] font-extrabold">
          <IoIosArrowRoundBack
            color="#2B293D"
            className="text-3xl lg:text-4xl"
            onClick={oneClickBack}
          />
          <h2>Create a New Event</h2>
        </div>
        <div className="px-0 sm:px-9 lg:px-0">
          <Progress route={route}/>
         {route === 0 && <CreateEventForm navigate={navigateToNextForm} navigateBack={oneClickBack}/>}
         {route === 1 && <CreateEventBanner navigate={navigateToNextForm} navigateBack={oneClickBack} />}
         {route === 2 && <TicketType navigate={navigateToNextForm} navigateBack={oneClickBack} />}
         {route === 3 && <Review navigate={navigateToNextForm} navigateBack={oneClickBack} eventDetails={eventDetails} />}
        </div>
      </section>
    </>
  );
}
