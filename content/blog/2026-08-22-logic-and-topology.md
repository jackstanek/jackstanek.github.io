+++
title = "Logic is Just Topology"
+++

Since I have a blog section on this site, I figure I should actually write blog posts instead of having [just one single post promising more posts in the future](@/blog/2023-10-29-welcome.md).
So I'm going to make good on that and actually write up some posts on interesting tidbits that I've learned recently, starting here with an intro to topology for people who only know basic formal logic.

## Coffee and Donuts

If you're anything like me, you've absorbed the knowledge that "a coffee cup is topologically equivalent to a donut" through edutainment osmosis.
This classic example is meant to illustrate what the field of topology "is" at a fundamental level: it's the study of smooth deformations, where you can show that two shapes are really the same thing if you can smoosh and stretch one into the other without poking holes or making cuts.
This notion extends to graph and network domains too; in network engineering, for example, you often hear talk of "the network topology" in reference to the various ways a network can be set up: ring, mesh, bus, and tree topologies are common ones.
In both of these instances, you can kind of get an intuition for what "a topology" is without having taken an undergrad math course on the topic: it's almost like a higher-level description of a structure which ignores lower level details like distances or curvature in the geometric example, or device identities or connection substrates in the network example.
In programming language theory, though, you sometimes run into topology when you define the semantics of a programming langauge, especially in fields like [domain theory](https://en.wikipedia.org/wiki/Domain_theory) for denotational semantics.
With the geometric interpretation in mind, I always found it a little confusing how the "study of continuous functions" could apply to discrete objects like the semantic domain of a programming language.
And since I was one of those poor souls that neglected to take a topology course in undergrad, I was too afraid to learn, since topology seemed like such a daunting field.
But as it turns out, it's actually quite easy to get a handle on the basics of topology, and if you have any background at all in classical or constructive logic (or if you have a CS degree where you took an intro to discrete math course), you can quickly get up and running with a working intuition of what topology is really trying to say.

## Topological spaces and open sets
One snarky circular definition of topology is that it's the study of _topological spaces_.
But what is a topological space?
If you open up the [Wikipedia article](https://en.wikipedia.org/wiki/Topological_space), you'll see the following "general definition:"
> a topological space is a set whose elements are called points, along with an additional structure called a topology, which can be defined as a set of neighbourhoods for each point that satisfy some axioms formalizing the concept of closeness. There are several equivalent definitions of a topology, the most commonly used of which is the definition through **open sets**. (emphasis mine)
