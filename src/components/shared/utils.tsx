import { ReactNode } from "react";

type SpacerProps = {
  height?: number;
};

type TextProps = {
  text: string;
};

type IconProps = {
  icon: ReactNode;
  label: string;
  size?: number;
};

export const Spacer = ({ height = 10 }: SpacerProps) => {
  return <div style={{ height: height }} className={` w-full`}></div>;
};

export const Heading = ({ text }: TextProps) => {
  return <span className="font-black text-2xl md:text-4xl">{text}</span>;
};

export const Title = ({ text }: TextProps) => {
  return <span className="font-bold text-sm md:text-3xl">{text}</span>;
};

export const IconLabel = ({ icon: Icon, label }: IconProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {Icon}
      <Spacer />
      <span className="text-xs text-center">{label}</span>
    </div>
  );
};
