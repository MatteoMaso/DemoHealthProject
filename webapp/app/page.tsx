import ObservationsPanel from "@/components/Observation";

export default function Home() {
  return (
    <div>
      <div className="m-auto w-1/2 text-justify my-7 text-lg">
        <p>This is a simple demo of a full-stack application using Next.js, NestJS, and Prisma.</p>    
        <p>Pressing the fetch button it will load all observations from the database and display them in a table.</p>
      </div>
      <div className="m-11">
        <ObservationsPanel />
      </div>
    </div>
  );
}
