This app is designed to track workout sessions, saving each session's data in a session history (saved in the browser's localStorage) for referencing in future sessions or viewing entire past sessions.


# Project Purpose and Goal

This app idea came from my need to track my workout progress in a structured way, and not finding an app that had the right balance of flexibility and simplicity.

The key features I needed were the ability to log the weight and reps of each exercise in my workout, and automatically reference the values from my previous attempt of that same exercise from my workout history.

# Main Challenge: A Highly Modifiable Data Model

I needed to define a data model with the flexibility to delete or edit many its parts, including:

- an entire session (e.g. delete any saved session in history)
- the user defined exercises for a given focus area (e.g. changing the list of exercises I can log to my session, mid-session)
- individual set data, in case of user input errors (e.g. mistyping the count of reps when inputting - something I learned was easy to do when fatigued and distracted).

## Solution 1: Zustand for State Management

I had heard great things about Zustand, an alternative state management library to heavier solutions, like Redux, and wanted to give it a try.

Defining the state's shape and named action functions was simple, and these can be accessed throughout the app, without the use of React Context providers.

## Solution 2: Local Storage as a Persistent Database

I use the browser’s local storage to store stringified versions of the app's main data objects: 
- the session history after a workout is completed
- the user-defined exercises of each focus area

This allows the app to "remember" preferred exercises and reference past sessions. 

These enable useful features like showing the user's stats of their most recent attempt of the same exercise, which gives them a target to meet or beat.

## Solution 3: UI Components for “Edit Mode” and “Delete Confirmation”

After testing earlier versions of the app, I wanted to provide clear guard rails for the user experience of editing data.

I decided to apply a consistent UX upon entering “Edit Mode”, then trigger an alert/dialog pop up with background overlay to obtain the user’s delete confirmation. 

I built the dialog with Radix Primitive’s unstyled component library.

# Lessons Learned

## UI Design is **HARD**

The difference between looking good and looking “meh” is subtle.

Thankfully, most teams include designers to make these decisions. 

On projects like these, I embrace the challenge of building without design files as an opportunity to make UI decisions and sharpen my otherwise dull design skills.

## “Pair-programming” with ChatGPT

This was my first time using ChatGPT for programming. 

I had played around with DALL-E and ChatGPT for generating other content, but had purposely avoided programming with AI before feeling more confident in my ability to code solo.

The following are sub-themes from my experience of “pair-programming” with ChatGPT:

### Learning Through Interaction

In addition to diagnosing errors and suggesting new code, ChatGPT is excellent at explaining how snippets of code work.

- If ChatGPT made some complicated or questionable suggestions, I asked follow up questions to delve deeper into how the code worked

For example, ChatGPT suggested several complex TypeScript Utility Types that were beyond my experience with TypeScript. 
- One such interaction exposed me to the powerful combo of the “infer” keyword and the `x extends y ? true : false` &nbsp; conditional type in TS

### Trust, but Verify

I also encountered many occasions where ChatGPT’s suggestions simply didn’t work. 

Often these had to do with niche circumstances, such as:
- Library idiosyncrasies, possibly due to outdated version documentation in its training data
- Differences in server-side rendering vs client-side, etc.


