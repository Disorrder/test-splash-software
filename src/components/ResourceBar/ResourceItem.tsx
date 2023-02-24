import { Divider } from "@mui/material";
import Image from "next/image";
import cn from "classnames";

import styles from "./ResourceBar.module.scss";

interface Props {
  variant: "gold" | "energy" | "health";
  value: number;
}

const variants = {
  gold: {
    icon: "/assets/icons/coin.svg",
    alt: "Gold",
  },
  energy: {
    icon: "/assets/icons/energy.svg",
    alt: "Energy",
  },
  health: {
    icon: "/assets/icons/heart.svg",
    alt: "Health",
  },
};

export default function ResourceItem(props: Props) {
  const { value } = props;
  const variant = variants[props.variant];

  const className = cn(styles.ResourceItem, {
    [styles.short as string]: props.variant === "health",
  });

  return (
    <div className={className}>
      <Image
        src={variant.icon}
        alt={variant.alt}
        width={24}
        height={24}
        className={styles.icon}
      />
      <div className={styles.text}>{value}</div>
      <div className={styles.divider} />
      <Divider
        orientation="vertical"
        flexItem
        sx={{ borderColor: "#191241" }}
      />
      <div className={styles.add}>
        <Image
          src="/assets/icons/plus.svg"
          alt={`Buy ${variant.alt}`}
          width={13}
          height={13}
        />
      </div>
    </div>
  );
}
