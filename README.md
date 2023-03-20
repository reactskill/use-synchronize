# useSynchronize

It's a more user-friendly version of `useEffect`.

It's a hook that can be used to *synchronize* your component's local states with other stateful things such as the database, the DOM, a timer, or even the component's own local states.

It improves unpon `useEffect` on a few things:

1. **the naming:** it's now named exactly what it's meant to do, to *synchronize* something with something else.

2. **the args order:** the list of local states/props is now the first argument, but it's also optional. The setup callback is required, so if there's no local state/props provided, the setup callback will be the first and only argument.
```js
useSynchronize([count, timerCount], () => {
  /* setup logic */
})

useSynchronize(() => {
  /* setup logic (runs only once) */
})
```

3. **the cleanup:** a cleanup setter (by convention, named `withCleanup`) will be passed as a parameter of the setup function, you can use that to set the cleanup callback instead of returning it with `useEffect`. This makes it easier to see which synchronization has a cleanup step and which doesn't.
```js
useSynchronize(withCleanup => {
  /* setup logic */
  withCleanup(() => /* cleanup logic */)
})
```

## Before and after comparison

Code sample using `useEffect`:

```js
  // timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerCount(state => state + 1)
    }, 1000)
    return () => clearInterval(intervalId)
  })

  // count direction
  useEffect(() => {
    if(count >= 9) {
      setCountUp(false)
    }
    if(count <= 0) {
      setCountUp(true)
    }
  }, [count])

  // score
  useEffect(() => {
    if(count === timerCount % 10) {
      if(timerCount !== 0) {
        setScore(state => state + 1)
      }
    }
  }, [count, timerCount])
```

The same code but using `useSynchronize`:
```js
  // timer
  useSynchronize(withCleanup => {
    const intervalId = setInterval(() => {
      setTimerCount(state => state + 1)
    }, 1000)
    withCleanup(() => clearInterval(intervalId))
  })

  // count direction
  useSynchronize([count], () => {
    if(count >= 9) {
      setCountUp(false)
    }
    if(count <= 0) {
      setCountUp(true)
    }
  })

  // score
  useSynchronize([count, timerCount], () => {
    if(count === timerCount % 10) {
      if(timerCount !== 0) {
        setScore(state => state + 1)
      }
    }
  })
```