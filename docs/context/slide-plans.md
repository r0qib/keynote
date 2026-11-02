# AI-Assisted Development — The Good, the Bad and the Ugly

## Plain text context

total time: 1 hour 20 minutes
Presentation context: AI-Assisted Development — The Good, the Bad and the Ugly.
place: online session (microsoft teams), initially it was planned as an in-person session. but due to circumstances, it will now be conducted online. the presentation will be a screen share session.

I am preparing a presentation for next week about the good, bad, and ugly sides of using AI in software development. It will mainly be based on my and my team's experiences, but the discussion should also be relevant to other engineers in our company. The presentation should be honest, practical, relatable, and include humor.

We all use AI, but we face different problems depending on how we use it. One common approach is treating an AI agent as a chatbot: repeatedly prompting it, waiting for it to finish, reviewing the result, and prompting it again. At the other end of the spectrum are structured methodologies such as GitHub Spec Kit, AWS AI-DLC, and B-MAD. These can provide structure, but they can also be constrained, verbose, expensive, and time-consuming, sometimes making simple tasks feel like waterfall development. Most engineers probably work somewhere between these extremes, and approaches vary from person to person.

One topic I want to cover is the time between chats. With prompt-based engineering, we often spend a lot of time waiting for agents to finish tasks. While waiting, we may watch the agent work, switch between apps, or scroll through YouTube Shorts, Facebook Reels, and other short-form content. It can get boring, and we end up spending a surprising amount of time waiting rather than actively developing.

Another topic is how the software engineer's role has changed. Before AI, we spent much more time writing code, debugging, and solving problems ourselves. It could take longer, but there was also enjoyment in the work. Now, we often act more like orchestrators or project managers, delegating tasks to AI. If we rely too heavily on AI and do not properly engage with requirements and plans, we can end up with results that do not match the actual needs. We may not understand why code was written a certain way or why something is broken, and we may struggle to answer client questions because we were not sufficiently involved in the planning and implementation.

AI often performs impressively at the beginning of a project, but getting good results becomes harder near the end, when we need to fine-tune behavior, fix bugs, and make small changes. It may fix one issue and break another. For example, I ask it to draw a circle, but it draws a rectangle. When I ask it to fix that, it draws a trapezium. This kind of repeated correction is frustrating and can be used for humor in the presentation.

I also want to discuss the gap between what AI companies claim their agents can do and what we experience in real development. Agents make mistakes, misunderstand requirements, fail to follow instructions, ignore parts of questions, and are not reliably capable of working fully autonomously from beginning to end. Sometimes they appear to understand an instruction but do not actually follow it, or they fix one thing while breaking something else.

I want to show what it takes to follow structured methodologies such as AI-DLC, Spec Kit, and B-MAD. They can involve a lot of planning, documentation, process, time, and AI token usage. The overhead can be excessive for simple tasks and can make the workflow feel like waterfall development. These methodologies may be useful in some situations, but they are not necessarily appropriate for every task.

There is also a conflict between the AI budget available to us and management's expectations. We are expected to use AI and follow documented methodologies while still delivering efficiently within our budgets. In practice, many engineers do not consistently follow these methodologies, even if they claim to. I want to discuss the gap between what is expected, what people say they do, and what actually happens during day-to-day development.

The presentation will include an interactive questionnaire around five to ten minutes after it starts. The audience will scan a QR code and answer multiple-choice questions about their opinions and experiences with AI coding agents. The questions should be more about their habits and views than a technical test. I will use the responses to guide parts of the discussion and comment on what the audience says.

Toward the end, I want to explain how I currently work with AI. I do not simply rely on an existing methodology, and I do not just keep prompting an agent back and forth. I work feature by feature. I first plan and brainstorm the feature myself, including what needs to be done and what should not be done. Once I am satisfied with the direction, I ask the AI agent to create an execution workflow or plan. The agent asks clarifying questions, I answer them, and we refine the plan until it contains the information needed to implement the feature.

The plan can then be executed across different sessions with substantial autonomy because the necessary context and steps are already defined. For each feature, I create a workflow suited to its size and complexity. The workflows have a similar general structure but are customized for the specific feature, rather than forcing every task through one universal methodology. This is my current approach, and I want to share how I plan, brainstorm, build workflows, and execute features with AI.

