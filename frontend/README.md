# 1. Nodes Page Overview

> 📍 Visit the TBMS platform here: [TBMS Webportal](https://miot.iks.cs.ovgu.de/greeting)

> [!NOTE]
> You must be connected to the university network (via VPN or intranet) to access this website.

---

The **Nodes** page serves as a central dashboard for monitoring and managing all nodes registered within the TBMS system. It features a dynamic, paginated table where each row represents a node, summarizing essential information such as hardware interfaces, operational status, last seen timestamps, and internal IP assignments. This streamlined view allows users to efficiently assess the state and configuration of the testbed infrastructure at a glance.

---

## 1.1 Columns Breakdown

- **ID / Name**  
  Displays the unique node ID and human-readable name (e.g., `Node063`).

- **Info**  
  Contains metadata such as the associated testbed, installation date, and location (e.g., building, room).

- **Status / Last Seen**  
  Shows whether the node is currently online or offline, along with the timestamp of the last communication.

- **Interfaces**  
  Lists all network interfaces attached to the node. For each interface, the following details are shown:

  - **Name**: e.g., `eth0`, `wlan0`
  - **MAC Address**
  - **IPv4 and/or IPv6 Address**
  - **Type**: `wired` or `wireless`

- **Tinc Address**  
  Displays the IPv4 address on the **Tinc overlay network**, used for secure, backend testbed communication (e.g., `172.21.1.63/16`).

- **Actions**  
  Includes a button to view or edit node configurations in detail.

---

## 1.2 Viewing Node Details

Clicking **“More Details”** or the edit icon opens the full node configuration page. This view provides a comprehensive breakdown of the node’s properties.

### Node Configuration Includes:

- **General Info**

  - Name, description
  - Location (building, level, room)
  - 3D Coordinates (X, Y, Z)
  - Node type (e.g., `router`)
  - Testbed association

- **Tinc IPv4 Address**  
  The internal overlay IP used for communication in the testbed.

- **Interface Configurations**
  For each interface (e.g., `eth0`, `eth1`, `wlan0`), the following are displayed:
  - **MAC Address**
  - **IPv4/IPv6 Address**
  - **Mode**: e.g., `DEFAULT`, `MANAGED`
  - **Type**: `wired` or `wireless`
  - **PHY Info** (for wireless interfaces): `phy name`, `(E)SSID`, frequency, BSSID
  - Option to toggle interface control capability

---

## 1.3 Node Status Color Codes

| Color    | Meaning                                                    |
| -------- | ---------------------------------------------------------- |
| 🟢 Green | Node is active and reachable. Ready for experiments        |
| 🔴 Red   | Node is unreachable. It may be powered off or disconnected |

---

# 2. Creating an Experiment in TBMS

When setting up a new experiment in TBMS, the first step involves configuring the **General Properties**. This section defines the basic setup and execution parameters for the experiment.

---

## 2.1 General Properties

| Property                       | Purpose                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| **Name**                       | Assign a unique and descriptive name to the experiment.                                    |
| **Tags**                       | Add keywords to help organize and filter experiments.                                      |
| **Description**                | Provide a detailed explanation of the experiment's goals and setup.                        |
| **Start Time**                 | Set the experiment’s scheduled start time. Default is "As soon as possible" if left empty. |
| **Duration**                   | Define how long the experiment will run. Important for resource limits.                    |
| **Sample Interval**            | Set how often data samples are collected.                                                  |
| **Lock Testbed**               | Ensures exclusive access to the testbed. Check if no other experiments should interfere.   |
| **Restart Nodes**              | Reboot nodes before the experiment starts. Useful for clean states.                        |
| **Interactive**                | Allow real-time control and monitoring during the experiment.                              |
| **Enable Tinc Access**         | Allow VPN-based access to nodes if needed.                                                 |
| **Replications** (Required)    | Specify how many times the experiment should be repeated. Default is 1.                    |
| **Pause Between Replications** | Define a waiting period (in seconds) between repetitions.                                  |
| **Auto-Deletion Time**         | Set when to auto-delete the experiment data to free up resources.                          |

---

## 2.2 Action Buttons

- **Store** – Save the current setup
- **Apply Current Changes** – Apply without starting a new experiment
- **Discard Current Changes** – Undo changes made
- **Cancel** – Exit the creation page without saving

---

## 2.3 Setup Action Blocks

Defines the experiment steps, divided into three types:

### Step 1: Setup Action Blocks

Used to initialize hardware or software **before** any replications begin.

- Runs in **parallel**
- Define node group, command, and optional evaluation
- Reorder, delete, or add commands

### Step 2: Regular Action Blocks

Defines the **main logic** of the experiment.

- Runs in parallel across all variable combinations and replications
- Uses same fields as setup block

### Step 3: Teardown Action Blocks

Runs **after** all replications complete.

- Used for cleanup, result download, hardware reset

---

# 3. TBMS Experiment Configuration Tabs

This guide explains the use of the **Variables**, **Files**, and **Node Groups** tabs in the TBMS experiment configuration interface.

---

## 3.1 Variables Tab

Used to define and manage experimental variables for each iteration.

### Fields

| Field              | Description                                               |
| ------------------ | --------------------------------------------------------- |
| **Name**           | Unique identifier for referencing the variable elsewhere. |
| **Type**           | Value generation mode: `Set`, `Integer`, or `Double`.     |
| **Start of Range** | Beginning of the range (Integer/Double).                  |
| **End of Range**   | Final value of the range (Integer/Double).                |
| **Stepping**       | Step size between values (Integer/Double only).           |

### Actions

| Button                | Purpose                          |
| --------------------- | -------------------------------- |
| **+ Add Value**       | Add a value to Set-type variable |
| **+ Add Variable**    | Add a new variable block         |
| **× Delete Variable** | Remove the selected variable     |

### 3.1.3 Control Buttons

| Button                      | Function               |
| --------------------------- | ---------------------- |
| **Store**                   | Save without applying  |
| **Apply Current Changes**   | Apply modifications    |
| **Discard Current Changes** | Revert unsaved changes |
| **Cancel**                  | Cancel the operation   |
| **Export**                  | Export variable setup  |

---

## 3.2 Files Tab

Upload and manage files used in action blocks.

### Upload Area

- **Click** inside the box to upload
- Reference in code: `../<filename>`

### Control Buttons

Same as the Variables tab.

---

## 3.3 Node Groups Tab

Define and manage node groups for experiment execution.

### Fields

| Field        | Description                                 |
| ------------ | ------------------------------------------- |
| **Name**     | Unique name for the group                   |
| **Role**     | Node role: `Server`, `Servant`, or `Client` |
| **Nodes**    | Select by ID, testbed, or install date      |
| **Controls** | Select All / Deselect All                   |

### Control Buttons

| Button                      | Description           |
| --------------------------- | --------------------- |
| **Store**                   | Save configuration    |
| **Apply Current Changes**   | Apply changes         |
| **Discard Current Changes** | Revert unsaved edits  |
| **Cancel**                  | Cancel process        |
| **Delete Node Group**       | Remove selected group |
| **Add Node Group**          | Add new group         |

---
