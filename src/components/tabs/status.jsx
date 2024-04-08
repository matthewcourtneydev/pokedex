import React from "react";

const Status = (props) => {
  console.log(props.stats);

  function getNameAbrv(name) {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "ATK";
      case "defense":
        return "DEF";
      case "special-attack":
        return "SPK";
      case "special-defense":
        return "ADEF";
      case "speed":
        return "SPD";
    }
  }

  function getStatMax(stat) {
    return stat > 100 ? "100%" : `${stat - 3}%`;
  }
  return (
      <div className="wrapper">
        {props.stats.map((stat) => {
          return (
            <div className="stat">
             <span className="stat-name dark-text">{getNameAbrv(stat.stat.name)}</span>
              <div className="progress-outter">
                <div
                  className={`${stat.stat.name} progress-bar`}
                  style={{ width: getStatMax(stat.base_stat) }}
                >
                </div>
                <span>{stat.base_stat}</span>
              </div>
            </div>
          );
        })}
      </div>

  );
};

export default Status;