The presentation should have humor throughout, using relatable situations from everyday AI-assisted development. It should cover the benefits as well as the frustrations, without simply criticizing AI or claiming that one methodology is always best. The overall goal is to share real experiences, explore the gap between AI promises and actual results, discuss the impact on engineers and teams, and show how I have adapted my workflow.

## The topics above are background context for organizing the presentation later. They are not a finalized slide list and are not yet in presentation order. The next step will be to identify the actual slides/topics and arrange them into a logical sequence.

## General Instructions

- Every slide must communicate ONE primary idea.
- Almost no slides will have detailed text unless you're asked to include it for any specific slide.
- Use animations and visual cues to convey ideas instead of relying on text alone.
- add the Brain Station 23 Logo (src/assets/bs23_logo.webp) at the first slide, as this is the company I work for, the presentation is targeted to its employees. don't make the logo a focal point; it should be present but not dominate the slide.
- Ensure that the slides are visually engaging, using animations, diagrams, and minimal text to convey key points effectively.
- Use consistent visual themes and color schemes to maintain a professional and cohesive look throughout the presentation.
- don't over do the animations or visual effects; they should enhance understanding, not distract from the content.
- the current demo slides that we have has terrible visual animations and effects. these are flashy, distracting. the animations should be refined to support the content rather than overshadow it. as i have said, take inspiration from good visual storytelling practices and focus on clarity and engagement rather than excessive flair. companies like google, apple, and microsoft events are good references for this approach.
- for humor, take imaginations form great developer conferences and talks where great speakers use relatable anecdotes, witty observations, and light-hearted commentary to engage the audience and make complex topics more approachable.
- the audience should feel engaged and included throughout the presentation. it should not feel like a one-way lecture.
- make sure to address the `docs/context/template_layout_feedback.png` for fixing current layout and visual issues in the slides.
- you should not take inspiration from the current demo slides (all the slides we have now). only keep the things we can reuse like colors, fonts, window layouts, and other reusable visual elements. you can obviously modify them as needed to fit the new presentation style and improve clarity. nothing is fixed or permanent from the current slides. you just need to make sure the presentation.

- ***

## Slide Topics

> These are the potential slide topics for the presentation. There could be multiple slides for each topic, and the final order will change based on the flow. these are just my ideas in rough form and will be refined and sorted later. The titles of these slides are also not what the plain text says; they are just rough labels for now.

### Intro to informatiq domain

    title: Intro to InformatiQ, Who We Are, What We Do
    visual: Offshore oil rigs, application suites, logos and names of the apps.
    order: TBD (at the very beginning)
    Slide Content Ideas:
    - This slide will introduce InformatiQ - our team, our client (the client name is InformatiQ, we are just a team that works for the client, our actual company is Brain Station 23, this presentation will be targeted to all the brain station 23 employees, mostly engineers).
    - This slide will just provide a brief introduction and context about InformatiQ team
    - We work for a norwegian client, InformatiQ, there we make software solutions for Oil and Gas Energy sector.
    - We almost exclusively focus on developing software solutions for Offshore Oil drilling related activities.
    - The slide could include visuals such as offshore oil rigs, some of our application suites, logos and names of the apps etc very briefly to give a visual context without overwhelming the slide with text.
    - The audience already know us, the team member info is not necessary to include on this slide.
    - all our app logos are here: `src/assets/informatiq-app-suite-logos`. For portal app logo use the 'informatiq.svg' since we don't have a full logo for it.

