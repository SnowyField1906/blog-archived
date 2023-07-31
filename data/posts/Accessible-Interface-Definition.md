---
title: Accessible Interface Definition
date: '2023-07-09'
tags: [Cadence, Blockchain, Flow]
draft: false
summary: Flow Improvement Proposal for Cadence language - Accessible Interface Definition
thumbnail: '/static/images/posts/apple-competition.jpg'
---

# FLIP 117: Accessible Interface Definition

## Objective

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

> What are we doing and why? What problem will this solve? What are the goals and non-goals? This is your executive summary; keep it short, elaborate below.

This FLIP proposes the implementation of a feature that allows functions to define which Contracts can call them based on the Interfaces those Contracts inherit.

The objective is to simplify the development of large-scale projects with multiple parallel Contracts that require complex access control rules.

## Motivation

> Why is this a valuable problem to solve? What background information is needed to show how this design addresses the problem?
> Which users are affected by the problem? Why is it a problem? What data supports this? What related work exists?

Flow introduced Cadence - a Resource-Oriented Programming Language which works towards the Capability system, it replaced `msg.sender` and proved to be effective for small projects. \
However, as projects grow in size and complexity, the efficiency of the Capability system decreases compared to the use of `msg.sender`.

To illustrate the issue, let's consider a specific example. Suppose we have a `Vault` Contract with a function called `Vault.swap()`, which should only be called by the `Core` Contract or `Router` Contracts.

```cadence
access(all) contract Vault {
    access(all) resource Admin {
        access(all) fun swap(from: @FungibleToken.Vault): @FungibleToken.Vault {
            return <- Vault._swap(from: <- from)
        }
    }

    access(self) fun _swap(from: @FungibleToken.Vault): @FungibleToken.Vault {
        // some implementation
    }

    access(account) fun createAdmin(): @Admin {
        return <- create Vault.Admin()
    }
}
```

Currently, we can achieve this with Flow using different approaches:

Approach 1: Saving the `Admin` Resource to the `Router` deployer account.

```cadence
access(all) contract Router {
    access(all) fun swap(from: @FungibleToken.Vault): @FungibleToken.Vault {
        return self.account.borrow<&Vault.Admin>(from: /storage/VaultAdmin)!.swap(from: <- from)
    }
}
```

Approach 2: Saving the `Admin` Capability to the `Router` Contract.

```cadence
access(all) contract Router {
    let vaultAdmin: Capability<&Vault.Admin>

    access(all) fun swap(from: @FungibleToken.Vault): @FungibleToken.Vault {
        return self.vaultAdmin.swap(from: <- from)
    }

    init(vaultAdmin: Capability<&Vault.Admin>) {
        self.vaultAdmin = vaultAdmin
    }
}
```

However, both approaches have drawbacks:

- The `Admin` Resource definition increases the code size and makes maintenance and updates more challenging.
- Adding a new `Router` Contract requires operating with the `Vault` deployer account, reducing decentralization and introducing unnecessary steps.
- As projects become larger and require more complex access control rules, the need for additional Resources meeting some specific requirements increases, which leads to a more significant increase in code size.

## User Benefit

> How will users (or other contributors) benefit from this work? What would be the headline in the release notes or blog post?

This proposal is aimed at making Contracts more decentralized, independent of the deployer account. This will be easier to manage and friendly to high complexity projects.

## Design Proposal

> This is the meat of the document where you explain your proposal. If you have multiple alternatives, be sure to use sub-sections for better separation of the idea, and list pros/cons to each approach. If there are alternatives that you have eliminated, you should also list those here, and explain why you believe your chosen approach is superior.

> Make sure you’ve thought through and addressed the following sections. If a section is not relevant to your specific proposal, please explain why, e.g. your FLIP addresses a convention or process, not an API.

The proposed design introduces the following enhancements:

### Declaration keywords

#### The `define` keyword

Example:

```cadence
// Define an alias for a Contract Interface
define ContractAlias from ContractInterface {
    // Within this scope, the caller Contract can be accessed using `ContractAlias`.
    // This allows us to interact with the caller Contract and leverage its capabilities.
}
```

