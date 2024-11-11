export default function getGateIconPath(gateType) {
  switch(gateType) {
    case "hadamard":
      return 'assets\\hadamard-gate.png'
    case "cnot":
      return 'assets\\cnot-gate.png'
    case "pauli-x":
      return 'assets\\pauli-x-gate.png'
    case "pauli-y":
      return 'assets\\pauli-y-gate.png'
    case "pauli-z":
      return 'assets\\pauli-z-gate.png'
    case "prep-x":
      return 'assets\\prep-x-gate.png'
    case "prep-y":
      return 'assets\\prep-y-gate.png'
    case "prep-z":
      return 'assets\\prep-z-gate.png'
    case "measure":
      return 'assets\\measure.png'
    case "cnot-c":
      return 'assets\\cnot-c.png'
    case "cnot-c-flipped":
      return 'assets\\cnot-c-flipped.png'
    case "cnot-not":
      return 'assets\\cnot-not.png'
    case "cnot-not-flipped":
      return 'assets\\cnot-not-flipped.png'
    case "cnot-middle":
      return 'assets\\cnot-middle.png'
    default:
      console.log("Geen asset gevonden voor", gateType)
      
      return ''
  }
}