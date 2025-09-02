const content = `Temporal is an open source workflow orchestration platform that lets you write durable, long-running workflows in code.
At Salesforce, we needed fault-tolerant orchestration for data pipelines and Copilot actions. Temporal gave us:
- Durable retries with backoff for flaky downstream services
- Clear separation of concerns between activities and workflows
- Great observability into workflow history for debugging
We used Temporal to coordinate Kafka → Flink → Spark pipelines, with workflow steps for validation, enrichment, and downstream fanout. For Copilot actions, Temporal helped sequence model prompts, human-in-the-loop approvals, and final delivery.
Key takeaway: Temporal's 'code as state machine' model beats cron+queues for complex, stateful tasks.`;

export default content;


