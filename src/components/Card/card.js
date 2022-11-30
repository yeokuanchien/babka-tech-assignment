import "./card.css";
import { icons } from "../../assets/icons";
import { useEffect, useState } from "react";
function Card(props) {
  const { eventItem } = props;

  const [isFavourited, setIsFavourited] = useState(false);

  useEffect(() => {
    const isFav = localStorage.getItem(eventItem.id);
    console.log(isFav);
    setIsFavourited(isFav);
  }, [eventItem.id]);

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${eventItem.image})`,
        width: "600px",
        height: "400px",
      }}
    >
      <div className="card-container">
        <div className="top-container">
          <div className="date-container">
            <span className="date-text">{eventItem.date.getDate()}</span>
          </div>
          <span
            onClick={() => {
              setIsFavourited(!isFavourited);

              !isFavourited === true
                ? localStorage.setItem(eventItem.id, { favourited: true })
                : localStorage.removeItem(eventItem.id);
            }}
          >
            {isFavourited ? icons.favourited : icons.unfavourited}
          </span>
        </div>

        <div className="event-name-text">{eventItem.name}</div>
      </div>
    </div>
  );
}

export default Card;
