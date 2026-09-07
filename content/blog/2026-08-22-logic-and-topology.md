+++
title = "Logic is Just Topology"
description = "A quick introduction to topology by way of logic."
draft = true

[extra]
math = true
+++

Since I have a blog section on this site, I figure I should actually write blog posts instead of having [just one single post promising more posts in the future](@/blog/2023-10-29-welcome.md).
So I'm going to make good on that and actually write up some posts on interesting tidbits that I've learned recently, starting here with an intro to topology for people who only know basic formal logic.

## Coffee and donuts

If you're anything like me, you've absorbed the knowledge that "a coffee cup is topologically equivalent to a donut" through edutainment osmosis.
This classic example is meant to illustrate what the field of topology "is" at a fundamental level: it's the study of smooth deformations, where you can show that two shapes are in some sense the same thing if you can smoosh and stretch one into the other without poking holes or making cuts.
This notion extends to graph and network domains too; in network engineering, for example, you often hear talk of "the network topology" in reference to the various ways a network can be set up: ring, mesh, bus, and tree topologies are common ones.
In both of these instances, you can kind of get an intuition for what "a topology" is without having taken an undergrad math course on the topic: it's almost like a higher-level description of a structure which ignores lower level details like distances or curvature in the geometric example, or device identities or connection substrates in the network example.
In programming language theory, though, you sometimes run into topology when you define the semantics of a programming langauge, especially in fields like [domain theory](https://en.wikipedia.org/wiki/Domain_theory) for denotational semantics.
With the geometric interpretation in mind, I always found it a little confusing how the "study of continuous functions" could apply to discrete objects like the semantic domain of a programming language.
And since I was one of those poor souls that neglected to take a topology course in undergrad, I was too afraid to learn, since topology seemed like such a daunting field.
But as it turns out, it's actually quite easy to get a handle on the basics of topology, and if you have any background at all in classical or constructive logic (or if you have a CS degree where you took an intro to discrete math course), you can quickly get up and running with a working intuition of what topology is really trying to say.

## Topological spaces and open sets

Let's start with some basic definitions to get a footing.
One snarky circular definition of topology is that it's the study of _topological spaces_.
But what is a topological space?
If you open up the [Wikipedia article](https://en.wikipedia.org/wiki/Topological_space), you'll see the following "general definition:"
> a topological space is a set whose elements are called points, along with an additional structure called a topology, which can be defined as a set of neighbourhoods for each point that satisfy some axioms formalizing the concept of closeness. There are several equivalent definitions of a topology, the most commonly used of which is the definition through **open sets**. (emphasis mine)

That's a little bit _too_ general!
So what's an open set, really?
Simply put, open sets generalize _open intervals_, which you may remember from high school calculus.
Consider, for example, the interval \\((0, 1)\\), meaning the set of all real numbers between 0 and 1, exclusive.
The calculus explanation of why this interval is open is that there's a "neighborhood" around every point in the set such that the neighborhood is entirely contained within the set.
Formally, for every \\(x \in (0, 1)\\), there is some \\(\epsilon > 0 \\) such that 
{% sidenote(name="closed") %}
By contrast, the interval \\([0, 1]\\) is the _closure_ of this open interval, since it includes the bounds 0 and 1.
Put simply, \\([0, 1]\\) is "closed" because it isn't open.
With the calculus definition, it's fairly easy to see why: at 0 and 1, there's no neighborhood with a non-zero radius contained within the interval: half of it will always stick out above or below.
{% end %}
$$(x - \epsilon, x + \epsilon) \subseteq (0, 1).$$

This calculus definition is useful to understand openness since it directly talks about _nearness_.
Any point within an open interval has a set of points which are arbitrarily near to it: that is, at most \\(\epsilon\\) away from it.

However, it's important to note that this definition of "openness" is restricted only to the real numbers on the number line.
Sure, we could extend it to 2 dimensions, where neighborhoods are now discs on the plane, or to 3 dimensions, where neighborhoods are balls, or even to higher dimensions.
It's easy to see how points might be "near" to one another in these cases.
But what happens if we start bending and deforming the set of points, or stretch it and twist it?
Does the definition of "nearness" change?
Do points that are near one another stay together under these transformations?
Does this work for sets that aren't even made up of real numbers?
What if we only have integers or natural numbers?
What if we don't have numbers at all?
What if we only have some discrete structure like a graph or network?
Can we define "nearness" in a coherent way for all of these diverse situations?

Topology concerns itself with exactly this last question.
The whole point is to define what "near" means without needing to reference distances at all.
If we go back to the calculus example from before, we can see that we implicitly defined "nearness" by appealing directly to distance &mdash; that's where the \\(\epsilon\\) came in.
Topology does away with this dependency entirely.
The specific high-school-calculus notion of "open" and "closed" forms what is typically referred to as the _usual topology on the reals_.
But taking a step back, if we want to generalize the concept of openness, we need to go beyond this simple definition.

Topologists use the following definition of "open sets:" it's a definition that isn't intrinsic, but which appeals to membership in a _class_ of open sets containing elements from an underlying set.
Given that underlying set (say, the real numbers, the integers, some finite set, etc.), a collection _open sets_ on that underlying has the following properties:
1. The empty set \\(\varnothing\\) is open.
2. Any arbitrary union (even an infinite union) of open sets is also an open set.
3. Any intersection of a finite number of open sets is also an open set.

The underlying set paired with the collection of open sets is called a _topological space_, and the set of open sets is often called _a topology_ on that set.
You may notice that the open set definition feels like it could admit many different topologies for a given set, and it sure can.
For example, the trivial topology is (almost) empty: the only open set is the empty set.
Clearly this topology meets all three definitions.
You can define the trivial topology for any underlying set.
Another topology you can define for any underlying set \\(X\\) is the _discrete topology_, the powerset \\(2^X\\).
Again,
