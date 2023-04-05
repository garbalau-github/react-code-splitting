import { Suspense, lazy, useState } from 'react';
const DefaultComponent = lazy(() => import('./DefaultComponent'));

const App = () => {
  const [names, setNames] = useState<string[]>([]);

  const onLoad = async () => {
    // Async Imports Of Functions & Variables
    const names = (await import('./names')).default;
    const makeUpperCase = (await import('./utilities')).makeUpperCase;
    setNames(makeUpperCase(names));
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={onLoad}>Load</button>
      <div>{JSON.stringify(names)}</div>
      {names.length > 0 && (
        <Suspense fallback={'Loading'}>
          <DefaultComponent />
        </Suspense>
      )}
    </div>
  );
};

export default App;
