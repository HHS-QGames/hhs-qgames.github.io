// QuantumComputerAPI.js

/**
 * QuantumComputerAPI is a class that communicates with the API of Quantum Inspire
 * It sends quantum circuits to be executed and gets the result of the measurement.
 *
 * Usage:
 * Instantiate the QuantumComputerAPI class by passing your email and password:
 *
 *   const api = new QuantumComputerAPI('YOUR_EMAIL', 'YOUR_PASSWORD');
 *
 * Call the executeCircuit method with your quantum circuit:
 *
 *   api.executeCircuit('version 1.0\nqubits 2\nprep_z q[0]\nprep_z q[1]\nH q[0]\nCNOT q[0],q[1]\nmeasure q[0]\nmeasure q[1]');
 *
 * Call the getMeasurementResult method to retrieve the results:
 *
 *   const result = api.getMeasurementResult();
 *   console.log(result);
 *
 * Make sure to replace 'YOUR_EMAIL' and 'YOUR_PASSWORD' with your actual email and password.
 *
 */
export default class QuantumComputerAPI {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.BASE_URL = 'https://api.quantum-inspire.com/';
    this.shots = 10;  // can be adjusted according to needs
    this.jobId = null;
  }

  /**
   * Executes a given quantum circuit.
   * @param {Object} circuit - The quantum circuit to be executed.
   * @return {Promise} - Promise object represents jobId of the executed circuit.
   */
  async executeCircuit(circuit) {
    const backendTypeUrl = 'backendtypes/1/';
    const project = await this.makeRequest('projects/', {
        name: 'generatedProject',
        backend_type: this.BASE_URL + backendTypeUrl,
        default_number_of_shots: this.shots
    }, 'POST');

    const asset = await this.makeRequest('assets/', {
        name: 'generatedAsset',
        project: project.url,
        contentType: 'text/plain',
        content: circuit
    }, 'POST');

    const job = await this.makeRequest('jobs/', {
        name: 'generatedJob',
        input: asset.url,
        backend_type: this.BASE_URL + backendTypeUrl,
        number_of_shots: this.shots
    }, 'POST');

    this.jobId = job.id;
    return this.jobId;
  }

  /**
   * Gets the result of the measurement from the API
   * @return {Promise} - Promise object represents the measurement result.
   */
  async getMeasurementResult() {
    if (!this.jobId) {
      throw new Error('No job has been executed yet.');
    }

    let job = await this.makeRequest(`jobs/${this.jobId}/`);
    while (job.status !== 'COMPLETE') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        job = await this.makeRequest(`jobs/${this.jobId}/`);
    }

    const result = await this.makeRequest(`jobs/${this.jobId}/result/`);
    return await this.makeRequest(result.raw_data_url.substring(this.BASE_URL.length) + '?format=json');
  }

  async makeRequest(endpoint, data, method = 'GET') {
    try {
        const options = {
            method,
            headers: {
                'Authorization': `Basic ${btoa(`${this.email}:${this.password}`)}`,
            }
        };

        if (data) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }

        const response = await fetch(this.BASE_URL + endpoint, options);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid email or password!');
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (err) {
        console.error(`Request failed: ${endpoint}`, err);
        throw err;
    }
  }
}
