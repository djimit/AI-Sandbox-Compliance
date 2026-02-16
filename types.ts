
export type MaturityLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7' | 'L8';

export interface AssessmentRequirement {
  id: string;
  name: string;
  description: string;
  article: string;
  currentMaturity: MaturityLevel;
  perceivedDifficulty: number; // 1-10
}

export interface AIRole {
  id: string;
  title: string;
  description: string;
  assignedTo?: string;
  roleType: 'Legal' | 'Technical' | 'QA' | 'Owner';
}

export interface RiskObject {
  risk_id: string;
  category: 'Fundamental Rights' | 'Safety' | 'Environmental' | 'Governance';
  description: string;
  probability_score: number; // 1-5
  impact_score: number; // 1-5
  mitigation_measure_id?: string;
  residual_risk: number;
}

export interface DataQualityControl {
  control_id: string;
  dataset_id: string;
  control_type: 'Representativeness' | 'Completeness' | 'Consistency' | 'Uniqueness';
  metric_value: number; // 0.0 - 1.0
  threshold: number;
  status: 'PASS' | 'FAIL';
  execution_timestamp: string;
}

export interface IncidentReport {
  incident_id: string;
  trigger: string;
  human_supervisor_notes: string;
  impact_assessment: 'Low' | 'Medium' | 'High' | 'Critical';
  reporting_status: 'Draft' | 'Sent to Authority' | 'Closed';
  timestamp: string;
}

export interface AIModel {
  id: string;
  name: string;
  category: string;
  status: 'Development' | 'Testing' | 'Deployed';
  lastAudit: string;
}

export type PermissionLevel = 'Denied' | 'Read' | 'Write' | 'Admin';

export interface SecurityAsset {
  id: string;
  name: string;
  category: 'Model' | 'Data' | 'Infrastructure' | 'Secret';
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface SecurityActor {
  id: string;
  name: string;
  role: string;
}
