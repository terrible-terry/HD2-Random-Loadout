/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from "react";
import "./style.css"; // Import the CSS file
import PropTypes from "prop-types";

function EnemyStatBlock({ data }) {
  return (
    <div className="enemy-stat-block" style={{ transform: "scale(0.1)" }}>
      <h2>{data.name}</h2>
      <p>
        <span className="ability">Armor Class:</span> {data["Armor Class"]}
      </p>
      <p>
        <span className="ability">Hit Points:</span> {data["Hit Points"]}
      </p>
      <p>
        <span className="ability">Challenge:</span> {data.Challenge}
      </p>
      <p>
        <span className="ability">Senses:</span> {data.Senses}
      </p>
      <p>
        <span className="ability">Speed:</span> {data.Speed}
      </p>
      <p>
        <span className="ability">Languages:</span> {data.Languages}
      </p>
      <h3>Ability Scores</h3>
      <div className="ability-scores">
        {Object.entries(data).map(([key, value]) => {
          if (key.endsWith("_mod")) {
            const abilityName = key.slice(0, 3).toUpperCase(); // Extract the ability name from the key
            const abilityScore = data[abilityName]; // Get the ability score
            return (
              <div key={key}>
                <p>
                  <span className="ability">{abilityName}:</span> {abilityScore}
                  {value}
                </p>
              </div>
            );
          }
          return null;
        })}
      </div>
      {data.Skills && (
        <p>
          <span className="ability">Skills:</span> {data.Skills}
        </p>
      )}
      {data.Traits && (
        <div>
          <h3>Traits</h3>
          <div dangerouslySetInnerHTML={{ __html: data.Traits }} />{" "}
        </div>
      )}
      {data["Saving Throws"] && (
        <div>
          <h3>Saving Throws</h3>
          {data["Saving Throws"]}
          <div />
        </div>
      )}
      {data["Damage Immunities"] && (
        <div>
          <h3>Damage Immunities</h3>
          {data["Damage Immunities"]}
          <div />
        </div>
      )}
      {data["Condition Immunities"] && (
        <div>
          <h3>Condition Immunities</h3>
          {data["Condition Immunities"]}
          <div />
        </div>
      )}
      {data["Damage Resistances"] && (
        <div>
          <h3>Damage Resistances</h3>
          {data["Damage Resistances"]}
          <div />
        </div>
      )}

      {data.Reactions && (
        <div>
          <h3>Reactions</h3>
          <div dangerouslySetInnerHTML={{ __html: data["Reactions"] }} />{" "}
        </div>
      )}
      {data.Actions && (
        <div>
          <h3>Actions</h3>
          <div dangerouslySetInnerHTML={{ __html: data["Actions"] }} />{" "}
        </div>
      )}
      {data["Legendary Actions"] && (
        <div>
          <h3>Lengendary Actions</h3>
          <div dangerouslySetInnerHTML={{ __html: data["Legendary Actions"] }} />{" "}
        </div>
      )}
    </div>
  );
}
EnemyStatBlock.propTypes = {
  ItemID: PropTypes.string,
};
export default EnemyStatBlock;
