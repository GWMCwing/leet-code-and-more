function cancellable<T>(generator: Generator<Promise<any>, T, unknown>): [() => void, Promise<T>] {
  let cancelled = false;
  let cancel = () => (cancelled = true);
  //
  let transformPromise = (v: Promise<T>) =>
    v.then((v) => ({ value: v, success: true })).catch((err) => ({ value: err, success: false }));
  //
  //
  const promise = new Promise<T>(async (res, rej) => {
    let value: ReturnType<typeof generator.next>['value'];
    let done: ReturnType<typeof generator.next>['done'];
    //
    try {
      ({ value, done } = generator.next());
    } catch (err) {
      return rej(err);
    }
    if (done) return res(value);
    //
    let { value: valueR, success } = await transformPromise(value as Promise<T>);
    while (done === false) {
      if (cancelled) {
        try {
          return res(await generator.throw('Cancelled').value);
        } catch (err) {
          return rej(err);
        }
      }
      //
      try {
        ({ value, done } = success ? generator.next(valueR) : generator.throw(valueR));
      } catch (err) {
        return rej(err);
      }
      if (done) return res(value);
      ({ value: valueR, success } = await transformPromise(value as Promise<T>));
    }
  });
  //
  return [cancel, promise];
}
