---
layout: post
title: "WTF is Kubernetes Autoscaling?"
categories: K8s
---

### Pods and Nodes in Kubernetes

In Kubernetes, your application runs in containers which are encapsulated in a higher-level structure called a Pod.
A pod usually contains one main container running your application, but can also have other supporting containers. 
Nodes are the worker machines in a Kubernetes cluster where your pods are scheduled to run. Each node is a virtual or 
physical machine, depending on the cluster.

### Scaling in Kubernetes

As your application workload changes, you may need to adjust the compute resources allocated - this is known as scaling.
Kubernetes supports two main approaches:

1. **Horizontal Scaling**: Adding more pod replicas to distribute load (scale out).

2. **Vertical Scaling**: Increasing CPU/memory resources of existing pods (scale up).

### Horizontal Pod Autoscaler (HPA)

The Horizontal Pod Autoscaler (HPA) is a native Kubernetes feature that can automatically scale the number of pod
replicas based on observed CPU utilization, memory usage, or custom metrics. Here's how it works:

1. You specify a deployment and define the minimum and maximum number of replicas to run. 
2. HPA continuously monitors metrics like CPU and memory usage of the pods. 
3. When resource usage exceeds a defined threshold (e.g. 70% CPU), HPA increases the number of pods (not nodes), 
up to the specified maximum. 
4. When resource usage drops, HPA can decrease the pod count to the defined minimum to save resources.

HPA allows your application to automatically adapt to changes in traffic or resource consumption, without manual
intervention.

### Vertical Pod Autoscaler (VPA)

While HPA scales the number of pod replicas, the Vertical Pod Autoscaler (VPA) adjusts the CPU and memory resources
pods request. VPA monitors historic and current CPU and memory usage of pods and provides recommended resource limits
and requests to ensure pods are scheduled with optimal resources. VPA can operate in several modes - it can
automatically update pod resource requirements or only provide recommendations.

While HPA and VPA handle pod-level scaling, they don't address the need to scale the cluster itself. If pods cannot
be scheduled due to insufficient cluster capacity, the Cluster Autoscaler can automatically provision new nodes

### Cluster Autoscaler (CA)

Cluster Autoscaler is a tool that automatically adjusts the size of your Kubernetes cluster when one of the following
conditions is true:
* Some pods failed to run in the cluster due to insufficient resources. 
* There are nodes in the cluster that have been underutilized for an extended period of time and their pods can be
placed on other existing nodes.


The Cluster Autoscaler monitors the Kubernetes cluster for unscheduled pods and underutilized nodes. It decides to
add or remove nodes by communicating with the cloud provider's API. However, with Cluster Autoscaler:

* You need to pre-define and manage multiple node groups for different instance types, zones, and purchase options. 
* Cluster Autoscaler can take several minutes to scale up nodes, as it relies on the cloud provider's APIs and has
to wait for nodes to become ready. 
* Cluster Autoscaler scales nodes based on resource utilization but doesn't actively optimize for cost

All these limitations pave the way for Karpenter.

### Karpenter

Karpenter is an open-source, high-performance Kubernetes cluster autoscaler that helps improve application 
availability and cluster efficiency by rapidly launching right-sized compute resources in response to changing
application load. We listed the limitations of Cluster Autoscaler in the above paragraph. Karpenter addresses 
those by:

* eliminating the need for node groups altogether. It provisions nodes directly based on the aggregate resource
* requests of unscheduled pods. Karpenter automatically selects the best instance type and configuration 
based on pod requirements 
* Karpenter can launch nodes in milliseconds by directly interacting with the cloud provider's fleet APIs,
without the overhead of node groups 
* Karpenter can consolidate workloads onto fewer nodes by considering factors like instance type, pricing, 
and scheduling constraints

Now all the above solutions scale based on CPU / Memory metrics. Sometimes we need event-driven autoscaling to 
react to the number of incoming requests or data points to process in ETL pipelines. However, Horizontal Pod Autoscaler
cannot scale pods in response to events, that's where KEDA comes into the picture.

### KEDA (Kubernetes Event-Driven Autoscaling)

KEDA addresses a key limitation of HPA - the inability to scale based on arbitrary metrics or events. With KEDA, you can
scale your workloads based on the number of events in queues like Kafka, RabbitMQ, or AWS SQS. KEDA provides a more 
user-friendly approach to custom autoscaling compared to Kubernetes' custom metrics API. However, it's focused 
specifically on event-driven scaling and is not a full replacement for other autoscalers.

To **summarise** everything:

1. The Horizontal Pod Autoscaler (HPA) automatically scales the number of pods based on CPU utilization or custom
metrics, but cannot scale to zero and requires sufficient cluster capacity.
2. The Vertical Pod Autoscaler (VPA) automatically adjusts CPU and memory resources for pods based on usage,
but requires pod restarts and can cause disruptions.
3. The Kubernetes Cluster Autoscaler adds or removes nodes based on pod scheduling requirements, but requires 
manual configuration of node groups for different instance types.
4. Karpenter is a flexible cluster autoscaler that provisions nodes based on pod requirements, optimizes 
utilization and cost, and improves upon the Cluster Autoscaler.
5. Kubernetes Event-Driven Autoscaling (KEDA) scales pods based on events or metrics from external sources, 
allowing scaling to zero for event-driven workloads.
