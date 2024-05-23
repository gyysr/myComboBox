import { AssetListState, AddAssetAction, ASSET_ACTION_TYPE } from "./typings";

const countReducer = (state: AssetListState, action: AddAssetAction) => {
  switch (action.type) {
    case ASSET_ACTION_TYPE.ADD:
      const temp = [...state.currentAssetList];
      if (action.payload) temp.push(action.payload);
      return { currentAssetList: temp };
    default:
      return state;
  }
};

export default countReducer;
