import { ButtonInterface } from "@/interfaces/button.interface";
import Button from "../Button/Button";

const BtnExp = ({ text, linkTo, primary }: ButtonInterface) => {
  return (
    text
      ? <Button text={text} linkTo={linkTo} primary={primary}></Button>
      : null
  );
};

export default BtnExp;