The `define` keyword is used to create an alias for a Contract Interface. \
By defining an alias, we can access the caller Contract within the scope of the definition.

Once it is possible to access the caller Contract and utilize its functionalities, developers can build powerful features and implement complex logic to ensure Contract security besides enhance the flexibility and extensibility of Contracts.

#### Improvements to the `access` keyword

After declaring definitions, the aliases can be used by the `access` keyword to specify which Interfaces are allowed to call a function.

Note that `access(ContractX)` has a wider scope than `access(self)`, meaning that it can also be called in the parent Contract.

```cadence
// FooContract.cdc
access(ContractX) fun foo() { }
self.foo() // Valid

// BarContract.cdc
access(all) contract BarContract: IContractX {
    FooContract.foo() // Valid
}
```

To make `foo()` callable within the inner Contract, the alias can be combined with `contract` by using the `|` operator (details provided below).

```cadence
// FooContract.cdc
access(ContractX | contract) fun foo() { }

access(all) resource Foo() {
    access(all) fun bar() {
        FooContract.foo() // Valid
    }
}
```

#### The `|` and `&` operators

These two operators are used to combine multiple Interfaces according to Boolean logic.

As mentioned above, the proposed design allows the combination of multiple Interfaces using the `|` operator. This is useful when a function should be callable by multiple Contracts.

```cadence
// FooContract.cdc
access(ContractX | ContractY | ContractZ) fun foo() { }

// BarContract.cdc
access(all) contract BarContract: IContractY, IContractZ {
    FooContract.foo() // Valid
}
```

Additionally, the `&` operator can be used to specify that the function can only be called by Contracts that implement all of the Interfaces included.

```cadence
// FooContract.cdc
access(ContractX & ContractY & ContractZ) fun foo() { }

// BarContract.cdc
access(all) contract BarContract: IContractY, IContractZ {
    FooContract.foo() // Inaccessible
}

// SuperBarContract.cdc
access(all) contract SuperBarContract: IContractX, IContractY, IContractZ {
    FooContract.foo() // Valid
}
```

#### The `group..as` keyword

The `group..as` keyword introduces a convenient way to define a group of Interfaces as a single alias, particularly when there are multiple Interfaces that need to be combined. \
This allows for a concise reference to the combined Interfaces.

To create such a shorthand reference, the `group` keyword is utilized, followed by a combination of Interfaces according to Boolean logic. \
Subsequently, the `as` keyword is utilized, followed by the desired alias.

```cadence
// FooContract.cdc
group (Developer | Designer) & Available as Candidate

access(Candidate) fun foo() { }

// NotAvailableForWork.cdc
access(all) contract NotAvailableForWork: Developer, Designer {
    FooContract.foo() // Inaccessible
}

// Candidate.cdc
access(all) contract Candidate: Developer, Available {
    FooContract.foo() // Valid
}
```

### Resource integration

This proposal also allows us to use `define` on Resource Interfaces, which behaves mostly same with `entitlements` but not though Resource and Capability types.

### Sample use cases

This proposal suggests introducing the ability for Contracts to inherit specific Interfaces in order to determine their validity. \
However, merely filtering Contracts based on Interfaces does not imply filtering their algorithms or implementations, which can make the system vulnerable to manipulation or falsification.

To address this, we can enhance control over the underlying by imposing additional restrictions in the following ways:

- **Enhancing Interfaces**: We can enhance interfaces by incorporating `pre` and `post` conditions in order to ensure the desired behavior before and after the execution of the caller function.

- **Utilizing caller Contract accessibility**: Since we can access the caller Contract within the `define` scope, it becomes possible to apply further restrictions using `assert()` conditions there.

#### Example 1

In this example, we demonstrate how to restrict access to functions using enhanced Interfaces.

Supposes we have a `Vault` Contract with a `Vault._swap()` function which should be restricted to be callable only by either `Plugin` or `Router` Contracts.