### Time between chats, how to utilize the time, chat animation

    Title: Time Between Chats (better title with humor?)
    visual: Start with only the chat 3 dot animation. then it will get smaller and the title will appear (requires click/next). then other content will appear as the discussion progresses.
    order: TBD
    Slide Content Ideas:

    - Initially the slide will only have a chat 3 dot animation - nothing else on the slide, representing the AI thinking or typing.
    - then after a click the animation will get smaller and the title will appear
    - here we will talk about the problem of trying to develop a software only by prompting because then you need to sit around and wait for the AI to ask you questions or finish its task, and then you are going going to prompt your next question or task with is which is not the best way to use AI.
    - we are actually wasting our valuable time when the AI is working on it and we have nothing else much to do other than just wait or spend our times doing unproductive things.
    - I am not saying that we should not use this way of development because there are obviously a good use cases when we are solving relatively smaller problem, a smaller bug, or just trying to brainstorm with the AI.
    - however, for larger and complex tasks, this is not the best way to approach. This kills our focus. We are actually working like a burst of attention, then nothing, then some attention, then nothing, and it kills. It just destroys our attention span.
    - the key message here is that we should avoid this kind of actively prompting way of development as much as possible instead, we should plan our tasks ahead of time with all the age cases and everything prepare a complete plan and then let the AI to execute the whole plan as a single session or a long running session.
    - if we plan for, let's just say 3 hours and then let the AI execute it for another one or two hours, or maybe more, sometimes it will take a whole day to implement. This way, when we are doing the planning, we can go into a focus mode and we will be in the flow state. All the context will be there within our head, we can prepare a very good plan, whereas when we are just doing, I call it 'chat-based development', we are constantly interrupted and never fully immersed in the task. This

### Wrong slide (How AI will destroy the human race)

    title: How AI will destroy the human race (better title with humor?)
    visual: <come up with a visual>
    order: TBD
    Slide Content Ideas:
    - This is just a humorous slide to catch the audience's attention and lighten the mood.
    - the presenter will then focus on the slide and he will go "Oh wrong slide!"
    - then the slide will transition to the actual intended content, keeping the audience engaged and amused.
    - This will be a playful way to transition into the main content while keeping the audience entertained.
    - this will be the second or third slide in the presentation, depending on how the flow is structured.
    - the slide will not reveal that it's a wrong slide, the humor will come from the presenter's reaction and the audience's realization. this would look like a normal slide at first glance, making the reveal more surprising and funny.
    - The transition from the "wrong slide" to the actual content should be smooth and visually engaging, possibly using an animation or visual effect to maintain the audience's attention. like we can use an eraser or blackboard duster to erase the title or content of the wrong slide, revealing the intended slide underneath.
    - The key is to make the audience feel like they are in on the joke without giving away the surprise too early.

### Explore your competitor / learn from the best

    title: Explore your competitor / Follow the best practices (no humor but if possible a better title)
    order: TBD
    Slide Content Ideas:
    - This slide will be the part of value addition to the product we as an engineer can provide by learning from competitors and following best practices.
    - before ai we used to just follow the client requirements without much room for innovation. but since ai writing the codes now, we as an engineer have more bandwidth to explore, innovate, and add value beyond the basic requirements.
    - This slide will come after (maybe not right after) the 'meat proxy' slide.
    - the basic idea of this slide is that, we cannot just blindly follow client requirements or existing practices; we need to actively seek out opportunities to improve and innovate by learning from competitors and adopting best practices. ai replaced my role as a code writer, giving me the freedom to focus on higher-level thinking and value addition.

