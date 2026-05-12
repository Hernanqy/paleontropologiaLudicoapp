import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
  href?: string;
  label?: string;
};

export default function BackButton({
  href = "/",
  label = "Volver",
}: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 hover:bg-white/[0.08] transition"
    >
      <ArrowLeft size={16} />
      {label}
    </Link>
  );
}