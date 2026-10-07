# College Task Manager Reflection

## 1. What did you ask Copilot to help you build? How did you break down the problem?

I asked GitHub Copilot to help me build a simple College Task Manager using HTML, CSS, and vanilla JavaScript. I started with the basic goal of creating a web application where students could add tasks, display them in a list, mark them as completed, delete them, and see how many tasks were still pending.

I broke the project into smaller parts. First, I asked Copilot to create the project structure with separate HTML, CSS, and JavaScript files. Then I worked on the task functionality, including adding tasks, completing tasks, deleting tasks, and updating the counters. After that, I improved the visual design and responsive layout, and finally I asked Copilot to update the README documentation.

## 2. How did your approach to asking questions change as you worked?

At the beginning, I used broad prompts that described the whole application and the main features I wanted. I also asked Copilot to create the initial structure, which gave me a starting point to review and improve.

As the project became more complete, I asked more specific questions. For example, I asked Copilot to improve the checkbox behavior so completed tasks looked different and the pending counter changed correctly. I then asked it to add a delete confirmation, and later to improve the spacing, typography, buttons, task cards, and mobile layout. My questions became more focused because I already knew what needed to change and could explain the expected behavior more clearly.

## 3. What parts of the development process with GitHub Copilot surprised you?

I was surprised by how quickly Copilot could create the initial project structure and connect the JavaScript functionality to the HTML interface. It also helped me update existing code instead of rebuilding everything from scratch.

I found the testing and debugging process useful, especially when I asked Copilot to improve one feature at a time. The completion feature required the pending count and visual task state to work together, and the delete feature needed to preserve the task when the user canceled. Copilot helped me keep these changes connected to the existing application.

I also noticed that Copilot could produce working code quickly, but I still had to review the result and check how the activity would behave in the browser. This made me more careful about checking that the code matched the user-facing behavior rather than relying only on the generated code.

## 4. What did you learn about the technology you used that you didn't know before?

I learned that vanilla JavaScript can manage a complete task interface without needing a framework or a backend. The task list can be rendered from an array of task objects, and each task can respond to browser events such as checkbox changes and button clicks.

I also learned how browser storage can keep tasks available after the page is refreshed. I used the existing local storage behavior to save the task data, which made the application feel more useful than a page that only existed during one session.

Finally, I learned how CSS can make the same task interface responsive for different screen sizes. The visual design needed changes for desktop and mobile screens, and the completed and pending states needed to be clearly represented.

## 5. What would you do differently if you had to build this again?

If I had to build the project again, I would begin with a clear list of the required user actions and test each one as I went. I would also ask Copilot to explain the main JavaScript behavior before accepting the final code, especially around the task state, counters, and deletion confirmation.

I would try to test the application more often in the browser while developing, rather than waiting until the end to review the interface. I would also keep the project files separated from the beginning, as that made the application easier to understand and update.

For the README, I would describe every implemented feature accurately and include the real project structure. I would also make the testing instructions clearer so another student could run and check the application easily.