### Add value with example

    title: Let's make it better
    visual: Show a simple UI component before AI, then an exaggeratedly bad AI-enhanced version, and finally the polished AI-enhanced version. reveal one after another by user click.
    order: TBD
    Slide Content Ideas:
    - This slide will demonstrate how to add value to existing processes or products with concrete examples.
    - The presenter can showcase a before-and-after scenario to highlight improvements.
    - The focus should be on practical ways to enhance outcomes, leveraging insights gained from previous slides.
    - The idea for this slide is to show a little example of how we used to deliver a feature before AI era. Then it will show how we can still deliver that feature which is more polished, better optimized, fluid user experience, and overall higher quality with the help of AI.
    - We will have three examples, one highlighs how it looked and behaved before AI, then it will show how it can be improved and enhanced with AI assistance, but this time this will be an AI slop design, then like the wrong slide humor, I will reveal that I'm joking and show the proper AI-enhanced version. this will create a contrast of how we can make bad designs versus well-thought-out AI-enhanced designs.

    - what kind of feature to show here? I haven't decided yet, but it should be something that clearly demonstrates the contrast between the pre-AI and AI-enhanced approaches. like a UI component that was just simple and okay before AI, and then we can show how it can be significantly improved with AI. since before we had to do everything manually, the design and implementation were limited by our time and effort, but with AI, we can explore more sophisticated and polished solutions. we can add more interactive elements, better layout, and overall improved user experience. obviously, not just adding complexity for the sake of it, but making meaningful improvements that enhance the overall quality and usability of the feature. we will only show the UI part, not the code or anything.
    - the main point would be, before we had AI, we were constrained by our manual efforts and time. so we shiped what the client needed, we didn't have the luxury to explore better solutions or enhance the quality beyond the basic requirements. with AI, we can break free from these constraints and focus on delivering higher-quality, more polished, and innovative outcomes.
    - obviously, this doesn't mean pre ai work was bad or useless. it simply means that with the advent of AI, we have new tools and capabilities that allow us to elevate our work beyond the limitations of manual effort and time constraints. we should embrace these opportunities to enhance quality and innovation while still valuing the foundation laid by our pre-AI efforts. we now just have to do our work which is to strategically plan, find out how we can add value, make the user experience better, and leverage AI to achieve outcomes that were previously difficult to accomplish or would take a lot more time and effort.
    - now we are bounded by our imagination where as before we were bounded by our manual efforts and time constraints.

### Planning and workflows with demo

    title: How We Work at Informatiq
    visual: Show a workflow diagram illustrating how tasks are managed and executed at Informatiq, highlighting the integration of AI tools and processes. include nice animations to demonstrate the flow and interactions.
    order: TBD
    Slide Content Ideas:
    - refer to `docs/context/AGENTIC-WORKFLOWS.md` for detailed information on the workflows and processes at Informatiq.
    - the slides will visually represent the workflow, making it easier for the audience to understand how tasks are managed and executed at Informatiq.
    - the whole visualization will appear dynamic and interactive. the presenter will guide the audience through each step of the workflow, demonstrating how tasks are initiated, managed, and completed, and how AI tools are integrated into the process to enhance efficiency and effectiveness.
    - we can have mltiple slides for this. this whole explaining the workflow will take around 20-30% of the presentation time.

### Role shift

    title: The Role Shift
    visual: from coding to AI orchestration and t
    order: TBD
    Slide Content Ideas:
    - This slide will discuss how the role of engineers has shifted with the advent of AI.
    - It will highlight the transition from being primarily code writers to becoming more focused on higher-level thinking, innovation, and value addition.
    - the presenter will share his own experiences and opinions that now what i feel like is that, we need to shift our focus from merely writing code to thinking strategically about how to leverage AI for greater impact and innovation.
    - If we keep the same mindset of the previous era, we will be late to the party. we will be walking ourself into the next layoff list.
    - We need to embrace this shift, actively seek out opportunities to leverage AI and we must know where do we fit in this new landscape of engineering.
    - Engineering is not going to be dead or ai is not here to replace us (at least not completely, at least not in near future, a touch of optimism and humor).

### Following AI methodologies/frameworks?

    title: Following AI Methodologies and Frameworks (provide a better title here)
    order: TBD
    Slide Content Ideas:
    -  we have a lot of new methodologies and frameworks emerging specifically for AI-driven development like ai-dlc (by aws), speckit (by github), B-MAD, and others that aim to structure and optimize AI integration into engineering workflows.
    - these methodologies provide structured approaches to incorporating AI into development processes. These provides a framework for the whole development lifecycle, from planning and design to implementation and maintenance, ensuring that AI is effectively and efficiently integrated into engineering workflows.
    - no doubt these frameworks are great and provide valuable guidance, but they are not a one-size-fits-all solution.
    - how many of us are actually following these AI-specific methodologies in our day-to-day work? to be honest, probably very few.
    - there are some reasons for this, such as the complexity of these frameworks, the learning curve involved, and sometimes the frameworks not aligning perfectly with the specific needs and constraints of our projects.
    - there are one more thing to consider, THE COST, THE TOKEN USAGES.
    - if we try to follow these AI-specific methodologies strictly, the cost in terms of token usage and computational resources can become significant. the problem that we face is that we have a budget and resource constraints that may not allow us to fully adhere to these frameworks without incurring substantial costs.
    - especially for us who are in third world countries, where budgets and resources are often more constrained. so we often had to make trade-offs and prioritize cost-effective approaches over strictly following these AI-specific methodologies. nobody wants to talk about it, but it's a reality we have to face.
    - when i have a budget, I will focus on actually delivering the project outcomes and value rather than strictly adhering to AI-specific methodologies.
    - but these don't mean those methodologies are bad in any way. we just have to adapt them to our specific context, balancing the ideal practices with practical constraints like budget, resources, and project requirements.
    - we should learn from these methodologies, extract the valuable principles and practices, and adapt them to our specific context rather than following them rigidly, unless we have the budget, resources, and project requirements that allow us to do so without compromising efficiency and cost-effectiveness.

