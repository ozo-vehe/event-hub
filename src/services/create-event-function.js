import { END_POINT } from "../config/environment";

export const createEventFn = async (eventDetails,file,navigate,token,setIsLoading) => {
  setIsLoading(true)
    const formData = new FormData();

    var body = {
      title: eventDetails.title.name,
      orgName: eventDetails.orgName.name,
      orgEmail: eventDetails.orgEmail.Email,
      imageUrl: file,
      category: eventDetails.category,
      location: eventDetails.location,
      date: eventDetails.session[0].startDate.date,
      startTime: eventDetails.session[0].startTime.time,
      endTime: eventDetails.session[0].endTime.time,
      description: eventDetails.description.detail,
      organizer: [
        {
          name: eventDetails.orgName.name,
          email: eventDetails.orgEmail.Email,
          contact: eventDetails.orgContact.contact,
        },
      ],
    };



    formData.append("title", body.title);
    formData.append("image", body.imageUrl);
    formData.append("category", body.category);
    formData.append("location", body.location.name);
    formData.append("date", body.date);
    formData.append("startTime", body.startTime);
    formData.append("endTime", body.endTime);
    formData.append("description", body.description);
    formData.append("organizer", JSON.stringify(body.organizer));


    if (token) {
      // Verify token on the backend
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", token);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: formData,
      };
      await fetch(`${END_POINT.BASE_URL}/event/create-event`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            console.log("event success", result.data);
            navigate("/")
          } else {
            console.log("error", result.message);
          }
          setIsLoading(false)
        })
        .catch((error) => {
          console.log("error", error);
          setIsLoading(false)
        });
    }
  };