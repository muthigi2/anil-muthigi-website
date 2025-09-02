const content = `Scaling Temporal Visibility with Self-Hosted Elasticsearch on Kubernetes

When I joined Salesforce as a Futureforce Software Engineer Intern, my project was to tackle a core scalability challenge in Temporal.io, a distributed workflow orchestration platform heavily used across Salesforce. Temporal relies on a visibility store to power queries, search attributes, and UI features like workflow history. By default, Temporal provisions an AWS OpenSearch cluster for this purpose. However, our teams wanted more control, performance tuning, and multi-cloud flexibility — especially with Salesforce’s migration path toward Hyperforce on GCP.

My internship project:
Replace Temporal’s default OpenSearch with a self-managed Elasticsearch (ES) cluster running on Kubernetes (AWS EKS, with GKE as a future target).

Why Replace OpenSearch with Self-Hosted Elasticsearch?

Temporal’s default OpenSearch setup is convenient, but it introduces constraints:

Vendor Lock-In – Tightly coupled with AWS, not ideal for multi-cloud expansion.

Limited Tuning – ES cluster sizing, index mappings, and resource allocation were abstracted away.

Cost & Efficiency – For large-scale workflow queries, Salesforce needed better control over storage classes, JVM tuning, and node roles.

Integration Flexibility – Temporal visibility needed to fit into Salesforce’s Falcon Kubernetes Platform (FKP) and FEDX CI/CD pipelines, not just AWS-native tooling.

Architecture Overview

The final design used Kubernetes StatefulSets to run Elasticsearch with dedicated node roles:

Master Nodes – Handle cluster coordination, leader election, and metadata.

Data Nodes – Store indices for workflow executions, histories, schedules.

Coordinator Nodes – Route queries, offload heavy aggregation workloads.

Each tier had:

PersistentVolumeClaims (PVCs) with gp3 storage class for predictable IOPS.

Headless Services for stable DNS resolution inside the cluster.

Secrets were injected dynamically using Consul Template sidecars, so Temporal services (frontend, history, matching, worker) could securely fetch ES credentials without manual updates.

Helm-Driven Deployment

To make this reusable across environments (dev, staging, prod), I built a Helm chart that defined StatefulSets for master/data/coordinator nodes, set PodDisruptionBudgets to maintain quorum during rolling upgrades, added Istio annotations for service mesh and TLS, and used dynamic config transforms to fit Salesforce’s FEDX pipelines. Where needed, optional sidecars and Argus exporters were included. The chart integrates with Argus dashboards so SREs can monitor cluster health, JVM GC times, query latencies, and index growth.

Temporal Integration

Once the cluster was up, the next challenge was plugging it into Temporal. I updated temporal.yaml to point the visibility store at the ES coordinator using https/TLS and Vault-sourced auth, pre-created the index with mappings for advanced visibility, verified that custom search attributes (e.g., CustomStringField, CustomIntField) could be indexed and queried, and validated parity via the Temporal UI by running namespace, workflow, and schedule queries.

Key Challenges

This wasn’t smooth sailing — some of the trickiest issues I faced included:

PVC Provisioning Failures – gp3 storage limits required tuning Helm PVC templates.

TLS vs. Mesh-TLS – Istio injected sidecars conflicted with Elasticsearch’s native TLS configs; I had to carefully align CA/cert/key trust chains.

Index Mapping Drift – Temporal’s schema upgrades sometimes conflicted with pre-defined ES index templates.

CI/CD Pipeline Debugging – FEDX builds failed when Helm hooks didn’t align with Strata’s artifact packaging flow.

Outcomes

By the end of my internship:

Temporal was running production-ready on a self-hosted ES cluster.

We validated parity with OpenSearch for all core visibility features.

The Helm chart became a reusable artifact for future EKS and GKE rollouts.

Dashboards in Argus provided deep visibility into ES performance, enabling cost/performance trade-off analysis.

Most importantly, the project laid the groundwork for Hyperforce-GCP expansion, where OpenSearch isn’t a native option.

Lessons Learned

Kubernetes + Stateful workloads require special care: quorum, PVC binding, PodDisruptionBudgets are not optional.


Search system tuning (heap size, thread pools, shard counts) is the difference between “working” and “scalable.”

Observability is non-negotiable — Temporal UI's SLA is dependent on the availability of the ES cluster.

Looking Forward

The natural next step is benchmarking: comparing query latencies, index growth, and cost efficiency between OpenSearch and Elasticsearch under Temporal’s real workloads. Another area is multi-cluster federation — running ES clusters across regions for higher availability.

This project was a deep dive into distributed systems, search infrastructure, and Kubernetes operations. It showed me how much hidden complexity lies beneath “just swap out OpenSearch for Elasticsearch.”`;

export default content;