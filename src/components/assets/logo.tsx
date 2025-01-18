import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/Group-7.png"
      alt="skilz magnet. a saas for lead generation"
      width={50}
      height={50}
    />
  );
}

export function Logo2() {
  return (
    <Image
      src="/logo2.png"
      alt="skilz magnet. a saas for lead generation"
      width={50}
      height={50}
    />
  );
}

export function NewSvgComponent() {
  return (
    <>
      <Image
        src="/Social-media-rafiki.svg"
        alt="Study buddy logo"
        className="w-full object-cover"
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
      />
    </>
  );
}
