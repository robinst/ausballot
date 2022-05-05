import { createRef, FunctionalComponent, h } from "preact";
import style from "./style.css";
import SelectElectorate from "../../components/select-electorate";
import HouseBallot from "../../components/ballots/house";
import { useEffect } from "preact/hooks";

interface Props {
  state: string;
  division: string;
}

const Electorate: FunctionalComponent<Props> = (props: Props) => {
  const { state, division } = props;

  const ref = createRef();

  useEffect(() => {
    let timeout: number;
    let lastLeft = 0;
    const onScroll = () => {
      window.cancelAnimationFrame(timeout);

      timeout = window.requestAnimationFrame(() => {
        const node = ref.current;
        if (node !== undefined) {
          const contentWidth = node.clientWidth;
          // const offset = window.pageXOffset;
          const innerWidth = window.innerWidth;
          if (innerWidth >= contentWidth) {
            const left = (innerWidth - contentWidth) / 2;
            // if (left >= lastLeft) {
            // node.style.position = "absolute";
            // node.style.left = `${left}px`;
            lastLeft = left;
            // node.scrollIntoView(false);
            // }
            // node.style.right = `${left}px`;
          }
          //window.pageXOffset
          // node.clientWidth
          // node.style.
        }
      });
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // useEffect(() => {
  //   let timeout: number;
  //   let lastUpdate: number;
  //   let scrolled = false;
  //   let interval: number;
  //   const onScroll = () => {
  //     scrolled = true;
  //     // let window.pageXOffset;
  //     // if (timeout && lastUpdate + 1_000_000 < performance.now()) {
  //     //   window.clearTimeout(timeout);
  //     // window.cancelAnimationFrame(timeout);
  //     // }
  //
  //     // window.setIn
  //
  //     // window.setInter
  //
  //     if (!interval) {
  //       interval = window.setInterval(() => {
  //         // lastUpdate = performance.now();
  //         if (!scrolled) {
  //           window.clearTimeout(interval);
  //           interval = 0;
  //           return;
  //         }
  //         scrolled = false;
  //
  //         const node = ref.current;
  //         if (node !== undefined) {
  //           const contentWidth = node.clientWidth;
  //           const offset = window.pageXOffset;
  //           const innerWidth = window.innerWidth;
  //           if (innerWidth >= contentWidth) {
  //             const left = offset + (innerWidth - contentWidth) / 2;
  //             // node.style.position = "absolute";
  //             // node.style.left = `${left}px`;
  //             // node.style.right = `${left}px`;
  //           }
  //           //window.pageXOffset
  //           // node.clientWidth
  //           // node.style.
  //         }
  //       }, 250);
  //     }
  //     //console.log(window.pageXOffset);
  //   };
  //   // clean up code
  //   window.removeEventListener("scroll", onScroll);
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  return (
    <div>
      <div class={style.electorate} ref={ref}>
        <SelectElectorate selectedValue={`${state}/${division}`} />
        <h2>House ballot for {division}</h2>

        <HouseBallot state={state} division={division} />

        <h2>Senate ballot for {state}</h2>
        <p>TODO: Render ballots here</p>
      </div>
      <div class={style.stretcher} />
    </div>
  );
};

export default Electorate;
