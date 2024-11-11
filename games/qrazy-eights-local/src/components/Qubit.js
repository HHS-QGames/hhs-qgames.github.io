/**
 * Qubit is a class that represents a quantum bit.
 */
import getGateIconPath from '../util/AssetFinder.js';

export default class Qubit {
  /**
   * Constructs a new Qubit instance.
   * @param {number} index - The index of the qubit.
   */
  constructor(index) {
    this.index = index;
    this.appliedGates = [];
  }

  /**
   * Adds a gate to the qubit.
   * @param {Object} gate - The gate to add.
   * @param {number} slotnumber - The slot number for the gate.
   */
  addGate(gate, slotnumber) {
    gate.slotnumber = slotnumber;
    this.appliedGates.push(gate);
  }

  removeGate(gateType, slotnumber) {
    for (let i = 0; i < this.appliedGates.length; i++) {
      const gate = this.appliedGates[i];
      if((gate.slotnumber==slotnumber) && (gate.gateType == gateType)){
        this.appliedGates.splice(i, 1)
        console.log("Gate removed")
        return true
      }
    }
    console.log("Gate not found")
    return false
  }
  clear() {
    this.appliedGates = []
  }
  lowerSlotnumber(fromSlotnumber) {
    this.appliedGates.forEach(gate => {
      if(gate.slotnumber >= fromSlotnumber)
        gate.slotnumber = gate.slotnumber - 1
    });
  }
  /**
   * Generates the HTML representation of the qubit.
   * @param {number} offset - The offset for gate positioning.
   * @param {number} distance - The distance between gates.
   * @returns {string} The HTML code for the qubit.
   */
  getHTML(offset, distance) {
    let gatesHTML = "";
    this.appliedGates.forEach(gate => {
      switch (gate.gateType) {
        case "hadamard":
        case "pauli-x":
        case "pauli-y":
        case "pauli-z":
        case "prep-x":
        case "prep-y":
        case "prep-z":
          gatesHTML += `<image class="image" slotnumber="${gate.slotnumber}" gateType="${gate.gateType}" xlink:href="${getGateIconPath(gate.gateType)}" x="${offset + (distance * gate.slotnumber)}" y="-12" width="2" height="25" />`;
          break;
        case "measure":
          console.log("Get qubit html measure")
          console.log(gate)
          gatesHTML += `<image class="image" slotnumber="${gate.slotnumber}" gateType="measure" xlink:href="${getGateIconPath("measure")}" x="${offset + (distance * gate.slotnumber)}" y="-12" width="2" height="25" />`;
          break;
        case "cnot":
          switch (gate.varient) {
            case "not":
              if (gate.flipped) {
                gatesHTML += `<image class="image" xlink:href="${getGateIconPath("cnot-not-flipped")}" x="${offset + (distance * gate.slotnumber)}" y="-10.3" width="2" height="25" />`;
              } else {
                gatesHTML += `<image class="image" xlink:href="${getGateIconPath("cnot-not")}" x="${offset + (distance * gate.slotnumber)}" y="-11.2" width="2" height="20" />`;
              }
              break;
            case "middle":
              gatesHTML += `<image class="image" xlink:href="${getGateIconPath("cnot-middle")}" x="${offset + (distance * gate.slotnumber)}" y="-12" width="2" height="25" />`;
              break;
            case "control":
              if (gate.flipped) {
                gatesHTML += `<image class="image" xlink:href="${getGateIconPath("cnot-c-flipped")}" x="${offset + (distance * gate.slotnumber)}" y="-13.9" width="2" height="25" />`;
              } else {
                gatesHTML += `<image class="image" xlink:href="${getGateIconPath("cnot-c")}" x="${offset + (distance * gate.slotnumber)}" y="-7.5" width="2" height="20" />`;
              }
              break;
          }
          break;
      }
    });

    const qubitHTML = `
    <div id="q${this.index}" class="qubit-row">
      <div>q[${this.index}]</div>
      <svg class="qubit-row-line" xmlns="http://www.w3.org/2000/svg" height="150%" viewBox="0 0 100 1">
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="black" stroke-width="0.05"/>
        ${gatesHTML}
      </svg>
    </div>`;

    return qubitHTML;
  }
}
