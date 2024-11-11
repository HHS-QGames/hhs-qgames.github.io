// QuantumOperationCard.js
/**
 * QuantumOperationCard is a class that represents a quantum operation card.
 */
import getGateIconPath from "../util/AssetFinder.js";
import Card from "./Card.js";
export default class QuantumDestroyOperationCard extends Card {
  constructor(gateType, operationData) {
    super({
      type: "destroy",
      gateType: gateType,
      gateIconPath: getGateIconPath(gateType),
    }); // Initialize with parent class constructor
    this.operationData = operationData; // Data for the quantum operation
  }

  /**
   * Applies the quantum operation to a given quantum circuit.
   * @param {Object} circuit - The quantum circuit to apply the operation to.
   * @param {Array} qubits - The qubits to apply the operation to.
   */
  applyOperation(circuit, qubits) {
    const gate = new Gate(this.operationData);
    circuit.applyGate(gate, qubits);
  }
  getHTML() {
    return `<div class="card destroy" draggable="true"><div class="card-title">Destroy</div><img src="${this.cardData.gateIconPath}" class="card-symbol" /><div class="card-description">${this.cardData.gateType}</div></div>`;
  }
}