### Cost ????

    title: COST!!!???
    order: TBD
    Slide Content Ideas:
    - in this light, the main topic will be the cost of the current ai usage. One of the main issues of properly using the AI, how it is advertised to use by the maker of AI companies, like anthropic open AI, etc, is that it often leads to higher token usage and computational costs than initially expected.
    - since we have a monthly budget we cannot always explore our ideas, follow the industry standards, use AI to review its output properly, etc.
    - to be honest, in one way or another, most of the time we rely on one shotting a problem. We need to cut corners. Just so that we can keep using our LLM budget at the end of the month.
    - even if we try to explore new things with AI, exploring different approaches and experimenting with various prompts can quickly consume our token budget, limiting our ability to fully leverage AI capabilities.
    - we, as developers, worry about the token usage more than our output being perfect.
    - (more real life example of how the ai budget is limitng our ability to experiment, explore new ideas, and fully utilize AI capabilities)
    - quote from marvel Iron Man 2: "I'm Limited by the Technology of My Time [Howard Stark]", likely, 'we are limited by the budget and token usage of our time.' (adds humor)
    - this highlights the reality that, despite the potential of AI, our ability to fully utilize it is often constrained by practical limitations like budget and token usage.

### Cost Optimization and Efficiency

    title: Cost Optimization and Efficiency
    order: TBD
    Slide Content Ideas:
    - in this slide we will talk about how to optimize cost, token usage, and overall efficiency when using AI in engineering and business processes.
    - tips and tricks for managing AI costs effectively, such as optimizing token usage, choosing the right models, right effort level, and avoiding unnecessary computations and file reads.
    - prompt caching and reusing previous output hand off instead of being in the same session repeatedly, to save on token usage and improve efficiency.
    - be carefull with the ttl of cached prompts and outputs. remember, ai is stateless. everytime we send a new request, it has to process all the data from the beginning.
    - sub agent driven development, where smaller specialized AI agents handle specific tasks, can improve efficiency and reduce overall computational costs.
    - leveraging AI for cost optimization should be done strategically, considering both short-term savings and long-term efficiency gains to ensure sustainable benefits.
    - if you have an idle session that is sitting there for a while, next time you come back to it, it is already compacted to save token cost. you're just loosing context without realizing it, so always be mindful of how session compaction affects the continuity of your work.
    -

### Why ai is not what are told it is

    title: Why AI is Not What We Are Told It Is
    order: TBD
    Slide Content Ideas:
    - This slide will challenge common misconceptions about AI and its capabilities.
    - The AI companies always present their technology as highly capable and almost infallible.
    - However, in reality, we see that AI sometimes cannot follow instructions accurately or consistently. It overshoots where it shouldn't, again it misses the mark where it should be precise, and it often requires human intervention to correct its mistakes.
    - AI is a powerful tool, but it is not a magic solution. It requires careful guidance, oversight, and integration with human expertise to achieve meaningful results.
    - We all know these things, yet we often fall into the trap of relying too heavily on AI without considering its limitations and the need for human intervention.
    - use `/clear`, don't try to keep working on the same session repeatedly. Try to design your plan step by step and hand off previous outputs to new sessions when necessary. each step should be mostly independent and self-contained.
    - use `.claudeignore` to exclude files and folders that do not need to be processed by the AI, helping to reduce unnecessary computations and improve efficiency. other ai tools have similar mechanisms, such as `.gitignore`-like files or configuration options to exclude certain paths from processing.
    - choose the right models and effort level for each task. this might feel overwhelming to switch between different models and effort levels, that's why you can create a strategy or guidelines for when to use each model and effort level, helping to streamline decision-making and improve overall efficiency.
    - We can take advantage of sub agent driven development, where smaller specialized AI agents handle specific tasks. this way we can fine-tune each agent for its specific role, which model and effort level to use, even what context or information it needs to operate. This might seem like we are adding complexity and increasing the cost. While it might cost you a little more than just back and forth prompting with a single agent, this way you can achieve greater overall efficiency, better task specialization, and potentially lower long-term computational costs.
    - we can make our life easier just by doing some on-time setup, designing some custom workflows based on the feature or project we are working on. this really make the whole process enjoyable, we get better and cosistent result and guess what, as we use the same kind of work