```cadence
// Vault.cdc
define Plugin from IPlugin { }

access(all) contract Vault {
    access(Plugin | Router) fun _swap(from: @FungibleToken.Vault, expectedAmount: UFix64): @FungibleToken.Vault;
    access(all) fun exactInput(amountIn: UFix64): UFix64;
}
```

In the `IPlugin` Interface, we enhance the `Plugin.swap()` function with a `post` condition. This condition ensures that: \
Whenever the fake `Plugin` makes a call to the `Vault._swap()` function in order to withdraw an amount of Fungible Token, the returned value is always the same as the expected amount, regardless of any manipulation in the code logic.

```cadence
// IPlugin.cdc
access(all) contract interface IPlugin {
    access(all) fun swap(from: @FungibleToken.Vault, expectedAmount: UFix64): @FungibleToken.Vault {
        pre {
            expectedAmount == Vault.exactInput(amountIn: from.balance): "Not enough amount"
        }
        post {
            expectedAmount == result.balance: "You cheated!!"
        }
    }
}
```

Now, let's explore how a malicious `Plugin` Contract attempts to cheat the system by withdrawing half of the received Fungible Token during the swap.

```cadence
// Plugin.cdc
access(all) contract Plugin: IPlugin {
    access(all) fun invalidSwap(from: @FungibleToken.Vault): @FungibleToken.Vault {
        let to: @FungibleToken = Vault._swap(
            from: <- from,
            expectedAmount: 0.01
        ) // -> pre-condition failed: Not enough amount
    }
    access(all) fun anotherInvalidSwap(from: @FungibleToken.Vault): @FungibleToken.Vault {
        let to: @FungibleToken = Vault._swap(
            from: <- from,
            expectedAmount: someAmount
        ) // Valid from IPlugin

        to.withdraw(amount: to.balance / 2.0) // Cheat half of the amount

        return to // -> post-condition failed: You cheated!!
    }
}
```

#### Example 2

```cadence
// Nodes.cdc
define Consensus from IConsensus { }

access(all) contract Nodes {
    access(Collection | Consensus | Execution | Verification) fun receivedTx();
}

// IConsensus.cdc
access(all) contract interface IConsensus {
    access(all) fun validate(tx: @Transaction): @Transaction {
        pre {
            tx.collected() == true: "Send this transaction to Collection Node first"
            tx.validated() == false: "This transaction is already executed"
        }
        post {
            tx.validated() == true: "This transaction is not validated"
        }
    }
}
// Consensus.cdc
access(all) contract Consensus: IConsensus {
    access(all) fun validate(tx: @Transaction): @Transaction {
        Nodes.receivedTx() // Valid from IConsensus

        // Do something to make tx.validated() == true

        return <- validatedTx // Valid
    }
}
```

#### Example 3

```cadence
// Nodes.cdc
define Execution from IExecution {
    let exeAddr: Address = Execution.account.address
    assert(Nodes.validExecutions.exists(exeAddr), message: "Execution is not valid")

    let balance: UFix64 = getAccount(Execution.account.address)
        .capabilities
        .get<&{FungibleToken.Balance}>(/public/flowTokenBalance)
        .borrow()!
    assert(balance >= Nodes.minimumStaked: "Execution is not staked enough")
}

access(all) contract Nodes {
    access(all) let validExecutions: [Address] = [0x01]
    access(all) let MINIMUM_STAKED: UFix64 = 1250000.0

    access(Router | GOV) fun addExecution(execution: Address);
    access(Collection | Consensus | Execution | Verification) fun withdrawn();

    access(Execution) fun executed();
}

// InvalidExecution.cdc
// Deployed at 0x02
access(all) contract InvalidExecution: IExecution {
    access(all) fun execute() {
        Nodes.executed() // -> assertion failed: Execution is not valid
    }
}
// PoorExecution.cdc
// Deployed at 0x01 and had less than 1.250.000 Flow
access(all) contract PoorExecution: IExecution {
    access(all) fun execute() {
        Nodes.executed() // -> assertion failed: Execution is not staked enough
    }
}
// ValidExecution.cdc
// Deployed at 0x01 and had over 1.250.000 Flow
access(all) contract ValidExecution: IExecution {
    access(all) fun execute() {
        Nodes.executed() // Valid
    }
}
```

