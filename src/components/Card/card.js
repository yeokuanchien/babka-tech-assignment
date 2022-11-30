import "./card.css";

function Card(props) {
  const { eventItem } = props;
  return (
    <div
      style={{
        backgroundImage: `url(${eventItem.image})`,
        width: "600px",
        height: "400px",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          padding: "40px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="top-container">
          <div className="date-container">
            <span className="date-text">{eventItem.date.getDate()}</span>
          </div>
          <span>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19L8 14L1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19Z"
                fill="white"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>

        <div className="event-name-text">{eventItem.name}</div>
      </div>
    </div>
  );
}

export default Card;
