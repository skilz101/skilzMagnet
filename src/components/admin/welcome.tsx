"use client";

export default function Welcome(props: { firstName: string }) {
  return (
    <div className="w-full grid place-items-center">
      <h2 className="text-4xl font-bold">
        Hi {props.firstName}, Welcome to Your SkilzMagnet Dashboard!
      </h2>
      <p className="text-muted-foreground text-center">
        Here, you can create and manage customized landing pages to collect your
        followers' emails. Access your collected emails, export them as a CSV
        file, and monitor your campaign performance—all in one place.
      </p>
    </div>
  );
}
