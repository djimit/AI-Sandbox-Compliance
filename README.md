<div align="center">
<img width="1496" height="821" alt="Scherm­afbeelding 2026-02-17 om 00 17 54" src="https://github.com/user-attachments/assets/9fc9553e-26f4-4d09-b5a4-b73a577872b3" />
<img width="1496" height="821" alt="Scherm­afbeelding 2026-02-17 om 00 19 08" src="https://github.com/user-attachments/assets/84d4c7b6-bb49-4eb7-a34c-6901ec895ea0" />

</div>

Based on the comprehensive technical guides and the `build.md` specification derived from the Spanish AI Sandbox and the EU AI Act, here is the enterprise-grade **README.md** for the **EuRAI Comply** platform.

***

# EuRAI Comply: Enterprise AI Act Compliance Suite

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Compliance: EU AI Act](https://img.shields.io/badge/Regulation-EU%202024%2F1689-blue)](https://eur-lex.europa.eu/)
[![Framework: Spanish AI Sandbox](https://img.shields.io/badge/Framework-Spanish_Sandbox_Pilot-yellow)](https://www.mineco.gob.es/)

**EuRAI Comply** is an enterprise lifecycle management platform (ALM) designed to operationalize the European Union Artificial Intelligence Act (Regulation EU 2024/1689).

Built directly upon the 16 Technical Guides of the **Spanish AI Sandbox Pilot**, this application translates static regulatory requirements into a dynamic, code-integrated compliance pipeline. It assists **Providers** (developers) and **Deployers** (users) of High-Risk AI Systems (HRAIS) in achieving conformity through "Compliance by Design."

---

## 📚 Table of Contents
- [Core Philosophy](#core-philosophy)
- [Key Features & Modules](#key-features--modules)
- [Regulatory Mapping (The Sandbox Framework)](#regulatory-mapping-the-sandbox-framework)
- [System Architecture](#system-architecture)
- [Installation & Deployment](#installation--deployment)
- [User Roles & Accountability](#user-roles--accountability)
- [Security & Data Governance](#security--data-governance)
- [Disclaimer](#disclaimer)

---

## Core Philosophy
Unlike traditional GRC (Governance, Risk, and Compliance) tools that rely on manual checklists, **EuRAI Comply** integrates into the MLOps pipeline. It treats "Technical Documentation" not as a static PDF, but as a living set of artifacts linked to model versions, data hashes, and real-time monitoring logs.

It implements the **iterative continuous approach** required by Article 9 (Risk Management) and Article 17 (Quality Management System).

---

## Key Features & Modules

### 1. Strategic Classification & QMS Engine
*   **Classification Wizard:** interactive decision tree based on **Annex I** (Safety Components) and **Annex III** (High-Risk Purposes) to determine legal status.
*   **QMS Generator:** Automates the creation of a Quality Management System in compliance with **Article 17**, integrating with ISO/IEC 42001 standards.

### 2. Risk Management & Governance (Article 9)
*   **Iterative Risk Engine:** A continuous loop for identifying, analyzing, and mitigating risks to health, safety, and fundamental rights.
*   **Live Threat Modeling:** Maps system changes (e.g., model retraining) to risk profiles, triggering mandatory re-assessments.

### 3. Data Governance & Lineage (Article 10)
*   **Data Passport:** Auto-generates documentation for training, validation, and testing sets, ensuring representativeness, error-free status, and completeness.
*   **Bias Detection Suite:** Statistical tooling to detect bias against special categories of data.
*   **Sensitive Data "Clean Room":** A secure environment to process special categories of personal data (e.g., ethnicity) *strictly* for bias correction, enforcing immediate deletion/anonymization post-correction.

### 4. Technical Documentation Compiler (Annex IV)
*   **Master Document Builder:** Aggregates logs, model cards, and design choices into the standardized **Annex IV** format required for Conformity Assessment.
*   **SME Mode:** Generates the "Simplified Form" technical documentation specifically for Start-ups and SMEs to reduce administrative burden.

### 5. Human Oversight & Transparency (Articles 13 & 14)
*   **Explainability Dashboard:** Provides meaningful information to deployers, including system limitations and "automation bias" warnings.
*   **"Stop Button" Protocol:** Logs and tests the mechanism for human interveners to interrupt the system operation.

### 6. Post-Market Surveillance (Articles 15 & 72)
*   **Drift Detection:** Monitors for **Data Drift** (input changes) and **Model Drift** (relationship changes) to ensure consistent accuracy over time.
*   **Serious Incident Reporter:** Automated workflow to classify and format reports for National Competent Authorities (like AESIA) in the event of a breach of fundamental rights or safety.

---

## Regulatory Mapping (The Sandbox Framework)

This platform implements the specific measures detailed in the **16 Practical Guides** of the Spanish AI Sandbox:

| Application Module | AI Act Article | Sandbox Guide Reference |
| :--- | :--- | :--- |
| **Intro & Maturity Check** | General Scope | [Guide 01 & 02] |
| **Conformity Manager** | Art. 43 / Annex VI/VII | [Guide 03] |
| **QMS Core** | Art. 17 | [Guide 04] |
| **Risk Engine** | Art. 9 | [Guide 05] |
| **Human Oversight Lab** | Art. 14 | [Guide 06] |
| **Data Governance Hub** | Art. 10 | [Guide 07] |
| **Transparency UI** | Art. 13 | [Guide 08] |
| **Accuracy Monitor** | Art. 15.1 | [Guide 09] |
| **Robustness Suite** | Art. 15.4 | [Guide 10] |
| **Cybersecurity Shield** | Art. 15.5 | [Guide 11] |
| **Immutable Logger** | Art. 12 | [Guide 12] |
| **Post-Market Monitor** | Art. 72 | [Guide 13] |
| **Incident Reporter** | Art. 73 | [Guide 14] |
| **Doc Compiler** | Art. 11 / Annex IV | [Guide 15] |
| **Self-Assessment** | All Requirements | [Guide 16 (Checklist)] |

---

## System Architecture

The solution uses a microservices architecture to ensure scalability and secure data handling:

*   **Backend:** Python/FastAPI (for ML integration) and Node.js.
*   **Database:** PostgreSQL (Metadata) + Immutable Ledger (for Article 12 Logs).
*   **Model Format:** Support for **ONNX** to ensure interoperability and auditability.
*   **Deployment:** Docker/Kubernetes containers to ensure environmental consistency between training and production.

---

## User Roles & Accountability

Per **Guide 04 (Quality Management)**, the system enforces the "Accountability Framework" through RBAC (Role-Based Access Control):

1.  **Legal/Compliance Officer:** Defines "Risk Appetite" and approves Regulatory Strategy.
2.  **AI System Owner:** Responsible for the lifecycle, data governance, and approval of the final model.
3.  **QA/Red Team:** Conducts adversarial testing (Guide 11) and validates accuracy metrics (Guide 09).
4.  **Deployer:** The entity utilizing the system. Accesses the "Instructions for Use" and monitors output.

---

## Security & Data Governance

Adhering to **Guide 11 (Cybersecurity)** and **Guide 07 (Data)**:

*   **RBAC Implementation:** Strict separation of duties. Data Scientists cannot access production logs; Deployers cannot access training weights.
*   **Adversarial Defense:** Includes automated testing for **Data Poisoning** and **Model Evasion** attacks.
*   **Data Integrity:** All training datasets are hashed. Any modification to the dataset triggers a "Changed Status" alert in the Technical Documentation.

---

## Installation & Deployment

```bash
# Clone the repository
git clone https://github.com/your-org/eurai-comply.git

# Initialize the environment (requires Docker)
cd eurai-comply
docker-compose up -d

# Load the Sandbox Definitions
# This imports the maturity checklists from Guide 16
python manage.py load_sandbox_definitions --source="guide_16_checklist.xlsx"
```

## Disclaimer

*Based on [Source 145] and [Source 16]:*
This software and the accompanying documentation are based on the Technical Guides of the Spanish AI Sandbox. These guides are **not binding** and do not replace the applicable regulations. They serve as practical recommendations aligned with regulatory requirements pending the approval of harmonized standards. Usage of this software does not guarantee legal compliance with the EU AI Act.
