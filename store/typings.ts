export type AssetItem = {
  isOtherChains: boolean;
  imgSrc: string;
  symbol: string;
  name: string;
  tokenAmount: string;
  tokenAmountPrice: string;
  onDeposit: () => any
  onWithdraw: () => any
};

export type AssetListState = {
  currentAssetList: Array<AssetItem>;
};
export type AddAssetAction = { type: string; payload: AssetItem };
export enum ASSET_ACTION_TYPE {
  ADD = "add",
}
