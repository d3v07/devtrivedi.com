import { useState } from "react";
import MiniWindow from "./MiniWindow";

type Op = "+" | "−" | "×" | "÷" | null;

export default function CalculatorApp({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState("0");
  const [operand, setOperand] = useState<number | null>(null);
  const [op, setOp] = useState<Op>(null);
  const [fresh, setFresh] = useState(true);

  const compute = (a: number, b: number, operator: Op): number => {
    switch (operator) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default:  return b;
    }
  };

  const inputDigit = (d: string) => {
    if (fresh) { setDisplay(d); setFresh(false); }
    else setDisplay(display.length < 12 ? (display === "0" ? d : display + d) : display);
  };

  const inputDot = () => {
    if (fresh) { setDisplay("0."); setFresh(false); return; }
    if (!display.includes(".")) setDisplay(display + ".");
  };

  const handleOp = (nextOp: Op) => {
    const current = parseFloat(display);
    if (operand !== null && !fresh) {
      const result = compute(operand, current, op);
      const str = parseFloat(result.toFixed(10)).toString();
      setDisplay(str);
      setOperand(parseFloat(str));
    } else {
      setOperand(current);
    }
    setOp(nextOp);
    setFresh(true);
  };

  const handleEquals = () => {
    if (operand === null || op === null) return;
    const result = compute(operand, parseFloat(display), op);
    setDisplay(parseFloat(result.toFixed(10)).toString());
    setOperand(null);
    setOp(null);
    setFresh(true);
  };

  const handleAC  = () => { setDisplay("0"); setOperand(null); setOp(null); setFresh(true); };
  const handleNeg = () => { if (display !== "0") setDisplay(String(-parseFloat(display))); };
  const handlePct = () => setDisplay(String(parseFloat(display) / 100));

  type BtnStyle = "num" | "op" | "func" | "eq";

  const Btn = ({
    label, onClick, col = 1, style = "num",
  }: {
    label: string; onClick: () => void; col?: number; style?: BtnStyle;
  }) => {
    const base = "flex items-center justify-center font-mono-code h-12 transition-all duration-75 active:scale-95 select-none";
    const variants: Record<BtnStyle, string> = {
      num:  "text-base font-medium bg-card text-foreground hover:bg-foreground hover:text-background",
      op:   "text-base font-bold bg-primary text-primary-foreground hover:opacity-90",
      func: "text-sm bg-foreground/10 text-foreground/70 hover:bg-foreground hover:text-background",
      eq:   "text-base font-bold bg-primary text-primary-foreground hover:opacity-90",
    };
    return (
      <button
        onClick={onClick}
        className={`${base} ${variants[style]} ${col === 2 ? "col-span-2" : ""}`}
      >
        {label}
      </button>
    );
  };

  return (
    <MiniWindow
      title="calculator.exe"
      onClose={onClose}
      initialX={180}
      initialY={90}
      width={264}
      height={368}
    >
      {/* Display */}
      <div className="px-4 pt-4 pb-3 bg-foreground text-background shrink-0">
        <div className="font-mono-code text-[11px] text-background/40 h-4 text-right truncate">
          {operand !== null ? `${operand} ${op ?? ""}` : "\u00a0"}
        </div>
        <div className="font-mono-code text-4xl text-right leading-tight tracking-tight truncate mt-1">
          {display}
        </div>
      </div>

      {/* Button grid — gap-px + bg creates the grid lines */}
      <div className="grid grid-cols-4 gap-px bg-foreground flex-1">
        <Btn label="AC"  onClick={handleAC}              style="func" />
        <Btn label="+/−" onClick={handleNeg}             style="func" />
        <Btn label="%"   onClick={handlePct}             style="func" />
        <Btn label="÷"   onClick={() => handleOp("÷")}  style="op"   />
        <Btn label="7"   onClick={() => inputDigit("7")} />
        <Btn label="8"   onClick={() => inputDigit("8")} />
        <Btn label="9"   onClick={() => inputDigit("9")} />
        <Btn label="×"   onClick={() => handleOp("×")}  style="op"   />
        <Btn label="4"   onClick={() => inputDigit("4")} />
        <Btn label="5"   onClick={() => inputDigit("5")} />
        <Btn label="6"   onClick={() => inputDigit("6")} />
        <Btn label="−"   onClick={() => handleOp("−")}  style="op"   />
        <Btn label="1"   onClick={() => inputDigit("1")} />
        <Btn label="2"   onClick={() => inputDigit("2")} />
        <Btn label="3"   onClick={() => inputDigit("3")} />
        <Btn label="+"   onClick={() => handleOp("+")}  style="op"   />
        <Btn label="0"   onClick={() => inputDigit("0")} col={2} />
        <Btn label="."   onClick={inputDot} />
        <Btn label="="   onClick={handleEquals}         style="eq"   />
      </div>
    </MiniWindow>
  );
}