#### Example 4

```cadence
// Bank.cdc
define Balance from SpecialBalance { }
define Receiver from SpecialReceiver { }
define Provider from SpecialProvider { }

group (Balance & Receiver & Provider) as Vault

access(all) contract Bank {
    access(Balance) fun getInterest(): UFix64;

    access(Provider) fun withdrawAll();

    access(Vault) fun subscribed()
}

// BankVault.cdc
access(all) resource interface SpecialBalance {
    access(all) fun getAvailableBalance(): UFix64;

    access(all) fun getAllPossibleBalance(): UFix64 {
        return self.getAvailableBalance() + Bank.getInterest() // Valid from SpecialBalance
    }
}
access(all) resource interface SpecialProvider {
    access(all) fun withdraw(amount: UFix64): @FungibleToken.Vault;

    access(all) fun withdrawAll(): @FungibleToken.Vault {
        Bank.withdrawAll() // Valid from Provider
        // Some implementation
    }
}
access(all) resource SpecialVault: SpecialBalance, SpecialReceiver, SpecialProvider {
    // Some implementation

    access(all) fun subscribe() {
        Bank.subscribed() // Valid from (SpecialBalance & SpecialReceiver & SpecialProvider)
    }
}
```

### Drawbacks

> Why should this _not_ be done? What negative impact does it have?

Since the [`entitlement` FLIP](https://github.com/onflow/flips/blob/main/cadence/20221214-auth-remodel.md) was approved, this might cause some confusion and conficts in syntax and semantics.

### Alternatives Considered

> Make sure to discuss the relative merits of alternatives to your proposal.

### Performance Implications

> Do you expect any (speed / memory)? How will you confirm?

> There should be microbenchmarks. Are there?

> There should be end-to-end tests and benchmarks. If there are not (since this is still a design), how will you track that these will be created?

### Dependencies

> Dependencies: does this proposal add any new dependencies to Flow?

> Dependent projects: are there other areas of Flow or things that use Flow (Access API, Wallets, SDKs, etc.) that this affects? How have you identified these dependencies and are you sure they are complete? If there are dependencies, how are you managing those changes?

### Engineering Impact

> Do you expect changes to binary size / build time / test times?

> Who will maintain this code? Is this code in its own buildable unit? Can this code be tested in its own? Is visibility suitably restricted to only a small API surface for others to use?

### Best Practices

> Does this proposal change best practices for some aspect of using/developing Flow? How will these changes be communicated/enforced?

### Tutorials and Examples

> If design changes existing API or creates new ones, the design owner should create end-to-end examples (ideally, a tutorial) which reflects how new feature will be used. Some things to consider related to the tutorial:
>
> - It should show the usage of the new feature in an end to end example (i.e. from the browser to the execution node). Many new features have unexpected effects in parts far away from the place of change that can be found by running through an end-to-end example.
> - This should be written as if it is documentation of the new feature, i.e., consumable by a user, not a Flow contributor.
> - The code does not need to work (since the feature is not implemented yet) but the expectation is that the code does work before the feature can be merged.

### Compatibility

> Does the design conform to the backwards & forwards compatibility [requirements](../docs/compatibility.md)?

> How will this proposal interact with other parts of the Flow Ecosystem?
>
> - How will it work with FCL?
> - How will it work with the Emulator?
> - How will it work with existing Flow SDKs?

### User Impact

> What are the user-facing changes? How will this feature be rolled out?

## Related Issues

> What related issues do you consider out of scope for this proposal, but could be addressed independently in the future?

## Prior Art

> Does the proposed idea/feature exist in other systems and what experience has their community had?

> This section is intended to encourage you as an author to think about the lessons learned from other projects and provide readers of the proposal with a fuller picture.

> It's fine if there is no prior art; your ideas are interesting regardless of whether or not they are based on existing work.

## Questions and Discussion Topics

> Seed this with open questions you require feedback on from the FLIP process.

> What parts of the design still need to be defined?
