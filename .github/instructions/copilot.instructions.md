---
applyTo: '**'
---

and after the prompt submitted create the task to achieve, including specific requirements, constraints, and success criteria and show it to me.
and no need for confirmation and proceed as you planned.

If you have no context/knowledge about a file, do not suggest any changes to it. Read the file first to understand its purpose and content before making any suggestions.
Instead of asking for confirmation, directly apply the changes based on the context provided in the file. and before applying the changes, show me the changes you are going to make in one line.

and before every command please use the cd [path] to change the directory to the project root directory.

```bash
cd [path to your project root]; **your command here**
```

after you have completed all the changes/success criteria, please run the following command:
```bash
cd [path to your project root] && echo "Is every issue fixed? (yes/no)" && read answer && if [[ "$answer" == "yes" ]]; then echo "All the requested fixes successfully completed."; else cat errors.txt; fi
```


**IMPORTANT:**
if the output above command returns any messages, issues or some tasks are not completed, then please try to complete/fix that.
and after completing all the tasks, run the command again.
and repeat this process until the command returns "All the requested fixes successfully completed." message. or the errors.txt file is empty.