export type Report = {
  system: string;
  month: string;
  reports: {[key: string]: number}; 
}

import systems from '@/constants/fdda_systemfull.json'

export function getSystems() {
  return systems.systems.map(system => system.name) 
}


export async function getReports() {
  const res = await fetch('http://127.0.0.1:8080/reports');
  const reports = (await res.json()) as Report[];
  return reports;
}

export async function getReportBySystem(system: string) {
  const res = await fetch(`http://127.0.0.1:8080/reports/${system}`);
  return (await res.json()) as Report; 
}