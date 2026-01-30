type OwlIconProps = {
  size: number | string;
  color?: string;
  opacity?: number;
};

const OwlIcon = ({
  size,
  color = "white",
  opacity = 1,
}: OwlIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 43349.2 43349.2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity }}
  >
    <path
      fill={color}
      d="M26970.1 19014.4c104.8,86.4 49.7,36.4 156,159.4 285.1,329.7 354.7,604.9 1001.9,871.9 500.2,206.4 1166.1,165 1651.1,-66.1 1660.4,-791.1 852.3,-2776.1 818.5,-3030.9l924.8 -387.7c307.7,865.6 635.8,1562.5 274.2,2684.6 -966.1,2998.4 -5195,2319.1 -5517.8,258.7l691.3 -489.9z
      ..."
    />
  </svg>
);

export default OwlIcon;
