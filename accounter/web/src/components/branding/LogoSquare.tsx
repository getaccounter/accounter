type Props = {
  className: string;
};
const LogoSquare = (props: Props) => (
  <svg x="0px" y="0px" viewBox="0 0 68 68" xmlSpace="preserve" {...props}>
    <ellipse fill="#272F65" cx={33.8} cy={13.7} rx={11.9} ry={12.5} />
    <ellipse fill="#272F65" cx={14.8} cy={53} rx={11.9} ry={12.5} />
    <ellipse fill="#272F65" cx={52.4} cy={47.1} rx={11.9} ry={12.5} />
    <ellipse
      fill="none"
      stroke="#272F65"
      strokeWidth={5}
      strokeLinecap="round"
      strokeMiterlimit={10}
      cx={31.3}
      cy={37.6}
      rx={22.8}
      ry={23.9}
    />
  </svg>
);

export default LogoSquare;
