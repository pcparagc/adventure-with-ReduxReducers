const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200,
};

const gameReducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case "gather": {
      return {
        ...state,
        supplies: state.supplies + 15,
        days: state.days + 1,
      };
    }

    case "travel": {
      if (state.supplies - 20 * action.payload < 0) {
        return state;
      } else {
        return {
          ...state,
          supplies: state.supplies - 20 * action.payload,
          distance: state.distance + 10 * action.payload,
          days: state.days + action.payload,
        };
      }
    }

    case "tippedWagon": {
      return {
        ...state,
        supplies: state.supplies - 30,
        days: state.days + 1,
      };
    }
    case "sell": {
      return {
        ...state,
        cash: state.cash+=(action.payload * 0.25),
        supplies: state.supplies-action.payload
      };
    }
    case "buy": {
      return {
        ...state,
        supplies: state.supplies+=(Math.floor(action.payload * 1.67)),
        cash: state.cash-action.payload
      };
    }
    case "theft": {
      if (cash > 1) {
        return {
          ...state,
          cash: state.cash / 2,
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

let wagon = gameReducer(undefined, {});
console.log(wagon);
wagon = gameReducer(wagon, { type: "travel", payload: 1 });
console.log(wagon);
wagon = gameReducer(wagon, { type: "gather" });
console.log(wagon);
wagon = gameReducer(wagon, { type: "tippedWagon" });
console.log(wagon);
wagon = gameReducer(wagon, { type: "sell", payload:50 });
console.log(wagon);
