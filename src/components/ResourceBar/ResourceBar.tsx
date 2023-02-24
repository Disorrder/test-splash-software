import styles from "./ResourceBar.module.scss";
import ResourceItem from "./ResourceItem";

interface Props {
  className?: string;
}

export default function ResourceBar(props: Props) {
  return (
    <div className={[styles.ResourceBar, props.className].join(" ")}>
      <ResourceItem variant="gold" value={1200} />
      <ResourceItem variant="energy" value={1200} />
      <ResourceItem variant="health" value={13} />
    </div>
  );
}
