/**
 * Circuit is a class that represents a quantum circuit.
 */
import Gate from "./Gate.js";
import { game } from "../main.js";

const DISTANCE = 3;
const OFFSET = 0.5;

export default class Circuit {
  /**
   * Constructs a new Circuit instance.
   * @param {Array} qubits - The qubits in the circuit.
   */
  constructor(qubits) {
    this.qubits = qubits;
    this.currentSlotnumber = 0;
  }

  /**
   * Applies a gate to the specified target qubits in the circuit.
   * @param {Object} gate - The gate to apply.
   * @param {number} slotnumber - The slot number for the gate.
   * @param {number} qubitIndex - The index of the target qubit.
   */
  applyGate(gate, qubitIndex, slotnumber = this.currentSlotnumber) {
    console.log(
      `Apply ${gate.gateType} on qubit ${qubitIndex} in slotnumber ${slotnumber}`
    );
    if (qubitIndex < this.qubits.length && qubitIndex >= 0) {
      const qubit = this.qubits[qubitIndex];
      qubit.addGate(gate, slotnumber);
      this.currentSlotnumber = slotnumber + 1;
      this.render();
      return true;
    }
    return false;
  }

  destroyGate(gateType, qubitIndex, slotnumber) {
    var gateIsRemoved = false;
    if (qubitIndex < this.qubits.length && qubitIndex >= 0) {
      const qubit = this.qubits[qubitIndex];
      gateIsRemoved = qubit.removeGate(gateType, slotnumber);
      if (gateIsRemoved) {
        this.lowerSlotnumbers(slotnumber);
        this.currentSlotnumber -= 1;
        this.render();
      }
    }
    return gateIsRemoved;
  }

  lowerSlotnumbers(fromSlotnumber) {
    this.qubits.forEach((qubit) => {
      qubit.lowerSlotnumber(fromSlotnumber);
    });
  }

  /**
   * Applies a CNOT gate to the specified control and target qubits in the circuit.
   * @param {number} controlQubitIndex - The index of the control qubit.
   * @param {number} notQubitIndex - The index of the target qubit.
   * @param {number} slotnumber - The slot number for the gate.
   */
  applyCNOT(controlQubitIndex, notQubitIndex, slotnumber = this.currentSlotnumber) {
    // Set the control
    var controlGate = new Gate("cnot");
    controlGate.varient = "control";
    if (controlQubitIndex > notQubitIndex) {
      controlGate.flipped = true;
    }
    this.applyGate(controlGate, controlQubitIndex, slotnumber);

    // Set the not
    var notGate = new Gate("cnot");
    notGate.varient = "not";
    if (controlQubitIndex > notQubitIndex) {
      notGate.flipped = true;
    }
    this.applyGate(notGate, notQubitIndex, slotnumber);

    // Render the middle connection parts
    if (Math.abs(notQubitIndex - controlQubitIndex) > 1) {
      var lowValue =
        controlQubitIndex < notQubitIndex ? controlQubitIndex : notQubitIndex;
      var highValue =
        controlQubitIndex > notQubitIndex ? controlQubitIndex : notQubitIndex;
      for (var i = lowValue + 1; i < highValue; i++) {
        var middleGate = new Gate("cnot");
        middleGate.varient = "middle";
        this.applyGate(middleGate, i, slotnumber);
      }
    }
  }

  addMeassure() {
    const slotnumber = this.currentSlotnumber;
    console.log("Slotnumber " + slotnumber);
    this.qubits.forEach((qubit) => {
      qubit.addGate(new Gate("measure"), slotnumber);
    });
    this.currentSlotnumber = slotnumber + 1;
  }

  clear() {
    this.qubits.forEach((qubit) => {
      qubit.clear();
    });
    this.currentSlotnumber = 0;
  }

