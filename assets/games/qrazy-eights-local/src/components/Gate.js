/**
 * Gate is a class that represents a quantum gate.
 */
export default class Gate {
  /**
   * Constructs a new Gate instance.
   * @param {string} gateType - The type of the quantum gate (e.g., "hadamard", "pauli-x", "pauli-y", "pauli-z", "cnot", "measure").
   */
  constructor(gateType, slotnumber = null) {
    this.gateType = gateType;
    this.slotnumber = slotnumber;
    this.varient = null;
    this.flipped = false;
  }

  to_cQASM(qubitIndex) {
    switch(this.gateType) {
      case "hadamard":
        return `H q[${qubitIndex}]`
      case "pauli-x":
        return `X q[${qubitIndex}]`
      case "pauli-y":
        return `Y q[${qubitIndex}]`
      case "pauli-z":
        return `Z q[${qubitIndex}]`
      case "prep-x":
        return `PREP_X q[${qubitIndex}]`
      case "prep-y":
        return `PREP_Y q[${qubitIndex}]`
      case "prep-z":
        return `PREP_Z q[${qubitIndex}]`
      case "measure":
        return `MEASURE_ALL`
      case "cnot":
        return `CNOT q[${this.control}], q[${this.not}]`
    }
  }
}
