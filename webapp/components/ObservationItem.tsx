export default function ObservationItem({ result }: any) {
  return (
    <div className="grid grid-cols-2 border-2 m-1 shadow-md hover:bg-blue-300 border-blue-700 p-3 rounded-lg">
      <div className="flex flex-col">
        <div className="font-bold">Client info</div>
        <div className="ml-2 mt-2">
          <div>Id: {result.client.id}</div>
          <div>Birthday: {new Date(result.client.birthdayDate).toLocaleDateString()}</div>
          <div>Gender: {result.client.gender}</div>
          <div>Ethnicity: {result.client.ethnicity}</div>
        </div>
        <div className="mt-5 flex flex-flow-col">
          <div className="mr-2 font-bold">Date Testing:</div>
          <div> {new Date(result.dateTesting).toLocaleDateString()} </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        <div>Creatine: </div> <div> {result.creatine.value} {result.creatine.unit}</div>
        <div>Chloride: </div> <div> {result.chloride.value} {result.chloride.unit}</div>
        <div>Fasting Glucose: </div> <div> {result.fastingGlucose.value} {result.fastingGlucose.unit}</div>
        <div>Potassium: </div> <div> {result.potassium.value} {result.potassium.unit}</div>
        <div>Sodium: </div> <div> {result.sodium.value} {result.sodium.unit}</div>
        <div>Total Calcium: </div> <div> {result.totalCalcium.value} {result.totalCalcium.unit}</div>
        <div>Total Protein: </div> <div> {result.totalProtein.value} {result.totalProtein.unit}</div>
      </div>
    </div>
  )
}