import { FC, useState, memo } from "react";
import { Modal, Space } from "antd";
import { Card, Stat } from "../../components";
import { Pokemon as PokemomProps } from "../../types/pokemons";

import styles from "./Pokemon.module.scss";

export const Pokemon: FC<PokemomProps> = memo(({ name, stats, sprites }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const avatar = sprites.front_default;

  const mainStats = stats.filter(
    ({ stat: { name } }) => !name.includes("special")
  );
  console.log(mainStats);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Card className={styles.wrapper} onClick={openModal}>
        <Space direction="vertical" className={styles.space}>
          <div className={styles.header}>
            <div className={styles.imageWrapper}>
              <img src={avatar} alt="avatar" />
            </div>
            <div className={styles.name}>{name}</div>
          </div>
          <div className={styles.mid}></div>
          <div className={styles.footer}>
            {mainStats.map((mainStat) => (
              <Stat
                key={mainStat.stat.name}
                name={mainStat.stat.name}
                value={mainStat.base_stat}
              />
            ))}
          </div>
        </Space>
      </Card>
      <Modal open={isOpen} onCancel={closeModal} onOk={closeModal}>
        <img src={avatar} alt="avatar" />
        {mainStats.map((mainStat) => (
          <>
            <Stat
              key={mainStat.stat.name}
              name={mainStat.stat.name}
              value={mainStat.base_stat}
            />
          </>
        ))}
      </Modal>
    </>
  );
});