  /**
   * Renders the quantum circuit.
   */
  render() {
    console.log("Start circuit render");
    console.log(this);
    var qubitsHTML = "";
    this.qubits.forEach((qubit) => {
      qubitsHTML += qubit.getHTML(OFFSET, DISTANCE);
    });
    document.getElementById("circuit-container").innerHTML = qubitsHTML;
    // Add event listeners
    const qubits = document.getElementsByClassName("qubit-row");
    for (const qubit of qubits) {
      qubit.addEventListener("dragover", allowDrop);
      qubit.addEventListener("drop", drop.bind(this));
    }
    console.log("Circuit rendered:");
  }

  to_cQASM() {
    const gates = Array.apply(null, Array(this.currentSlotnumber)).map(function () {})
    // const gates = []
    console.log("In cQASM:")
    console.log(gates)
    this.qubits.forEach(qubit => {
      qubit.appliedGates.forEach(gate => {
        console.log(gate)
        if(gate.gateType != "cnot")
          gates[gate.slotnumber] = {"qubitIndex": qubit.index, "gate": gate}
        else{
          if(gates[gate.slotnumber] !== undefined) {
            console.log("Yes i come here as "+gate.varient)
            if(gate.varient === "not")
              gates[gate.slotnumber].gate[gate.varient] = qubit.index
            else if(gate.varient === "control")
              gates[gate.slotnumber].gate[gate.varient] = qubit.index

          }else {
            console.log("CNOTGate")
            console.log(gate)
            const cnotGate = new Gate("cnot", gate.slotnumber)
            cnotGate[gate.varient] = qubit.index
            gates[gate.slotnumber] = {"qubitIndex": qubit.index, "gate": cnotGate}

          }
        }
      });
    });
    var cQASM = `version 1.0\nqubits ${this.qubits.length}\n`
    gates.forEach(gate => {
      cQASM += `${gate.gate.to_cQASM(gate.qubitIndex)}\n`
    })
    console.log(gates)
    console.log(cQASM)
    console.log("Out cQASM")
    return cQASM
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}
function drop(ev) {
  ev.preventDefault();
  var incorrectDrop = false;
  var cardType = ev.dataTransfer.getData("cardType");
  var cardIndex = ev.dataTransfer.getData("cardIndex");
  var qubitNumber = ev.target.id;
  var targetSlotnumber = undefined;
  if (qubitNumber[0] !== "q") qubitNumber = ev.target.parentNode.id;
  if (qubitNumber[0] !== "q") qubitNumber = ev.target.parentNode.parentNode.id;
  if (qubitNumber[0] !== "q") incorrectDrop = true;
  if (cardType === "destroy") {
    if (ev.target.attributes.slotnumber !== undefined) {
      targetSlotnumber = ev.target.attributes.slotnumber.value;
    } else {
      incorrectDrop = true;
    }
  }

  game.currentPlayer.playCard(
    cardIndex,
    this,
    parseInt(qubitNumber[1]),
    targetSlotnumber
  );

  // if (cardType === "measure") {
  //   console.log("Measurement Card Dropped. Measuring circuit after turn")
  // } else {
  //   var qubitNumber = ev.target.id
  //   if(qubitNumber[0] !== "q")
  //     qubitNumber = ev.target.parentNode.id
  //     if(qubitNumber[0] !== "q")
  //       qubitNumber = ev.target.parentNode.parentNode.id
  //   var gateType = ev.dataTransfer.getData("gateType")
  //   if(cardType === "gate") {
  //     this.applyGate(new Gate(gateType), this.currentSlotnumber, parseInt(qubitNumber[1]))
  //   } else if(cardType === "destroy") {
  //     console.log("In destroy")
  //     if(ev.target.attributes.slotnumber !== undefined){
  //       var targetSlotnumber = ev.target.attributes.slotnumber.value
  //       console.log(`Target slotnumber ${targetSlotnumber}`)
  //       this.destroyGate(gateType, parseInt(qubitNumber[1]), targetSlotnumber)
  //     }else {
  //       console.log("Incorrect destroy move")
  //       incorrectDrop = true
  //     }
  //   }
  // }
}
