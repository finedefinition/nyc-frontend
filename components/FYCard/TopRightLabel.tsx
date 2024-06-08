type TopRightLabelProps = {
  yacht_top: boolean;
  yacht_hot_price: boolean;
};

const TopRightLabel = ({ yacht_top, yacht_hot_price }: TopRightLabelProps) => {
  switch (true) {
    case yacht_top && yacht_hot_price:
      return 'top | hop price';
    case yacht_hot_price && !yacht_top:
      return 'hot price';
    case yacht_top && !yacht_hot_price:
      return 'top';
    default:
      return null;
  }
};

export default TopRightLabel;
