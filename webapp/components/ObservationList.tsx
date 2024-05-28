import ObservationItem from "./ObservationItem";

export function ObservationList({ results }: any ){
  return (
    <div className="flex flex-col">
      {results.map((result: any, index: number) => (
        <ObservationItem key={index} result={result} />
      ))}
    </div>
  )
}
