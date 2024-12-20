# Repro for issue 8067

## Steps to reproduce

1. Run `firebase emulators:start --inspect-functions --project demo-project`
2. Go to "chrome://inspect/#devices"
3. Click inspect under "Runtime Targets"
   - You might need to add "localhost:9230" in Target discovery settings
   - Clicking "inspect" should show "Debugger attached" in the terminal
     - This should show 2 times since there are 2 codebases
4. Open "http://127.0.0.1:5001/demo-project/us-central1/delayedFunction"
   - This would pause in `debugger`
   - Terminal will also show:

```
>  Debugger attached.
>  Debugger attached.
>  --- [WORKER] pre debugger
```

5. Open "http://127.0.0.1:5001/demo-project/us-central1/immediateFunction"
   - Does not pause in `debugger`
   - Seems to be stuck
   - Does not update terminal

```
>  Debugger attached.
>  Debugger attached.
>  --- [WORKER] pre debugger
```

6. Go to the "DevTools" window debugging `delayedFunction` and click "Resume script execution"
   - Function finished running after delay
   - Pauses on debugger for `immediateFunction`
   - Console logs updated to

```
>  Debugger attached.
>  Debugger attached.
>  --- [WORKER] pre debugger
>  --- [WORKER] post debugger
>  --- [API] pre debugger
```

7. Go to the "DevTools" window debugging `immediateFunction` and click "Resume script execution"
   - Function finished running

```
> Debugger attached.
>  Debugger attached.
>  --- [WORKER] pre debugger
>  --- [WORKER] post debugger
>  --- [API] pre debugger
>  --- [API] post debugger
```

## Notes

Since the functions execution was:

1. Run `delayedFunction`
2. Run `immediateFunction`
3. Resume execution of `delayedFunction`
   - Wait for this to finish
4. Resume execution of `immediateFunction`

If the each codebase wasn't blocking execution, the expected logs would be:

```
>  Debugger attached.
>  Debugger attached.
>  --- [WORKER] pre debugger
>  --- [API] pre debugger
>  --- [WORKER] post debugger
>  --- [API] post debugger
```
