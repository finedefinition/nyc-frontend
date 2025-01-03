type TopRightLabelProps = {
  yachtTop: boolean;
  yachtHotPrice: boolean;
};

const TopRightLabel = ({ yachtTop, yachtHotPrice }: TopRightLabelProps) => {
  if (yachtTop && yachtHotPrice) {
    return <>top | hot price</>;
  }

  if (yachtHotPrice) {
    return <>hot price</>;
  }

  if (yachtTop) {
    return <>top</>;
  }

  return null;
};

export default TopRightLabel;
