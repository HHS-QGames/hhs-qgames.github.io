export default class GameSettings {
  constructor(
    qubitCount = 4,
    startingHandSize = 11,
    hadamardCountPP = 4,
    pauli_xCountPP = 3,
    pauli_yCountPP = 3,
    pauli_zCountPP = 3,
    prep_xCountPP = 3,
    prep_yCountPP = 3,
    prep_zCountPP = 3,
    cnotCountPP = 3,
    measureCountPP = 3,
    destroyPerGateCount = 0.2,
    totalCardMultiplier = 15
  ) {
    this.qubitCount = qubitCount;
    this.startingHandSize = startingHandSize;
    this.hadamardCountPP = hadamardCountPP;
    this.pauli_xCountPP = pauli_xCountPP;
    this.pauli_yCountPP = pauli_yCountPP;
    this.pauli_zCountPP = pauli_zCountPP;
    this.prep_xCountPP = prep_xCountPP;
    this.prep_yCountPP = prep_yCountPP;
    this.prep_zCountPP = prep_zCountPP;
    this.cnotCountPP = cnotCountPP;
    this.measureCountPP = measureCountPP;
    this.destroyPerGateCount = destroyPerGateCount;
    this.totalCardMultiplier = totalCardMultiplier;
  }
}