### Ai doesn’t actually listen to the instructions (99% of 50% of the time)

    title: AI Doesn’t Actually Listen to Instructions (99% of 50% of the Time)
    order: TBD
    Slide Content Ideas:
    - This is a continuation of the previous slide's discussion on AI limitations. Maybe both slides can be merged or be separate. these are just draft ideas, not the final slides,
    - the 99% of 50% of the time is just a humorous way to express the inconsistency and unpredictability of AI following instructions accurately. the 99% of 50% of the time should not initially be on the slide, rather it will appear a little late (or maybe with a click) to reveal the humor. better the '50% of the time' appears later making the audience see the 'ai is accurate 99% of the time' statement, at this time they will likely nod in agreement before realizing the twist.
    - The slide will likely include a visual or example to demonstrate this inconsistency, making the audience realize the humorous twist in the AI's accuracy. like 'make it better', 'make no mistakes', 'make it perfect', etc 'did you hear what I said?' moments.

### Elephant in the room

    title: Elephant in the Room
    order: TBD
    Slide Content Ideas:
    - This and the 'cost' slide is almost the same. both will be merged. maybe this could be the title.

### Our experience / frustration/ enjoyment

    title: Our Experience with AI
    order: TBD
    Slide Content Ideas:
    - This slide will share our team's experiences, frustrations, and enjoyment while working with AI in our projects.
    - We will highlight specific instances where AI has been helpful, as well as moments where it has caused challenges or required human intervention.
    - The goal is to provide a balanced view of AI's capabilities and limitations from our perspective.
    - Visuals could include screenshots of AI interactions, workflow diagrams, or humorous examples of AI mistakes.

### Joke about ai doing things right, over complicating

    title: AI Doing Things Right... or Overcomplicating
    order: TBD
    Slide Content Ideas:
    - This slide will present humorous examples of AI either doing things correctly but in an overly complicated manner or misunderstanding instructions in a funny way.
    - Visuals could include screenshots of AI responses, exaggerated flowcharts, or side-by-side comparisons of simple vs. AI-generated solutions.
    - The goal is to entertain the audience while highlighting the quirks and unpredictability of AI behavior.

### Questions with form

    title: Let's Share out honest opinions
    order: TBD (right after the introduction and todays agenda briefing)
    Slide Content Ideas:
    - This slide will have a QR code with a link to a form where the audience can share their honest opinions and feedback about AI usage and experiences.
    - It form will collect responses anonymously, allowing the audience to provide candid feedback without any hesitation.
    - 'Trust me, I'm one of you, it's actually anonymous.' with humor and reassurance to encourage honest participation.
    - The audience will be be answering the questions  like
      - Do you enjoy the new AI way of working or you actually prefered the good old experience of writing codes, debugging, solving a problem that brings joy and satisfaction?
      - What are your biggest frustrations with AI?
      - Do you strictly follow any AI development framework like B-Mad, SpecKit, AI-DLC, OpenSpec?
      - Any humorous or memorable experiences with AI, like you specifically asked it to not do something, but it did anyway?

