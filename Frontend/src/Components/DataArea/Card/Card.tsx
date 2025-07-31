import { useEffect, useState } from "react";
import FollowerModel from "../../../Models/FollowerModel";
import VacationModel from "../../../Models/VacationsModel";
import { authStore } from "../../../Redux/AuthState";
import followersService from "../../../Services/FollowersService";
import { decodeToken } from "../../../Utils/TokenUtils";
import "./Card.css";
import followImage from "../../../Assets/Images/Icons/follow-button.png";
import unfollowImage from "../../../Assets/Images/Icons/unfollow-button.png";
import calendarImage from "../../../Assets/Images/Icons/calendar-icon.jpeg";

// Define the props interface for the Card component
interface CardProps {
  vacation: VacationModel;  
}

// Functional component to render a card for a vacation
function Card(props: CardProps): JSX.Element {
  // State to track loading status and various details
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [userId, setUserId] = useState<number>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const [followButtonClassName, setFollowButtonClassName] = useState<string>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [followImageSrc, setFollowImageSrc] = useState(followImage);

  // Toggle the description expansion state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Get the user token from the Redux store
  const token = authStore.getState().token;

  // Effect to fetch and update follower information on component mount and when vacation ID changes
  useEffect(() => {
    const decodedToken = decodeToken(token);
    const userId = decodedToken.user.userId;
    setUserId(userId);

    if (props.vacation.vacationId) {
      followersService
        .getFollowersByVacationId(props.vacation.vacationId)
        .then((count) => {
          setFollowersCount(count);
        })
        .catch((error) => {
          console.error(error);
        });

      // Check if the user is already following the vacation
      followersService
        .isFollowing(userId, props.vacation.vacationId)
        .then((isFollowing) => {
          setIsFollowing(isFollowing);
          setFollowButtonClassName(isFollowing ? "follow-button" : "unfollow-button");
          setFollowImageSrc(isFollowing ? followImage : unfollowImage);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.vacation.vacationId]);

  // Function to format a date in the required format
  function getFormattedDate(oldDate: string): string {
    const date = new Date(oldDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  // Function to handle the follow/unfollow action
  const handleFollow = async () => {
    const follower: FollowerModel = {
      followerId: userId,
      userId: userId,
      vacationId: props.vacation.vacationId,
    };

    try {
      // Add or remove follower based on the current following status
      await followersService.addFollower(follower);
      const newFollowersCount = await followersService.getFollowersByVacationId(follower.vacationId);

      setFollowersCount(newFollowersCount);

      const newIsFollowing = !isFollowing;
      setIsFollowing(newIsFollowing);

      setFollowButtonClassName(newIsFollowing ? "follow-button" : "unfollow-button");
      setFollowImageSrc(newIsFollowing ? followImage : unfollowImage);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CardContainer">
      <div className="Card">

        <div className="card-image-container">
          <img src={props.vacation.imageUrl} alt={props.vacation.destination} />
          {/* Follow/Unfollow Button */}
          <button onClick={handleFollow} className={followButtonClassName}>
            <img src={followImageSrc} alt="Follow" className="heart-image"></img>
            <span className="followers-number">{followersCount}</span>
          </button>
          {/* Destination */}
          <span className="destination">{props.vacation.destination}</span>
        </div>

        {/* Vacation Dates Section */}
        <div className="dates-container">
          <img src={calendarImage} alt="Calendar"></img>
          <span className="dates">
            {getFormattedDate(props.vacation.startDate)} -{" "}
            {getFormattedDate(props.vacation.endDate)}
          </span>
        </div>

        {/* Vacation Description Section */}
        <div className="description-container">
          {/* Description Text (with optional Read More/Less button) */}
          <span style={{ whiteSpace: isExpanded ? "normal" : "nowrap" }}>
            {props.vacation.description}
          </span>
          {props.vacation.description.length > 100 && (
            <button className="read-more-button" onClick={toggleExpand}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
        <br />

        {/* Vacation Price Section */}
        <button className="price-button">Price: {props.vacation.price}$</button>
        <br />
      </div>
    </div>
  );
}

export default Card;
