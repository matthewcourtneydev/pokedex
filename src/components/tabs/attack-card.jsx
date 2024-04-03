import { React, useEffect, useState } from "react";
import { TbSettingsDollar } from "react-icons/tb";

const AttackCard = (props) => {
  const [isLoaded, setLoaded] = useState(false);
  const [currentMove, setCurrentMove] = useState(null);

  async function getMoveData() {
    const data = await fetch(props.move.move.url);
    return data.json();
  }

  useEffect(() => {
    getMoveData().then((data) => {
      setCurrentMove((prev) => {
        return data;
      });

      console.log(currentMove);
    });
  }, []);

  useEffect(() => {
    console.log(currentMove);
  }, [currentMove]);

  return (
    <>
      {currentMove && (
        <div className="attack-card">
          <h3>{currentMove.name.charAt(0).toUpperCase() + currentMove.name.slice(1)}</h3>
          <div className="attack-types">
            <div className={`attack-type ${currentMove.type.name}`}>{currentMove.type.name}</div>
          </div>
          <div className="attack-stats">
            <div className="stat-headers">
              <div className="stat-header">Pwr</div>
              <div className="stat-header">Acc</div>
              <div className="stat-header">PP</div>
            </div>
            <div className="stat-values dark-text">
              <div className="stat-value">{currentMove.power || 0}</div>
              <div className="stat-value">{currentMove.accuracy || "??"}</div>
              <div className="stat-value">{currentMove.pp || 0}</div>
            </div>
          </div>
        </div>
      )}
      {!currentMove && <h1>Loading</h1>}
    </>
  );
};

export default AttackCard;