### Anti slop

    title: SLOP
    order: TBD
    Slide Content Ideas:
    - This slide will explore the concept of AI Slop and how, knowingly or unknowingly, we all contribute to it as developers.
    - We will discuss how our initial excitement about AI often leads us to over-rely on its outputs without thinking critically about long-term maintainability, project architecture, or consistency.
    - We will highlight how AI-generated UI designs are increasingly becoming recognizable due to repetitive patterns, generic layouts, and the infamous Purple Slop aesthetic.
    - We will emphasize the importance of giving AI clear project-specific instructions, centralized rules, design guidelines, constraints, and established opinions to follow.
    - The goal is to encourage developers to take ownership of AI-generated work rather than blindly accepting its outputs. AI should follow our engineering principles, not define them.
    - The key message: Don't become a Slop Machine. Think, guide, constrain, and review what AI produces.

### Meat proxy.

    title: Meat Proxy
    order: TBD
    Slide Content Ideas:
    - Introduce the concept of a Meat Proxy: a human middleman who simply forwards requirements to AI and copies the responses back without adding any meaningful value.
    - Use humorous examples: The Human Clipboard, The Prompt Courier, The Certified Forwarder, and The One-Tab Engineer.
    - Highlight the problem: A Meat Proxy adds no engineering value, only latency. If AI can do your entire job without your involvement, what's your purpose?
    - Explain how to become an AI Orchestrator instead:
    - Understand requirements and think through the problem.
    - Apply engineering expertise and provide your own opinions.
    - Brainstorm and explore alternatives with AI.
    - Plan, guide, and delegate implementation to AI.
    - Review, validate, and take ownership of the outcome.
    - Key message: Don't outsource your brain. Use AI as an instrument, not a replacement for engineering judgment.
    Visual ideas: A funny human sandwich between a client and ChatGPT, a copy-paste machine, or a comparison between a Meat Proxy and an AI Orchestrator.

    Punchline: "Your value-add shouldn't be latency."

    visual: add 'who is JSON' joke.

---

## Draft Note

> unrelated content for the whole presentation, I will talk about these in the appropriate context during the presentation. the order of these points doesn't necessarily reflect the order in the slides. we will inject them where they make the most sense and provide the most value to the audience.

- maintain a centralize repository or system for managing AI-related resources, workflows, and best practices. This helps ensure consistency, reduces duplication of effort, and makes it easier for team members to access and utilize AI tools effectively. we at informatiq have our own repo for claude code / github copilot related skills, plugins, commands, workflows. I highly recommend setting up a similar system for your team to streamline AI usage and improve overall efficiency.

- I worked on creating a large workflow for generating user manuals for our software products. It's a large workflow consisting of multiple skills, commands, scripts, hooks, sub agents, and various interconnected components. This workflow automates the process of gathering information, formatting content, and generating comprehensive user manuals with proper screenshots, it annotates the screenshots, and ensures that the content is accurate and up-to-date. it works incrementally, it doesn't explore the whole app each time, but rather uses a snapshot of the last state and only updates the parts that have changed. We are now generating user manuals in a fully automated way. obviously there is a human reviewer involved to ensure quality and correctness. We didn't replace the human, we just made their job easier and more efficient by handling the repetitive and time-consuming tasks with AI assistance. that's the beauty of combining human expertise with AI capabilities.

- Constrint you ai agents and provide them with proper testing criteria, have proper linting and validation in place to ensure they behave as expected and produce reliable results.

- 'think step by step', 'make it better', 'improve the ui', 'don't make mistake during the process' — we should not use these kind of vague and ambiguous instructions with AI agents. Instead, provide clear, specific, and actionable guidance. For example, instead of saying 'improve the UI', specify which part of the UI needs improvement and what the desired outcome should be. Tell it how to achieve the desired outcome with concrete steps and criteria for success. dont ask it to think step by step without providing context and concrete instructions.

- One shotting feels great but it comes with its problems. please don't try to oneshot unless it just a trivial task or you have a very high confidence in the AI agent's capabilities. Use your time to plan the whole thing, brainstorm with ai, ask it to give you multiple options, and evaluate the best approach before executing. specifiy exactly what you need and then ask it to reiview it for you, work like a collaborative partner rather than expecting it to get everything right in one go. then when you have the plan ready, now you can oneshot it and expect 90% success rate. still the implementation phase will be done step by step. it's just we need to craft the plan thoughtfully to expect a better oneshot outcome.

-
