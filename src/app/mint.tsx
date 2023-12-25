import { useCmv3 } from "use-cmv3";

import Counter from "@/components/counter/Counter";
import styles from "./page.module.css";

import Phases from "@/components/phases/Phases";
import Image from "next/image";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Mint() {
  const { mint, minting, phases, mintCounter, loading, candyGuard } = useCmv3();

  return (
    <main className={styles.main}>
      <div
        className={`${styles.loading} ${
          loading.candyMachine && styles.loadingActive
        }`}
      >
        <Image
          priority
          alt={"spinner"}
          width={50}
          height={50}
          src={"/spinner.gif"}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.title}>use-cmv3</div>
            <div className={styles.description}>
              Example frontend utilizing the use-cmv3 library
            </div>
          </div>
          <>
            <WalletMultiButtonDynamic />
          </>
        </div>
        <Counter value={mintCounter.sold} maxValue={mintCounter.supply} />
        <Phases>
          {candyGuard &&
            (!loading.phases
              ? phases.map((phase) => (
                  <Phases.Phase
                    key={phase.label}
                    minting={minting == phase.label}
                    phase={phase}
                    onClick={() => mint(phase.label)}
                  />
                ))
              : candyGuard.groups.map((phase) => (
                  <Phases.PhaseSkeleton key={phase.label} title={phase.label} />
                )))}
        </Phases>
      </div>
    </main>
  );
}
