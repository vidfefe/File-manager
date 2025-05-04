import os from "os";

export const logEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

export const logHomedir = () => {
  console.log(os.homedir());
};

export const logUsername = () => {
  console.log(os.userInfo().username);
};

export const logArchitecture = () => {
  console.log(os.arch());
};

export const logCPUs = () => {
  const cpus = os.cpus();
  console.log(`Total CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(
      `CPU ${index + 1}: ${cpu.model}, ${(cpu.speed / 1000).toFixed(2)} GHz`
    );
  });
};
