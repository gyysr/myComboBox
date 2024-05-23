import {
  Divider,
  ChangeChainCombobox,
  AssetList,
  Button,
  BasicModal,
  Text,
} from "@interchain-ui/react";
// import { Layout, Wallet } from "@/components";
import { useState, useReducer } from "react";
import { assets } from "chain-registry";
import { ASSET_ACTION_TYPE, AssetListState } from "../store/typings";
import addAssetReducer from "../store/addAssetReducer";

const symbols = ["ATOM", "JUNO", "STARS", "BLD", "STRD", "CRO", "AKT", "MARS"];

const dropdownList = symbols.map((symbol) => {
  const asset = assets.find(
    (assetList) => assetList.assets[0].symbol === symbol
  )!.assets[0];

  return {
    iconUrl:
      asset.logo_URIs?.png || asset.logo_URIs?.jpeg || asset.logo_URIs?.svg,
    label: asset.symbol,
    value: asset.name,
  };
});
const initialState: AssetListState = {
  currentAssetList: [
    {
      isOtherChains: false,
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      symbol: "ATOM",
      name: "Cosmos Hub",
      tokenAmount: "89.66",
      tokenAmountPrice: "10",
      onDeposit: () => {
        console.log("onDeposit");
      },
      onWithdraw: () => {
        console.log("onWithdraw");
      },
    },
    {
      isOtherChains: false,
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      symbol: "OSMO",
      name: "Osmosis",
      tokenAmount: "102.61",
      tokenAmountPrice: "101.02",
      onDeposit: () => {
        console.log("onDeposit");
      },
      onWithdraw: () => {
        console.log("onWithdraw");
      },
    },
  ],
};
function Demo() {
  const [assetState, dispatch] = useReducer(
    addAssetReducer,
    initialState as AssetListState
  );
  const { currentAssetList } = assetState;
  const [selectedChain, setSelectedChain] = useState<{
    iconUrl?: string;
    label: string;
    value: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleModalConfirm = () => {
    if (selectedChain) {
      const tempAssetItem = {
        isOtherChains: false,
        imgSrc: selectedChain?.iconUrl as string,
        symbol: selectedChain?.value as string,
        name: selectedChain?.label as string,
        tokenAmount: "102.61",
        tokenAmountPrice: "101.02",
        onDeposit: () => {
          console.log("onDeposit");
        },
        onWithdraw: () => {
          console.log("onWithdraw");
        },
      };
      dispatch({ type: ASSET_ACTION_TYPE.ADD, payload: tempAssetItem });
    }
    setSelectedChain(null);
    setIsOpen(false);
  };
  return (
    <div style={{ marginTop: "50px",width:'80%',margin:'50px auto'}}>
      <Text
        as="h1"
        fontWeight="$extrabold"
        fontSize={{ mobile: "$4xl", tablet: "$6xl" }}
        attributes={{
          marginBottom: "$4",
        }}
      >
        Demo
      </Text>
      <AssetList needChainSpace isOtherChains={false} list={currentAssetList} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px 0",
        }}
      >
        <BasicModal
          renderTrigger={(triggerProps) => (
            <Button {...triggerProps} onClick={() => setIsOpen(true)}>
              Add Asset
            </Button>
          )}
          isOpen={isOpen}
          title="Add Asset"
          onClose={() => setIsOpen(false)}
        >
          <div style={{ minWidth: "500px", minHeight: "500px" }}>
            <ChangeChainCombobox
              size="md"
              valueItem={selectedChain ? selectedChain : undefined}
              appearance="bold"
              onItemSelected={(item) => {
                console.log("Selected Item", item);
                setSelectedChain(item);
              }}
              options={dropdownList}
            />
          </div>

          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Button onClick={handleModalConfirm}>Confirm</Button>
          </div>
        </BasicModal>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    // <Layout>
    <Demo />
    // <Wallet />
    // <Divider mb="$16" />
    // </Layout>
  );
}
